<template>
    <v-layout row wrap>
        <revenue :revenue="trading.revenue"></revenue>
        <cost-of-sales :costOfSales="trading.costOfSales"></cost-of-sales>
        <selling-expenses :sellingExpenses="trading.sellingExpenses"></selling-expenses>
        <administrative-expenses :administrativeExpenses="trading.administrativeExpenses"></administrative-expenses>
        <payroll :payroll="trading.payroll"></payroll>
    </v-layout>
</template>

<script>
    import Revenue from './revenue';
    import Payroll from './payroll';
    import CostOfSales from './cost-of-sales'
    import SellingExpenses from './selling-expenses'
    import AdministrativeExpenses from './administrative-expenses'

    export default {
        props: ['trading',],

        components: { Revenue, CostOfSales, SellingExpenses, AdministrativeExpenses, Payroll }
    }
</script>