<template>
    <v-flex>
        <v-layout row>
            <v-flex xs3>
                <v-text-field
                        v-model="company.name"
                        label="Company name"
                ></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-text-field
                        v-model="company.registrationNumber"
                        label="Registration number"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs6>
                <v-select
                        item-text="title"
                        item-value="id"
                        :items="involvements"
                        v-model="company.involvements"
                        label="Select involvement"
                        multiple
                ></v-select>
            </v-flex>
            <v-flex xs6 v-if="hasInvolvement('Corporate shareholder') || hasInvolvement('Nominee shareholder')">
                <v-text-field
                        v-model="company.numberOfShares"
                        :label="'Number of shares held in ' + companyName"
                        type="number"
                        :rules="[rules.maxNumberOfShares(company.numberOfShares, maxNumberOfShares)]"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <template v-if="isNomineeShareholder()">
            <label>Details about Ultimate beneficial owners</label>

            <v-layout row v-for="(beneficialOwner, index) in company.beneficialOwners" :key="index">
                <v-flex xs10>
                    <v-layout>
                        <v-flex xs2>
                            <v-text-field
                                    v-model="beneficialOwner.name"
                                    label="Name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2>
                            <v-text-field
                                    v-model="beneficialOwner.surname"
                                    label="Surname"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field
                                    v-model="beneficialOwner.numberOfShares"
                                    :label="'Number of shares held by ' + company.name"
                                    type="number"
                                    :rules="[checkMaxBeneficialOwnerShares(beneficialOwner, index, company.numberOfShares)]"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs3>
                            <v-btn small color="primary" @click="openInputDetails(beneficialOwner)">
                                Input Details
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs2 class="text-xs-right">
                    <v-btn
                            fab
                            small
                            color="primary"
                            @click="addBeneficialOwner"
                            v-if="index === 0 && company.beneficialOwners.length < 4">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn
                            fab
                            small
                            color="danger"
                            dark
                            v-if="company.beneficialOwners.length > 1"
                            @click="removeBeneficialOwner(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>

            <label>NOMINEE ADMINISTRATOR LOGIN DETAILS</label>

            <v-layout row>
                <v-flex xs4>
                    <v-text-field
                            v-model="company.administratorName"
                            label="Name & surname"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <phone-number :object="company"></phone-number>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                            v-model="company.administratorEmail"
                            label="email address"
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </template>

        <template v-else-if="isCorporateShareholder()">
            <v-flex xs12>
                <v-dialog v-model="company.structure.show" persistent max-width="1100px">
                    <v-btn color="primary" slot="activator">INPUT COMPANY STRUCTURE</v-btn>
                    <company-structure :structure="company.structure" :company="company" v-if="company.structure.show"></company-structure>
                </v-dialog>
            </v-flex>
        </template>

        <input-details :type="beneficialOwner" v-if="beneficialOwner.inputDetails && beneficialOwner.inputDetails.show"></input-details>
    </v-flex>
</template>

<script>
    import CompanyStructure from './structure'
    import InputDetails from './input-details'
    import ValidationMixin from '@/mixins/validation';
    import PhoneNumber from '@/components/phone-number'

    const uuidv4  = require('uuid/v4');

    export default {
        data() {
            return {
                identificationTypes: [
                    'Passport',
                    'ID card',
                    'Driving lisence'
                ],

                companyTypes: [
                    'Individual',
                    'Company',
                    'Foundation',
                    'Trust'
                ],

                involvements: [
                    'Corporate shareholder',
                    'Legal representative',
                    'Judicial representative',
                    'Nominee shareholder',
                    'Corporate director'
                ],

                loginDetailsStructure: {
                    name: '',
                    mobile: '',
                    email: ''
                },

                structureBeneficialOwner: {
                    name: null,
                    numberOfShares: 0,
                    inputDetails: {
                        firstName: null,
                        lastName: null,
                        show: false,
                    },
                    foundationOwnership: null,
                },

                beneficialOwner: {}
            }
        },

        props: ['company', 'maxNumberOfShares', 'companyName'],

        mixins: [ValidationMixin],

        mounted() {
            if(!this.company.beneficialOwners.length) {
                this.addBeneficialOwner()
            }
        },

        methods: {
            addBeneficialOwner() {
                let structure = JSON.parse(JSON.stringify(this.structureBeneficialOwner));
                structure.id = uuidv4();

                this.company.beneficialOwners.unshift(structure)
            },

            removeBeneficialOwner(index) {
                this.company.beneficialOwners.splice(index, 1)
            },

            openInputDetails(beneficialOwner) {
                beneficialOwner.inputDetails.show = true
                this.beneficialOwner = beneficialOwner
            },

            hasInvolvement(involvement) {
                return this.company.involvements.indexOf(involvement) !== -1
            },

            isNomineeShareholder() {
                return this.company.involvements.length !== 0 && this.hasInvolvement('Nominee shareholder')
            },

            isCorporateShareholder() {
                return this.company.involvements.length !== 0 && this.hasInvolvement('Corporate shareholder');
            },

            checkMaxBeneficialOwnerShares(beneficialOwner, beneficialOwnerIndex, maxNumberOfShares) {
                maxNumberOfShares = parseInt(maxNumberOfShares || 0)
                beneficialOwner.numberOfShares = parseInt(beneficialOwner.numberOfShares || 0)

                this.company.beneficialOwners.map((item, index) => {
                    if(maxNumberOfShares > 0 && beneficialOwnerIndex !== index) {
                        maxNumberOfShares -= item.numberOfShares
                    }
                })

                if(beneficialOwner.numberOfShares < 0) {
                    beneficialOwner.numberOfShares = 0
                    return 'Incorrect value'
                }

                if((beneficialOwner.numberOfShares <= maxNumberOfShares) && maxNumberOfShares >= 0) {
                    return true
                }

                return 'Max value is ' + maxNumberOfShares

            },

        },

        watch: {
            'company.involvements'() {
                if(this.isNomineeShareholder()) {
                    this.company.structure.types = []
                    if(!this.company.beneficialOwners.length) {
                        this.addBeneficialOwner()
                    }
                } else {
                    this.company.beneficialOwners = []
                }
            }
        },

        components: {
            CompanyStructure,
            InputDetails,
            PhoneNumber
        }
    }
</script>