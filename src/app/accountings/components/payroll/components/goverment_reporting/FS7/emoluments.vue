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

        <v-layout>
            <v-flex xs7 pl-2></v-flex>
            <v-flex xs4 class="text-xs-center">
                <span class="fs-text">€</span>
            </v-flex>
        </v-layout>

        <v-flex xs12>
            <v-layout>
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Gross Emoluments (FSS Main or FSS Other applies)</span>
                </v-flex>
                <div style="width:30%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C1</span>
                            </v-layout>
                        </div>
                        <div style="width: 13%" v-for="i in 7" :key="i">
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
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Gross Emoluments (FSS Part-time method applies)</span>
                </v-flex>
                <div style="width:30%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C2</span>
                            </v-layout>
                        </div>
                        <div style="width: 13%" v-for="i in 7" :key="i">
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
                <v-flex xs7 pl-2 mt-2>
                    <span class="fs-text">Taxable Fringe benefits (Total of all Categories less any Non-Taxable Car Allowances)</span>
                </v-flex>
                <div style="width:30%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C3</span>
                            </v-layout>
                        </div>
                        <div style="width: 13%" v-for="i in 7" :key="i">
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
                <v-flex xs7 pl-2 mt-2>
                    <strong class="fs-text">Total Gross Emoluments and Fringe Benefits</strong>
                </v-flex>
                <div style="width:30%">
                    <v-layout row>
                        <div class="w3 pr-2">
                            <v-layout fill-height align-center justify-end>
                                <span class="fs-text">C4</span>
                            </v-layout>
                        </div>
                        <div style="width: 13%" v-for="i in 7" :key="i">
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