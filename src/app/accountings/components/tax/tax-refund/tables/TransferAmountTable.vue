<template>
    <div>
        <v-layout row mt-2 class="border-big">
            <v-flex xs2 py-1 class="pink lighten-3">
                <v-layout row justify-center align-center>
                    <span class="body-2">Type of Refund</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 py-1 class="pink lighten-3 border-left">
                <v-layout row justify-center align-center>
                    <span class="body-2">Currency</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 py-1 class="pink lighten-3 border-left">
                <v-layout row justify-center align-center>
                    <span class="body-2">Amount</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 py-1 class="pink lighten-3 border-left">
                <v-layout row justify-center align-center>
                    <span class="body-2">Total amount transferred and currency in words</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row class="border-big no-border-top" style="align-items: stretch">
            <v-flex xs6>
                <v-layout column>

                    <v-layout row class="border-bottom">
                        <v-flex xs4>
                            <v-layout row justify-center align-center fill-height>
                                100%
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout row justify-center align-center fill-height>
                                EUR
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout row justify-center align-center>
                                <v-text-field class="input-right pt-0 mt-0 pr-1 fill-height no-border-top no-border-bottom no-border-right grey lighten-2 border" value="0" hide-details></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="border-bottom">
                        <v-flex xs4>
                            <v-layout row justify-center align-center fill-height>
                                6/7
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout row justify-center align-center fill-height>
                                EUR
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout row justify-center align-center>
                                <v-text-field class="input-right pt-0 mt-0 pr-1 fill-height no-border-top no-border-bottom no-border-right grey lighten-2 border" value="42282" hide-details></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="border-bottom">
                        <v-flex xs4>
                            <v-layout row justify-center align-center fill-height>
                                5/7
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout row justify-center align-center fill-height>
                                EUR
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout row justify-center align-center>
                                <v-text-field class="input-right pt-0 mt-0 pr-1 fill-height no-border-top no-border-bottom no-border-right grey lighten-2 border" value="0" hide-details></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="border-bottom">
                        <v-flex xs4>
                            <v-layout row justify-center align-center fill-height>
                                2/3
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout row justify-center align-center fill-height>
                                EUR
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout row justify-center align-center>
                                <v-text-field class="input-right pt-0 mt-0 pr-1 fill-height no-border-top no-border-bottom no-border-right grey lighten-2 border" value="0" hide-details></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout row >
                        <v-flex xs4>
                            <v-layout row justify-center align-center fill-height>
                                7.5%
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 class="border-left">
                            <v-layout row justify-center align-center fill-height>
                                EUR
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout row justify-center align-center>
                                <v-text-field class="input-right pt-0 mt-0 pr-1 fill-height no-border-top no-border-bottom no-border-right grey lighten-2 border" value="0" hide-details></v-text-field>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                </v-layout>
            </v-flex>
            <v-flex xs6 class="border-left">
                <v-layout row fill-height align-center>
                    Forty Two Thousand Two Hundred Eighty Two EUR
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>