<template>
    <v-layout row wrap>
        <subheader title="C" text="Part-Time Employment (Qualifying)" class="ml-1"></subheader>

        <v-layout row wrap justify-end class="small-des-row">
            <span class="body-2 fs-text">(tick the correct box)</span>
            <v-flex xs12 class="ml45">
                <v-divider color="#009688"></v-divider>
            </v-flex>
        </v-layout>

        <v-flex xs12 class="ml45 pb-2">
            <tick text="Pensioner" title="C1"></tick>
            <tick text="Full-time student/apprentice" title="C2"></tick>
            <tick text="Employed full-time elsewhere" title="C3"></tick>
            <v-layout row>
                <div class="w7" style="border-right: 1px solid#008f7e">
                    <v-layout fill-height align-center pl-1>
                        <small class="fs-text" style="line-height: 1">If employed full-time elsewhere, provide <br/>full-time employer’s P.E. number
                        </small>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i">
                    <v-text-field solo flat hide-details height="32px" class="pt-0 mt-0 mini-input primary-border"
                                  type="number" max="9"></v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
            <tick text="Married, not employed full-time elsewhere having a spouse<br/>being a full-time employee or pensioner"
                  title="C4" small></tick>
            <v-layout row mt-2 style="border-right: 1px solid #008f7e;border-top: 1px solid #008f7e">
                <div class="w5" style="border-right: 1px solid#008f7e;background: #008f7e;">
                    <v-layout fill-height justify-center align-center>
                        <span class="white--text title">NIL Tax Rate</span>
                    </v-layout>
                </div>
                <div class="w10 ml-2">
                    <small class="fs-text" style="display: block;">
                        Tick box C5 ONLY if your projected income from all sources for the
                        year is expected to be below the taxable limits
                    </small>
                </div>
            </v-layout>
            <v-layout row align-center pt-1 pb-2 pr-2 style="border-left: 1px solid #008f7e;border-right: 1px solid #008f7e">
                <div class="w5"></div>
                <div class="w9 mx-2 pl-1">
                    <v-layout>
                        <div class="w14">
                            <span class="fs-text" style="font-size:11px;display: block;">
                                 Note: You may lose your right to benefit from the
                                reduced rate if you tick this box incorrectly.
                            </span>
                        </div>
                        <div class="w1">
                            <v-layout fill-height align-center>
                                <strong class="fs-text">C5</strong>
                            </v-layout>
                        </div>
                    </v-layout>
                </div>
                <div class="w1">
                    <v-checkbox hide-details class="pt-0 mt-0"></v-checkbox>
                </div>
            </v-layout>
            <v-layout row align-center pr-2 style="border-right: 1px solid #008f7e;border-top: 1px solid #008f7e">
                <div class="w5" style="border-right: 1px solid#008f7e;background: #008f7e;">
                    <v-layout fill-height justify-center align-center>
                        <span class="white--text title">Withhold Tax</span>
                    </v-layout>
                </div>
                <div class="w9 mx-2 pl-1">
                    <v-layout>
                        <div class="w14">
                            <span class="fs-text" style="font-size:11px;display: block;">
                                Tick box C6 if earning income from a qualifying sport
                                activity and opting for final Withholding Tax at 7.5%
                            </span>
                        </div>
                        <div class="w1">
                            <v-layout fill-height align-center>
                                <strong class="fs-text">C6</strong>
                            </v-layout>
                        </div>
                    </v-layout>
                </div>
                <div class="w1">
                    <v-checkbox hide-details class="pt-0 mt-0"></v-checkbox>
                </div>
            </v-layout>
            <v-layout row align-center py-2 pr-2 style="border-left: 1px solid #008f7e;border-right: 1px solid #008f7e">
                <div class="w5"></div>
                <div class="w9 mx-2 pt-1 pl-1">
                    <v-layout>
                        <div class="w14">
                            <span class="fs-text" style="font-size:11px;display: block;">
                                Tick box C7 to instruct your employer to start
                                deducting tax at 15%
                            </span>
                        </div>
                        <div class="w1">
                            <v-layout fill-height align-center>
                                <strong class="fs-text">C7</strong>
                            </v-layout>
                        </div>
                    </v-layout>
                </div>
                <div class="w1">
                    <v-checkbox hide-details class="pt-0 mt-0"></v-checkbox>
                </div>
            </v-layout>
            <v-layout pr-2 style="border-right: 1px solid #008f7e">
                <div class="w7" style="border-left: 1px solid #008f7e;border-right: 1px solid #008f7e">
                    <v-layout align-center fill-height justify-end pr-1>
                        <span class="fs-text" style="font-size:11px;">Effective Date</span><strong class="ml-2 fs-text">C8</strong>
                    </v-layout>
                </div>
                <div class="w1" v-for="i in 8" :key="i" style="padding-bottom: 1px">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            class="pt-0 mt-0 mini-input primary-border primary-border-top"
                            type="number"
                            max="9">
                    </v-text-field>
                </div>
            </v-layout>
            <v-divider color="#008f7e"></v-divider>
        </v-flex>

    </v-layout>
</template>

<script>
    import Subheader from '../components/subheader'
    import Tick from '../components/tick.vue'

    export default {
        components: {
            Subheader,
            Tick
        }
    }
</script>