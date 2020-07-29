<template>
    <v-card>
        <v-card-title>
            <h3 class="title">Items</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>

        <v-container fluid grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm4 md3>
                    <v-autocomplete
                            :items="availableItems"
                            v-model="filters.item_id"
                            label="Item"
                            item-text="name"
                            item-value="id"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm4 md3>
                    <v-autocomplete
                            :items="[]"
                            v-model="filters.vat_rate"
                            label="Vat Rate"
                            item-text="name"
                            item-value="id"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm4 md3>
                    <v-text-field
                            label="Price"
                            v-model="filters.price"
                            hide-details
                            clearable
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md3>
                    <v-text-field
                            append-icon="search"
                            label="Search"
                            v-model="search"
                            hide-details
                            clearable
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid grid-list-md>
            <v-tabs color="accent" grow>
                <v-tab
                        v-for="tab in tabs"
                        :key="tab.type"
                        class="black--text"
                        @click="type = tab.type">
                    {{ tab.name }}
                </v-tab>
                <v-tab-item key="products">
                    <products :products="items" v-if="type === 'products'"></products>
                </v-tab-item>
                <v-tab-item key="inventories">
                    <inventories :inventories="items" v-if="type === 'inventories'"></inventories>
                </v-tab-item>
                <v-tab-item key="services">
                    <services :services="items" v-if="type === 'services'"></services>
                </v-tab-item>
                <v-tab-item key="inventory-profitability">
                    <inventory-profitability :inventories="items" v-if="type === 'inventory-profitability'"></inventory-profitability>
                </v-tab-item>
            </v-tabs>

            <div class="text-xs-center" v-if="items.last_page > 1">
                <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
            </div>
        </v-container>

    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as reportService from '../../service'
    import Products from "./products"
    import Inventories from "./inventories"
    import InventoryProfitability from "./inventory-profitability";
    import Services from "./services"

    export default {
        data: () => ({
            search: '',
            filters: {},
            currentPage: 1,
            items: {
                data: [],
            },
            tabs: [
                {
                    name: 'Products',
                    type: 'products',
                },
                {
                    name: 'Inventories',
                    type: 'inventories',
                },
                {
                    name: 'Services',
                    type: 'services',
                },
                {
                    name: 'Inventory profitability',
                    type: 'inventory-profitability',
                },
            ],
            type: 'products'
        }),

        mounted() {
            this.getItems()
        },

        computed: {
            ...mapGetters({
                suppliers: 'accounting/suppliers',
                accounts: 'accounting/accounts',
                products: 'accounting/products',
                services: 'accounting/services',
                inventories: 'accounting/inventories',
            }),

            totals() {
                let net_amount = 0
                let vat_amount = 0
                let gross_amount = 0
                let foreign = 0

                return {net_amount, vat_amount, gross_amount, foreign}
            },

            availableItems() {
                var items = [];

                switch (this.type) {
                    case 'products':
                        items = this.products
                        break;

                    case 'services':
                        items = this.services
                        break;

                    case 'inventories':
                        items = this.inventories
                        break;
                }

                return items
            }
        },

        methods: {
            itemBaseGross({qty, base_price, vat_rate}) {
                const base_net = parseFloat(base_price) * qty
                const base_vat = base_net * vat_rate / 100
                return base_net + base_vat
            },
            itemGross({qty, price, vat_rate}) {
                const net = parseFloat(price) * qty
                const vat = net * vat_rate / 100
                return net + vat
            },


            getItems() {
                this.resetItems()

                const params = {
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.getReports('items', params)
                    .then(response => {
                        this.items = response.data
                    })
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            resetItems() {
                this.items = {
                    data: [],
                }
            },

            exportReporting(format) {
                const params = {
                    format,
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.exportReport('items', params)
            }
        },

        watch: {
            currentPage: 'getItems',
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getItems()
                },
                deep: true
            },
            type: 'getItems'
        },

        components: { InventoryProfitability, Products, Services, Inventories },
    }
</script>