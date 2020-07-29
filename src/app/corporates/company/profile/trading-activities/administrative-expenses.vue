<template>
    <supplier-section
            name="Administrative expenses"
            index="D"
            :sectionType="sectionType"
            :section="administrativeExpenses"
            totalLabel="Total expenses"
            estimatedLabel="Estimated expense"
            incurQuestion="Will the company incur administrative expenses?"
    ></supplier-section>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import SupplierSection from './components/supplier-section'

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_ADMINISTRATIVE_EXPENSES
            }
        },

        props: ['administrativeExpenses'],

        components: {SupplierSection}
    }
</script>