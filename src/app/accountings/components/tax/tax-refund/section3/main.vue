<template>
    <div class="section2 grey lighten-2 pa-2">
        <cm-header></cm-header>

        <cm-step step="SECTION 3.1"></cm-step>
        <cm-step step="MTA"></cm-step>
        <cm-pink text="SEGREGATION OF THE DISTRIBUTION"></cm-pink>

        <v-layout row mt-2>
            <v-flex style="width: 45.8%">
                <v-layout row>
                    <v-flex xs3 class="orange lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 uppercase">MTA</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 uppercase">Y/A</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 text-xs-center">Prior Year <br/>Adjustment</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2">Balance b/d</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex style="width: 45.8%" ml-3>
                <v-layout row>
                    <v-flex xs3 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 text-xs-center">Allocation for <br/>the year</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 text-xs-center">Past <br/> Distributions</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 text-xs-center">Distributions<br/>Available</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1 class="red lighten-4 border-big">
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2 text-xs-center">Distribution <br/>from this Y/A</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs1 ml-3>
                <v-layout row fill-height justify-center align-center class="red lighten-4 border-big ">
                    <div class="body-2 text-xs-center">Balance c/d </div>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row mt-1>
            <v-flex style="width: 45.8%">

                <v-layout row>
                    <v-flex xs3>
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2">Balance b/d</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border-big"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3 ml-1></v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border-big"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex style="width: 45.8%" ml-3></v-flex>

            <v-flex xs1 ml-3>

            </v-flex>
        </v-layout>

        <v-layout row mt-1>
            <v-flex style="width: 45.8%">

                <v-layout row>
                    <v-flex xs3></v-flex>
                    <v-flex xs3 ml-1>
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2">2017</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1></v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex style="width: 45.8%" ml-3>
                <v-layout row>
                    <v-flex xs3>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs1 ml-3>

                <v-text-field
                        class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                        hide-details>
                </v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-1>
            <v-flex style="width: 45.8%">

                <v-layout row>
                    <v-flex xs3></v-flex>
                    <v-flex xs3 ml-1>
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2">2018</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex style="width: 45.8%" ml-3>
                <v-layout row>
                    <v-flex xs3>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border input-red"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border input-red"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs1 ml-3>

                <v-text-field
                        class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                        hide-details>
                </v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-1>
            <v-flex style="width: 45.8%">
                <v-layout row>
                    <v-flex xs3></v-flex>
                    <v-flex xs3 ml-1>
                        <v-layout justify-center align-center fill-height>
                            <span class="body-2">2019</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex style="width: 45.8%" ml-3>
                <v-layout row>
                    <v-flex xs3>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                                hide-details>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs3 ml-1>
                        <v-text-field
                                class="mt-0 pt-0 fill-height input-center"
                                hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs1 ml-3>
                <v-text-field
                        class="mt-0 pt-0 fill-height input-center border grey lighten-1"
                        hide-details>
                </v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center justify-end mt-5>
            <span class="body-2">
                Balance c/d as at YA 2019
            </span>
            <v-flex xs1 ml-3>
                <v-text-field
                        class="mt-0 pt-0 fill-height input-center border-big grey lighten-1"
                        hide-details>
                </v-text-field>
            </v-flex>
        </v-layout>

        <cm-footer step="Section 3.1"></cm-footer>
    </div>
</template>

<script>
    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
    }
</script>