<template>
    <main id="fs3" class="fs-form">
        <div ref="toPdf">
            <v-layout row wrap class="total_layout" style="width: 1240px; height:1753px " id="toPdf">
                <v-flex style="width: 15.5%" class="left-brand">
                    <img id="side_mark" src="../assets/FS3.jpg">
                </v-flex>
                <v-flex style="width: 84.5%" pt-2>
                    <v-card-text class="pl-0">

                        <v-layout row wrap class="pl45">
                            <v-flex xs3>
                                <h1 class="display-4 fs-text">FS3</h1>
                            </v-flex>
                            <v-flex xs9 class="text-xs-left pt-2">
                                <h4 class="display-1 fs-text">
                                    Final Settlement System (FSS)<br>Payee Statement of Earnings
                                </h4>
                            </v-flex>
                        </v-layout>

                        <payee></payee>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <period></period>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <emoluments></emoluments>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <deductions></deductions>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <security></security>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <information></information>

                    </v-card-text>
                </v-flex>
            </v-layout>
        </div>
    </main>
</template>

<script>
    import Payee from './FS3/payee'
    import Period from './FS3/period'
    import Emoluments from './FS3/emoluments'
    import Deductions from './FS3/deductions'
    import Information from './FS3/information'
    import Security from './FS3/security'
    import hasPrint from './mixins/hasPrint'

    export default {
        mixins: [hasPrint],
        name: 'FS3',
        components: {
            Payee,
            Emoluments,
            Deductions,
            Information,
            Period,
            Security
        }
    }
</script>

<style>
    @import '../../../../../../assets/css/forms.css';

    #fs3 .fs-text{
        color: #007840;
    }
    #fs3 .primary-bg{
        background-color: #aaceba;
    }
    #fs3 .border-top {
        border-top: 1px solid #007840;
    }

    #fs3 .border-bottom {
        border-bottom: 1px solid #007840;
    }

    #fs3 .border-right {
        border-right: 1px solid #007840;
    }

    #fs3 .border-left {
        border-left: 1px solid #007840;
    }
</style>