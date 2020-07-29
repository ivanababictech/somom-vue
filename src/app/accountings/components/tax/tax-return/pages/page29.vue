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
            <v-layout row class="border">
                <v-flex xs6 class="red lighten-4">
                    <v-layout align-center justify-center fill-height>
                        <p class="medium text-xs-center mb-0">Interests [Article 4 (1)(c) ITA]</p>
                    </v-layout>
                </v-flex>
                <v-flex xs6 class="border-left red lighten-4">
                    <v-layout align-center justify-center py-1 class="border-bottom">
                        <p class="text-xs-center mb-0">Allocated</p>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs3>
                            <v-layout align-center justify-center fill-height py-1>
                                <p class="text-xs-center mb-0">Final<br/>Tax Account</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="border-left">
                            <v-layout align-center justify-center py-1>
                                <p class="text-xs-center mb-0">Immovable <br/>Property<br/> Account</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="border-left">
                            <v-layout align-center justify-center py-1>
                                <p class="text-xs-center mb-0">Maltese <br/>Taxed<br/> Account</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="border-left">
                            <v-layout align-center justify-center py-1>
                                <p class="text-xs-center mb-0">Foreign <br/>Income<br/> Account</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 class="orange lighten-4 border-left border-bottom" py-2></v-flex>
                <v-flex xs6 class="grey lighten-2 border-right">
                    <v-layout row>
                        <v-flex xs3 >
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex xs3 v-for="i in 3" :key="i" class="border-bottom border-left">

                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Gross Interest NOT subject to 15% Final Withholding tax</p>
                    </v-layout>
                </v-flex>
                <v-flex xs6 class="grey lighten-2 border-right">
                    <v-layout row>
                        <v-flex xs3 v-for="i in 3" :key="i" >
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                        <v-flex xs3 class="border-bottom border-left">
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Grossed up element for Flat rate foreign tax credit</p>
                    </v-layout>
                </v-flex>
                <v-flex xs6 class="grey lighten-2 border-right">
                    <v-layout row>
                        <v-flex xs3 v-for="i in 3" :key="i" class="border-bottom"></v-flex>
                        <v-flex xs3>
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6 class="grey lighten-2">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Gross Interest Received</p>
                    </v-layout>
                </v-flex>
                <v-flex xs6 class="red lighten-4 border-right">
                    <v-layout row>
                        <v-flex xs3 v-for="i in 4" :key="i">
                            <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pl-2 input-right pr-2 border no-border-top no-border-right" value="0"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 class="grey lighten-2">
                    <v-layout align-center pl-2 py-1 fill-height class="border-bottom border-left">
                        <p class="mb-0">Less direct expenses [Details required]</p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="i in 8">
                <v-layout row class="border-right">
                    <v-flex xs6 class="grey lighten-2">
                        <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="grey lighten-2">
                        <v-layout row>
                            <v-flex xs3 v-for="i in 4" :key="i">
                                <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row class="border-right">
                <v-flex xs6 class="red lighten-4">
                    <v-layout align-center pl-2 fill-height class="border-bottom border-left">
                        <p class="mb-0">Interest income after deducting direct expense</p>
                    </v-layout>
                </v-flex>
                <v-flex xs6 class="grey lighten-2">
                    <v-layout row>
                        <v-flex xs3 v-for="i in 4" :key="i">
                            <v-text-field hide-details class="pt-0 mt-0 white pl-2 input-right pr-2 border no-border-top no-border-right"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <div class="pt-5 grey lighten-2">
                <span class="medium grey--text">Final Withholding Tax on Investment Income</span>
            </div>
            <div class="pt-2 grey lighten-2">
                <span class="medium grey--text">Transfer to the Final Tax Account</span>
            </div>
            <v-layout row justify-space-between pa-1 pt-4 class="grey lighten-2">
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 09</span>
            </v-layout>
        </v-layout>
        <v-layout row justify-center mt-2>
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