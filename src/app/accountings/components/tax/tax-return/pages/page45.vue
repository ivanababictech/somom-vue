<template>
    <div class="white title page pa-2" style="position:relative;">

        <v-layout grey lighten-2 column class="body-1">
            <v-layout row red lighten-4 mt-1 pa-1 class="border">
                <p class="mb-0">
                    <span class="headline bolder">ITA - Article 31D </span> <br/>
                    <span class="medium">Rental income subject to Final Witholding Tax</span>
                </p>
            </v-layout>

            <v-layout row justify-space-between align-center mt-2 px-2>
                <span class="subheading bolder">Please indicate the number of residential tenements and commercial properties </span>
                <div>
                    <v-text-field hide-details class="white pt-0 mt-0 border"></v-text-field>
                </div>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 9%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span class="bolder">Property <br/> type</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:16%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span class="bolder">Number and name <br/> of property</span>
                    </v-layout>
                </v-flex>
                <v-flex xs6 red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span class="bolder">Street</span>
                    </v-layout>
                </v-flex>

                <v-flex style="width:16%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span class="bolder">Council</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 9%" red lighten-4 class="border">
                    <v-layout row fill-height align-center justify-center>
                        <span class="bolder text-xs-center">Gross<br/>Annual<br/>Rental<br/>Income</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="i in 30">
                <v-layout row  class="hide-tax-borders ">
                    <v-flex style="width: 9%" class="border-left border-bottom">
                        <v-text-field hide-details class="orange lighten-4 pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width:16%" class="border-left border-bottom">
                        <v-text-field hide-details class="white pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="border-left border-bottom">
                        <v-text-field hide-details class="white pt-0 mt-0"></v-text-field>
                    </v-flex>

                    <v-flex style="width:16%" class="border-left border-bottom">
                        <v-text-field hide-details class="white pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 9%" class="border no-border-top">
                        <v-text-field hide-details class="white pt-0 mt-0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>

            <v-layout row>
                <v-flex style="width: 91%" red lighten-4 pr-2 class="border-left border-bottom">
                    <v-layout row fill-height align-center justify-space-between px-2>
                        <span class="bolder">Gross Rental Income subject to tax at 15%</span>
                        <span class="grey--text text--darken-2">TRA 60</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:9%" red lighten-4 class="hide-tax-borders border no-border-top">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 91%" red lighten-4 pr-2 class="border ">
                    <v-layout row fill-height align-center justify-space-between px-2>
                        <span class="bolder">Total tax - 15% of Gross Rental Income </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:9%" class="hide-tax-borders border no-border-left">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2 white"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-4>
                <v-flex style="width: 91%" red lighten-4 pr-2 class="border">
                    <v-layout row fill-height align-center justify-space-between px-2>
                        <span class="bolder">Transfer to the Final Tax Account</span>
                        <span class="grey--text text--darken-2">TRA 61</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:9%" red lighten-4 class="hide-tax-borders border no-border-left">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 91%">
                    <v-layout row fill-height align-center justify-space-between pl-2>
                        <span class="bolder">Have all conditions been satisfied, the TA24 form submitted and the 15% Tax paid by the due date?</span>
                        <div>
                            <v-text-field hide-details class="pt-0 mt-0 input-right pr-2 orange lighten-4 border"></v-text-field>
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 9%" ></v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 91%">
                    <v-layout row align-center justify-end>
                        <span class="red--text text--darken-4 subheading">IS ATTACHMENT COMPLETE [Y or N] ?</span>
                        <div class="ml-2">
                            <v-select
                                    :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                                    :value="true"
                                    :append-icon="''"
                                    class="input-group--focused pt-0 mt-0 border orange lighten-4 fill-height px-4"
                                    item-value="value"
                            ></v-select>
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 9%"></v-flex>
            </v-layout>

        </v-layout>

        <v-layout row justify-space-between pa-1 pt-4>
            <span class="title">IRD - Malta</span>
            <span class="title">TA2_e-CO_2018_Ver 1.1</span>
            <span class="title">TRA 83</span>
        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>