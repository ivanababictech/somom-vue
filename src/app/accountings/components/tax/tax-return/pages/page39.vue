<template>
    <div class="white title page pa-2" style="position:relative;">

        <v-layout grey lighten-2 column class="body-1">
            <v-layout row>
                <v-flex xs8>
                    <v-layout row red lighten-4 mt-1 pa-1 class="border">
                        <span class="medium">Election under Regulation 9</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row red lighten-4 mt-1 pa-1 class="border">
                <span class="medium">Amounts previously allocated to the Maltese Taxed Account Transferred to the Immovable Property Account</span>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs6 grey lighten-2></v-flex>
                <v-flex style="width: 8%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Tax Rate<br/> %</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Brought Forward</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center py-1>
                        <span class="text-xs-center">Allocated Current year</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Dividends Paid </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center"> Carried Forward</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income from participating holdings</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%"></v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%">
                    <v-layout row fill-height justify-center align-center>
                        <span>5.00</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%">
                    <v-layout row fill-height justify-center align-center>
                        <span>10.00</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%">
                    <v-layout row fill-height justify-center align-center>
                        <span>15.00</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%">
                    <v-layout row fill-height justify-center align-center>
                        <span>25.00</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%">
                    <v-layout row fill-height justify-center align-center>
                        <span>32.50</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%">
                    <v-layout row fill-height justify-center align-center>
                        <span>35.00</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 grey lighten-2 pr-2>
                    <v-layout row fill-height align-center justify-end>
                        <span>Income having suffered tax @</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%" class="border-bottom">
                    <v-layout row fill-height justify-center align-center>
                        <span>37.50</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <template v-for="i in 7">
                <v-layout row>
                    <v-flex xs6 grey lighten-2 pr-2 :class="i">
                        <v-layout row fill-height align-center justify-end>
                            <span v-if="i < 5">Income having suffered tax @</span>
                            <span v-else>Passive Interest or royalties @</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 8%">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2 border-left"
                                      :class="i < 7 && 'border-bottom'"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left" :class="i < 7 && 'border-bottom'">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 10.5%" class="border-left"></v-flex>
                    <v-flex style="width:10.5%" class="border-left" :class="i < 7 && 'border-bottom'">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-right "
                            :class="i < 7 && 'border-bottom'">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex style="width: 58%" red lighten-4 pr-2 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span>Sub Totals</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" grey lighten-2 class="border no-border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0" disabled></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 58%" grey lighten-2></v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Brought Forward</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center py-1>
                        <span class="text-xs-center">Allocated Current year</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center">Dividends Paid </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-layout row fill-height align-center justify-center>
                        <span class="text-xs-center"> Carried Forward</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 58%" grey lighten-2 pr-2 :class="i">
                    <v-layout row fill-height align-center pl-2>
                        <span>Income from participating holdings</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 58%" grey lighten-2 pr-2 :class="i">
                    <v-layout row fill-height align-center pl-2>
                        <span>Other types of foreign income</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 58%" grey lighten-2 pr-2 :class="i">
                    <v-layout row fill-height align-center pl-2>
                        <span>Income from overseas permanent establishment</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 58%" grey lighten-2 pr-2 :class="i">
                    <v-layout row fill-height align-center pl-2>
                        <span>Dividends received out of foreign income accounts</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 58%" grey lighten-2 pr-2 :class="i">
                    <v-layout row fill-height align-center pl-2>
                        <span>Passive interest or royalties</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width: 10.5%" class="border-left"></v-flex>
                <v-flex style="width:10.5%" class="border-left">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 58%" red lighten-4 pr-2 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span>Sub Totals</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" grey lighten-2 class="border no-border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0" disabled></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 58%" red lighten-4 pr-2 class="border no-border-right">
                    <v-layout row fill-height align-center justify-space-between px-2>
                        <span>Totals</span>
                        <span class="grey--text text--darken-2">Page 6</span>
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
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-space-between pa-1 pt-4>
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 62__2</span>
            </v-layout>
            <v-layout row justify-center my-2>
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

        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>