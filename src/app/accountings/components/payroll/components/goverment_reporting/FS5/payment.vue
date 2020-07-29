<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="E"
                    text="Payment Details"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs6></v-flex>
        <v-flex xs12 class="pl45">
            <v-layout mt-2>
                <v-flex xs6>
                    <v-layout align-center pl-2>
                        <v-flex xs3 mr-5>
                            <span class="fs-text">Date of Payment</span>
                        </v-flex>
                        <v-flex xs1 v-for="i in 8" :key="i">
                            <v-text-field
                                    solo
                                    flat
                                    hide-details
                                    height="32px"
                                    :class="i === 1 && 'primary-border-left'"
                                    class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                                    type="number"
                                    max="9">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout pl-2>
                        <v-flex xs3 mr-5></v-flex>
                        <v-flex xs1 v-for="i in 8" :key="i" class="text-xs-center">
                            <small class="fs-text ">
                                <template v-if="i < 3">
                                    d
                                </template>
                                <template v-else-if="i < 5">
                                    m
                                </template>
                                <template v-else>
                                    y
                                </template>
                            </small>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-layout align-center pl-2>
                        <v-flex xs3 class="text-xs-right">
                            <span class="fs-text">Total Payment</span>
                            <span class="fs-text pr-1">E1</span>
                        </v-flex>
                        <v-flex xs1 v-for="i in 9" :key="i">
                            <v-text-field
                                    solo
                                    flat
                                    hide-details
                                    height="32px"
                                    :class="i === 1 && 'primary-border-left'"
                                    class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                                    type="number"
                                    max="9">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-divider class="my-4" color="#007840"></v-divider>
            <v-layout>
                <v-flex xs6>
                    <span class="fs-text subheading">
                        <strong>Details of Cheque (if applicable)</strong>
                    </span>
                </v-flex>
                <v-flex xs6>
                    <v-layout align-center fill-height justify-space-between>
                        <v-flex xs4 pl-3>
                            <span class="fs-text">Cheque No.</span>
                        </v-flex>
                        <v-flex xs1 mr-2 class="text-xs-right">
                            <span class="fs-text">E2</span>
                        </v-flex>
                        <v-flex xs7>
                            <v-layout>
                                <div style="width: 14.2%" v-for="i in 7" :key="i">
                                    <v-text-field
                                            solo
                                            flat
                                            hide-details
                                            height="32px"
                                            :class="i === 1 && 'primary-border-left'"
                                            class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                                            type="number"
                                            max="9">
                                    </v-text-field>
                                </div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs6>
                    <v-layout fill-height align-center pr-5>
                        <v-flex xs3>
                            <span class="fs-text subheading">Bank</span>
                        </v-flex>
                        <v-text-field hide-details solo flat class="mt-0 pt-0 primary-border-all mini-input"
                                      height="32"></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs6 pl-3>
                    <span class="fs-text subheading">Bank Account No.</span>
                </v-flex>
            </v-layout>

            <v-layout mt-2>
                <v-flex xs6>
                    <v-layout fill-height align-center pr-5>
                        <v-flex xs3>
                            <span class="fs-text subheading">Branch</span>
                        </v-flex>
                        <v-text-field
                                hide-details
                                solo
                                flat
                                class="mt-0 pt-0 primary-border-all mini-input"
                                height="32">
                        </v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs6 pl-3>
                    <v-layout fill-height align-center>
                        <div class="w1">
                            <span class="fs-text subheading">E3</span>
                        </div>
                        <div style="width: 7.2%" v-for="i in 13" :key="i">
                            <v-text-field
                                    solo
                                    flat
                                    hide-details
                                    height="32px"
                                    :class="i === 1 && 'primary-border-left'"
                                    class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                                    type="number"
                                    max="9">
                            </v-text-field>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-divider class="my-4" color="#007840"></v-divider>
            <v-flex xs6>
                    <span class="fs-text subheading">
                        <strong>Details of person making payment</strong>
                    </span>
            </v-flex>
            <v-layout>
                <v-flex xs6>
                    <v-layout fill-height align-center pr-5>
                        <v-flex xs3>
                            <span class="fs-text subheading">Full Name</span>
                        </v-flex>
                        <v-text-field
                                hide-details
                                solo
                                flat
                                class="mt-0 pt-0 primary-border-all mini-input"
                                height="32">
                        </v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-layout fill-height align-center pr-5>
                        <v-flex xs2>
                            <span class="fs-text subheading">Signature</span>
                        </v-flex>
                        <v-text-field
                                hide-details
                                solo
                                flat
                                class="mt-0 pt-0 primary-border-all mini-input"
                                height="32">
                        </v-text-field>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-divider class="my-4" color="#007840"></v-divider>
            <v-layout>
                <v-flex xs7>
                    <v-layout align-center>
                        <v-flex xs4>
                            <span class="fs-text subheading">
                                <strong>For Official Use Only</strong>
                            </span>
                        </v-flex>
                        <v-flex xs8 pr-3>
                            <v-layout align-center pl-2 fill-height>
                                <div style="width: 30%">
                                    <span class="fs-text subheading">Receipt No.</span>
                                </div>
                                <div style="width: 10%" v-for="i in 7" :key="i">
                                    <v-text-field
                                            solo
                                            flat
                                            hide-details
                                            height="32px"
                                            :class="i === 1 && 'primary-border-left'"
                                            class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                                            type="number"
                                            max="9">
                                    </v-text-field>
                                </div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout align-center mt-4>
                        <v-flex xs4>
                        </v-flex>
                        <v-flex xs8 pr-3>
                            <v-layout align-center fill-height>
                                <div style="width: 20%" class="text-xs-right pr-3">
                                    <span class="fs-text subheading">
                                        <strong>Date</strong>
                                    </span>
                                </div>

                                <div style="width: 10%" v-for="i in 8" :key="i">
                                    <v-text-field
                                            solo
                                            flat
                                            hide-details
                                            height="32px"
                                            :class="i === 1 && 'primary-border-left'"
                                            class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                                            type="number"
                                            max="9">
                                    </v-text-field>
                                </div>
                            </v-layout>
                            <v-layout align-center pl-2 fill-height>
                                <v-flex xs2 mr-2></v-flex>
                                <div style="width: 10%" class="text-xs-center" v-for="i in 8" :key="i">
                                    <small class="fs-text ">
                                        <template v-if="i < 3">
                                            d
                                        </template>
                                        <template v-else-if="i < 5">
                                            m
                                        </template>
                                        <template v-else>
                                            y
                                        </template>
                                    </small>
                                </div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs5>
                    <v-textarea solo flat hide-details class="primary-border-all mt-0 pt-0"></v-textarea>
                </v-flex>
            </v-layout>
        </v-flex>
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