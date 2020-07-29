<template>
    <div>
        <v-layout row mt-2>
            <v-flex xs3 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Type of Security</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">No of Shares</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border red lighten-4 no-border-right">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Entitlement to <br/>Fixed Dividend<br/>(Net Dividend)</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border no-border-right red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">% Entitlement</span>
                </v-layout>
            </v-flex>
            <v-flex xs3 class="border red lighten-4">
                <v-layout row align-center justify-center fill-height class="text-xs-center">
                    <span class="body-2">Affirmation of<br/> shareholding as at<br/>date of distribution</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <template v-for="i in 7">
            <v-layout row>
                <v-flex xs3 class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center orange lighten-4"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border red lighten-4 no-border-right">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border red lighten-4 no-border-right">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs2 class="border no-border-right red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
                <v-flex xs3 class="border red lighten-4">
                    <v-text-field hide-details class="mt-0 pt-0 pl-3 no-border input-center"></v-text-field>
                </v-flex>
            </v-layout>
        </template>
    </div>
</template>
