<template>
    <main id="FS7" class="fs-form">
        <div ref="toPdf">
            <v-layout row wrap class="total_layout" style="width: 1240px; height:1753px " id="toPdf">
                <v-flex style="width: 10.4%" class="left-brand">
                    <img id="side_mark" src="../assets/FS7.jpg">
                </v-flex>
                <v-flex style="width: 89.6%" pt-2>
                    <v-card-text class="pl-0">
                        <v-layout>
                            <v-flex xs7 ml-1>
                                <small class="fs-text" style="display: block">
                                    The Inland Revenue Department uses the information provided, to process this form in accordance with the
                                    Income Tax Acts and subsidiary legislation. We may check information provided by you, or information about
                                    you provided by a third party, with other information held by us. We will not display information about you to
                                    anyone outside the Inland Revenue Department unless permitted by law. The Inland Revenue Department
                                    treats your personal information in accordance with the Data Protection Act 2001 (Cap 440) to protect your
                                    privacy. Any queries may be addressed to The Data Controller Inland Revenue Department, Floriana FRN 0170
                                </small>
                            </v-flex>
                            <v-flex xs5 class="white"></v-flex>
                        </v-layout>
                        <v-layout row wrap class="pl45">
                            <v-flex xs3>
                                <h1 class="display-4 fs-text">FS7</h1>
                            </v-flex>
                            <v-flex xs9 class="text-xs-left pt-2">
                                <h4 class="display-1 fs-text">
                                    Final Settlement System (FSS)<br>Payer's Annual Reconciliation<br/>Statement
                                </h4>
                            </v-flex>
                        </v-layout>

                        <payer></payer>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <issued></issued>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <emoluments></emoluments>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <deductions></deductions>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <social></social>

                        <maternity></maternity>

                        <v-divider class="my-2" color="#007840"></v-divider>

                        <information></information>

                    </v-card-text>
                </v-flex>
            </v-layout>
        </div>
    </main>
</template>

<script>
    import Payer from './FS7/payer'
    import Issued from './FS7/issued'
    import Emoluments from './FS7/emoluments'
    import Deductions from './FS7/deductions'
    import Information from './FS7/information'
    import Social from './FS7/social'
    import Maternity from './FS7/maternity'
    import hasPrint from './mixins/hasPrint'

    export default {
        mixins: [hasPrint],
        name: 'FS7',
        components: {
            Payer,
            Emoluments,
            Deductions,
            Information,
            Issued,
            Social,
            Maternity
        }
    }
</script>

<style>
    @import '../../../../../../assets/css/forms.css';

    #FS7 .fs-text{
        color: #007840;
    }
    #FS7 .primary-bg{
        background-color: #aaceba;
    }
    #FS7 .border-top {
        border-top: 1px solid #007840;
    }

    #FS7 .border-bottom {
        border-bottom: 1px solid #007840;
    }

    #FS7 .border-right {
        border-right: 1px solid #007840;
    }

    #FS7 .border-left {
        border-left: 1px solid #007840;
    }

    #FS7 .border-all {
        border: 1px solid #007840;
    }
</style>