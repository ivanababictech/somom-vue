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
            <v-layout row red lighten-4 mt-1 pa-1 class="border">
                <span class="medium">Allocation to the Foreign Income Account and the Maltese Taxed Account</span>
            </v-layout>

            <v-layout row mt-2>
                <v-flex style="width: 58%" red lighten-4 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span class="text-xs-center medium">FOREIGN INCOME ACCOUNT</span>
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
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income from Participating Holdings NOT subject to relief of Double Taxation</span>
                        </v-layout>
                    </v-flex>
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
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income from Participating Holdings subject to relief of Double Taxation</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Other types of foreign income not subject to relief of Double Taxatio</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Other types of foreign income subject to Treaty/Unilateral Relief</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Other types of foreign income subject to FRFTC</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income from overseas permanent establishment  <strong>not</strong> subject to relief of double taxation</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Income from overseas permanent establishment  subject to relief of double taxation</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Dividends from local sources received out of foreign income accounts <strong>NOT</strong> subject to relief of Double Taxation</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Dividends from local sources received out of foreign income accounts subject to relief of Double Taxation</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Passive interest or royalties <strong>not</strong> subject to relief of Double Taxation</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Passive Interest or royalties subject to Treaty/Unilateral Relie</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex style="width: 58%">
                        <v-layout row fill-height align-center pl-2>
                            <span>Passive interest or royalties  subject to FRFTC</span>
                        </v-layout>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
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
                <span class="title">TRA 63_1</span>
            </v-layout>

        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>