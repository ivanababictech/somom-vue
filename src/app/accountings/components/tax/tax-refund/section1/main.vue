<template>
    <div class="section1 grey lighten-2 pa-2">
        <cm-header></cm-header>

        <div>

            <cm-step step="SECTION 1"></cm-step>

            <cm-pink text="DETAILS OF COMPANY PAYING DIVIDENDS"></cm-pink>

            <v-layout row class="mt-2">
                <v-flex xs8>
                    <v-layout row>
                        <v-flex xs2>
                            <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                                Name
                            </div>
                        </v-flex>
                        <v-flex xs10>
                            <v-text-field
                                    hide-details
                                    class="pt-0 mt-0 pl-4 fill-height no-border-right"
                                    value="Red Beryl Ltd">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs4>
                    <v-layout row>
                        <v-flex xs3>
                            <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                                <span style="text-overflow: ellipsis; white-space: nowrap;overflow: hidden">ROC No.</span>
                            </div>
                        </v-flex>
                        <v-flex xs9>
                            <v-text-field
                                    hide-details
                                    class="pt-0 mt-0 pl-4 fill-height no-border-right"
                                    value="C 68009">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs2>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                        Address
                    </div>
                </v-flex>
                <v-flex xs10>
                    <v-text-field
                            hide-details
                            class="pt-0 mt-0 pl-4 fill-height"
                            value="21, Mons. A. Bonnici Street, Msida MSD 2257">
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs9>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                        Income tax registration number
                    </div>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details class="pt-0 mt-0 input-center fill-height" value="997095410"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs3>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">Company
                        status
                    </div>
                </v-flex>
                <v-flex xs9>
                    <v-text-field
                            hide-details
                            class="pt-0 mt-0 input-center orange lighten-4 border fill-height"
                            value="Former ITC (New Regime Treatment as from 1st January 2011)">
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs9>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                        Date of first residence / tax registration
                    </div>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details class="pt-0 mt-0 input-center fill-height" value="12/12/2014"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs9>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                        Currency in which shareholding is denominated
                    </div>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            hide-details
                            class="pt-0 mt-0 input-center orange lighten-4 border fill-height"
                            value="Euro Currency">
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs9>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                        Changes in direct shareholders notified
                    </div>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            hide-details
                            class="pt-0 mt-0 input-center orange lighten-4 border fill-height"
                            value="NO CHANGES">
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs9>
                    <div class="px-3 red lighten-4 border no-border-right body-2 headline black--text uppercase">
                        Changes in ultimate shareholders notified
                    </div>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            hide-details
                            class="pt-0 mt-0 input-center orange lighten-4 border fill-height"
                            value="NO CHANGES">
                    </v-text-field>
                </v-flex>
            </v-layout>

            <v-flex xs8 mt-5>
                <v-flex xs11 class="border-big pink lighten-3 pl-1 py-1">
                    <h2 class="subheading uppercase bolder">
                        COMPANY's CAPITAL STRUCTURE (AS AT THE DATE OF THE DISTRIBUTION)</h2>
                </v-flex>
                <cm-capital-structure-table></cm-capital-structure-table>
            </v-flex>

            <v-flex xs12 mt-5>
                <v-flex xs12 class="border-big pink lighten-3 pl-1 py-1">
                    <h2 class="subheading uppercase bolder">
                        SUBSCRIBERS ELIGIBLE FOR ORDINARY DIVIDEND (AS AT THE DATE OF THE DISTRIBUTION)
                    </h2>
                </v-flex>
                <cm-subscribers-table></cm-subscribers-table>
            </v-flex>

        </div>

        <cm-footer step="Section 1"></cm-footer>
    </div>
</template>

<script>
    import CapitalStructureTable from '../tables/CapitalStructureTable'
    import SubscribersTable from '../tables/SubscribersTable'

    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
        components: {
            'cm-capital-structure-table': CapitalStructureTable,
            'cm-subscribers-table': SubscribersTable
        }
    }
</script>