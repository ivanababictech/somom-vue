<template>
    <v-layout row wrap>
        <v-flex xs8>
            <subheader
                    title="D"
                    text="Tax Deductions and SSC due to the Commissioner for Revenue"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs4>
            <v-layout fill-height>
                <v-flex xs10 fill-height>
                    <v-layout align-end justify-center fill-height>
                        <span class="fs-text">€</span>
                    </v-layout>
                </v-flex>
                <v-flex xs1 fill-height>
                    <v-layout align-end fill-height>
                        <span class="fs-text">c</span>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>


        <v-flex xs12 class="pl45">
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Tax Deductions (FSS Main or FSS Other applies)</span>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D1</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 7" :key="i">
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
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Tax Deductions (FSS Part-time method applies)</span>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D2</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 7" :key="i">
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
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Tax Arrears Deductions (as per amount on PCU2(A))</span>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D3</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 7" :key="i">
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
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <strong class="fs-text">Total Tax Deductions</strong>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D4</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 7" :key="i">
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

            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Social Security Contributions</span>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D5</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 9" :key="i">
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

            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Maternity Fund Contributions</span>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D5a</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 9" :key="i">
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

            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <strong class="fs-text">Total Due to the Commissioner for Revenue</strong>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">D6</span>
                            </v-layout>
                        </div>
                        <v-flex xs1 v-for="i in 9" :key="i">
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
</template>

<script>
    import Subheader from '../components/subheader'
    export default {
        components: {
            Subheader
        }
    }
</script>