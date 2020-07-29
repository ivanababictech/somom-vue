<template>
    <div>
        <company-details :companyDetails="companyDetails"></company-details>
        <v-layout
                row
                wrap
                v-if="company && company.data && company.data.involvements"
                v-for="(type, index) in company.data.involvements.types"
                :key="index">
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
            <v-flex xs6 class="text-xs-right">
                <v-btn
                        fab
                        dark
                        small
                        class="primary white--text"
                        @click="addType"
                        v-if="index === 0">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn
                        fab
                        dark
                        small
                        class="danger white--text"
                        v-if="involvements.types.length > 1"
                        @click="removeType(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs12>
                <transition name="fade" mode="out-in">
                    <type-individual
                            :individual="type"
                            v-if="type.value === 'individual'"
                            :maxNumberOfShares="maxNumberOfShares"
                            :companyName="involvements.companyName"
                    ></type-individual>

                    <type-company
                            :company="type"
                            v-if="type.value === 'company'"
                            :maxNumberOfShares="maxNumberOfShares"
                            :companyName="involvements.companyName"
                    ></type-company>

                    <type-foundation
                            :foundation="type"
                            v-if="type.value === 'foundation'"
                            :maxNumberOfShares="maxNumberOfShares"
                            :companyName="involvements.companyName"
                    ></type-foundation>

                    <type-trust
                            :trust="type"
                            v-if="type.value === 'trust'"
                            :maxNumberOfShares="maxNumberOfShares"
                            :companyName="involvements.companyName"
                    ></type-trust>
                </transition>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>

    import CompanyDetails from '../../../../corporates/company/mlro/company-details'
    import CompanyStructure from '../../../../corporates/company/company-structure'
    import TypeIndividual from './types/individual'
    import TypeCompany from './types/company/index'
    import TypeFoundation from './types/foundation'
    import TypeTrust from './types/trust'
    import * as companyDetailsService from './service'

    export default {
        components: {TypeIndividual, TypeCompany, TypeFoundation, TypeTrust, CompanyDetails},
        data() {
            return {
                company: {
                    data: {
                        involvements: false
                    }
                },
                companyDetails: {
                    nameOfBank: '',
                    branchName: '',
                    country: '',
                    name: '',
                    email: '',
                    shareCapital: {
                        number: '',
                        type: '',
                        class: '',
                        value: '',
                    },
                    issued: {
                        number: '',
                        type: '',
                        class: '',
                        value: '',
                    },
                },
                types: [
                    {
                        label: 'Individual',
                        value: 'individual'
                    },

                    {
                        label: 'Company',
                        value: 'company',
                    },
                    {
                        label: 'Foundation',
                        value: 'foundation'
                    },
                    {
                        label: 'Trust',
                        value: 'trust'
                    }
                ],
                typeStructure: {
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
                involvements: false,
                companyStructure: JSON.parse(JSON.stringify(CompanyStructure)),
            }
        },
        mounted() {
            this.getCompany()
        },
        methods: {
            getCompany() {
                // this.setFetching({ fetching: true })

                companyDetailsService.get()
                    .then(response => {
                        let company = response.data
                        if (company) {
                            this.company = company
                            this.updateCompanyStructure(this.companyStructure, this.company);
                            this.involvements = company.data.involvements
                            this.addType()
                        }
                        // this.setFetching({ fetching: false })
                    })
            },

            updateCompanyStructure(data, company) {
                for (let attribute in data) {
                    if (attribute == 0) {
                        break
                    }
                    this.setAttribute(company, attribute, data[attribute]);
                    this.updateCompanyStructure(data[attribute], company[attribute])
                }
            },

            setAttribute(object, key, value) {
                if (!object.hasOwnProperty(key)) {
                    this.$set(object, key, value)
                }
            },

            changedType(type, typeStructure) {
                this.resetObject(type, typeStructure)

                type.beneficiaries = []
                type.involvements = []
                type.beneficialOwners = []
            },

            addType() {
                this.involvements.types.unshift(JSON.parse(JSON.stringify(this.typeStructure)))
            },

            removeType(index) {
                this.involvements.types.splice(index, 1)
            }

        },
        computed: {
            maxNumberOfShares() {
                let maxNumberOfShares = this.involvements.issuedShares

                this.involvements.types.map(type => maxNumberOfShares -= parseInt(type.numberOfShares || 0))

                return maxNumberOfShares
            }
        },
    }
</script>