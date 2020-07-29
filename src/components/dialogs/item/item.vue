<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="500px" class="custom-dialog">
        <v-btn flat slot="activator">
            <v-icon v-if="icon">{{ label }}</v-icon>
            <template v-else>{{ label }}</template>
        </v-btn>
        <v-card>
            <v-card-text>
                <span v-if="!localItem.id" class="headline">Add {{ localItem.type }}</span>
                <span v-else class="headline">Edit {{ localItem.type }} #{{ localItem.id }}</span>
                <v-layout wrap>
                    <v-flex xs12 v-if="!localItem.id">
                        <v-radio-group v-model="localItem.type" row>
                            <v-radio v-if="localItem.to != 'sale'" label="Product" value="product"></v-radio>
                            <v-radio label="Service" value="service"></v-radio>
                            <v-radio label="Inventory" value="inventory"></v-radio>
                        </v-radio-group>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Code" v-model="localItem.code"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Name" v-model="localItem.name" required></v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout wrap v-if="localItem.type == 'inventory'">
                    <v-flex xs12 sm6>
                        <v-text-field label="Purchase unit price" v-model.number="localItem.purchase_price"
                                      type="number"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-autocomplete
                                label="Purchase account"
                                :items="accounts(localItem, 'purchase')"
                                v-model="localItem.purchase_account_id"
                                item-text="name"
                                item-value="id"
                                required
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Sale unit price" v-model.number="localItem.sale_price"
                                      type="number"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-autocomplete
                                label="Sale account"
                                :items="accounts(localItem, 'sale')"
                                v-model="localItem.sale_account_id"
                                item-text="name"
                                item-value="id"
                                required
                        ></v-autocomplete>
                    </v-flex>
                </v-layout>

                <v-layout wrap v-else>
                    <v-flex xs12 sm6>
                        <v-text-field label="Unit price" v-model.number="localItem.price"
                                      type="number"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-autocomplete
                                label="Account"
                                :items="accounts(localItem, 'sale')"
                                v-model="localItem.account_id"
                                item-text="name"
                                item-value="id"
                                required
                        ></v-autocomplete>
                    </v-flex>
                </v-layout>

                <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-autocomplete
                                label="VAT rate"
                                :items="vatRates"
                                v-model="localItem.vat_rate_id"
                                item-text="name"
                                item-value="id"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea label="Description" v-model="localItem.description" outline
                                    rows="3"></v-textarea>
                    </v-flex>
                </v-layout>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import {saveItem} from '@/api/accounting'
    import {mapGetters} from 'vuex'

    export default {
        name: 'ItemDialog',
        componentName: 'ItemDialog',
        props: {
            label: {
                type: String,
                default: 'Add item'
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
                localItem: Object.assign({vat_rate_id: 1}, this.item)
            }
        },
        computed: {
            ...mapGetters({
                vatRates: 'settings/vatRates',
                accounts: 'accounting/itemAccounts',
                accountById: 'accounting/accountById',
            }),
        },

        mounted() {
            this.formatPrice()
        },

        watch: {
            item(item) {
                this.localItem = Object.assign({vat_rate_id: 1}, item)
                this.formatPrice()
            }
        },
        methods: {
            reset() {
                setTimeout(() => {
                    this.localItem = Object.assign({vat_rate_id: 1}, this.item)
                    this.formatPrice()
                }, 200)
            },
            cancel() {
                this.dialog = false
                this.reset()
            },
            save() {
                saveItem(this.localItem).then(({data}) => {
                    if (data.success) {
                        this.dialog = false
                        if (!this.localItem.id) {
                            this.reset()
                        }
                    }
                })
            },

            formatPrice() {
                if(this.localItem.sale_price) {
                    this.localItem.sale_price = this.formatMoney(this.localItem.sale_price, 2, 3, '',)
                }
                if(this.localItem.purchase_price) {
                    this.localItem.purchase_price = this.formatMoney(this.localItem.purchase_price, 2, 3, '',)
                }
                if(this.localItem.unit_price) {
                    this.localItem.unit_price = this.formatMoney(this.localItem.unit_price, 2, 3, '',)
                }
                if(this.localItem.price) {
                    this.localItem.price = this.formatMoney(this.localItem.price, 2, 3, '',)
                }
            }
        }
    }
</script>
