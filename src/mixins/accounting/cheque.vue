<script>
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'

    export default {
        methods: {

            allocationTypeChange(entry) {
                // reset allocation
                entry.allocation = null
                switch (entry.allocation_type) {
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        // set defaults
                        entry.invoice_no = null
                        entry.account_id = this.donationsControlAccount ? this.donationsControlAccount.id : null
                        entry.debit = null
                        entry.disabled = {invoice_no: true, debit: true}
                        break
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        entry.account_id = this.tradeReceivablesAccount.id
                        entry.debit = null
                        entry.disabled = {account_id: true}
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        entry.account_id = this.tradePayablesAccount.id
                        entry.credit = null
                        entry.disabled = {account_id: true}
                        break
                    case allocationTypeService.TYPE_PETTY_CASH:
                        entry.account_id = null
                        entry.credit = null
                        entry.disabled = {}
                        break
                    case allocationTypeService.TYPE_INTERNAL_CASH_TRANSFERS:
                        entry.account_id = null
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_INTERNAL_BANK_TRANSFERS:
                        entry.account_id = null
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_ACCOUNT_NAMES:
                        entry.account_id = null
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_PLEDGES_REVEIVED:
                        entry.account_id = this.getDefaultAccount(entry.allocation_type)
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_WAGES:
                        entry.account_id = this.getDefaultAccount(entry.allocation_type)
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_RELATED_PARTIES:
                        entry.account_id = this.getDefaultAccount(entry.allocation_type)
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    default:
                        console.warn('Invalid allocation type: ', entry.allocation_type)
                        entry.disabled = {}
                }
            },
            allocationsByType(allocation_type) {
                let allocations = []
                switch (allocation_type) {
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        allocations = this.donors.map(({name}) => name)
                        break
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        allocations = this.customers.map(({id, name}) => Object.assign({value: id, text: name}))
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        allocations = this.suppliers.map(({id, name}) => Object.assign({value: id, text: name}))
                        break
                    case allocationTypeService.TYPE_PETTY_CASH:
                    case allocationTypeService.TYPE_WAGES:
                    case allocationTypeService.TYPE_RELATED_PARTIES:
                        // none - manually typed
                        break
                    case allocationTypeService.TYPE_PLEDGES_REVEIVED:
                        allocations = this.donors.map(({id, name}) => Object.assign({value: id, text: name}))
                        break
                    default:
                        console.warn('Invalid allocationtype: ', allocation_type)
                }

                return allocations
            },
            allocationPlaceholderByType(allocation_type) {
                let placeholder = ''
                switch (allocation_type) {
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        placeholder = 'Donors control account'
                        break
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        placeholder = 'Select customer'
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        placeholder = 'Select supplier'
                        break
                    case allocationTypeService.TYPE_PETTY_CASH:
                        placeholder = 'Type supplier'
                        break
                }
                return placeholder
            },
        },
    }
</script>