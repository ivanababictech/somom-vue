<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="A"
                    text="Payer Information"
                    class="ml-1"
                    style="border-bottom: 0px !important;"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs8></v-flex>
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
                        <span class="fs-text" style="line-height: 1">Business Address</span>
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
                <div class="w7 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text">Fax Number</span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"
                                  type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>

        </v-flex>
        <v-flex xs5>
            <v-layout column justify-end fill-height pb-4 pr-4>
                <div>
                    <v-layout>
                        <v-flex xs6></v-flex>
                        <span class="fs-text">Payer P.E. No.</span>
                    </v-layout>
                    <v-layout row align-center justify-end>
                        <v-flex xs1 pl-2>
                            <span class="fs-text">A1</span>
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
                </div>
                <div>
                    <v-layout mt-2>
                        <v-flex xs6></v-flex>
                        <span class="fs-text">Payment for Month of</span>
                    </v-layout>
                    <v-layout row align-center justify-end>
                        <v-flex xs1 pl-2>
                            <span class="fs-text">A2</span>
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
