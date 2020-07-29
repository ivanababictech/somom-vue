<script>
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import * as bankService from '@/app/accountings/components/dialogs/banks/service'

    export default {
        methods: {

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
                        allocations = this.chequeEntries.filter(cheque => cheque.type == 'cheque_paid' && cheque.account_id == this.account.options.cheque_account_id).map((cheque) => {
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
        },
    }
</script>