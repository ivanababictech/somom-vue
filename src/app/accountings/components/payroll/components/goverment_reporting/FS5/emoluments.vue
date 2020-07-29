<template>
    <v-layout row wrap>
        <v-flex xs5>
            <subheader
                    title="C"
                    text="Gross Emoluments"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs3></v-flex>
        <v-flex xs4>
            <v-layout fill-height>
                <v-flex xs10 fill-height>
                    <v-layout align-end justify-center fill-height>
                        <span class="fs-text">€</span>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 class="pl45">
            <v-layout>
                <v-flex xs7 pl-2>
                    <v-layout fill-height align-center>
                        <span class="fs-text">Gross Emoluments (FSS Main or FSS Other applies)</span>
                    </v-layout>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C1</span>
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
                <v-flex xs7 pl-2>
                    <v-layout fill-height align-center>
                        <span class="fs-text">Gross Emoluments (FSS Part-time method applies)</span>
                    </v-layout>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C2</span>
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
                <v-flex xs7 pl-2>
                    <v-layout fill-height align-center>
                        <span class="fs-text">Taxable Fringe Benefits (Total of all Categories less any Non-Taxable Car Allowances)</span>
                    </v-layout>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C3</span>
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
                <v-flex xs7 pl-2>
                    <v-layout fill-height align-center>
                        <strong class="fs-text">Total Gross Emoluments and Fringe Benefits</strong>
                    </v-layout>
                </v-flex>
                <v-flex xs5>
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C4</span>
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