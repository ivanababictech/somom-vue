<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="A"
                    text="Payer Information"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs8></v-flex>
        <v-flex xs7 class="pl45" mt-1>
            <v-layout row class="border-top">
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text" style="line-height: 1">Address</span>
                        <small class="fs-text" style="line-height: 1">House /No.</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-end px-1>
                        <small class="fs-text" style="line-height: 1">Street</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-end px-1>
                        <small class="fs-text" style="line-height: 1">Locality</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>

            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w7 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text">Telephone Number</span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"
                                  type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>

            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Principal's Full Name</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Principal's Position</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Principal's Signature</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#007840"></v-divider>
            <v-layout mt-2>
                <v-flex xs8>
                    <span class="fs-text">
                        Have you paid or reimbursed the cost of Childcare Facility for the benefit of the Employees?
                    </span>
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-center>
                        <div>
                            <v-radio-group hide-details row class="mt-0 pt-0">
                                <v-radio label="Yes" :value="1" color="#007840"></v-radio>
                                <v-radio label="No" :value="0" color="#007840"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs8></v-flex>
                <v-flex xs1 class="text-xs-right">
                    <span class="fs-text">Amount</span>
                </v-flex>
                <v-flex xs3 class="text-xs-right">
                    <span class="fs-text">No. of Employees</span>
                </v-flex>
            </v-layout>
            <v-layout align-center>
                <v-flex xs8>
                    <span class="fs-text">
                       If yes insert amount paid and number of Employees
                    </span>
                </v-flex>
                <v-flex xs2 >
                    <v-layout fill-height align-center>
                        <span class="fs-text mr-2">€</span>
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border-all">
                        </v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs2 ml-2 px-2>
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            class="pt-0 mt-0 mini-input primary-border-all">
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs5>
            <v-layout justify-end>
                <span class="subheading fs-text mr-1 ">For Year Ended 31 December</span>
            </v-layout>
            <v-layout align-center justify-end>
                <strong class="fs-text ml-3 mr-2">A1</strong>
                <v-flex xs1 v-for="i in 4" :key="i">
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
            <v-layout mt-3>
                <v-flex xs6></v-flex>
                <span class="fs-text">Payer P.E. No.</span>
            </v-layout>
            <v-layout row align-center>
                <v-flex xs5></v-flex>
                <v-flex xs1 pl-2>
                    <strong class="fs-text">A2</strong>
                </v-flex>
                <v-flex xs1 v-for="i in 6" :key="i">
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

            <v-layout mt-3>
                <v-flex xs1></v-flex>
                <span class="fs-text">IT Reg. No.</span>
            </v-layout>

            <v-layout row align-center>
                <v-flex xs1 pl-2>
                    <strong class="fs-text">A3</strong>
                </v-flex>
                <v-flex xs1 v-for="i in 10" :key="i">
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

            <v-layout mt-3>
                <v-flex xs1></v-flex>
                <span class="fs-text">ETC Reg. No.</span>
            </v-layout>
            <v-layout row align-center>
                <v-flex xs1 pl-2></v-flex>
                <v-flex xs1 v-for="i in 10" :key="i">
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

            <div class="mt-3">
                <v-layout pl-2>
                    <v-flex xs2 pr-2></v-flex>
                    <v-flex xs10>
                        <span class="fs-text">Date</span>
                    </v-flex>
                </v-layout>
                <v-layout align-center pl-2>
                    <v-flex xs2 pr-2 class="text-xs-right">
                        <span class="fs-text">A4</span>
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
                    <v-flex xs2></v-flex>
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
            </div>
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
