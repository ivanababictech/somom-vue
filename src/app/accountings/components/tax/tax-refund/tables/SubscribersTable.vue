<template>
    <div>
        <v-layout row mt-2>
            <v-flex  class="border no-border-right red lighten-4" style="width: 11%">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Type of <br/>Security</span>
                </v-layout>
            </v-flex>
            <v-flex xs4  class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Name of Shareholder</span>
                </v-layout>
            </v-flex>
            <v-flex  class="border red lighten-4 no-border-right" style="width: 11%">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Entitlement to <br/>Fixed Dividend<br/>(Net Dividend)</span>
                </v-layout>
            </v-flex>
            <v-flex  class="border no-border-right red lighten-4" style="width: 11%">
                <v-layout row align-center justify-center fill-height class="text-xs-center" >
                    <span class="body-2">No of Shares</span>
                </v-layout>
            </v-flex>
            <v-flex  class="border no-border-right red lighten-4" style="width: 11%">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">% Entitlement</span>
                </v-layout>
            </v-flex>
            <v-flex  class="border red lighten-4" style="width: 22%">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Is this SH waiving his <br/> right to dividend?</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <template v-for="item in items">
            <v-layout row>
                <v-flex style="width: 11%" class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs4 class="border red lighten-4 no-border-right">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex style="width: 11%" class="border red lighten-4 no-border-right">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center" type="number" v-model="item.dividend"></v-text-field>
                </v-flex>
                <v-flex style="width: 11%" class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center" type="number" v-model="item.no_shares"></v-text-field>
                </v-flex>
                <v-flex style="width: 11%" class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center" type="number" v-model="item.entitlement"></v-text-field>
                </v-flex>
                <v-flex style="width: 22%" class="border red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
            </v-layout>
        </template>
        <v-layout row>
            <v-flex style="width: 44.33333333%" class="border no-border-right red lighten-4">
                <v-layout row align-center fill-height pl-2>
                    <span class="body-2">Totals</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 11%" class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2" v-html="totals('items', 'dividend')"></span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 11%" class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2" v-html="totals('items', 'no_shares')"></span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 11%" class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                            <span class="body-2">
                                {{ averagePercentage('items', 'entitlement') | twoDecimals }}%
                            </span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 22%" class="border red lighten-4"></v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Calculable from '../mixins/calculable'
    export default {
        name: "subscribers-table",
        mixins: [Calculable],
        data () {
            return {
                items: [
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                    {
                        dividend: '',
                        no_shares: '',
                        entitlement: '',
                    },
                ],
            }
        }
    }
</script>

<style scoped>

</style>