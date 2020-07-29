<template>

    <v-card>
        <accounting-toolbar
                title="Direct entries"
                account="empty"
                directEntrySupplier
                @toggleDialog="toggleDialog('direct_entries')"
                @saveAsDraft="saveAsDraft">
        </accounting-toolbar>

        <v-card-text class="px-3 mt-5">

            <el-table
                    :data="entries"
                    class="form-table"
                    style="width: 100%">

                <el-table-column label="From" width="180">
                    <template slot-scope="scope">
                        <v-autocomplete
                                :items="suppliers"
                                v-model.number="scope.row.supplier_id"
                                item-text="name"
                                item-value="id"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </template>
                </el-table-column>

                <el-table-column label="Date" width="180">
                    <template slot-scope="scope">
                        <date-picker v-model="scope.row.date" hide-details></date-picker>
                    </template>
                </el-table-column>

                <el-table-column label="Invoice number">
                    <template slot-scope="scope">
                        <v-text-field v-model="scope.row.invoice_no" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Description">
                    <template slot-scope="scope">
                        <v-text-field v-model="scope.row.description" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Currency">
                    <template slot-scope="scope">
                        <v-autocomplete
                                v-model="scope.row.currency"
                                :items="currencies"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </template>
                </el-table-column>

                <el-table-column label="Amount">
                    <template slot-scope="scope">
                        <v-text-field v-model.number="scope.row.amount" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Operations" fixed="right" width="110">
                    <template slot-scope="scope">
                        <div class="text-xs-center">
                            <v-btn
                                    v-if="entries.length > 1"
                                    icon
                                    flat
                                    small
                                    color="danger"
                                    @click.prevent="deleteRow(scope.$index)">
                                <v-icon>clear</v-icon>
                            </v-btn>
                            <v-btn
                                    v-if="scope.$index + 1 == entries.length"
                                    icon
                                    flat
                                    small
                                    color="primary"
                                    @click="addRow">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </el-table-column>

            </el-table>

        </v-card-text>

        <v-btn @click="save" color="primary" class="mx-3">Save</v-btn>

    </v-card>

</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {saveDirectEntries} from '@/api/accounting'
    import {http} from '@/plugins/http/index'
    import vm from '@/main'
    import * as draftService from './draftService'
    import AccountingToolbar from './components/toolbar.vue'

    export default {
        components: {
            AccountingToolbar
        },

        data: () => ({
            entries: [],
            temp: {},
        }),
        computed: {
            ...mapGetters({
                currencies: 'settings/currencies',
                baseCurrency: 'accounting/currency',
                suppliers: 'accounting/directEntrySuppliers',
            }),
        },
        watch: {
            // small hack to set default currency since the company store is not yet updated when component mounts
            baseCurrency(currency) {
                this.entries.forEach((entry, index) => {
                    if (entry.currency === null) {
                        entry.currency = currency
                    }
                })
            }
        },
        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
            init() {
                while (this.entries.length < 5) {
                    this.addRow()
                }
            },
            defaultEntry() {
                return {
                    currency: this.baseCurrency,
                }
            },
            addRow() {
                this.entries.push(this.defaultEntry())
            },
            deleteRow(index) {
                if (this.entries.length > 1) {
                    this.entries.splice(index, 1)
                }
            },
            save() {
                const url = 'accountings/' + this.$route.params.accounting_id + '/direct-entries'
                const entries = this.entries.reduce((filtered, entry) => {
                    if (entry.supplier_id && entry.date && entry.invoice_no && entry.amount) {
                        filtered.push(entry)
                    }
                    return filtered
                }, [])

                if (entries.length === 0) {
                    // show notification
                    this.$store.dispatch('snackbar/update', {
                        visible: true,
                        success: false,
                        text: 'Please fill up the form and try again.'
                    })
                    return
                }
                saveDirectEntries(entries).then(({data}) => {
                    if (data.success) {
                        this.entries = []
                        this.temp = {}
                        this.init()
                    }
                })
            },
            saveAsDraft() {
                draftService.createAsDraft(this.entries, 'direct-entries')
            }
        },

        mounted() {
            setTimeout(this.init, 350)
        },
        created() {
            draftService.getDraft('direct-entries')
                .then((response) => {
                    if (response.data) {
                        this.entries = response.data.data || []
                    }
                })
        }
    }
</script>