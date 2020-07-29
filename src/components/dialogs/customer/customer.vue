<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="600px" class="custom-dialog">
        <v-btn flat slot="activator">
            <v-icon v-if="icon">{{ label }}</v-icon>
            <template v-else>{{ label }}</template>
        </v-btn>
        <v-card>
            <v-card-title>
                <span v-if="customer.id" class="headline">Edit customer</span>
                <span v-else class="headline">Add new customer</span>
            </v-card-title>
            <v-card-text>
                <v-layout wrap align-center>
                    <v-flex xs12 sm6>
                        <v-text-field label="Company/Person name" v-model="customer.name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Company reg. no." v-model="customer.id_no"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <countries v-model="customer.country_code" @input="changedCountry"></countries>
                    </v-flex>
                    <v-flex xs6 v-if="checkEUCountry(customer.country_code)">
                        <label>Customer has VAT no.?*</label>
                        <v-btn-toggle v-model="customer.has_vat">
                            <v-btn flat :value="true">
                                <span>Y</span>
                            </v-btn>
                            <v-btn flat :value="false">
                                <span>N</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                    <v-flex xs12 v-if="customer.has_vat">
                        <v-layout row wrap>
                            <country-flags :object="customer"></country-flags>
                            <v-flex xs11>
                                <v-text-field
                                        label="enter vat number"
                                        v-model="customer.vat_no"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-tabs light grow>
                            <v-tab class="black--text" v-for="tab in tabs" :key="tab">
                                {{ tab }}
                            </v-tab>
                            <v-tab-item key="contactDetails">
                                <contact-details :contact-details="customer.data.contactDetails" :customer-id="customer.id"></contact-details>
                            </v-tab-item>
                            <v-tab-item key="results">
                                <client-address :client-address="customer.data.clientAddress" :customer-id="customer.id"></client-address>
                            </v-tab-item>
                            <v-tab-item key="services">
                                <relationship :relationship="customer.data.relationship"></relationship>
                            </v-tab-item>
                        </v-tabs>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn color="primary" flat @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as customerService from './service'
    import ContactDetails from "./contact-details"
    import ClientAddress from "./client-address"
    import Relationship from "./relationship"
    import CountryFlags from '@/components/country-flags'
    import {isEUCountry, isMTVATNo, isEUVATNo} from '@/util'

    export default {
        name: 'CustomerDialog',
        componentName: 'CustomerDialog',
        props: {
            label: {
                type: String,
                default: 'Add customer'
            },
            icon: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            flat: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                default: () => ({
                    data: {
                        contactDetails: {
                            person: null,
                            email: null,
                            position: null,
                            number: null
                        },
                        clientAddress: {
                            doorName: null,
                            streetName: null,
                            city: null,
                            zip: null
                        },
                        relationship: {},
                    }
                })
            },
        },
        data() {
            return {
                dialog: false,
                customer: Object.assign({}, this.item),
                tabs: [
                    'CONTACT DETAILS',
                    'CLIENT ADDRESS',
                    'RELATIONSHIP',
                ]
            }
        },
        computed: {
            ...mapGetters({
                countries: 'settings/countries',
            }),
        },
        // watch: {
        //     item(item) {
        //         this.customer = Object.assign({}, item)
        //     }
        // },
        methods: {
            changedCountry(value) {
                this.customer.flag = value
            },

            reset() {
                setTimeout(() => {
                    this.customer = Object.assign({}, this.item)
                }, 200)
            },

            cancel() {
                this.dialog = false
                this.reset()
            },

            save() {
                const {accounting_id} = this.$route.params

                if (!this.customer.id) {
                    customerService.create(accounting_id, this.customer)
                        .then(response => {
                            this.dialog = false
                            this.reset()
                        })
                } else {
                    customerService.update(accounting_id, this.customer)
                        .then(response => this.dialog = false)
                }
            },

            checkEUCountry(countryCode) {
                return countryCode ? isEUCountry(countryCode) : true
            },
        },

        watch: {
            'customer.has_vat'() {
                if(!this.customer.has_vat) this.customer.vat_no = null
            }
        },

        components: {Relationship, ClientAddress, ContactDetails, CountryFlags},
    }
</script>
