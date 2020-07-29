<template>
    <v-container grid-list-md @keyup.esc="isOnfidoModalOpen = false">
        <v-list two-line subheader>
            <v-subheader>Identities</v-subheader>

            <v-list-tile
                    v-for="(user, index) in identities"
                    v-if="identities.length"
                    :key="'identity' + index"
                    avatar
                    @click=""
            >
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text'">group</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ user.firstName }} {{ user.lastName }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                        <v-btn color="primary" class="pr-3 pl-3" @click="createApplicant(user)" v-if="!existsApplicant(user)">Verify your identity</v-btn>
                        <v-btn color="primary" class="pr-3 pl-3" @click="getJwtToken(getApplicantByUser(user))"
                               v-if="getApplicantByUser(user) && !existApplicantChecks(user)">
                            Verify your identity
                        </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>

        <v-flex xs12>
            <div :id="'onfido-mount'"></div>
        </v-flex>

        <v-layout row wrap v-if="!corporate.company.id">
            <v-flex xs12>
                <v-alert type="warning" :value="true">
                    You should create a company before identity verification
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Onfido from 'onfido-sdk-ui'
    import { apiUrl } from '@/config'
    import * as identityService from '../mlro/identity-verification/service'

    export default {
        data() {
            return {
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

            identities() {
                return this.corporate.data.involvements.types.filter(type => type.value === 'individual')
            }
        },

        mounted() {
            this.getApplicants()
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            ...mapActions(['setMessage']),

            applicantIsClear(applicant) {
                return applicant.checks.filter(check => check.result === 'clear').length
            },

            createApplicant(applicant) {
                this.$http.post('companies/' + this.corporate.company.id + '/applicants', applicant).then(response => {
                    let applicant = response.data.data

                    this.getJwtToken(applicant)
                })
            },

            createCheck(applicant) {
                return this.$http.post('onfido/applicants/' + applicant.applicant_id + '/checks').then(response => {
                    applicant.checks = response.data.data

                    return response
                })
            },

            getJwtToken(applicant) {
                if(!applicant) {
                    return false
                }

                applicant.loading = true
                this.$http.get('onfido/applicants/' + applicant.applicant_id + '/jwt').then(response => {
                    applicant.jwtToken = response.data.data.token
                    applicant.is_verification = true
                    applicant.loading = false

                    this.initOnfido(applicant)
                })
            },

            existsApplicant(user) {
                return this.applicants.filter(applicant => {
                    return applicant.data.first_name + applicant.data.last_name == user.firstName + user.lastName
                }).length
            },

            getApplicantByUser(user) {
                return this.applicants.find(applicant => {
                    return applicant.data.first_name + applicant.data.last_name == user.firstName + user.lastName
                })
            },

            existApplicantChecks(user) {
                let applicant = this.getApplicantByUser(user)

                if(applicant) {
                    return applicant.checks.length
                }

                return false
            },

            initOnfido(applicant) {
                var that = this

                applicant.onfido = Onfido.init({
                    useModal: true,
                    isModalOpen: true,
                    steps: [
                        {
                            type:'welcome',
                            options: {
                                title: "Identity verification!",
                                descriptions: ["To verify your Identity we need your identity document and a access to your camera for a live photo."],
                            }
                        },
                        'document',
                        'face',
                        'complete'
                    ],
                    // the JWT token that you generated earlier on
                    token: applicant.jwtToken,
                    // id of the element you want to mount the component on
                    containerId: 'onfido-mount',
                    onComplete() {
                        // You can now trigger your backend to start a new check
                        that.createCheck(applicant)
                            .then(response => {
                                applicant.onfido.tearDown()

                                this.setMessage({ type: 'success', message: 'Congratulations! You have successfully verified your identity!' })
                            })
                    },
                })
            },

            getApplicants() {
                identityService.getApplicants(this.corporate.company.id)
                    .then(response => {
                        this.applicants = response.data
                    })
            },
        },

        destroyed() {
            this.applicants
                .filter(applicant => applicant.is_verification)
                .map(applicant => applicant.onfido.tearDown())
        }
    }
</script>