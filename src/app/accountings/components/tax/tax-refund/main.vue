<template>
    <section class="tax">
        <v-toolbar dense flat class="mb-3" height="38">
            <v-toolbar-items>
                <v-btn
                        flat
                        @click="tab = 'index'"
                        :color="tab === 'index' ? 'primary' : 'black'">Index
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'section1'"
                        :color="tab === 'section1' ? 'primary' : 'black'">Section 1
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'section2'"
                        :color="tab === 'section2' ? 'primary' : 'black'">Section 2
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'section3'"
                        :color="tab === 'section3' ? 'primary' : 'black'">Section 3.1
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'section4'"
                        :color="tab === 'section4' ? 'primary' : 'black'">Section 4
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'summary'"
                        :color="tab === 'summary' ? 'primary' : 'black'">Summary
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'payment'"
                        :color="tab === 'payment' ? 'primary' : 'black'">Payment
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'declaration'"
                        :color="tab === 'declaration' ? 'primary' : 'black'">Declaration
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'attachments'"
                        :color="tab === 'attachments' ? 'primary' : 'black'">Attachments
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-flex xs8 offset-xs2>
            <index v-show="tab === 'index'"></index>
            <section1 v-show="tab === 'section1'"></section1>
            <section2 v-show="tab === 'section2'"></section2>
            <section3 v-show="tab === 'section3'"></section3>
            <section4 v-show="tab === 'section4'"></section4>
            <summaryTab v-show="tab === 'summary'"></summaryTab>
            <payment v-show="tab === 'payment'"></payment>
            <declaration v-show="tab === 'declaration'"></declaration>
            <attachments v-show="tab === 'attachments'"></attachments>
        </v-flex>
    </section>
</template>

<script>
    import Index from './index/main'
    import Section1 from './section1/main'
    import Section2 from './section2/main'
    import Section3 from './section3/main'
    import Section4 from './section4/main'
    import summaryTab from './summary/main'
    import Payment from './payment/main'
    import Declaration from './declaration/main'
    import Attachments from './attachments/main'

    export default {
        components: {
            Index,
            Section1,
            Section2,
            Section3,
            Section4,
            summaryTab,
            Payment,
            Declaration,
            Attachments
        },
        data: () => ({
            tab: 'index',
        })
    }
</script>