<template>
    <v-layout row wrap ml-2 class="primary-bg-light">
        <subheader title="C" text="FSS Part-Time Tax Deduction"></subheader>
        <span class="fs-text subheading mt-3">Effective Date for application of Part time rate</span>
        <v-flex xs12>
            <v-layout pr-2 mt-3>
                <div class="w7 border-right">
                    <v-layout fill-height align-center justify-end pr-2>
                        <strong class="fs-text">C9</strong>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i" style="padding-bottom: 1px">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
                            type="number"
                            max="9">
                    </v-text-field>
                </div>
            </v-layout>

            <v-layout mt-5 pt-5>
                <span class="title fs-text">Part time tax deduction rate</span>
            </v-layout>
            <v-layout my-5>
                <div class="w7"></div>
                <div class="w8">
                    <v-layout >
                        <span class="body-2 fs-text">(insert rate which is applicable)</span>
                    </v-layout>
                    <v-layout justify-center mt-3>
                        <v-flex xs2>
                            <strong class="fs-text">C10</strong>
                        </v-flex>
                        <v-flex xs2>
                            <v-checkbox hide-details class="mt-0 pt-0"></v-checkbox>
                        </v-flex>
                        <v-flex xs6>
                            <strong class="fs-text">0% tax rate</strong>
                        </v-flex>
                    </v-layout>
                    <v-layout justify-center mt-3>
                        <v-flex xs2>
                            <strong class="fs-text">C11</strong>
                        </v-flex>
                        <v-flex xs2>
                            <v-checkbox hide-details class="mt-0 pt-0"></v-checkbox>
                        </v-flex>
                        <v-flex xs6>
                            <strong class="fs-text">7.5% tax rate</strong>
                        </v-flex>
                    </v-layout>
                    <v-layout justify-center mt-3>
                        <v-flex xs2>
                            <strong class="fs-text">C12</strong>
                        </v-flex>
                        <v-flex xs2>
                            <v-checkbox hide-details class="mt-0 pt-0"></v-checkbox>
                        </v-flex>
                        <v-flex xs6>
                            <strong class="fs-text">15% tax rate</strong>
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