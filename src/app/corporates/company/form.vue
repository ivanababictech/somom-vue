<template>
    <div>
        <v-tabs grow color="accent" v-model="tab" v-if="companyInitialized">
            <v-tab :key="'involvements'">COMPANY INVOLVEMENTS</v-tab>
            <v-tab :key="'verification'">IDENTITY VERIFICATION</v-tab>
            <v-tab :key="'dueDiligence'">DUE DILIGENCE ({{ involvements.length }})</v-tab>
            <v-tab :key="'documents'">DOCUMENTS ({{ corporate.data.documents.length }})</v-tab>
            <v-tab :key="'profile'">COMPANY PROFILE</v-tab>
            <v-tab :key="'onogram'">ONOGRAM</v-tab>
            <v-tab :key="'mlro'">MLRO</v-tab>
            <div>
                <v-btn color="primary"
                       @click.prevent="submit()" v-if="! isCompanyArchived">SAVE
                </v-btn>
            </div>
            <div>
                <v-btn color="primary"
                       @click.prevent="goBack()">GO BACK
                </v-btn>
            </div>

            <template >

                <v-tab-item key="involvements">
                    <involvements :company="corporate.data" v-if="tab === 0"></involvements>
                </v-tab-item>
                <v-tab-item key="verification">
                    <identity-verification
                            :identity-verification="corporate.data.identityVerification"
                            :corporate="corporate"
                            v-if="tab === 1">
                    </identity-verification>
                </v-tab-item>
                <v-tab-item key="dueDiligence">
                    <due-diligence
                            :due-diligence="corporate.data.dueDiligence"
                            :involvements="involvements"
                            :corporate="corporate"
                            v-if="tab === 2">
                    </due-diligence>
                </v-tab-item>
                <v-tab-item key="documents">
                    <documents
                            :documents="corporate.data.documents"
                            :due-diligence="corporate.data.dueDiligence"
                            :involvements="involvements"
                            v-if="tab === 3">
                    </documents>
                </v-tab-item>
                <v-tab-item key="profile">
                    <profile :profile="corporate.data.profile" v-if="tab === 4"></profile>
                </v-tab-item>
                <v-tab-item key="onogram">
                    <onogram :onogram="corporate.data.onogram"
                            :involvements="corporate.data.involvements"
                            v-if="tab === 5">
                    </onogram>
                </v-tab-item>
                <v-tab-item key="mlro">
                    <mlro
                            :corporate="corporate"
                            :company="corporate.data"
                            :mlro="corporate.data.mlro"
                            :documents="corporate.data.documents"
                            :involvements="involvements"
                            v-if="tab === 6">
                    </mlro>
                </v-tab-item>
            </template>
        </v-tabs>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import Involvements from './involvements'
    import CompanyStructure from './company-structure'
    import * as documentTypeService from '@/app/settings/corporate/document-types/service';

    export default {
        data: () => ({
                tab: 'involvements',
                tabs: [
                    'COMPANY INVOLVEMENTS',
                    'IDENTITY VERIFICATION',
                    'DUE DILIGENCE', ' DOCUMENTS', ' COMPANY PROFILE', 'ONOGRAM', 'MLRO'
                ],
                companyInitialized: false,
                companyStructure: JSON.parse(JSON.stringify(CompanyStructure)),
                documentTypes: []
            }
        ),

        props: ['corporate'],

        mounted() {
            this.setFetching({fetching: true})

            this.updateCompanyStructure(this.companyStructure, this.corporate);

            this.$store.dispatch('corporate/init', this.corporate)

            this.companyInitialized = true
            this.getDocumentTypes();
            this.setFetching({fetching: false})
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            submit() {
                this.$emit('submit');
            },

            updateCompanyStructure(data, corporate) {
                for (let attribute in data) {
                    if (attribute == 0) {
                        break
                    }
                    this.setAttribute(corporate, attribute, data[attribute]);
                    this.updateCompanyStructure(data[attribute], corporate[attribute])
                }
            },

            setAttribute(object, key, value) {
                if (!object.hasOwnProperty(key)) {
                    this.$set(object, key, value)
                }
            },

            getDocumentTypes() {
                documentTypeService.get()
                    .then(response => {
                        this.documentTypes = response.data

                        this.initDocuments()
                    })
            },

            initDocuments() {
                // match all involvements and documents
                this.involvements.map((name, index) => {
                    let existsDocument = this.corporate.data.documents.find(document => document.person.name === name.name);

                    if(!existsDocument) {
                        let documentType = this.documentTypes.find(documentType => documentType.type === name.type);

                        if(documentType) {
                            documentType.person = name;
                            this.addDocumentType(documentType)
                        }
                    }
                });

                // match all document and involvements
                this.corporate.data.documents.map((document, index) => {
                    let existsName = this.involvements.find(name => document.person.name === name.name)

                    if(!existsName) {
                        this.corporate.data.documents.splice(index, 1)
                    }
                })
            },

            addDocumentType(documentType) {
                this.corporate.data.documents.push(JSON.parse(JSON.stringify(documentType)))
            },

            goBack() {
                this.$router.push({name: 'corporates.index'});
            }
        },

        computed: {
            /**
             * Get all involvements
             *
             * @returns {Array}
             */
            involvements() {
                if (!this.companyInitialized) return []

                let involvements = [];
                this.corporate.data.involvements.types.forEach(type => {
                    let person = {};
                    switch (type.value) {
                        case 'company':
                            type.structure.types.map(structureType => {
                                switch (structureType.value) {
                                    case 'individual':
                                        person = {
                                            id: structureType.id,
                                            type: 'individual',
                                            name: structureType.name + ' ' + structureType.surname,
                                            showSourceOfWealthDocuments: true,
                                            involvements: ['Ubo']
                                        };

                                        if (person.name) involvements.push(person);
                                        break;

                                    case 'company':
                                        person = {
                                            id: structureType.id,
                                            type: 'company',
                                            name: structureType.companyName,
                                            sub_type: 'Corporate',
                                            involvements: ['Ubo - parent company']
                                        };

                                        if (person.name) involvements.push(person);

                                        structureType.shareholders.map(shareholder => {
                                            person = {
                                                id: structureType.id,
                                                type: 'individual',
                                                name: shareholder.name,
                                                showSourceOfWealthDocuments: true,
                                                involvements: ['Ubo']
                                            };
                                            if (person.name) involvements.push(person)
                                        });
                                        break;

                                    case 'foundation':
                                        person = {
                                            id: structureType.id,
                                            type: 'foundation',
                                            name: structureType.foundationName,
                                            sub_type: 'Foundation'
                                        };

                                        if (person.name) involvements.push(person);

                                        structureType.beneficiaries.map(beneficiary => {
                                            person = {
                                                id: structureType.id,
                                                type: 'individual',
                                                name: beneficiary.name,
                                                showSourceOfWealthDocuments: true,
                                                involvements: ['Ubo']
                                            };

                                            if (person.name) involvements.push(person);
                                        });
                                        break;

                                    case 'trust':
                                        person = {
                                            id: structureType.id,
                                            type: 'trust',
                                            name: structureType.trustName,
                                            sub_type: 'Trust'
                                        };

                                        if (person.name) involvements.push(person)

                                        structureType.beneficiaries.map(beneficiary => {
                                            person = {
                                                id: structureType.id,
                                                type: 'individual',
                                                name: beneficiary.name,
                                                showSourceOfWealthDocuments: true,
                                                involvements: ['Ubo']
                                            };

                                            if (person.name) involvements.push(person)
                                        });
                                        break;

                                    default:
                                        break;
                                }
                            });

                            type.beneficialOwners.map(beneficiary => {
                                person = {
                                    id: type.id,
                                    type: 'individual',
                                    name: beneficiary.name + ' ' + beneficiary.surname,
                                    showSourceOfWealthDocuments: _.includes(type.involvements, 'Nominee shareholder'),
                                    involvements: ['Fiduciary beneficiaries']
                                };

                                if (person.name) involvements.push(person)
                            });


                            person = {
                                id: type.id,
                                type: type.value,
                                name: type.name,
                                involvements: type.involvements,
                                sub_type: 'Corporate'
                            };

                            break;

                        case 'individual':
                            if (type.firstName && type.lastName) {
                                person = {
                                    id: type.id,
                                    type: 'individual',
                                    name: type.firstName + ' ' + type.lastName,
                                    showSourceOfWealthDocuments: false,
                                    involvements: type.involvements
                                };

                                person.showSourceOfWealthDocuments = _.includes(type.involvements, 'Individual shareholder')
                            }

                            break;

                        case 'foundation':
                            type.beneficiaries.map(beneficiary => {
                                person = {
                                    id: beneficiary.id,
                                    type: 'individual',
                                    name: beneficiary.name,
                                    showSourceOfWealthDocuments: true,
                                    involvements: ['Foundation beneficiaries']
                                };

                                if (person.name) involvements.push(person)
                            });

                            person = {
                                id: type.id,
                                type: type.value,
                                name: type.name,
                                sub_type: 'Foundation'
                            };

                            break;
                        case 'trust':
                            type.beneficiaries.map(beneficiary => {
                                person = {
                                    id: beneficiary.id,
                                    type: 'individual',
                                    name: beneficiary.name,
                                    showSourceOfWealthDocuments: true,
                                    involvements: ['Trust beneficiaries']
                                };

                                if (person.name) involvements.push(person)
                            });

                            person = {
                                id: type.id,
                                type: type.value,
                                name: type.name,
                                sub_type: 'Trust'
                            };

                            break;
                    }
                    if (person.name) {
                        involvements.push(person)
                    }
                });

                return involvements.filter(involvement => involvement.name !== 'null undefined');
            },

            isCompanyArchived() {
                return ! _.isEmpty(this.corporate.deleted_at);
            }
        },

        components: {
            Involvements,
            IdentityVerification: () => import("./identity-verification"),
            DueDiligence: () => import("./due-diligence"),
            Documents: () => import("./documents"),
            Profile: () => import("./profile"),
            Onogram: () => import("./onogram"),
            Mlro: () => import("./mlro")
        },

        watch: {
            involvements: {
                handler(involvements) {
                    this.initDocuments();
                },

                deep: true
            }
        }
    }
</script>