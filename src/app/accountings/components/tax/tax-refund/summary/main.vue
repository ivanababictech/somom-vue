<template>
    <div class="summary grey lighten-2 pa-2">
        <cm-header></cm-header>
        <cm-step step="SUMMARY"></cm-step>

        <v-layout row align-center justify-space-between mt-2>
            <v-layout row class="border-big pink lighten-3 pl-1 py-1">
                <h2 class="title uppercase">STATEMENT OF TOTAL REFUND CLAIMED</h2>
            </v-layout>
        </v-layout>

        <v-layout row mt-4>
            <v-flex xs8></v-flex>
            <v-flex xs3 class="pink lighten-3 border-big no-border-bottom">
                <v-layout row justify-center class="pl-1 py-1">
                    <h2 class="subheading bolder">Euro Currency</h2>
                </v-layout>
            </v-flex>
            <v-flex xs1 ml-1 class="border-big pink lighten-3 no-border-bottom">
                <v-layout row justify-center class="pl-1 py-1">
                    <h2 class="subheading bolder">%</h2>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs8 >
                <v-layout row class="border-big no-border-right red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">
                        TOTAL TAX PAID BY COMPANY I.R.O. DIVIDEND DIST. TO DIRECT SHAREHOLDER
                    </h2>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height border-big" type="number" value="49329" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1 ml-1>
                <v-text-field class="pt-0 mt-0 fill-height input-center border-big" value="100%" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-1>
            <v-flex xs8 >
                <v-layout row class="border-big no-border-right red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">
                        TOTAL REFUND CLAIMED BY DIRECT SHAREHOLDER
                    </h2>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height border-big" type="number" value="42282" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1 ml-1>
                <v-text-field class="pt-0 mt-0 fill-height input-center border-big" value="86%" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs8 >
                <v-layout row class="border-big no-border-right red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">
                        UNCLAIMED TAX
                    </h2>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height red lighten-4 border-big" type="number" value="7047" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1 ml-1>
                <v-text-field class="pt-0 mt-0 fill-height input-center red lighten-4 border-big" value="14%" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <cm-non-resident-table></cm-non-resident-table>

        <cm-resident-table></cm-resident-table>

        <v-layout row align-center justify-space-between mt-5>
            <v-layout row class="border-big pink lighten-3 pl-1 py-1">
                <h2 class="subheading bolder uppercase">Final withholding tax in terms of the investment income provisions</h2>
            </v-layout>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs11>
                <v-layout row class="border-big red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder uppercase">Are all ultimate resident beneficiaries ordinarily resident and domiciled?</h2>
                </v-layout>
            </v-flex>
            <v-flex xs1>
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
            <v-flex xs8></v-flex>
            <v-flex xs3>
                <v-layout row justify-center class="border-big no-border-bottom pink lighten-3 pl-1 py-1">
                    <h2 class="subheading bolder">Euro Currency</h2>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs8 >
                <v-layout row class="border-big no-border-right red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder uppercase">
                        Total refund claimed
                    </h2>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height red lighten-4 border-big" type="number" value="0" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs6>
                <v-layout row class="pl-1 py-1">
                    <h2 class="subheading bolder uppercase">
                        Final withholding Tax on Refund
                    </h2>
                </v-layout>
            </v-flex>
            <v-flex xs1>
                <v-text-field class="input-right pt-0 mt-0 fill-height pink lighten-3 border-big no-border-right body-2" value="31.578%" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field class="input-right pt-0 mt-0 fill-height border-big no-border-right body-2"  hide-details></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height grey lighten-2 border-big" type="number" value="0" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs6>
                <v-layout row class="pl-1 py-1">
                    <h2 class="body-2">
                        (to the benefit of the Ultimate Resident shareholders)
                    </h2>
                </v-layout>
            </v-flex>
            <v-flex xs1>
                <v-text-field class="input-right pt-0 mt-0 fill-height pink lighten-3 border-big no-border-right body-2" value="35.000%" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field class="input-right pt-0 mt-0 fill-height border-big no-border-right body-2"  hide-details></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height grey lighten-2 border-big" type="number" value="0" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs6>
            </v-flex>
            <v-flex xs1>
                <v-text-field class="mt-0 pt-0 fill-height pink lighten-3 border-big no-border-right input-center body-2" value="Total" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field class="input-right pt-0 mt-0 pr-2 fill-height pink lighten-3 border-big no-border-right body-2"  value="0" hide-details></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="input-right pt-0 mt-0 fill-height grey lighten-2 border-big body-2" type="number" value="0" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-4>
            <v-flex xs8>
                <v-layout row class="border-big pink lighten-3 pl-1 py-1">
                    <h2 class="subheading bolder uppercase">Net refund payable</h2>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-text-field class="pt-0 pr-2 mt-0 fill-height pink lighten-3 border-big no-border-left input-right" value="0" hide-details></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row mt-5>
            <v-flex xs8>
                <v-layout row class="border-big no-border-right red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">Are the details in this Summary Statement correct and complete?</h2>
                </v-layout>
            </v-flex>
            <v-flex xs3>
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

        <cm-footer step="Summary"></cm-footer>
    </div>
</template>

<script>
    import NonResidentTable from '../tables/NonResidentTable'
    import ResidentTable from '../tables/ResidentTable'
    import isStep from '../mixins/isStep.js'

    export default {
        components: {
            'cm-non-resident-table': NonResidentTable,
            'cm-resident-table': ResidentTable,
        },
        data() {
            return {
                refund: null,
                correct: true,
                beneficiaries: false,
                items: [
                    {text: 'Yes', value: true},
                    {text: 'No', value: false}
                ]
            }
        }
    }
</script>