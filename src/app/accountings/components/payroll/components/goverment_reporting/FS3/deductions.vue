<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="D"
                    text="Tax Deductions"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>

        <v-flex xs8></v-flex>

        <v-flex xs10>
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Gross Emoluments (FSS Main or FSS Other applies)</span>
                </v-flex>

                <v-flex xs4>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D1</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 6" :key="i">
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
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Gross Emoluments (Part-time method applies)</span>
                </v-flex>

                <v-flex xs4>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D2</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 6" :key="i">
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
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Tax arrears Deductions (as per amount on PCU2(A))</span>
                </v-flex>

                <v-flex xs4>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D3</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 6" :key="i">
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
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">15% tax on Share Options</span>
                </v-flex>

                <v-flex xs4>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D3a</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 6" :key="i">
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
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <strong class="fs-text">Total Tax Deductions</strong>
                </v-flex>

                <v-flex xs4>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D4</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 6" :key="i">
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
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs2>
            <strong class="fs-text">
                NB: If part-time tax is less than the relative rate the whole emoluments will be charged at normal rates.
            </strong>
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