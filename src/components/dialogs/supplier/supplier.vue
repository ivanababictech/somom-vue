<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="600px" class="custom-dialog">
        <v-btn flat slot="activator">
            <v-icon v-if="icon">{{ label }}</v-icon>
            <template v-else>{{ label }}</template>
        </v-btn>
        <v-card>
            <v-card-title>
                <span v-if="supplier.id" class="headline">Edit supplier</span>
                <span v-else class="headline">Add new supplier</span>
            </v-card-title>
            <v-card-text>
                <v-layout wrap align-center>
                    <v-flex xs12 sm6>
                            <v-text-field label="Company/Person name" v-model="supplier.name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="Registration no/ID card" v-model="supplier.registration_no"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <countries v-model="supplier.country_code" @input="changedCountry"></countries>
                        </v-flex>
                        <v-flex xs6 v-if="checkEUCountry(supplier.country_code)">
                            <label>Supplier has VAT no.?*</label>
                            <v-btn-toggle v-model="supplier.has_vat">
                                <v-btn flat :value="true">
                                    <span>Y</span>
                                </v-btn>
                                <v-btn flat :value="false">
                                    <span>N</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-flex>
                        <v-flex xs12 v-if="supplier.has_vat">
                            <v-layout row wrap>
                                <country-flags :object="supplier"></country-flags>
                                <v-flex xs11>
                                    <v-text-field
                                            label="enter vat number"
                                            v-model="supplier.vat_no"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Display name"
                                    v-model="supplier.display_name"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-tabs light grow>
                                <v-tab class="black--text" v-for="tab in tabs" :key="tab">
                                    {{ tab }}
                                </v-tab>
                                <v-tab-item key="contactDetails">
                                    <contact-details :contactDetails="supplier.data.contactDetails"></contact-details>
                                </v-tab-item>
                                <v-tab-item key="results">
                                    <supplier-address :supplierAddress="supplier.data.supplierAddress"></supplier-address>
                                </v-tab-item>
                                <v-tab-item key="services">
                                    <relationship :relationship="supplier.data.relationship"></relationship>
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
    import {saveSupplier} from '@/api/accounting'
    import {mapGetters} from 'vuex'
    import * as supplierService from './service'
    import ContactDetails from "./contact-details"
    import SupplierAddress from "./supplier-address"
    import Relationship from "./relationship"
    import CountryFlags from '@/components/country-flags'
    import {isEUCountry, isMTVATNo, isEUVATNo} from '@/util'

    export default {
        name: 'SupplierDialog',
        componentName: 'SupplierDialog',
        props: {
            label: {
                type: String,
                default: 'Add supplier'
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
                        contactDetails: {},
                        supplierAddress: {},
                        relationship: {},
                    }
                })
            },
        },
        data() {
            return {
                dialog: false,
                supplier: Object.assign({}, this.item),
                tabs: [
                    'CONTACT  DETAILS',
                    'SUPPLIER ADDRESS',
                    'RELATIONSHIP',
                ]
            }
        },
        computed: {
            ...mapGetters({
                countries: 'settings/countries'
            }),
        },
        watch: {
            item(item) {
                this.supplier = Object.assign({}, item)
            }
        },
        methods: {
            changedCountry(value) {
                this.supplier.flag = value
            },

            reset() {
                setTimeout(() => {
                    this.supplier = Object.assign({}, this.item)
                }, 200)
            },

            cancel() {
                this.dialog = false
                this.reset()
            },

            save() {
                const {accounting_id} = this.$route.params

                if (!this.supplier.id) {
                    supplierService.create(accounting_id, this.supplier)
                        .then(response => {
                            this.dialog = false
                            this.reset()
                        })
                } else {
                    supplierService.update(accounting_id, this.supplier)
                        .then(response => {
                            this.dialog = false
                        })
                }
            },


            save() {
                saveSupplier(this.supplier).then(({data}) => {
                    if (data.success) {
                        this.dialog = false
                        if (!this.supplier.id) {
                            this.reset()
                        }
                    }
                })
            },

            checkEUCountry(countryCode) {
                if(countryCode) {
                    return isEUCountry(countryCode)
                }

                return true
            },
        },

        components: { Relationship, SupplierAddress, ContactDetails, CountryFlags },
    }
</script>
