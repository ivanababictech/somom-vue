<template>
    <div>
        <v-layout row mt-2>
            <v-flex xs2 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Type of <br/>Security</span>
                </v-layout>
            </v-flex>
            <v-flex xs1 class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Class</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Number of <br/>Securities<br/>ISSUED</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Fixed Dividends<br/> (Net Amount after <br/>tax</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Do these Shares<br/> Qualify for <br/>Ordinary <br/>Dividend?</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">% Entitlement to <br/>Profits after <br/>Fixed Dividend</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <template v-for="item in items">
            <v-layout row>
                <v-flex xs2 class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs1 class="border red lighten-4 no-border-right">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border red lighten-4 no-border-right">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center" type="number" v-model="item.number_issued"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center" type="number" v-model="item.dividends"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center" type="number" v-model="item.percentage"></v-text-field>
                </v-flex>
            </v-layout>
        </template>
        <v-layout row>
            <v-flex xs3 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Totals</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2" v-html="totals('items', 'number_issued')"></span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2" v-html="totals('items', 'dividends')"></span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border no-border-right red lighten-4"></v-flex>
            <v-flex xs2 class="border red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                            <span class="body-2">
                                {{ averagePercentage('items', 'percentage') | twoDecimals }}%
                            </span>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Calculable from '../mixins/calculable'

    export default {
        name: "capital-structure-table",
        mixins: [Calculable],
        data () {
            return {
                items: [

                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    },
                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    },
                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    },
                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    },
                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    },
                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    },
                    {
                        number_issued: '',
                        dividends: '',
                        percentage: ''
                    }
                ]
            }
        }
    }
</script>