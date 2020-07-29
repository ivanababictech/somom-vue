<template>
    <v-layout row wrap>
        <subheader title="A" text="General Information" class="ml-1"></subheader>
        <v-flex xs12 class="pl45">
            <v-layout row>
                <div class="w6 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text">ID Card/IT Reg. No. <strong class="ml-2">A1</strong></span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 9" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border" type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w6 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text">Spouse ID Card/IT No<strong class="ml-1">A2</strong></span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 9" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border" type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w7 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Date of Marriage <br/> <small>(if applicable)</small></span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border" type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">Surname</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text" style="line-height: 1">First Name</span>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text" style="line-height: 1">Address</span>
                        <small class="fs-text" style="line-height: 1">House /No.</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-end px-1>
                        <small class="fs-text" style="line-height: 1">Street</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>
            <v-layout row>
                <div class="w5 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-end px-1>
                        <small class="fs-text" style="line-height: 1">Locality</small>
                    </v-layout>
                </div>
                <div class="w10">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"></v-text-field>
                </div>
            </v-layout>

            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w8 border-left border-right" style="background: white">
                    <v-layout fill-height align-center pl-1>
                        <span class="fs-text">Postcode</span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 7" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border" type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <v-layout row>
                <div class="w7 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text">Date of Birth</span>
                        <strong class="fs-text">A3</strong>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border" type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>

            <v-layout row>
                <div class="w6 border-left border-right" style="background: white">
                    <v-layout fill-height align-center justify-space-between px-1>
                        <span class="fs-text">Social Security No</span>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 9" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border" type="number" max="9"></v-text-field>
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
        }
    }
</script>