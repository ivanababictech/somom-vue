<template>
    <v-container fluid grid-list-md>
        <v-layout row>
            <v-flex s12>
                Nature of person requesting the company
                <v-btn
                        color="primary"
                        @click="company.involvements.natureOfPerson = 'owner'">Ultimate beneficial Owner
                </v-btn>
                <v-btn
                        :color="company.involvements.natureOfPerson === 'agent' ? 'info' : ''"
                        @click="company.involvements.natureOfPerson = 'agent'">Agent
                </v-btn>
                <v-btn
                        :color="company.involvements.natureOfPerson === 'other' ? 'info' : ''"
                        @click="company.involvements.natureOfPerson = 'other'"
                        active-class="true">Other
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="company.involvements.nameOfPerson"
                        label="Name of person requesting the company"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="company.involvements.idCardNumber"
                        label="ID card/passport number "
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout
                row
                align-center
                v-if="company.involvements.natureOfPerson === 'agent' || company.involvements.natureOfPerson === 'other'">
            <v-flex xs12 md6>
                Are you authorised to set up the company on behalf of the Ultimate beneficial owner/s?
            </v-flex>

            <v-flex xs12 md6>
                <v-btn-toggle v-model="company.involvements.authorised">
                    <v-btn flat :value="true">
                        <span>Y</span>
                    </v-btn>
                    <v-btn flat :value="false">
                        <span>N</span>
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs6 md4>
                <v-text-field
                        v-model="company.involvements.companyName"
                        label="Proposed company name"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 md4>
                <v-text-field
                        v-model="company.involvements.issuedShares"
                        label="Company issued shares"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-btn
                fixed
                dark
                fab
                bottom
                right
                color="primary"
                @click="addType"
        >
            <v-icon>add</v-icon>
        </v-btn>


        <v-card row wrap v-for="(type, index) in bindTypes" :key="index" elevation-6>
            <v-toolbar dense color="primary" dark>
                <v-btn icon
                       @click="removeType(index)"
                       v-if="company.involvements.types.length > 1"
                >
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ getLabel(type.value) }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="addType(type.value)"><v-icon>add</v-icon></v-btn>
            </v-toolbar>
            <v-container fluid my-3>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-select
                            item-text="label"
                            item-value="value"
                            :items="types"
                            @change="changedType(type, typeStructure)"
                            v-model="type.value"
                            label="Select type"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <transition name="fade" mode="out-in">
                            <type-individual
                                :individual="type"
                                v-if="type.value === 'individual'"
                                :maxNumberOfShares="maxNumberOfShares"
                                :companyName="company.involvements.companyName"
                            ></type-individual>

                            <type-company
                                :company="type"
                                v-if="type.value === 'company'"
                                :maxNumberOfShares="maxNumberOfShares"
                                :companyName="company.involvements.companyName"
                            ></type-company>

                            <type-foundation
                                :foundation="type"
                                v-if="type.value == 'foundation'"
                                :maxNumberOfShares="maxNumberOfShares"
                                :companyName="company.involvements.companyName"
                            ></type-foundation>

                            <type-trust
                                :trust="type"
                                v-if="type.value == 'trust'"
                                :maxNumberOfShares="maxNumberOfShares"
                                :companyName="company.involvements.companyName"
                            ></type-trust>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    import {cloneDeep} from 'lodash';

    import TypeIndividual from './types/individual'
    import TypeCompany from './types/company/index'
    import TypeFoundation from './types/foundation'
    import TypeTrust from './types/trust'

    const uuidv4  = require('uuid/v4');

    export default {

        data() {
            return {
                typeStructure: {
                    id: uuidv4(),
                    name: '',
                    label: '',
                    value: '',
                    types: [],
                    structure: {
                        types: [],
                    },
                    beneficiaries: [],
                    beneficialOwners: [],
                    address: {},
                    involvements: []
                },
                types: [
                    {
                        label: 'Individual',
                        value: 'individual',
                    },

                    {
                        label: 'Company',
                        value: 'company',
                    },
                    {
                        label: 'Foundation',
                        value: 'foundation',
                    },
                    {
                        label: 'Trust',
                        value: 'trust',
                    }
                ],
                bindTypes: this.company.involvements.types
            }
        },

        props: ['company'],

        mounted() {
            this.init()
        },

        methods: {
            init() {
                if (!this.company.involvements.types.length) {
                    this.addType()
                }
            },

            addType(type) {
                this.typeStructure.id = uuidv4();
                let typeStructure = JSON.parse(JSON.stringify(this.typeStructure));

                if(type) {
                    typeStructure.type = type
                }

                this.company.involvements.types.unshift(typeStructure)
            },

            removeType(index) {
                this.company.involvements.types.splice(index, 1)
            },


            changedType(type, typeStructure) {
                // this.resetObject(type, typeStructure)
                //
                // type.beneficiaries = []
                // type.involvements = []
                // type.beneficialOwners = []

            },

            getLabel(type) {
                const item = this.types.find(item => item.value === type)
                if(item) {
                    return item.label
                }

                return 'Please select the type'
            },
        },

        computed: {
            maxNumberOfShares() {
                let maxNumberOfShares = this.company.involvements.issuedShares

                this.company.involvements.types.map(type => maxNumberOfShares -= parseInt(type.numberOfShares || 0))

                return maxNumberOfShares
            }
        },

        components: {TypeIndividual, TypeCompany, TypeFoundation, TypeTrust}
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }
</style>