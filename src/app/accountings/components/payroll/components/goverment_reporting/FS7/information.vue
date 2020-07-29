<template>
    <v-layout row wrap>
        <v-flex xs7>
            <subheader
                    title="F"
                    text="Payments Made to IRD During the Year"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs5></v-flex>
        <v-layout mt-2>
            <v-flex xs6>
                <payment-table></payment-table>
            </v-flex>
            <v-flex xs6>
                <payment-table :start="5"></payment-table>
            </v-flex>
        </v-layout>
        <v-layout mt-3>
            <v-flex xs5 pl-4>
                <span class="fs-text">
                    If the Total paid (F1) is less than total due (F2) please on close outstanding payment with FS5 form. In the case of overpayment please enclose a letter with this form explaining why the ammount differ.
                </span>
            </v-flex>
            <v-flex xs7>
                <v-layout>
                    <v-flex xs1 class="text-xs-right" pr-2>
                        <v-layout fill-height align-center justify-end>
                            <span class="fs-text">F1</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs5 class="border-all">
                        <v-layout fill-height align-center pl-1>
                            <span class="fs-text">TOTAL PAID JAN=DEC</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2  class="border-bottom border-top">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="border-bottom border-top">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="border-bottom border-top">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs1 class="text-xs-right" pr-2>
                        <v-layout fill-height align-center justify-end>
                            <span class="fs-text">F2</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs5 class="border-left border-right border-bottom">
                        <v-layout fill-height align-center pl-1>
                            <span class="fs-text">TOTAL DUE AS PER ABOVE (D4, E1, E2)</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2  class="border-bottom">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="border-bottom">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="border-bottom">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs1 class="text-xs-right" pr-2>
                        <v-layout fill-height align-center justify-end>
                            <span class="fs-text">F3</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs5 class="border-left border-right border-bottom">
                        <v-layout fill-height align-center pl-1>
                            <span class="fs-text">AMOUNT UNDERPAID, OVERPAID</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2  class="border-bottom">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="border-bottom">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="border-bottom">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs6 class="border-right"></v-flex>
                    <v-flex xs2 class="border-bottom border-right text-xs-center">
                        <span class="fs-text">FSS Tax</span>
                    </v-flex>
                    <v-flex xs2 class="border-bottom border-right text-xs-center">
                        <span class="fs-text">SSC</span>
                    </v-flex>
                    <v-flex xs2 class="border-bottom border-right text-xs-center">
                        <span class="fs-text">Maternity Fund</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import Subheader from '../components/subheader'
    import PaymentTable from './tables/payment'
    export default {
        components: {
            Subheader,
            PaymentTable
        }
    }
</script>