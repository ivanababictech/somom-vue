<template>
    <div class="white title page pa-2" style="position:relative;">

        <v-layout mt-3 px-2 grey lighten-2 row justify-space-between class="subheading">
            <div class="mt-1">
                <span>Ref:  998071806</span>
                <span class="ml-5">Name: ARMADA MEDIA LTD</span>
            </div>
            <span>Y/A 2018</span>
        </v-layout>

        <v-layout grey lighten-2 pt-5 column class="body-1">

            <v-layout row mt-2>
                <v-flex style="width: 58%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span class="text-xs-center medium">MALTESE TAXED ACCOUNT</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Brought Forward</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:21%" red lighten-4 class="border no-border-right">
                    <v-layout row align-center justify-center py-1 class="border-bottom">
                        <span class="text-xs-center">CURRENT YEAR</span>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6 py-3>
                            <v-layout row fill-height align-center justify-center>
                                <span class="text-xs-center">Allocated</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6 class="border-left">
                            <v-layout row fill-height align-center justify-center>
                                <span class="text-xs-center">Dividends Paid </span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center"> Carried Forward</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout column class="border-left border-right hide-tax-borders">
                <v-layout row pt-2>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income from participating holdings</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 23%"></v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border no-border-right">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>5.00</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>10.00</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>15.00</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>25.00</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>32.50</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>35.00</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income having suffered tax @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-layout row fill-height align-center justify-center>
                            <span>37.50</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row fill-height align-center pl-2>
                            <span>%</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="i in 3">
                        <v-flex style="width:10.5%" class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 25%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Taxed Income relieved by Tax Credits</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 5%">
                        <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border input-center mini-input"
                                      value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 18%">
                        <v-layout row justify-space-between fill-height align-center px-2>
                            <span>%</span>
                            <u class="grey--text">TRA 35</u>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width:10.5%" class="border-left border-bottom">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" class="border-left border-bottom">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <template v-for="i in 7">
                    <v-layout row>
                        <v-flex style="width: 10%"></v-flex>
                        <v-flex style="width: 25%">
                            <v-layout row fill-height align-center pl-2>
                                <span>Income having suffered tax @</span>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 5%">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2 border mini-input"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 18%">
                            <v-layout row fill-height align-center pl-2>
                                <span>%</span>
                            </v-layout>
                        </v-flex>
                        <template v-for="i in 3">
                            <v-flex style="width:10.5%" class="border-left border-bottom">
                                <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                            </v-flex>
                        </template>
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
                <template v-for="i in 3">
                    <v-layout row>
                        <v-flex style="width: 10%"></v-flex>
                        <v-flex style="width: 25%">
                            <v-layout row fill-height align-center pl-2>
                                <span>Passive Interest or royalties @</span>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 5%">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2 border mini-input"></v-text-field>
                        </v-flex>
                        <v-flex style="width: 18%">
                            <v-layout row fill-height align-center pl-2>
                                <span>%</span>
                            </v-layout>
                        </v-flex>
                        <template v-for="i in 3">
                            <v-flex style="width:10.5%" class="border-left border-bottom">
                                <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                            </v-flex>
                        </template>
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
                <v-layout row>
                    <v-flex style="width: 10%"></v-flex>
                    <v-flex style="width: 48%">
                        <v-layout row fill-height align-center pl-2>
                            <span class="subheading bolder red--text text--darken-2">Taxed Income relieved by Tax Credits relocated to the IPA</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width:10.5%"></v-flex>
                    <v-flex style="width:10.5%" class="border-left border-bottom">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" class="border-left"></v-flex>
                    <v-flex style="width:10.5%"></v-flex>
                </v-layout>
                <v-layout row mt-4>
                    <v-flex style="width: 58%" red lighten-4 pr-2 class="border-bottom border-top">
                        <v-layout row fill-height align-center justify-space-between px-2>
                            <span class="medium">Totals [to page 6 of the tax return]</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>

            </v-layout>


            <v-layout row justify-space-between pa-1 pt-4>
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 63_2</span>
            </v-layout>

            <v-layout row justify-center mt-2>
                <div>
                    <v-layout row align-center>
                        <span class="red--text text--darken-4 subheading">IS ATTACHMENT COMPLETE [Y or N] ?</span>
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

            <v-layout justify-center my-2>
                <span class="purple--text subheading">B A C K  &nbsp;&nbsp; T O&nbsp;&nbsp;    I N D E X</span>
            </v-layout>
        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>