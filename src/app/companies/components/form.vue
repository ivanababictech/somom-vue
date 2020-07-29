<template>
    <div>
        <v-container fluid grid-list-md>
            <label>Company details</label>

            <v-layout row wrap>
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
                <v-flex xs6>
                    <v-menu
                            ref="startDate"
                            lazy
                            :close-on-content-click="false"
                            v-model="startDate"
                            transition="scale-transition"
                            full-width
                            :nudge-right="40"
                            min-width="290px"
                            :return-value.sync="company.details.startDate"
                    >
                        <v-text-field
                                slot="activator"
                                label="Start date"
                                v-model="company.details.startDate"
                                prepend-icon="event"
                                readonly
                        ></v-text-field>
                        <v-date-picker v-model="company.details.startDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.startDate.save(company.details.startDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6>
                    <v-menu
                            ref="endDate"
                            lazy
                            :close-on-content-click="false"
                            v-model="endDate"
                            transition="scale-transition"
                            full-width
                            :nudge-right="40"
                            min-width="290px"
                            :return-value.sync="company.details.endDate"
                    >
                        <v-text-field
                                slot="activator"
                                label="Year end date"
                                v-model="company.details.endDate"
                                prepend-icon="event"
                                readonly
                        ></v-text-field>
                        <v-date-picker v-model="company.details.endDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.endDate.save(company.details.endDate)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
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
            </v-layout>
        </v-container>

        <v-card-actions class="text-xs-right">
            <v-btn color="primary" @click="submit">Submit</v-btn>
            <v-btn v-if="company.deleted_at" color="success" @click="restore">Restore</v-btn>
        </v-card-actions>
    </div>
</template>
<script>
    import * as companyService from '../service'
    import CountryFlags from '@/components/country-flags'
    import { fetchVatCodes, fetchVatRates } from '@/api/settings'

    export default {
        data() {
            return {
                date: '',
                vatCodes: [],
                vatRates: [],
                bankers: [],
                types: [
                    'Company',
                    'Self employed',
                    'NGO',
                    'Training',
                ],
                startDate: false,
                endDate: false
            }
        },

        props: ['company'],

        computed: {
            ...mapGetters({
                activities: 'settings/company_activities',
            }),
        },

        mounted() {
            this.getBankers()
            this.getVatCodes()
            //this.getVatRates()
        },

        methods: {
            submit() {
                this.$emit('submit')
            },

            getBankers() {
                companyService.getBankers()
                    .then(response => {
                        this.bankers = response
                    })
            },

            async getVatCodes() {
                this.vatCodes = await fetchVatCodes()
            },

            async getVatRates() {
                this.vatRates = await fetchVatRates()
            },

        },

        components: { CountryFlags }
    }
</script>