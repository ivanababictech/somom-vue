<template>
    <v-card>
        <v-card-title>
            <date-picker label="Date" v-if="firstLockPeriod" :value="firstLockPeriod.start_date" icon="event" :disabled="true" readonly></date-picker>
            <v-spacer></v-spacer>
            <v-btn color="primary"  @click="save">Submit</v-btn>
        </v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-actions
                    class="v-form-table">

                <template slot="headers" slot-scope="props">
                    <tr>
                        <th v-for="header in props.headers" :key="header.text">
                            {{ header.text }}
                        </th>
                    </tr>
                </template>

                <template slot="items" slot-scope="props">
                    <td>
                        <v-combobox
                                :value="props.item.name"
                                @input="accountChange(props.item, $event)"
                                item-text="name"
                                item-value="name"
                                hide-details
                                :dense="true"
                        ></v-combobox>
                    </td>
                    <td>
                        <v-autocomplete
                                :items="availableAssignedAccountsList"
                                v-model="props.item.assigned_account"
                                @input="assignedAccountChange(props.item)"
                                item-text="name"
                                item-value="id"
                                return-object
                                hide-details
                                dense
                        ></v-autocomplete>
                    </td>
                    <td>
                        <v-autocomplete
                                :items="vatRates"
                                v-if="availableVarRate(props.item)"
                                v-model.number="props.item.vat_rate_id"
                                item-text="name"
                                item-value="id"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </td>
                    <td>
                        <v-autocomplete
                                :items="props.item.assigned_account ? props.item.assigned_account.sub_accounts : []"
                                v-model="props.item.sub_account_id"
                                item-text="name"
                                item-value="id"
                                no-data-text="No sub account available"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </td>
                    <td>
                        <v-text-field
                                v-model="props.item.fs_title"
                                hide-details
                                dense
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                v-model.number="props.item.debit"
                                @blur="if(props.item.debit) props.item.credit = 0"
                                :disabled="props.item.assigned_account_id == 20"
                                type="number"
                                hide-details
                                dense
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                v-model.number="props.item.credit"
                                @blur="if(props.item.credit) props.item.debit = 0"
                                :disabled="props.item.assigned_account_id == 1 || props.item.assigned_account_id == 34"
                                type="number"
                                hide-details
                                dense
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                v-model.number="props.item.prev_year_amount"
                                type="number"
                                hide-details
                                dense
                        ></v-text-field>
                    </td>
                    <td>
                        <v-btn icon flat small color="warning" @click="removeItem(props.index)">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="footer">
                    <td><strong>Total</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-xs-right"><strong>{{ totals.debit }}</strong></td>
                    <td class="text-xs-right"><strong>{{ totals.credit }}</strong></td>
                </template>
            </v-data-table>
        </v-card-text>
        <currencies :account="bankAccount"></currencies>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as balancesService from './service'
    import * as draftService from './../../draftService'
    import Currencies from "@/components/dialogs/account/currencies"

    export default {
        data: () => ({
            pagination: {
                rowsPerPage: 0,
            },
            bankAccount: {
                options: {}
            },
            headers: [
                {text: 'Account Name', value: 'account_name', sortable: false},
                {text: 'Assigned Account', value: 'assigned_account_id', sortable: false},
                {text: 'VAT rate', value: 'balance.vat_rate_id', sortable: false},
                {text: 'Sub Account', value: 'sub_account_id', sortable: false},
                {text: 'FS title', value: 'fs_title', sortable: false},
                {text: 'Debit', value: 'debit', sortable: false},
                {text: 'Credit', value: 'credit', sortable: false},
                {text: 'Last year amount', value: 'prev_year_amount', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
            search: '',
            items: []
        }),

        watch: {
            pagination: {
                handler: 'setItems',
                deep: true
            },
        },
        computed: {
            ...mapGetters({
                assignedAccounts: 'assignedAccounts',
                accounts: 'settings/accounts',
                vatRates: 'settings/vatRates',
                company: 'corporate/company',
                firstLockPeriod: 'corporate/firstLockPeriod'
            }),

            availableAccountsList() {
                return this.accounts.filter(account => !this.items.find(item => account.name === item.name))
            },

            availableAssignedAccountsList() {
                return this.assignedAccounts.filter(account => {
                    if(account.name !== 'Cheques paid control a/c') {
                        //return !this.items.filter(item => account.id === item.assigned_account_id).length > 1
                    }

                    return true
                })
            },

            availableAccounts() {
                if(!this.firstLockPeriod) {
                    return []
                }
                const date = this.firstLockPeriod.start_date

                return this.items.reduce((filtered, item, index) => {
                    if (item.name && item.assigned_account_id && item.sub_account_id && (item.credit || item.debit)) {
                        item.date = date
                        filtered.push(item)
                    }
                    return filtered
                }, [])
            },

            totals() {
                let debit = 0
                let credit = 0
                this.availableAccounts.forEach((account) => {
                    debit += account.debit || 0
                    credit += account.credit || 0
                })

                return {debit, credit}
            },
        },

        methods: {
            ...mapActions(['setMessage']),

            init() {
                this.pagination.rowsPerPage = 10
            },

            setItems({rowsPerPage}) {
                while (this.items.length < rowsPerPage) {
                    this.items.push({
                        id: null,
                        name: null,
                        assigned_account_id: null,
                        assigned_account: null,
                        sub_account_id: null,
                        fs_title: null,
                        options: {
                            opening_balance: true
                        }
                    })
                }
            },

            removeItem(index) {
                this.$delete(this.items, index)
                this.setItems({rowsPerPage: 20})
            },

            resetForm() {
                this.items = []
                this.setItems({rowsPerPage: 20})
            },


            accountChange(item, $event) {
                if (typeof $event === 'string') {
                    item.name = $event
                    item.assigned_account = null
                    item.sub_account_id = null
                }
                if (typeof $event === 'object') {
                    item.name = $event.name
                    item.assigned_account = $event.assigned_account
                    item.assigned_account_id = $event.assigned_account.id
                    let subAccounts = $event.assigned_account.sub_accounts
                    item.sub_account_id = subAccounts ? subAccounts[0].id : null
                }
            },
            assignedAccountChange(item) {
                this.bankAccount = {
                    options: {}
                }

                item.assigned_account_id = item.assigned_account.id
                item.sub_account_id = item.assigned_account.sub_accounts[0].id

                // for cash and bank account show popup with currency
                if([19, 21].indexOf(item.assigned_account_id) !== -1 && !this.bankAccount.options.banker_id) {
                    this.bankAccount = item
                    this.$set(this.bankAccount, 'isOpeningBalance', true)
                    this.$set(this.bankAccount, 'showCurrencies', true)
                    this.$set(this.bankAccount, 'currency', this.company.currency)
                }
            },
            save() {
                if(!this.isTotalValid()) {
                    return false
                }

                let accounts = this.availableAccounts


                balancesService.create({accounts})
                    .then(response => {
                        this.resetForm()
                        this.$router.push({ name: 'corporate-opening-balances' })
                    })
            },

            /**
             * Check available var rate regarding assigned account
             *
             * @param item
             * @returns {boolean}
             */
            availableVarRate(item) {
                let assignedAccounts = [12, 13, 14, 15]

                if (item.assigned_account) {
                    return assignedAccounts.indexOf(item.assigned_account.id) != -1
                }

                return false
            },


            isTotalValid() {
                let totalCorrect = this.totals.credit == this.totals.debit

                if(!totalCorrect && !this.totalIsWrong) {
                    this.totalIsWrong = true
                    this.setMessage({ type: 'error', message: 'Total credit and total debit must be the same'})

                    return false
                }

                return true
            },

            getLatestRecortds() {
                balancesService.getLatestRecords()
                    .then((response) => {
                        response.map(item => {
                            var data = item.data

                            this.items.unshift({
                                id: item.account_id,
                                name: data.name,
                                assigned_account_id: data.assigned_account_id,
                                sub_account_id: data.sub_account_id,
                                fs_title: data.fs_title,
                                options: item.account.options,
                                debit: data.debit,
                                credit: data.credit,
                                foreign_amount: this.formatMoney(item.account.transaction.transaction.foreign_amount, 2, 3, '',),
                                prev_year_amount: data.prev_year_amount,
                                assigned_account: data.assigned_account,
                            })
                        })
                    })
            }
        },

        mounted() {
            setTimeout(this.init, 350)
        },

        created() {
            draftService.getDraft('opening-balance')
                .then((response) => {
                    if(response.data) {
                        this.items = response.data.data || []
                    } else {
                        this.getLatestRecortds()
                    }
                })
        },

        components: { Currencies }
    }
</script>