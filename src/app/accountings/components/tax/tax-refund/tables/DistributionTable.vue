<template>
    <div>
        <v-layout row mt-2 class="distribution-table">
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>Date of <br/> Distribution</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>Year's profits <br/> out of which <br/> distribution <br/> was made <br/> [Y/A]</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>Taxed <br/> Account</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>GROSS <br/> DIVIDEND</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>MALTA TAX <br/> PAID</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>RELIEVED <br/> FOREIGN <br/> TAX (NOT <br/> FRFTC)</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>FRFTC</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>NET <br/> DIVIDEND</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 17.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>Income Tax Managament Act <br/> (Article under which refund is <br/> being Claimed)</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>REFUND <br/>(FRACTION)</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 15%" class="border pink lighten-3">
                <v-layout column fill-height>
                    <v-layout row align-center justify-center class="text-xs-center border-bottom">
                        <span>REFUND</span>
                    </v-layout>
                    <v-layout row align-center justify-center class="text-xs-center" style="align-items: stretch">
                        <v-flex xs6 class="border-right">
                            <v-layout fill-height justify-center align-center>
                                <span>FIA</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout fill-height justify-center align-center>
                                <span>MTA</span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row class="distribution-table" v-for="(item, i) in items" :key="i">
            <v-flex style="width: 7.5%" class="border no-border-right">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-right pr-2" type="number"
                              v-model="item.gross_dividend"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-right pr-2" type="number"
                              v-model="item.malta_tax_paid"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-right pr-2" type="number"
                              v-model="item.foreign_tax"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-right pr-2" type="number"
                              v-model="item.frftc"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-right pr-2" type="number"
                              v-model="item.net_dividend"></v-text-field>
            </v-flex>
            <v-flex style="width: 17.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
            </v-flex>
            <v-flex style="width: 15%" class="border pink lighten-3">
                <v-layout row align-center justify-center class="text-xs-center">
                    <v-flex xs6 class="border-right">
                        <v-text-field
                                hide-details
                                class="mt-0 pt-0 no-border input-right pr-2"
                                type="number"
                                v-model="item.fia">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                class="mt-0 pt-0 no-border input-right pr-2"
                                type="number"
                                v-model="item.mta">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row class="distribution-table">
            <v-flex style="width: 22.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center pl-2 fill-height class="text-xs-center">
                    <span>Totals</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>{{ totals('items', 'gross_dividend') }}</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>{{ totals('items', 'malta_tax_paid') }}</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>{{ totals('items', 'foreign_tax') }}</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>{{ totals('items', 'frftc') }}</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span>{{ totals('items', 'net_dividend') }}</span>
                </v-layout>
            </v-flex>
            <v-flex style="width: 17.5%" class="border no-border-right pink lighten-3"></v-flex>
            <v-flex style="width: 7.5%" class="border no-border-right pink lighten-3"></v-flex>
            <v-flex style="width: 15%" class="border pink lighten-3">
                <v-layout row align-center fill-height justify-center class="text-xs-center" style="align-items: stretch">
                    <v-flex xs6 py-2  class="border-right">
                        <v-layout fill-height justify-center align-center>
                            <span>{{ totals('items', 'fia') }}</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 py-2>
                        <v-layout fill-height justify-center align-center>
                            <span>{{ totals('items', 'mta') }}</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Calculable from '../mixins/calculable'
    export default {
        mixins: [Calculable],
        data () {
            return {
                items: [
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    },
                    {
                        gross_dividend: null,
                        malta_tax_paid: null,
                        foreign_tax: null,
                        frftc: null,
                        net_dividend: null,
                        fia: null,
                        mta: null,
                    }
                ]
            }
        }
    }
</script>

<style>
    .distribution-table span {
        font-size: 0.8rem !important;
        font-weight: 500;
    }
</style>