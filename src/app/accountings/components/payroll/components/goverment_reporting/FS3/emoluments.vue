<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="C"
                    text="Gross Emoluments"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs8></v-flex>

        <v-flex xs12>
            <v-layout>
                <v-flex xs5 pl-2 mt-2>
                    <span class="fs-text">Gross Emoluments (FSS Main or FSS Other applies)</span>
                </v-flex>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C1</span>
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
                </div>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3">
                            <v-layout fill-height align-center justify-space-around pr-1>
                                <strong class="fs-text">Cat 1</strong>
                                <span class="fs-text">C5</span>
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
                </div>
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-layout>
                <v-flex xs5 pl-2 mt-2>
                    <span class="fs-text">Gross Emoluments (FSS Part-time method applies)</span>
                </v-flex>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C2</span>
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
                </div>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3">
                            <v-layout fill-height align-center justify-space-around pr-1>
                                <strong class="fs-text">Cat 2</strong>
                                <span class="fs-text">C6</span>
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
                </div>
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-layout>
                <v-flex xs5 pl-2 mt-2>
                    <span class="fs-text">Fringe benefits - Excluding Share Options (<small>Total of Boxes(C5+C6+C7)-C8)</small></span>
                </v-flex>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C3</span>
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
                </div>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3">
                            <v-layout fill-height align-center justify-space-around pr-1>
                                <strong class="fs-text">Cat 3</strong>
                                <span class="fs-text">C7</span>
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
                </div>
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-layout>
                <v-flex xs5 pl-2 mt-2>
                    <span class="fs-text">Share Options fringe benefits taxed at 15%</span>
                </v-flex>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C3a</span>
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
                </div>
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-layout>
                <v-flex xs5 pl-2 mt-2>
                    <strong class="fs-text">Total Gross Emoluments Emoluments and Fringe Benefits</strong>
                </v-flex>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C4</span>
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
                </div>
            </v-layout>
        </v-flex>

        <v-flex xs12>
            <v-layout>
                <v-flex xs2 pl-2 mt-2>
                </v-flex>
                <div style="width: 52%">
                    <v-layout fill-height align-center>
                        <span class="fs-text">Non Taxable Car Cash Allowance (50% of Allowance up to a maximum of €1170)</span>
                    </v-layout>
                </div>
                <div style="width: 27%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C8</span>
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