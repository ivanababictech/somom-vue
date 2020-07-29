<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Company Profile</div>
        </v-layout>
        <v-tabs grow color="accent" v-model="tab">
            <v-tab key="questions">Questions</v-tab>
            <v-tab key="payment-methods">Payment methods</v-tab>
            <v-tab key="types">Types</v-tab>
            <v-tab-item key="questions">
                <questions v-if="tab === 0"></questions>
            </v-tab-item>
            <v-tab-item key="payment-methods">
                <payment-methods v-if="tab === 1"></payment-methods>
            </v-tab-item>
            <v-tab-item key="types">
                <types v-if="tab === 2"></types>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import Questions from './components/questions/main'
    import PaymentMethods from './components/payment-methods/main'
    import Types from './components/types/main'

    export default {
        data() {
            return {
                tab: 'questions'
            }
        },

        components: {Questions, PaymentMethods, Types}
    }
</script>
