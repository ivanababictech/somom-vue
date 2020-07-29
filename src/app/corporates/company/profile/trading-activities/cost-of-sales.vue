<template>
    <supplier-section
            name="Cost of Sales"
            index="B"
            :sectionType="sectionType"
            :section="costOfSales"
            totalLabel="Total purchases"
            estimatedLabel="Estimated COS"
            incurQuestion="Will the company incur cost of sales?"
    ></supplier-section>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import SupplierSection from './components/supplier-section'

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_COST_OF_SALES
            }
        },

        props: ['costOfSales'],

        components: {SupplierSection}
    }
</script>