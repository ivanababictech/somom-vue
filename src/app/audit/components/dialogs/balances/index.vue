<template>
    <v-card>
        <v-toolbar dark dense color="primary">
            <v-btn icon @click="toggleDialog('balances')" dark>
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add opening balances</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click="save" :disabled="!date">Save</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>

            <date-picker label="Date" v-model="date" icon="event" clearable></date-picker>

            <v-data-table
                    :headers="headers"
                    :items="items"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems"
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
                                :items="accounts || []"
                                :value="props.item.name"
                                @input="accountChange(props.item, $event)"
                                item-text="name"
                                item-value="name"
                                hide-details
                                dense
                        ></v-combobox>
                    </td>
                    <td>
                        <v-autocomplete
                                :items="assignedAccounts"
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
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                v-model.number="props.item.debit"
                                @blur="if(props.item.debit) props.item.credit = 0"
                                type="number"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                v-model.number="props.item.credit"
                                @blur="if(props.item.credit) props.item.debit = 0"
                                type="number"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td>
                        <v-text-field
                                v-model.number="props.item.prev_year_amount"
                                type="number"
                                hide-details
                        ></v-text-field>
                    </td>
                </template>
            </v-data-table>

        </v-card-text>

    </v-card>
</template>

<script>
    import {saveAccounts} from '@/api/accounting'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as accountService from '../../accounts/service'

    export default {
        data: () => ({
            pagination: {
                rowsPerPage: 0,
            },
            rowsPerPageItems: [10, 20, 50],
            headers: [
                {text: 'Account Name', value: 'account_name', sortable: false},
                {text: 'Assigned Account', value: 'assigned_account_id', sortable: false},
                {text: 'VAT rate', value: 'balance.vat_rate_id', sortable: false},
                {text: 'Sub Account', value: 'sub_account_id', sortable: false},
                {text: 'FS title', value: 'fs_title', sortable: false},
                {text: 'Debit', value: 'debit', sortable: false},
                {text: 'Credit', value: 'credit', sortable: false},
                {text: 'Last year amount', value: 'prev_year_amount', sortable: false},
            ],
            search: '',
            date: null,
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
                accounts: 'accounting/obSuggestedAccounts',
                vatRates: 'settings/vatRates',
            }),
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            init() {
                this.pagination.rowsPerPage = 20
            },
            setItems({rowsPerPage}) {
                while (this.items.length < rowsPerPage) {
                    this.items.push({
                        id: null,
                        name: null,
                        assigned_account_id: null,
                        assigned_account: null,
                        sub_account_id: null
                    })
                }
            },
            resetForm() {
                this.items = []
                this.date = null
                this.setItems({rowsPerPage: 20})
            },
            accountChange(item, $event) {
                const props = ['id', 'name', 'assigned_account', 'assigned_account_id', 'sub_account_id', 'fs_title'];
                if (typeof $event == 'string') {
                    props.forEach(prop => {
                        if (prop == 'name') {
                            item[prop] = $event
                        } else {
                            item[prop] = null
                        }
                    })
                }
                if (typeof $event == 'object') {
                    Object.assign(item, _.pick($event, props))
                }
            },
            assignedAccountChange(item) {
                item.assigned_account_id = item.assigned_account.id
                item.sub_account_id = item.assigned_account.sub_accounts[0].id
            },
            save() {
                const date = this.date
                const accounts = this.items.reduce((filtered, item, index) => {
                    if (item.name && item.assigned_account_id && item.sub_account_id && (item.credit || item.debit)) {
                        item.date = date
                        delete item.assigned_account
                        filtered.push(item)
                    }
                    return filtered
                }, [])

                accountService.create({accounts})
                    .then(response => {
                        this.resetForm()
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
        },

        mounted() {
            setTimeout(this.init, 350)
        }
    }
</script>