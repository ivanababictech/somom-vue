<template>
    <div class="section4 grey lighten-2 pa-2">
        <cm-header></cm-header>

        <cm-step step="Section 4"></cm-step>
        <cm-pink text="DETAILS OF CLAIMS AND DIVIDENDS RECEIVED"></cm-pink>

        <v-layout row align-center justify-space-between mt-2>
            <v-layout row class="border-big red lighten-4 pl-1 py-1">
                <h2 class="title uppercase">PROFITS DERIVED BY A former itc (new regime treatment as 1st january
                    2011)</h2>
            </v-layout>
        </v-layout>

        <v-layout row align-center justify-space-between mt-2>
            <v-layout row class="border-big red lighten-4 pl-1 py-1">
                <h2 class="title uppercase">Distribution of Profits (euro currency)</h2>
            </v-layout>
        </v-layout>

        <cm-distribution-table></cm-distribution-table>

        <v-flex xs4 mt-5 ml-5>
            <v-layout row class="border red lighten-4 pl-1 py-1 text-xs-center">
                <h2 class="subheading bolder">Analysis of Distribution from Profits relating to YA 2007 or
                    earlier</h2>
            </v-layout>
            <cm-analysis-table></cm-analysis-table>
        </v-flex>

        <cm-footer step="Section 4"></cm-footer>
    </div>
</template>

<script>
    import DistributionTable from '../tables/DistributionTable'
    import AnalysisTable from '../tables/AnalysisTable'
    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
        components: {
            'cm-distribution-table': DistributionTable,
            'cm-analysis-table': AnalysisTable,
        }
    }
</script>