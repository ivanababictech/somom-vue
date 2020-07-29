<template>
    <v-dialog v-model="dialog" full-width max-width="600" persistent>
        <v-btn color="primary" dark slot="activator">Start audit</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Start audit</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs5>
                            <v-autocomplete
                                    :items="nonAuditedCompanies"
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
                            <v-btn color="success" dark slot="activator" @click="createCompany">Create</v-btn>
                        </v-flex>
                        <template v-if="true">
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
                            <v-flex xs12>
                                <currencies v-model="company.currency" label="Business currency"></currencies>
                            </v-flex>
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
            <v-btn flat color="primary" :disabled="$v.$invalid" @click="startAudit">Start</v-btn>
        </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions } from 'vuex'
    import {required} from 'vuelidate/lib/validators'
    import { http } from '@/plugins/http/index'
    import CountryFlags from '@/components/country-flags'
    import * as companyService from '@/app/companies/service'

    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                newCompany: false,
                dialog: false,
                nonAuditedCompanies: [],
                company: {
                    details: {}
                },
                types: [
                    'Company',
                    'Self employed',
                    'NGO',
                    'Training',
                ],
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
            this.getNonAuditedCompanies()
        },

        methods: {
            ...mapActions(['setMessage']),

            getNonAuditedCompanies() {
                companyService.getNonAuditedCompanies()
                    .then(response => this.nonAuditedCompanies = response.data)
            },

            startAudit() {
                const {company } = this
                http.post('audits', { company })
                    .then(({data}) => {
                        this.setMessage({ type: 'success', message: data.data.message })

                        this.$router.push({ name: 'audit.trial-balances', params: { audit_id: data.data.id } })
                    })
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