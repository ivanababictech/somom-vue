<template>
    <div class="white title page pa-2" style="position:relative;">

        <v-layout column class="body-1">
            <v-layout>
                <v-flex style="width: 77.7%">
                    <v-layout row red lighten-4 mt-1 pa-1 class="border">
                        <span>Wages and Salaries paid to persons not liable to tax in Malta</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 22.3%"></v-flex>
            </v-layout>

            <v-layout>
                <v-flex style="width: 77.7%">
                    <v-layout row pa-1>
                        <v-flex xs10>
                            <span>Are there any other wages, salaries or any other form of remuneration disclosed in the Income Statement that are not reported under the Final Settlement System? </span>
                        </v-flex>
                        <v-flex xs2 ml-3>
                            <v-layout align-end fill-height>
                                <v-text-field hide-details class="orange lighten-4 border pt-0 mt-0"></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 22.3%"></v-flex>
            </v-layout>
            <v-layout mt-2>
                <span>Personal details of employees and emoluments paid</span>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4 class="border">
                        <span class="text-xs-center">
                            Tax Identification<br/>
                            Number (TIN) of<br/>
                            country of<br/>
                            residence
                        </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4
                              class="border no-border-left">
                        <span class="text-xs-center">
                            Country of <br/>
                            Residence for<br/>
                            Tax Purposes
                        </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 33.3%" class="red lighten-4 border-top border-bottom border-right">
                    <v-layout class="border-bottom" py-1 justify-center align-center>
                        <span class="text-xs-center">Date and Place of birth </span>
                    </v-layout>
                    <v-layout row >
                        <v-flex xs4>
                            <v-layout py-4 justify-center align-center fill-height>
                                <span class="text-xs-center">Date of birth</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout py-1 justify-center align-center fill-height class="border-left">
                                <span class="text-xs-center">City of birth</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout py-1 justify-center align-center fill-height class="border-left">
                                <span class="text-xs-center">Country of birth</span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4
                              class="border no-border-left">
                        <span class="text-xs-center">Surname</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4
                              class="border no-border-left">
                        <span class="text-xs-center">Name</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4
                              class="border no-border-left">
                        <span class="text-xs-center">
                            Gross wages and<br/>
                            salaries including<br/>
                            fringe benefits
                        </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4
                              class="border no-border-left">
                        <span class="text-xs-center">
                            Employer's Share<br/>
                            of Social Security<br/>
                            Contributions
                        </span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="z in 25">
                <v-layout row >
                    <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-left border-bottom">
                        <v-text-field hide-details class="white border no-border-top pt-0 mt-0 pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                        <v-text-field hide-details class="orange lighten-4 border-bottom border-right pt-0 mt-0 pl-2"></v-text-field>
                    </v-flex>
                    <template v-for="i in 7">
                        <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                            <v-text-field hide-details class="white border-bottom border-right pt-0 mt-0 pl-2"></v-text-field>
                        </v-flex>
                    </template>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex style="width: 66.6%"></v-flex>
                <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-left border-bottom">
                    <v-layout red lighten-4 justify-center align-center fill-height>
                        <span>Totals</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                    <v-text-field hide-details class="red lighten-4 border-left border-bottom pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                    <v-text-field hide-details class="red lighten-4 border no-border-top pt-0 mt-0 input-right pr-2" value="0"></v-text-field>
                </v-flex>
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
            <v-layout row justify-space-between pa-1 pt-4>
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 82 - 2</span>
            </v-layout>
        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>