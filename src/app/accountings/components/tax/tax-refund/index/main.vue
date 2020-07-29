<template>
    <div class="grey lighten-2 pa-2">
        <cm-header></cm-header>

        <v-layout row align-center justify-space-between>

            <cm-step step="INDEX"></cm-step>

            <v-flex xs2 mt-2>
                <div>
                    <v-text-field
                            hide-details
                            type="date"
                            class="pt-0 inline-block width-auto input-center border-big">
                    </v-text-field>
                </div>
            </v-flex>
        </v-layout>

        <cm-pink text="Claim for refund"></cm-pink>

        <cm-status-table></cm-status-table>

        <div class="mt-3 border-big pa-2">
            <v-layout row>
                <v-flex xs2>
                    <div class="px-3 red lighten-4 border-big body-2 headline text-xs-center">
                        Treatment
                    </div>
                </v-flex>
            </v-layout>
            <v-layout column class="mt-2">
                <v-layout row>
                    <v-flex xs7 offset-xs3>
                        <div class="px-3 pink lighten-3 border body-2 headline black--text">
                            Has the tax payment has been effected?
                        </div>
                    </v-flex>
                    <v-flex xs2 ml-2>
                        <v-select
                                :items="items"
                                :value="false"
                                append-icon=""
                                class="pt-0 mt-0 border orange lighten-4"
                                hide-details
                                single-line
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-layout>
            <v-layout row class="border red--text white body-2 py-2 px-1 mt-3">
                {{ noTaxPayment }}
            </v-layout>

            <v-layout row mt-2 class="border indigo--text white body-2 py-2 px-1 mt-2">
                {{ taxPaymentDisclaimer }}
            </v-layout>

            <v-layout column class="mt-2">
                <v-layout row>
                    <v-flex xs7 offset-xs3>
                        <div class="px-3 pink lighten-3 border body-2 headline black--text">
                            Do you agree with the above statement?
                        </div>
                    </v-flex>
                    <v-flex xs2 ml-2>
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
            </v-layout>
        </div>

        <div class="mt-3 border-big pa-2 grey lighten-4">
            <v-layout row>
                <v-flex xs3>
                    <div class="px-3 grey lighten-2 border-big body-2 headline text-xs-center underline">
                        For Official Use Only
                    </div>
                </v-flex>
                <v-flex xs9 ml-2>
                    <div class="px-3 grey lighten-2 border-big body-2 headline text-xs-center blue--text text--darken-4">
                        Former ITC (New Regime Treatment as from 1st January 2011)
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row mt-2>
                <v-flex xs3 pl-3>
                    <v-layout fill-height align-center>
                        <span class="body-2 underline">Company Details:</span>
                    </v-layout>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            class="border-bottom mt-0 pt-0 no-border-top no-border-left no-border-right grey lighten-4"
                            hide-details
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row mt-2>
                <v-flex xs3 pl-3>
                    <v-layout fill-height align-center>
                        <span class="body-2 underline">Shareholder Details:</span>
                    </v-layout>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            class="border-bottom pt-0 mt-0 no-border-top no-border-left no-border-right grey lighten-4"
                            hide-details
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-3>
                <v-flex xs3 pl-3>
                    <v-layout fill-height align-center>
                        <span class="body-2">Claim Reference Number</span>
                    </v-layout>
                </v-flex>
                <div>
                    <v-text-field hide-details class="pt-0 mt-0 inline-block width-auto">
                    </v-text-field>
                </div>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3 pl-3>
                    <v-layout fill-height align-center>
                        <span class="body-2">Date of Valid Claim</span>
                    </v-layout>
                </v-flex>
                <div>
                    <v-text-field
                            hide-details
                            type="date"
                            class="pt-0 mt-0 inline-block width-auto">
                    </v-text-field>
                </div>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3 pl-3>
                    <v-layout fill-height align-center>
                        <span class="body-2">Processed by / on</span>
                    </v-layout>
                </v-flex>
                <div>
                    <v-text-field hide-details class="pt-0 mt-0 inline-block width-auto">
                    </v-text-field>
                </div>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3 pl-3>
                    <v-layout fill-height align-center>
                        <span class="body-2">Checked by / on</span>
                    </v-layout>
                </v-flex>
                <div>
                    <v-text-field hide-details class="pt-0 mt-0 inline-block width-auto">
                    </v-text-field>
                </div>
            </v-layout>
        </div>

        <cm-footer step="Index"></cm-footer>
    </div>
</template>

<script>
    import isStep from '../mixins/isStep.js'
    import StatusTable from '../tables/StatusTable'

    export default {
        mixins: [isStep],
        components: {
            StatusTable
        },
        data() {
            return {
                noTaxPayment: `By Selecting NO, the claimant is agreeing to effect the tax payment as soon as notified by the International Tax Unit;
subject to a fully processed valid refund claim. Consequently, it is imperative that the email address provided in the
Declaration Section is correct since it will be used to instruct the tax payer to effect payment. Should the payment fail
to be effected within 30 days from receipt of such email, this claim will be considered null and void.`,
                taxPaymentDisclaimer: `Disclaimer: The relevant rules concerning the time limits for effecting the relevant tax payments remain applicable,
notwithstanding the option for the above treatment.`,
                items: [
                    {text: 'Yes', value: true},
                    {text: 'No', value: false}
                ]
            }
        },
    }
</script>

<style>
    .no-tax-payment textarea {
        color: red !important;
    }

    .tax-payment-disclaimer textarea {
        color: darkblue !important;
    }
</style>