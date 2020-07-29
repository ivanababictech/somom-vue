<template>
    <div>
        <v-dialog v-model="display" max-width="1024px" persistent>
            <v-card>
                <v-card-title>
                    <v-layout row justify-space-between align-center>
                        <span v-if="editItem">EDIT RULE</span>
                        <span v-else>CREATE NEW RULE</span>
                    </v-layout>
                </v-card-title>
                <v-card-text>

                    <v-layout row v-if="editItem">
                        <v-flex xs5>
                            <v-combobox
                                    v-model="editItem.keywords"
                                    :items="[]"
                                    label="Keyword(s)"
                                    chips
                                    multiple
                                    deletable-chips
                            ></v-combobox>
                        </v-flex>
                        <v-flex xs3 mx-2>
                            <v-autocomplete
                                    :items="allocationTypes"
                                    v-model="editItem.allocation_type"
                                    label="Allocation type"
                                    @change="editItem.allocation = null"
                                    bottom
                                    hide-details
                                    clearable
                                    dense
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs3 mr-2>
                            <template v-if="editItem.allocation_type">
                                <v-text-field v-if="isAllocationTypeChequePayment(editItem.allocation_type) === 34"
                                              v-model.number="editItem.allocation"
                                              type="number"
                                              placeholder="input cheque no"
                                              hide-details
                                ></v-text-field>
                                <v-autocomplete v-else
                                                :items="allocationsByType(editItem.allocation_type)"
                                                :placeholder="allocationPlaceholderByType(editItem.allocation_type)"
                                                v-model="editItem.allocation"
                                                :multiple="allocationIsMultiple(editItem.allocation_type)"
                                                @change="selectedAllocation(editItem, $event)"
                                                return-object
                                                hide-details
                                                :append-icon="isAllocationTypeChequePayment(editItem.allocation_type) ? 'info' : 'arrow_drop_down'"
                                                @click:append="() => openInfo(editItem)"
                                                dense
                                ></v-autocomplete>
                            </template>
                        </v-flex>
                    </v-layout>
                    <v-layout row v-else v-for="(r, i) in rules" :key="i">
                        <v-flex xs5>
                            <v-combobox
                                    v-model="r.keywords"
                                    :items="[]"
                                    label="Keyword(s)"
                                    chips
                                    multiple
                                    deletable-chips
                            ></v-combobox>
                        </v-flex>
                        <v-flex xs3 mx-2>
                            <v-autocomplete
                                    :items="allocationTypes"
                                    v-model="r.allocation_type"
                                    label="Allocation type"
                                    @change="r.allocation = null"
                                    bottom
                                    hide-details
                                    clearable
                                    dense
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs3 mr-2>
                            <template v-if="r.allocation_type">
                                <v-text-field v-if="isAllocationTypeChequePayment(r.allocation_type) === 34"
                                              v-model.number="r.allocation"
                                              type="number"
                                              placeholder="input cheque no"
                                              hide-details
                                ></v-text-field>
                                <v-autocomplete v-else
                                                :items="allocationsByType(r.allocation_type)"
                                                :placeholder="allocationPlaceholderByType(r.allocation_type)"
                                                :multiple="allocationIsMultiple(r.allocation_type)"
                                                @change="selectedAllocation(r, $event)"
                                                return-object
                                                hide-details
                                                @click:append="isAllocationTypeChequePayment(r.allocation_type) ? 'info' : 'arrow_drop_down'"
                                                :append-icon-cb="() => openInfo(r)"
                                                dense
                                ></v-autocomplete>
                            </template>
                        </v-flex>
                        <v-icon color="green" large @click="addRow">add</v-icon>
                        <v-icon color="red" large @click="removeRow(i)" v-if="rules.length > 1">close</v-icon>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat @click.stop="$parent.newRuleDialog = false">Close</v-btn>
                    <v-layout justify-end>
                        <v-btn color="green" @click.stop="save" v-if="!editItem">Save</v-btn>
                        <v-btn color="green" @click.stop="update" v-if="editItem">Update</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {fetchBankAllocationTypes} from '@/api/settings'
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import * as bankService from '@/app/accountings/components/dialogs/banks/service.js'
    import {fetchLatestBankEntry, saveAccount, updateAccountOptions, fetchChequeEntries} from '@/api/accounting'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: ['editItem'],
        data() {
            return {
                rules: [],
                cheque: null,
                display: true
            }
        },
        computed: {
            ...mapGetters({
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                directEntrySuppliers: 'accounting/directEntrySuppliers',
                accounts: 'accounting/accounts',
                bankAccounts: 'accounting/bankAccounts',
                chequeAccounts: 'accounting/chequeAccounts',
                cashAccounts: 'accounting/cashAccounts',
                loanAccounts: 'accounting/loanAccounts',
                donationAccounts: 'accounting/donationAccounts'
            }),
        },
        created() {
            // if (this.editItem) {
            //     this.editItem.allocation = this.editItem.allocation_id
            // }
            this.addRow()
        },
        methods: {
            addRow() {
                let rule = {
                    keywords: null,
                    allocation_type: null,
                    allocation: null,
                    allocation_id: null
                }
                this.rules.push(rule)
            },
            removeRow(index) {
                this.rules.splice(index, 1)
            },
            save() {
                this.$emit('save', this.rules)
            },
            update() {
                this.$emit('update')
            },
            isAllocationTypeChequePayment(allocationType) {
                return allocationType === allocationTypeService.TYPE_CHEQUES_PAYMENT
            },
            allocationsByType(allocation_type) {
                let allocations = []

                switch (allocation_type) {
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        allocations = this.customers.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        allocations = this.suppliers.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_DIRECT_ENTRIES:
                        allocations = this.directEntrySuppliers.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_INTERNAL_BANK_TRANSFERS:
                        allocations = this.otherBankAccounts.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_INTERNAL_CASH_TRANSFERS:
                        allocations = this.cashAccounts.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        allocations = this.donationAccounts.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_ACCOUNT_NAMES:
                        allocations = this.accounts.map(({id, name}) => {
                            return {value: id, text: name}
                        })
                        break
                    case allocationTypeService.TYPE_CHEQUES_PAYMENT:
                        allocations = this.chequeEntries.filter(cheque => cheque.type == 'cheque_paid').map((cheque) => {
                            cheque.value = cheque.id
                            cheque.text = 'Cheque no. ' + cheque.data.cheque_number + ' - ' + cheque.currency + ' ' + this.formatMoney(cheque.amount)
                            return cheque
                        })
                        break
                    case allocationTypeService.TYPE_CHEQUES_RECEIVED:
                        allocations = this.chequeEntries.filter(cheque => cheque.type == 'cheque_received').map((cheque) => {
                            cheque.value = cheque.id
                            cheque.text = 'Cheque no. ' + cheque.data.cheque_number + ' - ' + cheque.currency + ' ' + this.formatMoney(cheque.amount)
                            return cheque
                        })
                        break
                }

                return allocations
            },
            allocationPlaceholderByType(allocation_type) {
                let placeholder = 'Select '
                switch (allocation_type) {
                    case bankService.ALLOCATION_TYPE_CUSTOMERS_PAYMENT:
                        placeholder += ' customer'
                        break
                    case bankService.ALLOCATION_TYPE_SUPPLIERS_PAYMENT:
                        placeholder += 'supplier'
                        break
                    case bankService.ALLOCATION_TYPE_DIRECT_ENTRIES:
                        placeholder += 'direct entry supplier'
                        break
                    case bankService.ALLOCATION_TYPE_INTERNAL_BANK_TRANSFERS:
                        placeholder += 'bank account'
                        break
                    case bankService.ALLOCATION_TYPE_INTERNAL_CASH_TRANSFERS:
                        placeholder += 'cash account'
                        break
                    case bankService.ALLOCATION_TYPE_PLEDGES_REVEIVED:
                        placeholder += 'donation account'
                        break
                    case bankService.ALLOCATION_TYPE_ACCOUNT_NAMES:
                        placeholder += 'account'
                        break
                }
                return placeholder
            },
            allocationIsMultiple(allocationType) {
                return [allocationTypeService.TYPE_CHEQUES_RECEIVED].indexOf(allocationType) !== -1
            },
            selectedAllocation(item, allocation) {
                this.$set(item, 'data', {})

                if (item.allocation_type === allocationTypeService.TYPE_CHEQUES_PAYMENT) {
                    item.allocation_id = allocation.account.id
                    item.allocation = allocation.text
                } else if (item.allocation_type === allocationTypeService.TYPE_CHEQUES_RECEIVED) {
                    item.allocation = allocation.map(cheque => {
                        return 'Cheque no. ' + cheque.data.cheque_number + ' - ' + cheque.currency + ' ' + this.formatMoney(cheque.amount)
                    })
                } else {
                    item.allocation = allocation ? allocation.text : ''
                    item.allocation_id = allocation ? allocation.value : ''
                }
            },
            openInfo(item) {
                this.cheque = this.chequeEntries.find(cheque => cheque.id === item.allocation_id)
                if (this.cheque) {
                    this.$set(this.cheque, 'showInfo', true)
                }
            },
        },
        asyncComputed: {
            chequeEntries: {
                default: [],
                get: () => fetchChequeEntries({reconciliation: 'purchase'}),
            },
            allocationTypes: {
                default: [],
                get: () => fetchBankAllocationTypes(),
            },
        }
    }
</script>