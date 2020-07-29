<template>
    <div>
        <v-layout class="primary-bg">
            <div style="width: 10%" class="border-all">
                <v-layout fill-height align-center justify-center>
                    <span class="fs-text">Month</span>
                </v-layout>
            </div>
            <div class="w3 border-top border-bottom border-right">
                <v-layout fill-height align-center justify-center>
                    <span class="fs-text">Receipt No.</span>
                </v-layout>
            </div>
            <div style="width: 10%" class="border-top border-bottom border-right">
                <v-layout fill-height align-center justify-center>
                    <span class="fs-text">Date</span>
                </v-layout>
            </div>
            <div class="w3 border-top border-bottom border-right">
                <v-layout align-center justify-center class="border-bottom">
                    <span class="fs-text">FSS Tax</span>
                </v-layout>
                <v-layout align-center justify-center>
                    <span class="fs-text">€</span>
                </v-layout>
            </div>
            <div class="w3 border-top border-bottom border-right">
                <v-layout align-center justify-center class="border-bottom">
                    <span class="fs-text">SSC</span>
                </v-layout>
                <v-layout align-center justify-center>
                    <v-flex xs9 class="text-xs-center">
                        <span class="fs-text">€</span>
                    </v-flex>
                    <v-flex xs3 class="text-xs-center border-left">
                        <span class="fs-text">c</span>
                    </v-flex>
                </v-layout>
            </div>
            <div class="w3 border-top border-bottom border-right">
                <v-layout align-center justify-center class="border-bottom">
                    <span class="fs-text">Maternity Fund</span>
                </v-layout>
                <v-layout align-center justify-center>
                    <v-flex xs9 class="text-xs-center">
                        <span class="fs-text">€</span>
                    </v-flex>
                    <v-flex xs3 class="text-xs-center border-left">
                        <span class="fs-text">c</span>
                    </v-flex>
                </v-layout>
            </div>
        </v-layout>
        <v-layout v-for="i in 6" :key="i" class="border-bottom">
            <div style="width: 10%;background: white" class="border-left border-right">
                <v-layout fill-height align-center justify-center>
                    <span class="fs-text">{{ months[i + start] }}</span>
                </v-layout>
            </div>
            <div class="w3">
                <v-text-field
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border">
                </v-text-field>
            </div>
            <div style="width: 10%" class="text-xs-center">
                <v-text-field
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border">
                </v-text-field>
            </div>
            <div class="w3">
                <v-text-field
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border">
                </v-text-field>
            </div>
            <div class="w3">
                <v-layout>
                    <v-flex xs9 class="border-right">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </div>
            <div class="w3">
                <v-layout>
                    <v-flex xs9 class="border-right">
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                solo
                                flat
                                hide-details
                                height="32px"
                                class="pt-0 mt-0 mini-input primary-border">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </div>
        </v-layout>
    </div>
</template>

<script>
    export default{
        props: {
            start: {
                type: Number,
                required: false,
                default: -1
            }
        },
        data: () => ({
            months: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ]
        })
    }
</script>