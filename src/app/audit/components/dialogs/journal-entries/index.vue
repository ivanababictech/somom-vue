<template>
    <v-card>

        <v-toolbar dark dense color="primary">
            <v-btn icon @click="toggleDialog('journal_entries')" dark>
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Journal entries</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <account-dialog></account-dialog>
                <v-btn dark flat @click="save" :disabled="Boolean(!validEntries.length || disableSave)">Save</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>

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

                <el-table-column label="Date" width="120">
                    <template slot-scope="scope">
                        <date-picker v-model="scope.row.date" hide-details></date-picker>
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

        <v-card-text v-if="journalEntries.length > 0">
            <h5 class="subheading grey--text text--darken-1">PAST JOURNAL ENTRIES</h5>

            <el-table
                    :data="journalEntries"
                    height="362"
                    class="form-table"
                    style="width: 100%">

                <el-table-column label="No." width="60">
                    <template slot-scope="scope">
                        <v-text-field :value="scope.row.no"
                                      @input="mutateItemField({item: scope.row, key: 'no', value: $event })"
                                      :readonly="!Boolean(scope.row.edit)" type="number" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Date" width="120">
                    <template slot-scope="scope">
                        <v-text-field :value="$helpers.formatDate(scope.row.date)"
                                      @change="mutateItemField({item: scope.row, key: 'date', value: $helpers.parseDate($event)})"
                                      :readonly="!Boolean(scope.row.edit)" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Account" width="240">
                    <template slot-scope="scope">
                        <v-autocomplete
                                :items="accounts"
                                :value="scope.row.account_id"
                                @change="mutateItemField({item: scope.row, key: 'account_id', value: $event})"
                                :disabled="!Boolean(scope.row.edit)"
                                item-text="name"
                                item-value="id"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </template>
                </el-table-column>

                <el-table-column label="description">
                    <template slot-scope="scope">
                        <v-text-field :value="scope.row.description"
                                      @input="mutateItemField({item: scope.row, key: 'description', value: $event })"
                                      :readonly="!Boolean(scope.row.edit)" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Debit" width="120">
                    <template slot-scope="scope">
                        <v-text-field :value="scope.row.debit"
                                      @input="mutateItemField({item: scope.row, key: 'debit', value: $event })"
                                      :readonly="!Boolean(scope.row.edit)" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column label="Credit" width="120">
                    <template slot-scope="scope">
                        <v-text-field :value="scope.row.credit"
                                      @input="mutateItemField({item: scope.row, key: 'credit', value: $event })"
                                      :readonly="!Boolean(scope.row.edit)" hide-details></v-text-field>
                    </template>
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="Actions"
                        width="120">
                    <template slot-scope="scope">
                        <div class="text-xs-center">
                            <v-btn v-if="!scope.row.edit" icon flat small color="primary"
                                   @click="mutateItemField({item: scope.row, key: 'edit', value: true })">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn v-else icon flat small color="primary" @click="updateJournalEntry(scope.row)">
                                <v-icon>publish</v-icon>
                            </v-btn>
                            <v-btn icon flat small color="warning" @click="deleteJournalEntry(scope.row)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </el-table-column>

            </el-table>

        </v-card-text>

    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import * as journalEntriesService from './service'

    export default {
        data: () => ({
            entries: [],
            disableSave: true,
            editJE: null,
            lastJeNo: 0,
            journalEntries: [],
        }),

        computed: {
            ...mapGetters({
                accounts: 'accounting/accounts',
            }),

            validEntries() {
                return this.entries.filter(je => je.date && je.account_id && (je.credit || je.debit))
            },
        },

        watch: {
            lastJeNo: 'setJeNo'
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

                if (debit !== credit) {
                    this.disableSave = true
                } else {
                    this.disableSave = false
                }

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
                journalEntriesService.create(this.validEntries)
                    .then(response => {
                        this.entries = []
                        this.init()
                    })
            },
        },

        mounted() {
            this.init()
        }
    }
</script>