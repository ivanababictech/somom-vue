<template>
    <div>
        <v-layout row mt-2>
            <v-flex xs6 class="border no-border-right pink lighten-3">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">ACTUAL Year's profits <br/> out of which <br/> distribution was made <br/> [Y/A]</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 class="border pink lighten-3">
                <v-layout column fill-height>
                    <v-layout row align-center justify-center class="text-xs-center border-bottom">
                        <span class="body-2">Amounts distributed</span>
                    </v-layout>
                    <v-layout row align-center justify-center class="text-xs-center" style="align-items: stretch">
                        <v-flex xs6 class="border-right">
                            <v-layout fill-height justify-center align-center>
                                <span class="body-2">MTA</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout fill-height justify-center align-center>
                                <span>FIA</span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row v-for="i in 6" :key="i">
            <v-flex xs6 class="border no-border-right pink lighten-3">
                <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
            </v-flex>
            <v-flex xs6 class="border pink lighten-3">
                <v-layout row align-center justify-center class="text-xs-center" style="align-items: stretch">
                    <v-flex xs6 class="border-right">
                        <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field hide-details class="mt-0 pt-0 no-border input-center"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>