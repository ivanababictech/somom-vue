<template>
    <v-card>
        <v-card-title>
            <h3 class="title">Vat reporting</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>

        <v-container fluid grid-list-md>
            <v-layout wrap>
                <v-flex xs6 sm4 md3>
                    <date-picker label="From" v-model="filters.date_from" full-width hide-details
                                 clearable></date-picker>
                </v-flex>
                <v-flex xs6 sm4 md3>
                    <date-picker label="To" v-model="filters.date_to" full-width hide-details clearable></date-picker>
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
            <v-layout wrap>
                <v-flex xs12 sm4 md3 v-if="type == 'triangulation-trade'">
                    <v-autocomplete
                            :items="ratings"
                            v-model="filters.rating"
                            label="Rating"
                            item-text="name"
                            item-value="value"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>
            </v-layout>

        </v-container>

        <v-container fluid grid-list-md>
            <v-tabs color="accent" grow>
                <v-tab
                        v-for="tab in tabs"
                        :key="tab.type"
                        class="black--text"
                        @click="selectType(tab)">
                    {{ tab.name }}
                </v-tab>
                <v-tab-item key="return">
                    <vat-return v-if="type == 'vat-return'" :vatReports="vatReports" :items="items"
                                @get-vat-reports="getVatReports" @get-items="getItems"></vat-return>
                </v-tab-item>
                <v-tab-item key="recap-statement">
                    <recap-statement v-if="type == 'recap-statement'" :vatReports="vatReports" :items="items"
                                     @get-vat-reports="getVatReports" @get-items="getItems"></recap-statement>
                </v-tab-item>
                <v-tab-item key="triangulation-trade">
                    <triangulation-trade v-if="type == 'triangulation-trade'" :vatReports="vatReports" :items="items"
                                         @get-vat-reports="getVatReports" @get-items="getItems"></triangulation-trade>
                </v-tab-item>
                <v-tab-item key="moss">
                    <moss v-if="type == 'moss'" :vatReports="vatReports" :items="items" @get-vat-reports="getVatReports"
                          @get-items="getItems"></moss>
                </v-tab-item>
                <v-tab-item key="margin-scheme">
                    <margin-scheme v-if="type == 'margin-scheme'" :vatReports="vatReports"
                                   @get-vat-reports="getVatReports"></margin-scheme>
                </v-tab-item>
            </v-tabs>
        </v-container>

        <div class="text-xs-center" v-if="type != 'vat-return' && vatReports.last_page > 1">
            <v-pagination :length="vatReports.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </v-card>
</template>

<script>
    import RecapStatement from "./recap-statement";
    import TriangulationTrade from "./triangulation-trade";
    import VatReturn from "./vat-return";
    import Moss from "@/app/accountings/components/reports/components/vat/moss";
    import MarginScheme from "@/app/accountings/components/reports/components/vat/margin-scheme";
    import * as vatService from './service'

    export default {
        data: () => ({
            type: 'vat-return',
            tabs: [
                {
                    name: 'Vat return',
                    type: 'vat-return',
                },
                {
                    name: 'Recap statement',
                    type: 'recap-statement',
                },
                {
                    name: 'Triangulation trade',
                    type: 'triangulation-trade',
                },
                {
                    name: 'Moss',
                    type: 'moss',
                },
                {
                    name: '2nd hand margin scheme',
                    type: 'margin-scheme',
                },
            ],
            ratings: [
                {
                    name: 'Local',
                    value: 'local',
                },
                {
                    name: 'Triangulation',
                    value: 'triangulation',
                },
                {
                    name: 'False triangulation',
                    value: 'false-triangulation',
                },
                {
                    name: 'Importation',
                    value: 'importation',
                },
                {
                    name: 'Outside EU',
                    value: 'outside-eu',
                },
                {
                    name: 'Exportation',
                    value: 'exportation',
                },
            ],
            vatReports: {
                data: [],
                totals: {}
            },
            items: {
                data: []
            },
            filters: {},
            search: '',
            currentPage: 1
        }),

        methods: {
            getVatReports(type, data = []) {
                if (type) {
                    this.type = type
                }

                vatService.getVatReports(this.type, this.getPrams(data))
                    .then(response => {
                        this.vatReports = response.data
                    })

            },

            getItems(typeId, type, data) {
                vatService.getItems(typeId, type, this.getPrams(data))
                    .then(response => {
                        this.items = response.data
                    })
            },

            selectType(tab) {
                this.resetData()
                this.type = tab.type
            },

            resetData() {
                this.items.data = []
                this.vatReports.data = []
                this.vatReports.totals = {}
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            getPrams(data = []) {
                return {
                    page: this.currentPage,
                    filters: this.filters,
                    search: this.search,
                    ...data
                }
            },

            exportReporting(format) {
                const params = {
                    format,
                    page: this.currentPage,
                    filters: this.filters
                }

                vatService.exportReport(this.type, params)
            }
        },

        watch: {
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getVatReports()
                },
                deep: true
            },
            search() {
                this.resetCurrentPage()
                this.getVatReports()
            },
            currentPage() {
                this.getVatReports()
            },
        },

        components: {MarginScheme, Moss, VatReturn, TriangulationTrade, RecapStatement},
    }
</script>