<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="F"
                    text="Payer Information"
                    class="ml-1"
                    style="border-bottom: 0px !important;"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs5></v-flex>
        <v-flex xs3 pl-5>
            <v-layout fill-height align-end>
                <span class="fs-text">Payer P.E. No.</span>
            </v-layout>
        </v-flex>
        <v-flex xs7 class="pl45">
            <v-layout row>
                <div class="w5 border-left border-right border-top" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Business Name</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border primary-border-top"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text" style="line-height: 1">Business</span>
                        <small class="fs-text" style="line-height: 1">House No.</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text" style="line-height: 1">Address</span>
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
                <div class="w9 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text">Postcode</span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 6" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"
                                  type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w7 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between pl-1>
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
            <v-divider color="#008f7e"></v-divider>

        </v-flex>
        <v-flex xs5>
            <v-layout column fill-height justify-space-between>
                <div>
                    <v-layout row align-center justify-end>
                        <span class="fs-text mr-2">F1</span>
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
                </div>
                <div>
                    <v-layout pl-2>
                        <v-flex xs2 pr-2></v-flex>
                        <v-flex xs10>
                            <span class="fs-text">Date</span>
                        </v-flex>
                    </v-layout>
                    <v-layout align-center pl-2>
                        <v-flex xs2 pr-2 class="text-xs-right">
                            <span class="fs-text">F2</span>
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