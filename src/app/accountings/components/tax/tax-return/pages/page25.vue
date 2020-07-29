<template>
    <div class="white title hide-tax-borders page pa-2" style="position:relative;">
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
                    <span class="title"
                          style="font-weight: 400">Capital Allowances Schedule - INCOME TAX ACT CAP 12</span>
                </v-flex>
            </v-layout>
            <v-layout row class="border red lighten-4">
                <v-flex xs3 py-3 px-1>
                    <v-layout align-center justify-center fill-height>
                        <p class="mb-0">
                            <span class="title" style="font-weight: 400">Plant and Machinery </span><br/>
                            Use this part where the Annual Wear and Tear is<br/>
                            calculated on the WRITTEN DOWN VALUE [Assets<br/>
                            acquired before Y/A 2002 OR AIRCRAFT in use before<br/>
                            the Y/A 2010 - LN 291 of 2010
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">Year of Purchase [Y/A]</p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">Original Cost</p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            WDV START<br/>
                            Y/A 2002<br/>
                            OR<br/>
                            START<br/>
                            Y/A 2010 (Aircraft)
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            WDV b/fwd<br/>
                            [to-date]
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 7%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            Disposals at WDV START<br/>
                            Y/A 2002<br/>
                            OR<br/>
                            START<br/>
                            Y/A 2010 (Aircraft)
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            Disposals at<br/>
                            Original <br/>
                            Cost
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            Disposals at<br/>
                            W.D.V.<br/>
                            [to-date]
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            Number of<br/>
                            years dep'n
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            WDV start<br/>
                            Y/A 2002<br/>
                            OR<br/>
                            START<br/>
                            Y/A 2010<br/>
                            c/fwd
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            Annual<br/>
                            W & T
                        </p>
                    </v-layout>
                </v-flex>
                <v-flex py-3 style="width: 6.8%" class="border-left">
                    <v-layout align-center justify-center fill-height>
                        <p class="text-xs-center mb-0">
                            WDW<br/>
                            [to-date]<br/>
                            c/fwd
                        </p>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="i in 18">
                <v-layout row class="border no-border-top red lighten-4">
                    <v-flex xs3>
                        <v-text-field hide-details class="pt-0 mt-0 orange lighten-4 pl-2"></v-text-field>
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
                    <v-flex style="width: 7%" class="border-left">
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
                        <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pr-2 input-right" value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pr-2 input-right" value="0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 6.8%" class="border-left">
                        <v-text-field hide-details class="pt-0 mt-0 red lighten-4 pr-2 input-right" value="0"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row justify-space-between mt-1>
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 05_1</span>
            </v-layout>
        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>