<template>
    <v-layout row wrap>
        <v-flex xs5>
            <subheader
                    title="B"
                    text="Number of Payees"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>

        <v-flex xs12 class="pl45">
            <v-layout>
                <v-flex xs8 pl-2>
                    <v-layout fill-height align-center>
                        <span class="fs-text">Number of Payees (FSS Main or FSS Other Tax Deduction Method applies)</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">B1</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 5" :key="i">
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
                <v-flex xs8 pl-2>
                    <v-layout fill-height align-center>
                        <span class="fs-text">Number of Payees (FSS Part time Tax Deduction Method applies)</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">B2</span>
                            </v-layout>
                        </div>
                        <div class="w2" v-for="i in 5" :key="i">
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