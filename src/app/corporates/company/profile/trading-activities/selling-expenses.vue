<template>
    <supplier-section
            name="Selling & distribution expenses"
            index="C"
            :sectionType="sectionType"
            :section="sellingExpenses"
            totalLabel="Total expenses"
            estimatedLabel="Estimated expense"
            incurQuestion="Will the company incur selling and distribution expenses?"
    ></supplier-section>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import SupplierSection from './components/supplier-section'

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_SELLING_DISTRIBUTION
            }
        },

        props: ['sellingExpenses'],

        components: {SupplierSection}
    }
</script>