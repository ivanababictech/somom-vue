<template>
    <div class="payment grey lighten-2 pa-2">
        <cm-header></cm-header>

        <cm-step step="PAYMENT"></cm-step>
        <cm-pink text="Bank details where refund is to be transferred"></cm-pink>

        <v-layout row align-center mt-2>
            <v-flex xs6 class="border-big red lighten-4 pl-1">
                <span class="subheading bolder uppercase">Refund to be effected by:</span>
            </v-flex>
            <v-flex xs2 pl-1 class="border-big no-border-left orange lighten-4">
                <span class="subheading bolder">Direct Bank Transfer</span>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Name of bank</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Address</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" multi-line rows="2" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Account number</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Iban number</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs3 class="border-big red lighten-4">
                <v-layout row align-center justify-center fill-height>
                    <span class="body-2">The Beneficiary Name indicated is the:</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="border-big orange lighten-4 no-border-left">
                <v-layout row align-center justify-center fill-height>
                    <span class="subheading">Shareholder</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Beneficiary name</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Intermediary Bank</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Swift code</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Bic code</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-4>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Debit account</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height grey lighten-2 border-big" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-flex xs5></v-flex>
            <v-flex xs2 pr-2 class="text-xs-right">
                <span class="uppercase subheading bolder">Iban number</span>
            </v-flex>
            <v-flex xs5>
                <v-text-field class="input-center pt-0 mt-0  fill-height grey lighten-2 border-big" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center justify-space-between mt-2>
            <v-layout row class="border-big pink lighten-3 pl-1 py-1">
                <h2 class="title uppercase">Transfer amount</h2>
            </v-layout>
        </v-layout>

        <cm-transfer-amount-table></cm-transfer-amount-table>

        <v-layout row class="border-big no-border-top">
            <v-flex xs2 class="pink lighten-3">
                <v-layout row align-center>
                    <span class="body-2">Total</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="pink lighten-3 border-left">
                <v-layout row justify-center align-center>
                    <span class="body-2">EUR</span>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="pink lighten-3 border-left">
                <v-layout row justify-end align-center>
                    <span class="body-2 pr-1">42282</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 class="pink lighten-3 border-left">
            </v-flex>
        </v-layout>

        <v-layout column mt-2 pa-2 class="white border">
            <div class="px-3 grey lighten-2 border body-2 inline-block underline">For Official Use Only:</div>

            <v-layout row align-center mt-2>
                <v-flex xs2>
                    <span class="body-2 uppercase">reference:</span>
                </v-flex>
                <v-flex xs1></v-flex>
                <v-flex xs2>
                    <v-text-field
                            id="testing"
                            name="input-1"
                            class="border-bottom pt-0 mt-0  no-border-top no-border-left no-border-right"
                            hide-details
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row align-center mt-2>
                <v-flex xs3>
                    <span class="body-2 uppercase">Ird authorised signatories:</span>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2>
                    <v-text-field
                            name="input-1"
                            class="border-bottom pt-0 mt-0  no-border-top no-border-left no-border-right"
                            hide-details
                    ></v-text-field>
                </v-flex>
                <v-flex xs1></v-flex>
                <v-flex xs2>
                    <v-text-field
                            name="input-1"
                            class="border-bottom pt-0 mt-0  no-border-top no-border-left no-border-right"
                            hide-details
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <span class="body-1 mt-2">
                Notice: Personal data in relation to transactions effected via SWIFT (Society for Worldwide Interbank Financial Telecommunication) may be required to be disclosed
                to the United States authorities in order to comply with legal requirements applicable in the United States for the prevention of crime.
            </span>
        </v-layout>

        <v-layout column mt-2>
            <span class="body-2">For CBM use:</span>
            <v-layout row mt-2>
                <v-flex xs4>
                    <span class="body-1">Ref. No:</span>
                </v-flex>
                <v-flex xs4>
                    <span class="body-1">Contact Date:</span>
                </v-flex>
                <v-flex xs4>
                    <span class="body-1">Bank:</span>
                </v-flex>
            </v-layout>
        </v-layout>

        <cm-footer step="Payment"></cm-footer>
    </div>
</template>

<script>
    import TransferAmountTable from '../tables/TransferAmountTable'
    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
        components: {
            'cm-transfer-amount-table': TransferAmountTable,
        }
    }
</script>