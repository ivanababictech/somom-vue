<template>
    <div class="section2 grey lighten-2 pa-2">
        <cm-header></cm-header>

        <cm-step step="SECTION 2"></cm-step>
        <cm-pink text="DETAILS OF DIRECT SHAREHOLDER ENTITLED FOR REFUND"></cm-pink>

        <v-layout row mt-2>
            <v-flex xs2>
                <div class="px-3 red lighten-4 border no-border-right body-2 headline uppercase">Name</div>
            </v-flex>
            <v-flex xs10>
                <v-text-field hide-details class="mt-0 pt-0 pl-4 fill-height"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs2>
                <div class="px-3 red lighten-4 border no-border-right body-2 headline uppercase">ADDRESS</div>
            </v-flex>
            <v-flex xs10>
                <v-text-field hide-details class="mt-0 pt-0 pl-4 fill-height"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs8>
                <div class="px-3 red lighten-4 border no-border-right body-2 headline uppercase">TYPE OF PERSON</div>
            </v-flex>
            <v-flex xs4>
                <v-text-field hide-details class="mt-0 pt-0 input-center orange lighten-4 border fill-height"></v-text-field>
            </v-flex>
        </v-layout>


        <v-layout row mt-5>
            <v-flex xs8>
                <div class="px-3 red lighten-4 border no-border-right body-2 headline uppercase">COUNTRY OF FISCAL RESIDENCE</div>
            </v-flex>
            <v-flex xs4>
                <v-text-field hide-details class="mt-0 pt-0 input-center orange lighten-4 border fill-height"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs8>
                <div class="px-3 red lighten-4 border no-border-right body-2 headline uppercase">INCOME TAX REGISTRATION NUMBER</div>
            </v-flex>
            <v-flex xs4>
                <v-text-field hide-details class="mt-0 pt-0 input-center fill-height"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs8>
                <div class="px-3 red lighten-4 border no-border-right body-2 headline uppercase">REFUND REGISTRATION NUMBER</div>
            </v-flex>
            <v-flex xs4>
                <v-text-field hide-details class="mt-0 pt-0 input-center fill-height"></v-text-field>
            </v-flex>
        </v-layout>

        <v-flex xs8 mt-5>
            <v-layout row class="border-big pink lighten-3 pl-1 py-1">
                <h2 class="subheading uppercase bolder">SHAREHOLDING IN COMPANY PAYING DIVIDENDS</h2>
            </v-layout>
            <cm-shareholding-table></cm-shareholding-table>
        </v-flex>

        <v-layout row mt-4>
            <v-flex xs8></v-flex>
            <v-flex xs4>
                <v-layout row justify-center class="border-big no-border-bottom pink lighten-3 py-1">
                    <h2 class="subheading bolder uppercase">Euro</h2>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs8>
                <v-layout row class="border-big no-border-right pink lighten-3 py-1 pl-1">
                    <h2 class="subheading bolder uppercase">Gross Dividends Received (on which refunds are being claimed)</h2>
                </v-layout>
            </v-flex>
            <v-flex xs4>
                <v-text-field class="input-right border-big pt-0 mt-0 fill-height" type="number" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs8>
                <v-layout row class="border-big no-border-right pink lighten-3 py-1 pl-1">
                    <h2 class="subheading bolder uppercase">Is distribution made up solely from profits earned up to YA 2007?</h2>
                </v-layout>
            </v-flex>
            <v-flex xs4>
                <v-select
                        :items="items"
                        :value="true"
                        append-icon=""
                        class="pt-0 mt-0 border orange lighten-4"
                        hide-details
                        single-line
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs8>
                <v-layout row class="border-big pink lighten-3 py-1 pl-1">
                    <h2 class="subheading bolder uppercase">From which Tax Accounts were this Dividends Distributed?</h2>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row mt-1>
            <v-flex xs2>
                <v-text-field hide-details class="mt-0 pt-0 pl-4 fill-height orange lighten-4 border-big"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-2>
                <v-text-field hide-details class="mt-0 pt-0 pl-4 fill-height orange lighten-4 border-big"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-2>
                <v-text-field hide-details class="mt-0 pt-0 pl-4 fill-height orange lighten-4 border-big"></v-text-field>
            </v-flex>
        </v-layout>

        <cm-footer step="Section 2"></cm-footer>
    </div>
</template>

<script>
    import ShareholdingTable from '../tables/ShareholdingTable'
    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
        components: {
            'cm-shareholding-table': ShareholdingTable,
        },
        data: () => ({
            items: [
                {text: 'Yes', value: true},
                {text: 'No', value: false}
            ]
        })
    }
</script>