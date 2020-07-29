<template>
    <main id="fs5" class="fs-form">
        <div ref="toPdf">
            <v-layout row wrap class="total_layout" style="width: 1240px; height:1753px " id="toPdf">
                <v-flex style="width: 15.5%" class="left-brand">
                    <img id="side_mark" src="../assets/FS5.jpg">
                </v-flex>
                <v-flex style="width: 84.5%" pt-2>
                    <v-card-text class="pl-0">

                        <v-layout row wrap class="pl45 mb-4">
                            <v-flex xs3>
                                <h1 class="display-4 fs-text">FS5</h1>
                            </v-flex>
                            <v-flex xs9 class="text-xs-left pt-2">
                                <h4 class="display-1 fs-text">
                                    Final Settlement System (FSS)<br>Payer's Monthly Payment Advice
                                </h4>
                            </v-flex>
                        </v-layout>

                        <payer></payer>

                        <v-divider class="my-3" color="#007840"></v-divider>

                        <payees></payees>

                        <v-divider class="my-3" color="#007840"></v-divider>

                        <emoluments></emoluments>

                        <v-divider class="my-3" color="#007840"></v-divider>

                        <deductions></deductions>

                        <v-divider class="my-3" color="#007840"></v-divider>

                        <payment></payment>

                    </v-card-text>
                </v-flex>
            </v-layout>
        </div>
    </main>
</template>

<script>
    import Payer from './FS5/payer'
    import Payees from './FS5/payees'
    import Emoluments from './FS5/emoluments'
    import Deductions from './FS5/deductions'
    import Payment from './FS5/payment'
    import hasPrint from './mixins/hasPrint'

    export default {
        mixins: [hasPrint],
        name: 'FS5',
        components: {
            Payer,
            Emoluments,
            Deductions,
            Payees,
            Payment
        }
    }
</script>

<style>
    @import '../../../../../../assets/css/forms.css';

    #fs5 .fs-text {
        color: #007840;
    }

    #fs5 .primary-bg {
        background-color: #aaceba;
    }

    #fs5 .border-top {
        border-top: 1px solid #007840;
    }

    #fs5 .border-bottom {
        border-bottom: 1px solid #007840;
    }

    #fs5 .border-right {
        border-right: 1px solid #007840;
    }

    #fs5 .border-left {
        border-left: 1px solid #007840;
    }
</style>