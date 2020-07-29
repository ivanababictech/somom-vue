<template>
    <v-layout row wrap>
        <v-tabs v-model="tab" class="fill-width">
            <v-tab grow v-for="tab in tabs" :key="tab">
                {{ tab }}
            </v-tab>
            <v-tab-item key="General information">
                <template v-if="tab === 0">
                    <principal-activity :principal-activity="profile.principalActivity"></principal-activity>
                    <banks :banks="profile.banks"></banks>
                    <source-funds :source-funds="profile.sourceFunds"></source-funds>
                    <borrowers :borrowers="profile.borrowers"></borrowers>
                    <lenders :lenders="profile.lenders"></lenders>
                </template>
            </v-tab-item>
            <v-tab-item key="Trading activities">
                <template v-if="tab === 1">
                    <trading-activities :trading="profile.trading"></trading-activities>
                </template>
            </v-tab-item>
            <v-tab-item key="Investments activities">
                <template v-if="tab === 2">
                    <investments-activities :investments="profile.investments"></investments-activities>
                </template>
            </v-tab-item>
        </v-tabs>
    </v-layout>
</template>

<script>
    import PrincipalActivity from './principal-activity';
    import TradingActivities from './trading-activities';
    import InvestmentsActivities from './investments-activities';
    import Banks from './banks';
    import SourceFunds from './source-funds';
    import Borrowers from './borrowers';
    import Lenders from './lenders';

    export default {
        props: ['profile'],

        data:() => ({
                tab: 0,
                tabs: [
                    'General information',
                    'Trading activities',
                    'Investments activities'
                ]
            }
        ),

        mounted() {
            if (Array.isArray(this.profile.sourceFunds))
                this.profile.sourceFunds = {
                    amount: null,
                    description: null
                };
        },

        components: {
            PrincipalActivity,
            Banks,
            SourceFunds,
            TradingActivities,
            InvestmentsActivities,
            Borrowers,
            Lenders,
        }
    }
</script>