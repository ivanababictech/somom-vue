<template>
    <v-container grid-list-md>
        <v-list two-line subheader>
            <v-subheader>Applicants</v-subheader>

            <v-list-tile
                    v-for="(applicant, index) in applicants"
                    :key="'applicant' + index"
                    avatar
                    @click="showChecks(applicant)"
            >
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text'">group</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ applicant.data.first_name }} {{ applicant.data.last_name }}</v-list-tile-title>
                    <v-list-tile-sub-title>Some text</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-layout row>
                        <v-btn class="mr-1 pr-1 pl-1" color="success" v-if="applicantIsClear(applicant)">Verified</v-btn>
                    </v-layout>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider inset></v-divider>
        </v-list>

        <v-layout row wrap v-if="!corporate.company.id">
            <v-flex xs12>
                <v-alert type="warning" :value="true">
                    You should create a company before identity verification
                </v-alert>
            </v-flex>
        </v-layout>
        <identity-checks :applicant="identityApplicant"></identity-checks>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import { apiUrl } from '@/config'
    import IdentityChecks from './components/checks'
    import * as identityService from './service'

    export default {
        data() {
            return {
                checks: [],
                apiUrl: apiUrl,
                applicants: [],
                identityApplicant: {}
            }
        },

        props: ['corporate'],

        computed: {
            ...mapGetters({
                dialogs: 'accounting/dialogs'
            }),
        },

        mounted() {
            this.getApplicants()
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            existsApplicant(user) {
                return this.applicants.filter(applicant => {
                    return applicant.data.first_name + applicant.data.last_name == user.firstName + user.lastName
                }).length
            },

            applicantIsClear(applicant) {
                return applicant.checks.filter(check => check.result === 'clear').length
            },

            getApplicants() {
                identityService.getApplicants(this.corporate.company.id)
                    .then(response => {
                        this.applicants = response.data
                    })
            },

            showChecks(applicant) {
                this.identityApplicant = applicant
                this.$set(this.identityApplicant, 'showChecks' , true)
            }
        },

        components: { IdentityChecks }
    }
</script>