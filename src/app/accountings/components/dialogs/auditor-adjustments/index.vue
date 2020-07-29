<template>
    <v-card>
        <accounting-toolbar
                title="Auditor Adjustments"
                :disabled="Boolean(!validEntries.length || disableSave)"
                @toggleDialog="toggleDialog('auditor_adjustments')"
                saveNormal
                @save="save">
        </accounting-toolbar>

        <v-card-text v-if="!viewAdjustments" class="mt-5">
            <date-picker label="Date" :value="lockPeriod.end_date" icon="event" :disabled="true" readonly></date-picker>
            <el-table
                    :data="entries"
                    :summary-method="getTotals"
                    show-summary
                    height="410"
                    class="form-table"
                    :class="disableSave ? 'has-error' : ''"
                    style="width: 100%">

                <el-table-column label="No." width="60">
                    <template slot-scope="scope">
                        <v-text-field v-model.number="scope.row.no" @input="jeNoChanged(scope.$index, $event)"
                                      type="number" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Account" width="240">
                    <template slot-scope="scope">
                        <v-autocomplete
                                :items="accounts"
                                v-model="scope.row.account_id"
                                item-text="name"
                                item-value="id"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </template>
                </el-table-column>

                <el-table-column label="description">
                    <template slot-scope="scope">
                        <v-text-field v-model="scope.row.description" @blur="descriptionChanged(scope.row)"
                                      hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Debit" width="120">
                    <template slot-scope="scope">
                        <v-text-field v-model.number="scope.row.debit" @blur="if(scope.row.debit) scope.row.credit = 0"
                                      hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Credit" width="120">
                    <template slot-scope="scope">
                        <v-text-field v-model.number="scope.row.credit" @blur="if(scope.row.credit) scope.row.debit = 0"
                                      hide-details></v-text-field>
                    </template>
                </el-table-column>

            </el-table>

        </v-card-text>

        <v-card-text class="mt-5" v-else>
            <h5 class="subheading grey--text text--darken-1">Past Auditor Adjustments</h5>

            <v-data-table
                    :headers="headers"
                    :items="auditorAdjustments.data"
                    class="elevation-5"
                    :hide-actions="true"
                    :disable-initial-sort="true"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.account.name }}</td>
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>{{ formatMoney(props.item.accounts[0].pivot.credit) }}</td>
                    <td>{{ formatMoney(props.item.accounts[0].pivot.debit) }}</td>
                </template>
            </v-data-table>
            <div class="text-xs-center" v-if="auditorAdjustments.last_page > 1">
                <v-pagination :length="auditorAdjustments.last_page" v-model="currentPage"
                              :total-visible="7"></v-pagination>
            </div>

        </v-card-text>

    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import * as auditorAdjustmentsService from './service'
    import * as lockPeriodService from '../../lock-periods/service'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        components: {AccountingToolbar},
        data: () => ({
            entries: [],
            disableSave: true,
            editJE: null,
            lastJeNo: 0,
            auditorAdjustments: {
                data: []
            },
            headers: [
                {text: 'Id', align: 'left', value: 'id'},
                {text: 'Account', value: 'account'},
                {text: 'Date', value: 'date'},
                {text: 'Description', value: 'description'},
                {text: 'Credit', value: 'credit'},
                {text: 'Debit', value: 'debit', sortable: false}
            ],
            currentPage: 1,
        }),

        props: ['lockPeriod', 'viewAdjustments'],

        computed: {
            ...mapGetters({
                accounts: 'accounting/accounts',
            }),

            validEntries() {
                return this.entries.filter(je => je.account_id && (je.credit || je.debit))
            },
        },

        watch: {
            lastJeNo: 'setJeNo',
            currentPage: 'getAuditorAdjustments'
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),
            init() {
                let no = this.lastJeNo
                while (this.entries.length < 10) {
                    if (this.entries.length % 2 == 0) {
                        no++;
                    }
                    this.entries.push({no})
                }


                if (this.viewAdjustments) {
                    this.getAuditorAdjustments()
                }

            },

            getAuditorAdjustments() {
                var params = {
                    page: this.currentPage
                }

                lockPeriodService.getAuditorAdjustments(this.lockPeriod.id, params)
                    .then(response => {
                        this.auditorAdjustments = response.data
                    })
            },

            setJeNo(no) {
                this.entries = this.entries.map((item, index) => {
                    if (index % 2 == 0) {
                        no++;
                    }
                    item.no = no
                    return item
                })
            },
            jeNoChanged(key, value) {
                /*if (key > 0) {
                 key--
                 }*/
                const x = key % 2
                this.entries = this.entries.map((item, index) => {
                    if (index > key) {
                        if (index % 2 == x) {
                            value++
                        }
                        item.no = value
                    }
                    return item
                })
            },
            descriptionChanged({no, description}) {
                this.entries = this.entries.map(item => {
                    if (item.no == no & !item.description) {
                        item.description = description
                    }
                    return item
                })
            },
            getTotals() {
                const sums = ['Totals'];
                let debit = 0
                let credit = 0

                this.entries.forEach(item => {
                    if (item.debit) {
                        debit += Number(item.debit)
                    }
                    if (item.credit) {
                        credit += Number(item.credit)
                    }
                })

                this.disableSave = debit !== credit


                sums[4] = debit
                sums[5] = credit

                if (debit < credit) {
                    sums[4] += ' [-' + (credit - debit) + ']'
                }
                if (credit < debit) {
                    sums[5] += ' [-' + (debit - credit) + ']'
                }
                return sums;
            },
            update(je) {
                this.updateJE(je).then(() => {
                    this.$set(je, 'edit', false)
                })
            },
            save() {
                lockPeriodService.storeAuditorAdjustments(this.lockPeriod.id, this.validEntries)
                    .then(response => {
                        this.entries = []
                        this.init()
                    })

                /*auditorAdjustmentsService.create(this.validEntries)
                 .then(response => {
                 this.entries = []
                 this.init()
                 })*/
            },
        },

        mounted() {
            this.init()
        }
    }
</script>