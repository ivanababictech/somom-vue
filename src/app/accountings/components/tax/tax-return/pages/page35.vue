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
            <v-layout row class="red lighten-4">
                <v-flex style="width: 12.5%" class="border no-border-right">
                    <v-layout fill-height align-center justify-center>
                        <span>Receipt No</span>
                    </v-layout>
                </v-flex>

                <v-flex style="width: 12.5%" class="border no-border-right">
                    <v-layout fill-height align-center justify-center>
                        <span>Receipt Date</span>
                    </v-layout>
                </v-flex>

                <v-flex style="width: 12.5%" class="border no-border-right">
                    <v-layout fill-height align-center justify-center>
                        <span>Amount</span>
                    </v-layout>
                </v-flex>

                <v-flex style="width: 6%" class="border no-border-right">
                    <v-layout fill-height align-center justify-center>
                        <p class="mb-0 text-xs-center">Taxed<br/>A/c</p>
                    </v-layout>
                </v-flex>

                <v-flex style="width: 12.5%" class="border no-border-right">
                    <v-layout fill-height align-center justify-center>
                        <span>Error Message(s)</span>
                    </v-layout>
                </v-flex>

                <v-flex style="width: 6%" class="border no-border-right">
                    <v-layout fill-height align-center justify-center>
                        <p class="mb-0 text-xs-center"><small>Are Receipt <br/> Details correct?</small></p>
                    </v-layout>
                </v-flex>

                <v-flex style="width: 37.5%" class="border">
                    <v-layout align-center justify-center py-1 class="border-bottom">
                        <span>Allocated</span>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs4>
                            <v-layout align-center justify-center fill-height py-3>
                                <p class="mb-0 text-xs-center">IPA</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout fill-height align-center justify-center>
                                <p class="mb-0 text-xs-center">MTA</p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout fill-height align-center justify-center>
                                <p class="mb-0 text-xs-center">FIA</p>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-for="i in 40">
                <v-layout row>
                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="white pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>

                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="white pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>

                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="white pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>

                    <v-flex style="width: 6%">
                        <v-text-field hide-details class="orange lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>

                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="grey lighten-2 pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>

                    <v-flex style="width: 6%">
                        <v-text-field hide-details class="orange lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>

                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2"></v-text-field>
                    </v-flex>
                    <v-flex style="width: 12.5%">
                        <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-top pl-2"></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex style="width: 62.2%" class="red lighten-4 border-bottom border-left">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2">Total Receipts</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 62.2%" class="red lighten-4 border-bottom border-left">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2">Unutilised provisional tax for the year - Article 27G(4) (note 3)</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%" class="grey lighten-2 border-left">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2 grey--text text--darken-1">TRA 89</span>
                    </v-layout></v-flex>
                <v-flex style="width: 12.5%" class="grey lighten-2"></v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 62.2%" class="red lighten-4 border-bottom border-left">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2">Previous unutilised provisional tax b/fwd utilised this year - Article 27G (note 3)</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%" class="grey lighten-2 border-left border-bottom">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2 grey--text text--darken-1">TRA 89</span>
                    </v-layout></v-flex>
                <v-flex style="width: 12.5%" class="grey lighten-2"></v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 37.5%" class="grey lighten-2 border-bottom border-left">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2">W'holding tax [agriculture produce] claimed back</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 6%" class="grey lighten-2 border-bottom border-left">
                    <v-layout fill-height align-center justify-center>
                        <span class="body-2">MTA</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 31%" class="grey lighten-2 border-bottom border-left">
                </v-flex>
                <v-flex style="width: 12.5%" class="grey lighten-2">
                    <v-text-field hide-details class="grey lighten-2 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%" class="grey lighten-2 border-left border-bottom">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2 grey--text text--darken-1">TRA 41</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex style="width: 43.5%" class="red lighten-4 border-bottom border-left">
                    <v-layout fill-height align-center pl-2>
                        <span class="body-2">Totals</span>
                    </v-layout>
                </v-flex>
                <v-flex style="width: 18.5%" class="grey lighten-2 border-bottom border-left">
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border no-border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
                <v-flex style="width: 12.5%">
                    <v-text-field hide-details class="red lighten-4 pt-0 mt-0 border border-right no-border-top pl-2 input-right pr-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row justify-space-between pa-1 pt-4 class="grey lighten-2">
                <span class="title">IRD - Malta</span>
                <span class="title">TA2_e-CO_2018_Ver 1.1</span>
                <span class="title">TRA 31</span>
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
        <v-layout row justify-space-between style="position: absolute; bottom: 0;width: 99%">
            <span class="title">Name</span>
            <span class="title">Signature</span>
            <span class="title">Date</span>
        </v-layout>
    </div>
</template>