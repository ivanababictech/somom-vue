<template>
    <div class="mt-3">
        <v-tabs slider-color="accent" v-model="active">
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab">
                <finance-cost v-if="tab === 'Finance cost'"></finance-cost>
                <finance-income v-if="tab === 'Finance income'"></finance-income>
                <other-income v-if="tab === 'Other income'"></other-income>
                <other-expenses v-if="tab === 'Other expenses'"></other-expenses>
                <dividend-received v-if="tab === 'Dividend received'"></dividend-received>
                <revenue v-if="tab === 'Revenue'"></revenue>
                <direct-cost v-if="tab === 'Direct cost'"></direct-cost>
                <selling-and-distribution-expenses v-if="tab === 'Selling and distribution expenses'"></selling-and-distribution-expenses>
                <administrative-expenses v-if="tab === 'Administrative expenses'"></administrative-expenses>
                <payroll v-if="tab === 'Payroll'"></payroll>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import financeIncome from './finance-income/main.vue'
    import financeCost from './finance-cost/main.vue'
    import dividendReceived from './dividend-received/main.vue'
    import otherExpenses from './other-expenses/main.vue'
    import otherIncome from './other-income/main.vue'
    import revenue from './revenue/main.vue'
    import directCost from './direct-cost/main.vue'
    import sellingAndDistributionExpenses from './selling-and-distribution-expenses/main.vue'
    import administrativeExpenses from './administrative-expenses/main.vue'
    import payroll from './payroll/main.vue'

    export default{
        components: {
            financeIncome,
            financeCost,
            dividendReceived,
            otherExpenses,
            otherIncome,
            revenue,
            directCost,
            sellingAndDistributionExpenses,
            administrativeExpenses,
            payroll
        },
        data: () => ({
            tabs: ['Finance cost', 'Finance income', 'Other income', 'Other expenses', 'Dividend received', 'Revenue', 'Direct cost', 'Selling and distribution expenses', 'Administrative expenses', 'Payroll'],
            active: null
        })
    }
</script>