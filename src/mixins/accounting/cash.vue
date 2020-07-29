<script>
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'

    export default {
        methods: {

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
                        //allocations = this.suppliers.map(({id, name}) => Object.assign({value: id, text: name}))
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
                let placeholder = null
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