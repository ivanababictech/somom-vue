<template>
    <div class="white title page py-1 px-3">
        <div class="grey lighten-3 pt-2">
            <v-layout row justify-space-between mb-2>
                <span>Ref:  998071806</span>
                <span>Name: ARMADA MEDIA LTD</span>
                <span>Y/A 2018</span>
            </v-layout>
            <span class="purple--text text--darken-2">B A C K&nbsp;&nbsp;&nbsp;T O&nbsp;&nbsp;&nbsp;I N D E X</span>
            <v-layout column class="border-right border-left" mt-2>
                <v-layout row>
                    <v-layout
                            align-center
                            class="border no-border-left red lighten-4 pa-1">
                        <h2 class="subheading bolder">PART 5 - DETAILS OF COMPANY SET-UP</h2>
                    </v-layout>
                    <v-flex xs3>
                        <v-text-field hide-details
                                class="white border no-border-left no-border-right input-center pt-0 mt-0 fill-height"
                                value="TA2_e-CO_2018_Ver 1.1">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-layout>
            <v-layout row class="border red lighten-4 pa-1">
                <h2 class="subheading bolder">
                    LIST OF SHAREHOLDERS, BENEFICIARIES [TRUSTS], DIVIDENDS RECEIVED AND ACCOUNT BALANCES
                </h2>
            </v-layout>
            <v-layout row class="body-1" mt-2>
                <v-flex class="border" style="width: 9%">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Tax Identification Number (TIN) of country of residence</span>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 8%">
                    <v-layout row fill-height align-center justify-center py-2>
                        <small class="text-xs-center">
                            Shareholder Registration Number  [where a Refund Registration has been made]
                        </small>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 29%">
                    <v-layout column fill-height>
                        <v-layout class="border-bottom" justify-center align-center>
                            <span class="text-xs-center">Name</span>
                        </v-layout>
                        <v-layout class="border-bottom" justify-center align-center>
                            <span class="text-xs-center">Indicate by a NO all persons who are no longer shareholders [default Yes]</span>
                        </v-layout>
                        <v-layout row>
                            <v-flex style="width: 42%" class="border-right">
                                <v-layout row fill-height align-center justify-center>
                                    <span class="text-xs-center">Surname</span>
                                </v-layout>
                            </v-flex>
                            <v-flex style="width: 42%" class="border-right">
                                <v-layout row fill-height align-center justify-center>
                                    <span class="text-xs-center">Name</span>
                                </v-layout>
                            </v-flex>
                            <v-flex style="width: 16%">
                                <v-layout row fill-height align-center justify-center>
                                    <small class="text-xs-center">Check</small>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 6%">
                    <v-layout row fill-height align-center justify-center>
                        <small class="text-xs-center">Number of Shares hold</small>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 6%">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Class of Shares</span>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 6%">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">NET DIVIDEND Final Tax Account</span>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 28%">
                    <v-layout column fill-height>
                        <v-layout class="border-bottom" justify-center align-center>
                            <span class="text-xs-center">Gross Dividends</span>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs3 class="border-right">
                                <v-layout row fill-height align-center justify-center>
                                    <span class="text-xs-center">Immovable Property Account </span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3 class="border-right">
                                <v-layout row fill-height align-center justify-center>
                                    <span class="text-xs-center">Maltese Taxed Account</span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3 class="border-right">
                                <v-layout row fill-height align-center justify-center>
                                    <span class="text-xs-center">Foreign Income Account</span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3>
                                <v-layout row fill-height align-center justify-center>
                                    <span class="text-xs-center">Untaxed Account</span>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-flex>
                <v-flex class="border no-border-left" style="width: 6%">
                    <v-layout row fill-height align-center justify-center>
                        <small class="text-xs-center">Account Balances with Company</small>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="i in 40">
                <v-layout row class="body-1">
                    <v-flex style="width: 9%">
                        <v-text-field hide-details class="pt-0 mt-0 pl-2 white border no-border-top"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 8%">
                        <v-text-field hide-details class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 29%">
                        <v-layout row>
                            <v-flex style="width: 42%">
                                <v-text-field hide-details
                                        class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                            </v-flex>
                            <v-flex style="width: 42%">
                                <v-text-field hide-details
                                        class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                            </v-flex>
                            <v-flex style="width: 16.5%">
                                <v-select
                                        :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                                        :value="true"
                                        append-icon=""
                                        class="pt-0 mt-0 border-bottom border-right no-border-left no-border-top orange lighten-4 body-1"
                                        hide-details
                                        single-line
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 6%">
                        <v-text-field hide-details class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6%">
                        <v-text-field hide-details class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6%">
                        <v-text-field hide-details class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 28%">
                        <v-layout row>
                            <v-flex xs3>
                                <v-text-field hide-details
                                        class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field hide-details
                                        class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field hide-details
                                        class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field hide-details
                                        class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 6%">
                        <v-text-field hide-details class="pt-0 mt-0 pl-2 white border no-border-top no-border-left"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex class="border no-border-top red lighten-4" style="width:46.7%">
                    <v-layout row fill-height align-center pl-2>
                        <span class="medium">TOTALS </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:6.2%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top no-border-left"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:6%"></v-flex>
                <v-flex style="width:6.2%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:7%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top no-border-left"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:7%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top no-border-left"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:7%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top no-border-left"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:7%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top no-border-left"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:6%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 input-right red lighten-4 border no-border-top no-border-left"
                                  value="0"></v-text-field>
                </v-flex>
            </v-layout>
        </div>

        <v-layout row justify-space-between mt-3>
            <span class="title">IRD - Malta</span>
            <span class="title">page 7</span>
        </v-layout>
    </div>
</template>