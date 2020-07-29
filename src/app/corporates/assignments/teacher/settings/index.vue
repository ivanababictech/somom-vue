<template>
    <v-container grid-list-md>
        <div class="headline">SETTINGS</div>
        <v-tabs color="default" grow>
            <v-tab v-for="(tab, index) in tabs" :key="index">
                {{ tab }}
            </v-tab>
            <v-tab-item key="settings">
                <account-names :account-names="settings.accountNames"></account-names>
            </v-tab-item>
            <v-tab-item key="questions">
                <questions :questions="settings.questions" :names="settings.accountNames"></questions>
            </v-tab-item>
            <v-tab-item key="assignment-location">
                <assignment-location :assignment-location="settings.assignmentLocation" :questions="settings.questions"></assignment-location>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import AccountNames from './account-names'
    import Questions from './questions'
    import AssignmentLocation from './assignment-location'

    export default {
        data() {
            return {
                companies: [],
                tabs: ['ACCOUNT NAMES', 'QUESTIONS', 'ASSIGNMENT ALLOCATION'],
            }
        },

        props: ['settings'],

        components: { AccountNames, Questions, AssignmentLocation }
    }
</script>