<template>
    <div class="white title page pa-2" style="position:relative;">
        <v-layout grey lighten-2 mt-3 px-2 row justify-space-between class="subheading">
            <div class="mt-1">
                <span>Ref:  998071806</span>
                <span class="ml-5">Name: ARMADA MEDIA LTD</span>
            </div>
            <span>Y/A 2018</span>
        </v-layout>

        <v-layout grey lighten-2 px-2 column class="body-1">
            <v-layout row red lighten-4 mt-1 pa-1 class="border">
                <span class="medium">Immovable Property Account  [LN 79 of 2008 as amended by LN 247 of 2011]</span>
            </v-layout>

            <v-layout row justify-space-between align-center mt-2>
                <span class="body-1 red--text text--darken-4">Has there been an apportionment of income from the provision of accomodation or management services related thereto?</span>
                <div>
                    <v-select
                            :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                            :value="true"
                            :append-icon="''"
                            class="input-group--focused pt-0 mt-0 border orange lighten-4 fill-height px-4"
                            item-value="value"
                    ></v-select>
                </div>
            </v-layout>

            <v-layout row align-center py-2 red lighten-4 mt-1 px-1 class="border">
                <p class="subheading mb-0">
                    Election in terms of Rule 9 not to allocate distributable profits to the Maltese Taxed Account and Foreign Income Account <br/>
                    <span class="red--text text--darken-4 body-1">
                        [An election in terms of rule 9 is only made once.  It may not be renounced unless, upon being requested, the Commissioner gives his written permission.]
                    </span>
                </p>
            </v-layout>

            <v-layout row justify-space-between align-center mt-2>
                <span class="body-1 red--text text--darken-4">
                    Is the Company electing NOT to allocate distributable profits to the Maltese Taxed Account and Foreign Income Account?
                </span>
                <div>
                    <v-text-field hide-details class="pt-0 mt-0 red lighten-4 border"></v-text-field>
                </div>
            </v-layout>

            <v-layout row justify-space-between align-center>
                <span class="body-1 red--text text--darken-4">
                    Has the election been approved by the board of directors?
                </span>
                <div>
                    <v-text-field hide-details class="pt-0 mt-0 orange lighten-4 border" style="width: 100px"></v-text-field>
                </div>
                <div>
                    <v-layout align-center>
                        <span class="body-1 red--text text--darken-4">
                            Date of election
                        </span>
                        <v-text-field hide-details class="pt-0 mt-0 ml-3 white border no-border-top"></v-text-field>
                    </v-layout>
                </div>
            </v-layout>

            <v-layout row justify-end align-center>
                <div>
                    <v-layout align-center>
                        <span class="body-1 red--text text--darken-4">
                           Effective date of election
                        </span>
                        <v-text-field hide-details class="pt-0 mt-0 ml-3 white border no-border-top"></v-text-field>
                    </v-layout>
                </div>
            </v-layout>

            <v-layout row red lighten-4 mt-2 pa-1 class="border">
                <span class="medium">Movement in Reserves (to page 6)</span>
            </v-layout>

            <v-layout row align-center py-2 red lighten-4 mt-1 px-1 class="border ">
                <p class="subheading mb-0">
                    Part 1 - Profits allocated to the Immovable Property Account <br/>
                    <span class="red--text text--darken-4 body-1">
                         [First allocation of Chargeable Income AFTER TAX in terms of Rule 5]
                    </span>
                </p>
            </v-layout>
            <v-layout row mt-2>
                <v-flex xs6 grey lighten-2  class="border-left border-top"></v-flex>
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
            <v-layout row class="hide-tax-borders">
                <v-flex xs6 grey lighten-2 pr-2  class="border-left">
                    <v-layout row fill-height align-center justify-end>
                        <span>Income the tax on which is relieved by tax credits (TRA 35)</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0.00%"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <template v-for="i in 3">
                <v-layout row class="hide-tax-borders">
                    <v-flex xs6 grey lighten-2 pr-2 class="border-left">
                        <v-layout row fill-height align-center justify-end>
                            <span>  Income suffering tax at</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 8%" red lighten-4 class="border-left" :class="i < 3 && 'border-bottom'">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left" :class="i < 3 && 'border-bottom'">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-right border-left" :class="i < 3 && 'border-bottom'">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row class="hide-tax-borders">
                <v-flex style="width: 58%" red lighten-4 pr-2 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span>Sub Totals</span>
                    </v-layout>
                </v-flex>
                <template v-for="i in 3">
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </template>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row align-center justify-space-between py-2 red lighten-4 mt-1 px-1 class="border">
                <p class="medium mb-0">
                    Part 2 - Profits allocated to the Immovable Property Account <br/>
                    <span class="red--text text--darken-4 body-1">
                       [Second allocation in terms of Rule 5]
                    </span>
                </p>
                <span class="grey--text text--darken-2">TRA 62A</span>
            </v-layout>
            <v-layout row mt-2>
                <v-flex xs6 grey lighten-2  class="border-left border-top"></v-flex>
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
            <v-layout row class="hide-tax-borders">
                <v-flex xs6 grey lighten-2 pr-2  class="border-left">
                    <v-layout row fill-height align-center justify-end>
                        <span>Income the tax on which is relieved by tax credits (TRA 63)</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 8%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0.00%"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" class="border-left border-bottom">
                    <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                </v-flex>
                <v-flex style="width:10.5%" red lighten-4 class="border-left border-right border-bottom">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <template v-for="i in 3">
                <v-layout row class="hide-tax-borders">
                    <v-flex xs6 grey lighten-2 pr-2 class="border-left">
                        <v-layout row fill-height align-center justify-end>
                            <span>  Income suffering tax at</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 8%" red lighten-4 class="border-left" :class="i < 3 && 'border-bottom'">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left" :class="i < 3 && 'border-bottom'">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-right border-left" :class="i < 3 && 'border-bottom'">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row class="hide-tax-borders">
                <v-flex style="width: 58%" red lighten-4 pr-2 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span>Sub Totals</span>
                    </v-layout>
                </v-flex>
                <template v-for="i in 3">
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </template>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row align-center justify-space-between py-2 red lighten-4 mt-1 px-1 class="border">
                <p class="medium mb-0">
                    Relocation from the FTA  (e.g. COLLECTIVE INVESTMENT SCHEME)
                </p>
                <span class="grey--text text--darken-2">TRA 62A</span>
            </v-layout>
            <v-layout row mt-2 class="hide-tax-borders">
                <v-flex xs6 grey lighten-2  class="border-left border-top"></v-flex>
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
            <template v-for="i in 4">
                <v-layout row class="hide-tax-borders">
                    <v-flex xs6 grey lighten-2 pr-2 class="border-left">
                        <v-layout row fill-height align-center justify-end>
                            <span>  Income suffering tax at</span>
                        </v-layout>
                    </v-flex>
                    <v-flex style="width: 8%" red lighten-4 class="border-left" :class="i < 4 && 'border-bottom'">
                        <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                    </v-flex>
                    <template v-for="j in 3">
                        <v-flex style="width:10.5%" red lighten-4 class="border-left" :class="i < 4 && 'border-bottom'">
                            <v-text-field hide-details class="white pt-0 mt-0 input-right pr-2"></v-text-field>
                        </v-flex>
                    </template>
                    <v-flex style="width:10.5%" red lighten-4 class="border-right border-left" :class="i < 4 && 'border-bottom'">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row class="hide-tax-borders">
                <v-flex style="width: 58%" red lighten-4 pr-2 class="border no-border-right">
                    <v-layout row fill-height align-center pl-2>
                        <span>Sub Totals</span>
                    </v-layout>
                </v-flex>
                <template v-for="i in 3">
                    <v-flex style="width:10.5%" red lighten-4 class="border no-border-right">
                        <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                    </v-flex>
                </template>
                <v-flex style="width:10.5%" red lighten-4 class="border">
                    <v-text-field hide-details class="pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-space-between pa-1 pt-4>
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 62__1</span>
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
                        <span class="purple--text subheading ml-5">B A C K  &nbsp;&nbsp; T O&nbsp;&nbsp;    I N D E X</span>
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