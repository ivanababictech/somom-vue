<template>
    <div class="white title page py-3 px-5">
        <v-layout row justify-space-between>
            <span>IRD - Malta</span>
            <span>11</span>
        </v-layout>
        <v-layout mt-3 pl-3 row justify-space-between>
            <span>Ref:  998071806</span>
            <span>Name: ARMADA MEDIA LTD</span>
            <span>Y/A 2018</span>
        </v-layout>
        <v-layout column pl-3 mt-3>
            <v-layout row>
                <v-flex xs7 pr-1 class="border red lighten-4 text-xs-right">
                    <span class="subheading">INCOME STATEMENT FOR THE YEAR ENDED 2017 </span>
                </v-flex>
                <v-flex xs1 class="border no-border-left orange lighten-4"></v-flex>
                <v-flex xs2 class="border no-border-left orange lighten-4"></v-flex>
                <v-flex xs2 pl-1 class="border no-border-left red lighten-4">
                    <span class="subheading">2017</span>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top" red lighten-4>
                    <span class="body-1">NAME OF THE OPERATING ESTABLISHMENT</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center" red lighten-4>
                    <span class="body-1">4500</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2 border-bottom" >
                    <v-layout fill-height justify-center align-center>
                        <span class="body-1 red--text">Descriptions!</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Transfer to the Incentives and Benefits Reserve [BPA]</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">7507</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Transfer to Other Reserve(s)</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">7508</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1 blue--text">RETAINED EARNINGS CARRIED FORWARD</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1 blue--text">7600</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2">

                    <v-layout fill-height justify-center align-center>
                        <span class="red--text body-1">Mandatory</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1"></span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1"></span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="grey lighten-3 border no-border-top no-border-left pt-0 mt-0 pr-2 input-right" value="0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-4>
                <v-flex xs7 pl-1>
                    <span class="body-1">VALIDATION</span>
                </v-flex>
                <v-flex xs5></v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 pl-1 class="border red lighten-4">
                    <span class="body-2 purple--text text--darken-2">All mandatory fields present?</span>
                </v-flex>
                <v-flex xs2>
                    <v-select
                            :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                            :value="true"
                            append-icon=""
                            class="pt-0 mt-0 border no-border-left red lighten-4 blue--text fill-height px-4"
                            hide-details
                            single-line
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 pl-1 class="border no-border-top red lighten-4">
                    <span class="body-2 blue--text">Total revenue - total expenses = net income before tax?</span>
                </v-flex>
                <v-flex xs2>
                    <v-select
                            :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                            :value="true"
                            append-icon=""
                            class="pt-0 mt-0 border no-border-top no-border-left red lighten-4 blue--text fill-height px-4"
                            hide-details
                            single-line
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 pl-1 class="border no-border-top red lighten-4">
                    <span class="body-2 blue--text">TIFD 7600 = TIFD 3905 [Balance Sheet]?</span>
                </v-flex>
                <v-flex xs2>
                    <v-select
                            :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                            :value="true"
                            append-icon=""
                            class="pt-0 mt-0 border no-border-top no-border-left red lighten-4 blue--text fill-height px-4"
                            hide-details
                            single-line
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8 pl-1 class="border no-border-top red lighten-4">
                    <span class="body-2 purple--text text--darken-2">All descriptions present?</span>
                </v-flex>
                <v-flex xs2>
                    <v-select
                            :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                            :value="true"
                            append-icon=""
                            class="pt-0 mt-0 border no-border-top no-border-left red lighten-4 blue--text fill-height px-4"
                            hide-details
                            single-line
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                </v-flex>
            </v-layout>
        </v-layout>
    </div>
</template>