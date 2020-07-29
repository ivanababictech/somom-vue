<template>
    <v-layout row wrap>
        <v-flex xs6>
            <subheader
                    title="E"
                    text="Social Security and Maternity Fund Information"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs6></v-flex>
        <v-layout class="pl45">
            <v-flex xs12>
                <v-layout row>
                    <div style="width: 27%" class="border-left border-top border-right border-bottom primary-bg">
                        <v-layout justify-center align-center fill-height>
                            <strong class="fs-text">Basic Weekly Wage</strong>
                        </v-layout>
                    </div>
                    <div style="width: 41%" class="border-top border-right border-bottom primary-bg">
                        <v-layout justify-center align-center fill-height>
                            <strong class="fs-text">Social Security Contributions</strong>
                        </v-layout>
                    </div>
                    <div style="width: 13%" class="border-top border-right border-bottom primary-bg">
                        <v-layout justify-center align-center fill-height>
                            <v-flex xs12>
                                <v-layout justify-center align-center fill-height class="text-xs-center">
                                    <strong class="fs-text">Maternity Fund Contributions</strong>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 19%" class="border-top border-right border-bottom primary-bg">
                        <v-layout justify-center align-center fill-height>
                            <strong class="fs-text">Weeks without pay</strong>
                        </v-layout>
                    </div>
                </v-layout>
                <v-layout row>
                    <div style="width: 27%" class="border-left border-top border-right border-bottom primary-bg">
                        <v-layout justify-center align-center fill-height>
                            <v-flex xs4 class="fill-height border-right">
                                <v-layout fill-height align-center justify-center>
                                    <span class="fs-text">€</span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs2 class="fill-height border-right">
                                <v-layout fill-height align-center justify-center>
                                    <span class="fs-text">c</span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3 class="fill-height border-right">
                                <v-layout fill-height align-center justify-center>
                                    <span class="fs-text">Number</span>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3 class="fill-height">
                                <v-layout fill-height align-center justify-center>
                                    <span class="fs-text">Category</span>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 41%" class="border-top border-right border-bottom primary-bg">
                        <v-layout fill-height>
                            <v-flex xs4 class="border-right">
                                <v-flex xs12 class="border-bottom">
                                    <v-layout fill-height align-center justify-center>
                                        <strong class="fs-text">Payee</strong>
                                    </v-layout>
                                </v-flex>
                                <v-layout row>
                                    <v-flex xs8 class="border-right">
                                        <v-layout fill-height align-center justify-center>
                                            <span class="fs-text">€</span>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-layout fill-height align-center justify-center>
                                            <span class="fs-text">c</span>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4 class="border-right">
                                <v-flex xs12 class="border-bottom">
                                    <v-layout fill-height align-center justify-center>
                                        <strong class="fs-text">Payer</strong>
                                    </v-layout>
                                </v-flex>
                                <v-layout row>
                                    <v-flex xs8 class="border-right">
                                        <v-layout fill-height align-center justify-center>
                                            <span class="fs-text">€</span>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-layout fill-height align-center justify-center>
                                            <span class="fs-text">c</span>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-flex xs12 class="border-bottom">
                                    <v-layout fill-height align-center justify-center>
                                        <strong class="fs-text">Total SSC</strong>
                                    </v-layout>
                                </v-flex>
                                <v-layout row>
                                    <v-flex xs8 class="border-right">
                                        <v-layout fill-height align-center justify-center>
                                            <span class="fs-text">€</span>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-layout fill-height align-center justify-center>
                                            <span class="fs-text">c</span>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 13%" class="border-top border-right border-bottom primary-bg">
                        <v-layout wrap justify-center align-center fill-height>
                            <v-flex xs12 class="border-bottom">
                                <v-layout fill-height align-center justify-center>
                                    <strong class="fs-text">Payer</strong>
                                </v-layout>
                            </v-flex>
                            <v-layout row>
                                <v-flex xs8 class="border-right fill-height">
                                    <v-layout fill-height align-center justify-center>
                                        <span class="fs-text">€</span>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs4>
                                    <v-layout fill-height align-center justify-center>
                                        <span class="fs-text">c</span>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </div>
                    <div style="width: 19%" class="border-top border-right border-bottom primary-bg">
                        <v-layout align-center fill-height>
                                <v-flex xs4 class="fill-height border-right">
                                    <v-layout fill-height align-center justify-center>
                                        <strong class="fs-text">From</strong>
                                    </v-layout>
                                </v-flex>
                            <v-flex xs4 class="fill-height border-right">
                                    <v-layout fill-height align-center justify-center>
                                        <strong class="fs-text">To</strong>
                                    </v-layout>
                                </v-flex>
                            <v-flex xs4 class="fill-height">
                                    <v-layout fill-height align-center justify-center>
                                        <strong class="fs-text">Number</strong>
                                    </v-layout>
                                </v-flex>
                        </v-layout>
                    </div>
                </v-layout>

                <v-layout row v-for="i in 3" :key="i">
                    <div style="width: 27%" class="border-left border-top border-right border-bottom primary-bg">
                        <v-layout justify-center align-center fill-height>
                            <v-flex xs4 class="fill-height border-right">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs2 class="fill-height border-right">

                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs3 class="fill-height border-right">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs3 class="fill-height">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 41%" class="border-top border-right border-bottom primary-bg">
                        <v-layout fill-height>
                            <v-flex xs4 class="border-right">
                                <v-layout>
                                    <v-flex xs8>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4 class="border-right">
                                <v-layout>
                                    <v-flex xs8>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-layout>
                                    <v-flex xs8>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 13%" class="border-top border-right border-bottom primary-bg">
                        <v-layout>
                            <v-flex xs8>
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 19%" class="border-top border-right border-bottom primary-bg">
                        <v-layout align-center fill-height>
                            <v-flex xs4 class="fill-height border-right">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 class="fill-height border-right">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs4 class="fill-height">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-layout>


                <v-layout row>
                    <div style="width: 27%" class="border-top border-right">
                        <v-layout justify-center align-center fill-height>
                            <v-flex xs9></v-flex>
                            <v-flex xs3 class="fill-height">
                                <v-layout fill-height justify-center align-center>
                                    <strong class="fs-text">Total</strong>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 41%" class="border-top border-right border-bottom primary-bg">
                        <v-layout fill-height>
                            <v-flex xs4 class="border-right">
                                <v-layout>
                                    <v-flex xs8>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4 class="border-right">
                                <v-layout>
                                    <v-flex xs8>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs4>
                                <v-layout>
                                    <v-flex xs8>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field
                                                solo
                                                flat
                                                hide-details
                                                height="32px"
                                                class="pt-0 mt-0 mini-input primary-border-bottom">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 13%" class="border-top border-right border-bottom primary-bg">
                        <v-layout>
                            <v-flex xs8>
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom primary-border">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        class="pt-0 mt-0 mini-input primary-border-bottom">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div style="width: 19%" class="border-top">
                        <v-layout justify-center align-center fill-height>
                            <v-flex xs12 class="fill-height">
                                <v-layout fill-height pl-3 align-center>
                                    <strong class="fs-text">E1</strong>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-layout>

                <v-layout row mt-2>
                    <v-flex xs6>
                        <v-layout row fill-height align-center>
                            <span class="fs-text">
                                Voluntary Occupational Pension Scheme contribution or payment
                            </span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs5>
                        <v-layout align-center>
                            <span class="fs-text mr-2">€</span>
                            <v-flex xs1 v-for="i in 6" :key="i">
                                <v-text-field
                                        solo
                                        flat
                                        hide-details
                                        height="32px"
                                        :class="i === 1 && 'primary-border-left'"
                                        class="pt-0 mt-0 mini-input primary-border-top primary-border-bottom primary-border"
                                        type="number"
                                        max="9">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import Subheader from '../components/subheader'

    export default {
        components: {
            Subheader
        }
    }
</script>