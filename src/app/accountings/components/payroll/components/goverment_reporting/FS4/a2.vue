<template>
    <v-layout row wrap ml-2>
        <subheader title="A" text="General Information"></subheader>

        <v-flex xs12>
            <v-layout row>
                <div class="w9" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text">ID Card/IT Reg. No. </span>
                        <strong class="ml-2 fs-text">A4</strong>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 6" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"
                                  type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w9" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout column fill-height>
                        <v-flex xs12 px-1>
                            <v-layout fill-height align-center>
                                <span class="fs-text" style="line-height: 1">Business Name</span>
                            </v-layout>
                        </v-flex>
                        <v-divider color="#008f7e"></v-divider>
                    </v-layout>
                </div>
                <div class="w6">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            class="pt-0 mt-0 mini-input primary-border">
                    </v-text-field>
                </div>
            </v-layout>
            <v-flex xs12 style="border-left: 1px solid#008f7e;background: white">
                <v-text-field
                        disabled
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border">
                </v-text-field>
            </v-flex>
            <v-flex xs12 style="border-left: 1px solid#008f7e;background: white;padding-bottom: 2px">
                <v-text-field
                        disabled
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border">
                </v-text-field>
            </v-flex>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row wrap>
                <div class="w9" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout column fill-height>
                        <v-flex xs12 px-1>
                            <v-layout fill-height align-center>
                                <span class="fs-text" style="line-height: 1">Business Address</span>
                            </v-layout>
                        </v-flex>
                        <v-divider color="#008f7e"></v-divider>
                    </v-layout>
                </div>
                <div class="w6">
                    <v-text-field
                            disabled
                            solo
                            flat
                            hide-details
                            height="32px"
                            class="pt-0 mt-0 mini-input primary-border">
                    </v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout fill-height align-center justify-end px-1>
                        <small class="fs-text" style="line-height: 1">House /No</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
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
                <div class="w5" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout fill-height align-center justify-end px-1>
                        <small class="fs-text" style="line-height: 1">Locality</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            class="pt-0 mt-0 mini-input primary-border">
                    </v-text-field>
                </div>
            </v-layout>

            <v-flex xs12 style="border-left: 1px solid#008f7e;background: white;padding-bottom: 1px">
                <v-divider color="#008f7e"></v-divider>
                <v-text-field
                        disabled
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border">
                </v-text-field>
            </v-flex>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w8" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text">Postcode</span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 7" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"
                                  type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5" style="border-left: 1px solid#008f7e;border-right: 1px solid#008f7e;background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Telephone No.</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px"
                                  class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import Subheader from '../components/subheader'

    export default {
        components: {
            Subheader
        },
        data() {
            return {
                zip: null,
            }
        }
    }
</script>