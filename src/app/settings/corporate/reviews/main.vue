<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Company Profile</div>
        </v-layout>
        <v-tabs grow color="accent" v-model="tab">
            <v-tab key="bank-request-reasons">Approval/disapproval reasons</v-tab>
            <v-tab key="keywords-filter">Keywords filter</v-tab>
            <v-tab-item key="bank-request-reasons">
                <bank-request-reasons v-if="tab === 0"></bank-request-reasons>
            </v-tab-item>
            <v-tab-item key="keywords-filter">
                <keywords-filter v-if="tab === 1"></keywords-filter>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import BankRequestReasons from './components/bank-request-reasons/main'
    import KeywordsFilter from './components/keywords-filter/main'

    export default {
        data() {
            return {
                tab: 'questions'
            }
        },

        components: {BankRequestReasons, KeywordsFilter}
    }
</script>
