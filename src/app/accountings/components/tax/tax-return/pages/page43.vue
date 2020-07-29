<template>
    <div class="white title page pa-2" style="position:relative;">

        <v-layout column class="body-1">
            <v-layout row red lighten-4 mt-1 pa-1 class="border">
                <span class="medium">Wages Reconciliation (EU Directive 2011/16)</span>
            </v-layout>

            <v-layout row>
                <v-flex style="width: 88.4%">
                    <v-layout row align-center fill-height>
                        <span class="text-xs-center">Summary</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-layout row red lighten-4 mt-1 pa-1 class="border">
                        <span class="text-xs-center">
                            Remuneration
                            paid and
                            Employer's
                            share of SSC
                        </span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex style="width: 88.4%">
                    <v-layout row align-center fill-height>
                        <span>Wages and Salaries Reported under the Final Settlement System</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 red lighten-4 input-right border mini-input"
                                  value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center>
                <v-flex style="width: 88.4%">
                    <v-layout row align-center fill-height>
                        <span>Remuneration paid that is NOT Reported under the Final Settlement System</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%"></v-flex>
            </v-layout>
            <v-layout row align-center>
                <v-flex xs5></v-flex>
                <v-flex style="width: 53%">
                    <span>Remuneration paid that is NOT Reported under the Final Settlement System</span>
                </v-flex>
                <v-flex style="width: 12.4%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 red lighten-4 input-right border no-border-bottom mini-input"
                                  value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center>
                <v-flex xs5></v-flex>
                <v-flex style="width: 53%">
                    <span>Persons not liable to tax in Malta </span>
                </v-flex>
                <v-flex style="width: 12.4%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 red lighten-4 input-right border no-border-bottom mini-input"
                                  value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center>
                <v-flex style="width: 76.8%"></v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 red lighten-4 input-center border no-border-right mini-input"
                                  value="Total"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 red lighten-4 input-right border mini-input"
                                  value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 76.8%">
                    <v-layout row red lighten-4 mt-1 pa-1 class="border">
                        <span class="medium">Wages and Salaries Reported under the Final Settlement System</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 23.2%"></v-flex>
            </v-layout>
            <v-layout row align-center>
                <v-flex style="width: 76.8%" pl-2>
                    <span>Are there any wages or salaries or Directors' remuneration reported under the Final Settlement System?</span>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 orange lighten-4 input-center border mini-input"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.6%"></v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex xs5 class="border no-border-right" pa-1>
                    <span>
                        Please indicate in the space provided the PE number(s) under
                        which wages, salaries, emoluments etc. paid by the company,
                        have been reported. Include other PE numbers used, in the
                        space provided below. <br/>
                        Give details of total wages, salaries, etc. paid under the
                        respective PE number(s).
                    </span>
                </v-flex>
                <v-flex xs7>
                    <v-layout row>
                        <v-flex style="width: 20%" red lighten-4 class="border">
                            <v-layout row justify-center fill-height align-center pa-1>
                                <span class="text-xs-center">PE (Employer) <br/>Number</span>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" red lighten-4 class="border no-border-left">
                            <v-layout row justify-center fill-height align-center pa-1>
                                <span class="text-xs-center">Number of <br/> Employees</span>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" red lighten-4 class="border no-border-left">
                            <v-layout row justify-center fill-height align-center pa-1>
                                <span class="text-xs-center">Number of <br/> Directors</span>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" red lighten-4 class="border no-border-left">
                            <v-layout row justify-center fill-height align-center pa-1>
                                <span class="text-xs-center">Gross wages <br/>
                                        and salaries<br/>
                                        including fringe<br/>
                                        benefits
                                </span>
                            </v-layout>
                        </v-flex>
                        <v-flex style="width: 20%" red lighten-4 class="border no-border-left">
                            <v-layout row justify-center fill-height align-center pa-1>
                                <span class="text-xs-center">
                                    Employer's<br/>
                                    Share of Social<br/>
                                    Security<br/>
                                    Contributions
                                </span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <template v-for="i in 3">
                        <v-layout row>
                            <v-flex style="width: 20%">
                                <v-text-field hide-details class="white border no-border-top pl-2 pt-0 mt-0"></v-text-field>
                            </v-flex>
                            <template v-for="j in 4">
                                <v-flex style="width: 20%" class="hide-tax-borders border-right border-bottom">
                                    <v-text-field hide-details class="white pl-2 pt-0 mt-0"></v-text-field>
                                </v-flex>
                            </template>
                        </v-layout>
                    </template>
                    <v-layout row>
                        <v-flex style="width: 20%">
                            <v-layout fill-height justify-center align-center red lighten-4 class="border no-border-top">
                                <span>Totals</span>
                            </v-layout>
                        </v-flex>
                        <template v-for="j in 4">
                            <v-flex style="width: 20%"  class="hide-tax-borders border-right border-bottom">
                                <v-text-field hide-details class="red lighten-4 border-bottom border-right input-right pr-2 pt-0 mt-0" value="0"></v-text-field>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row mt-1 >
                <v-flex style="width: 53.6%">
                    <v-layout grey lighten-3 fill-height align-center pl-1>
                        <span>Other PE numbers under which wages and salaries have been reported</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="white border pl-2 pt-0 mt-0"></v-text-field>
                </v-flex>
                <template v-for="i in 3">
                    <v-flex style="width: 11.6%">
                        <v-text-field hide-details class="white border no-border-left pl-2 pt-0 mt-0"></v-text-field>
                    </v-flex>
                </template>
            </v-layout>

            <v-layout row>
                <v-flex style="width: 76.8%">
                    <v-layout row red lighten-4 mt-1 pa-1 class="border">
                        <span class="medium">Other remuneration paid that is NOT Reported under the Final Settlement System</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 23.2%"></v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex style="width: 76.8%" >
                    <v-layout fill-height pl-1 align-center class="border">
                        <span>Are there other wages and salaries paid to individuals liable to tax in Malta?</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="pt-0 mt-0 pr-2 orange lighten-4 input-center border no-border-left mini-input"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.6%"></v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4 class="border">
                        <span class="text-xs-center">Tax (ID) Number</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4 class="border no-border-left">
                        <span class="text-xs-center">Country of <br/> Residence </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 33.3%"></v-flex>

                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4 class="border">
                        <span class="text-xs-center">Surname</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4 class="border no-border-left">
                        <span class="text-xs-center">Name</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%">
                    <v-layout row justify-center fill-height align-center pa-1 red lighten-4 class="border no-border-left">
                        <span class="text-xs-center">
                            Gross wages<br/>
                            and salaries<br/>
                            including fringe<br/>
                            benefits
                        </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.1%"></v-flex>
            </v-layout>
            <template v-for="i in 7">
                <v-layout row >
                    <v-flex style="width: 11.1%" class="hide-tax-borders border-left border-right border-bottom">
                        <v-text-field hide-details class="white pl-2 pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                        <v-text-field hide-details class="orange lighten-4 border-right border-bottom pl-2 pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 33.3%"></v-flex>

                    <v-flex style="width: 11.1%">
                        <v-text-field hide-details class="white border no-border-top pl-2 pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                        <v-text-field hide-details class="white border-right border-bottom pl-2 pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 11.1%"  class="hide-tax-borders border-right border-bottom">
                        <v-text-field hide-details class="white border-right border-bottom pl-2 pt-0 mt-0"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 11.1%"></v-flex>
                </v-layout>
            </template>
            <v-layout row mt-1 >
                <v-flex style="width: 53.6%">
                    <v-layout red lighten-4 fill-height align-center pa-1 class="border">
                        <span>Directors Remuneration paid that is not reported under the FSS Rules</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 46.4%"></v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex style="width: 53.6%">
                    <v-layout fill-height align-center pa-1>
                        <span>Have all the relevant directors' details been reported on page 7 of the return? </span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="orange lighten-4 border pl-2 pt-0 mt-0"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.6%"></v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="white border pl-2 pt-0 mt-0"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.6%"></v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex style="width: 66.2%"></v-flex>
                <v-flex style="width: 11.6%">
                    <v-layout fill-height align-center justify-center red lighten-4 class="border">
                        <span>Totals</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 11.6%">
                    <v-text-field hide-details class="red lighten-4 border no-border-left input-right pr-2 pt-0 mt-0" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 11.6%"></v-flex>
            </v-layout>
            <v-layout row justify-space-between pa-1 pt-4>
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 82 - 1</span>
            </v-layout>
        </v-layout>
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>