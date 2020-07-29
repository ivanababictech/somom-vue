<template>
    <v-dialog v-model="dialog" full-width max-width="600" persistent>
        <v-btn color="primary" slot="activator">Start accounting</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Start accounting</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs5>
                            <v-autocomplete
                                    :items="nonAccountedCompanies"
                                    v-model="company"
                                    item-text="name"
                                    item-value="id"
                                    label="Company"
                                    @change="newCompany = false"
                                    return-object
                                    required
                                    @input="$v.company.$touch()"
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs7>
                            <v-btn color="primary" dark slot="activator" @click="createCompany">Create</v-btn>
                        </v-flex>
                        <template v-if="true">
                            <v-flex xs6>
                                <v-autocomplete
                                        label="Select type"
                                        :items="types"
                                        v-model="company.details.type"
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs6>
                                <v-autocomplete
                                        label="Business activity"
                                        item-value="id"
                                        item-text="name"
                                        :items="activities"
                                        v-model="company.details.activity"
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field
                                        label="Company Name "
                                        v-model="company.name"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field
                                        label="Registration Number "
                                        v-model="company.registration_number"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <countries v-model="company.details.country" label="Country"></countries>
                            </v-flex>
                            <v-flex xs6>
                                <currencies v-model="company.currency" label="Business currency"></currencies>
                            </v-flex>
                            <template v-if="company.details.country == 'MT'">
                                <v-flex xs6>
                                    <v-autocomplete
                                            label="VAT ARTICLE"
                                            item-value="id"
                                            item-text="name"
                                            :items="vatCodes"
                                            v-model="company.details.vatArticle"
                                    ></v-autocomplete>
                                </v-flex>

                                <v-flex xs6>
                                    <v-layout row wrap>
                                        <country-flags :object="company.details"></country-flags>
                                        <v-flex xs11>
                                            <v-text-field
                                                    label="enter vat number"
                                                    v-model="company.details.vatNumber"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </template>
                            <v-flex xs6 >
                                <date-picker label="Start Date" v-model="company.details.startDate" full-width
                                             hide-details icon="event" clearable></date-picker>
                            </v-flex>
                            <v-flex xs6 >
                                <date-picker label="End Date" v-model="company.details.endDate" full-width
                                             hide-details icon="event" clearable></date-picker>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-container>
            </v-card-text><v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="dialog = false">Cancel</v-btn>
            <v-btn flat color="primary" :disabled="$v.$invalid" @click="startAccounting">Start</v-btn>
        </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {required} from 'vuelidate/lib/validators'
    import { http } from '@/plugins/http/index'
    import CountryFlags from '@/components/country-flags'
    import * as companyService from '@/app/companies/service'
    import { fetchVatCodes, fetchVatRates } from '@/api/settings'

    export default {
        data() {
            return {
                newCompany: false,
                dialog: false,
                nonAccountedCompanies: [],
                company: {
                    details: {}
                },
                types: [
                    'Company',
                    'Self employed',
                    'NGO',
                    'Training',
                ],
                startDate: false,
                endDate: false,
            }
        },

        validations: {
            company: {
                required
            },
        },
        computed: {
            ...mapGetters({
                activities: 'settings/company_activities',
            }),
        },

        mounted() {
            this.getNonAccountedCompanies()
            this.getVatCodes()
        },

        methods: {
            getNonAccountedCompanies() {
                companyService.getNonAccountedCompanies()
                    .then(response => this.nonAccountedCompanies = response.data)
            },

            startAccounting() {
                const {company } = this
                http.post('accountings', { company })
                    .then(({data}) => {
                        const params = { accounting_id: data.data.id }
                        this.$router.push({ name: 'AccountingNominalActivity', params })
                    })
            },

            async getVatCodes() {
                this.vatCodes = await fetchVatCodes()
            },

            async getVatRates() {
                this.vatRates = await fetchVatRates()
            },

            resetCompany() {
                this.company = {
                    details: {}
                }
            },

            createCompany() {
                this.newCompany = true
                this.resetCompany()
            }
        },

        components: { CountryFlags }
    }
</script>

<style scoped>

</style>