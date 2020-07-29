<template>
    <div class="white title page pa-2" style="position:relative;">
        <v-layout mt-3 pl-1 grey lighten-2 row justify-space-between class="border subheading">
            <div>
                <span>Ref:  998071806</span>
                <span class="ml-5">Name: ARMADA MEDIA LTD</span>
            </div>
            <span>Y/A 2018</span>
        </v-layout>
        <v-layout column class="body-1">
            <v-layout row>
                <v-flex xs12 pr-1 pl-2 class="border red lighten-4">
                    <span class="title">ITA - DIVIDENDS</span>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 pr-1 pt-1 pl-2 class="border red lighten-4">
                    <span class="body-2">Details of Dividends received</span>
                </v-flex>
            </v-layout>
            <v-layout row class="border red lighten-4">
                <v-flex style="width: 6.8%">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">IT No. / <br/>R.O.C. No.</p>
                    </v-layout>
                </v-flex>
                <v-flex xs3 class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="mb-0">
                            Paying Company
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left">
                    <v-layout align-center justify-center py-1 class="border-bottom">
                        <p class="text-xs-center mb-0">Gross Dividend</p>
                    </v-layout>
                    <v-layout row>
                        <v-flex style="width: 20%" py-3>
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Final Tax<br/>Account</p>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Immovable<br/>Property<br/>Account</p>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Maltese<br/>Taxed A/c</p>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Foreign<br/>Income<br/>A/c</p>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Untaxed<br/>A/c</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 27.2%" class="border-left">
                    <v-layout align-center justify-center py-1 class="border-bottom">
                        <p class="text-xs-center mb-0">Tax Deducted</p>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs3 py-3>
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Malta tax<br/>paid</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">DTR</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">FRFTC</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">W'hlding<br/> tax</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            Net<br/> Dividend
                        </p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="i in 20">
                <v-layout row class="hide-tax-borders border no-border-top red lighten-4">
                    <v-flex style="width: 6.9%">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex xs3 class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 white pr-2 input-right"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 white pr-2 input-right"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pr-2 input-right" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex style="width: 32.1%" class="red lighten-4 border no-border-top">
                    <v-layout align-center fill-height justify-center>
                        <span>Totals ></span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border no-border-left no-border-top input-right pr-2"
                                  value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 38.8%" class="red lighten-4 border no-border-right no-border-top">
                    <v-layout align-center fill-height justify-center>
                        <span class="body-2 text-xs-center">Dividends the tax on which is relieved by Tax Credits</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="red lighten-4 border-left border-bottom">
                    <v-layout align-center fill-height justify-center>
                        <span class="body-2">IPA</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="red lighten-4 border-left border-bottom">
                    <v-layout align-center fill-height justify-center>
                        <span class="body-2">MTA</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="red lighten-4 border-left border-bottom py-1">
                    <v-layout align-center fill-height justify-center>
                        <span class="body-2">Tax Credit</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
            </v-layout>
            <template v-for="i in 3">
                <v-layout row class="hide-tax-borders">
                    <v-flex style="width: 6.9%" class="border no-border-top no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex xs3 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="grey lighten-2 border-left"
                            :class="i === 3 && 'border-bottom'"></v-flex>
                    <v-flex style="width: 6.8%" class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left grey lighten-2"></v-flex>
                    <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                    <v-flex style="width: 6.8%" class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 grey lighten-4 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left grey lighten-2"></v-flex>
                    <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                    <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                    <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                </v-layout>
            </template>
            <v-layout row>

                <v-flex style="width: 31.9%" class="red lighten-4 border no-border-top no-border-right">
                    <v-layout align-center fill-height justify-center>
                        <span>Totals ></span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2 border-bottom border-left">
                    <v-layout fill-height align-center justify-center>
                        <u>TRA 35</u>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left border-bottom hide-tax-borders">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left border-bottom hide-tax-borders">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2">
                    <v-layout fill-height align-center justify-center>
                        <u>TRA 35</u>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left border-bottom hide-tax-borders">
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 6.8%" class="border-left grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
                <v-flex style="width: 6.8%" class="grey lighten-2"></v-flex>
            </v-layout>
            <div class="py-2 grey lighten-2" style="width: 100%"></div>
            <v-layout row class="border">
                <v-flex style="width: 32%" class="red lighten-4">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">ITA - Dividends</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left red lighten-4">
                    <v-layout align-center justify-center py-1 class="border-bottom">
                        <p class="text-xs-center mb-0">Allocated</p>
                    </v-layout>
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Final Tax<br/>Account</p>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 60%" class="border-left">
                            <v-layout class="border-bottom" justify-center py-1>
                                <p class="text-xs-center mb-0">Tax computation <br/> [page 4 of tax return]</p>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-layout align-center justify-center fill-height py-1>
                                        <p class="text-xs-center mb-0">Final Tax<br/>Account</p>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs4>
                                    <v-layout align-center justify-center fill-height class="border-left" py-1>
                                        <p class="text-xs-center mb-0">Maltese<br/>Taxed<br/> Account</p>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs4 class="border-left">
                                    <v-layout align-center justify-center fill-height>
                                        <p class="text-xs-center mb-0">Foreign<br/>Income A/c</p>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left">
                            <v-layout align-center justify-center fill-height>
                                <p class="text-xs-center mb-0">Untaxed<br/>A/c<br/>[page 3 of <br/> the tax <br/>return]
                                </p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                    <v-layout fill-height align-center py-1>
                        <p class="subheading bolder text-xs-center mb-0 red--text text--darken-4">
                            ALL DIVIDENDS RECEIVED EITHER FROM THE FINAL TAX ACCOUNT OF ANOTHER COMPANY OR FROM A PROPERTY TRANSFER RESERVE ARE TO BE ALLOCATED TO THE FINAL TAX ACCOUNT.
                            Dividends from the FTA of another company have to be reported net of tax.
                        </p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Gross Dividends Received</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="red lighten-4">
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Grossed up element for Flat rate foreign tax credit</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                    <v-layout row>
                        <v-flex style="width: 20%" class="border-left border-bottom"></v-flex>
                        <v-flex style="width: 20%" class="border-bottom"></v-flex>
                        <v-flex style="width: 20%" class="border-bottom"></v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left border-bottom"></v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Gross Dividends Received</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="red lighten-4">
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Less direct expenses [Details required]</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                    <v-layout row>
                        <v-flex style="width: 20%" class="border-left border-bottom"></v-flex>
                        <v-flex style="width: 20%" class="border-bottom"></v-flex>
                        <v-flex style="width: 20%" class="border-bottom"></v-flex>
                        <v-flex style="width: 20%" class="border-bottom pt-2 pb-3"></v-flex>
                        <v-flex style="width: 20%" class="border-bottom"></v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Interest paid / payable</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                        <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                    </v-flex>
                        <v-flex style="width: 20%">
                        <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                    </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                </v-flex>
            </v-layout>
            <template v-for="i in 5">
                <v-layout row>
                    <v-flex style="width: 32%" class="grey lighten-2">
                        <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 34%" class="grey lighten-2">
                        <v-layout row>
                            <v-flex style="width: 20%">
                                <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                            </v-flex>
                            <v-flex style="width: 20%">
                                <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                            </v-flex>
                            <v-flex style="width: 20%">
                                <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                            </v-flex>
                            <v-flex style="width: 20%">
                                <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                            </v-flex>
                            <v-flex style="width: 20%">
                                <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 34%" class="border-left grey lighten-2">
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex style="width: 32%" class="red lighten-4">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Dividend income after deducting direct expenses</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="border-left grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height>
                        <p class="mb-0">Foreign tax paid where Article 12(1)(u) applies</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left"></v-flex>
                        <v-flex style="width: 20%"></v-flex>
                        <v-flex style="width: 20%"></v-flex>
                        <v-flex style="width: 20%"></v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 32%" class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height>
                        <p class="mb-0">Dividend Income allocated to the Final Tax Account</p>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 20%" class="border-left">
                            <v-layout fill-height justify-center align-center>
                                TRA 18
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%"></v-flex>
                        <v-flex style="width: 20%"></v-flex>
                        <v-flex style="width: 20%"></v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 34%" class="grey lighten-2">
                </v-flex>
            </v-layout>
            <v-layout row justify-space-between pa-1 pt-3 class="grey lighten-2">
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 08</span>
            </v-layout>
        </v-layout>
        <v-layout row justify-center>
            <div>
                <v-layout row align-center>
                    <span class="red--text text--darken-4 body-1">IS ATTACHMENT COMPLETE [Y or N] ?</span>
                    <v-select
                            :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                            :value="true"
                            :append-icon="''"
                            class="input-group--focused pt-0 mt-0 border orange lighten-4 fill-height ml-3 px-4"
                            item-value="value"
                    ></v-select>
                </v-layout>
            </div>
        </v-layout>
        <div class="mt-4">
            <span class="purple--text body-1">B A C K  &nbsp;&nbsp; T O&nbsp;&nbsp;    I N D E X</span>

        </div>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>