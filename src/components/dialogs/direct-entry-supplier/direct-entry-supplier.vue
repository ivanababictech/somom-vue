<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="500px" class="custom-dialog">
        <v-btn flat slot="activator">
            <v-icon v-if="icon">{{ label }}</v-icon>
            <template v-else>{{ label }}</template>
        </v-btn>
        <v-card>
            <v-card-title>
                <span v-if="supplier.id" class="headline">Edit {{ supplier.name }}</span>
                <span v-else class="headline">Add new direct entry supplier</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field label="Supplier name" v-model="supplier.name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    label="Account"
                                    :items="accounts"
                                    v-model="supplier.account_id"
                                    item-text="name"
                                    item-value="id"
                                    required
                                    dense
                            ></v-autocomplete>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <span>IC acquisition?</span>
                            <v-btn-toggle v-model="supplier.ic_acquisition" @change="icAcquisitionChange">
                                <v-btn flat :value="1">Y</v-btn>
                                <v-btn flat :value="0">N</v-btn>
                            </v-btn-toggle>
                        </v-flex>

                        <v-flex v-if="supplier.ic_acquisition == 0" xs12 sm6>
                            <span>VAT claimable?</span>
                            <v-btn-toggle v-model="supplier.vat_claimable" @change="vatClaimableChange">
                                <v-btn flat :value="1">Y</v-btn>
                                <v-btn flat :value="0">N</v-btn>
                            </v-btn-toggle>
                        </v-flex>

                        <v-flex v-if="supplier.vat_claimable" xs12 sm6>
                            <v-autocomplete
                                    label="VAT rate"
                                    :items="availableVatRates"
                                    v-model="supplier.vat_rate_id"
                                    item-text="name"
                                    item-value="id"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </v-flex>

                    </v-layout>
                </v-container>

                <small>*indicates required field</small>
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
    import {saveDirectEntrySupplier} from '@/api/accounting'
    import {mapGetters} from 'vuex'

    export default {
        name: 'DirectEntrySupplierDialog',
        componentName: 'DirectEntrySupplierDialog',
        props: {
            label: {
                type: String,
                default: 'Add direct entry supplier'
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
                default: () => ({})
            },
        },
        data() {
            return {
                dialog: false,
                supplier: Object.assign({}, this.item),
            }
        },
        computed: {
            ...mapGetters({
                accounts: 'accounting/accounts',
                vatRates: 'settings/vatRates',
            }),

            availableVatRates() {
                return this.vatRates.filter(vatRate => [1, 2, 3].indexOf(vatRate.id) !== -1)
            }
        },
        watch: {
            item(item) {
                this.supplier = Object.assign({}, item)
            }
        },
        methods: {
            icAcquisitionChange($event) {
                if ($event !== 0) {
                    if (this.supplier.vat_claimable != undefined) {
                        this.supplier.vat_claimable = null
                    }
                    if (this.supplier.vat_rate_id != undefined) {
                        this.supplier.vat_rate_id = null
                    }
                }
            },
            vatClaimableChange($event) {
                if ($event !== 1 && this.supplier.vat_rate_id) {
                    this.supplier.vat_rate_id = null
                }
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
                saveDirectEntrySupplier(this.supplier).then(({data}) => {
                    this.dialog = false
                    if (!this.supplier.id) {
                        this.reset()
                    }
                })
            }
        },
    }
</script>
