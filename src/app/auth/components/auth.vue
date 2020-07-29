<template>
    <section class="top-layer">
        <template>
            <div class="top-left-side">

            </div>

            <div class="top-right-side">
                <v-layout>
                    <v-flex class="text-xs-center">
                        <img src="../../../../static/img/logo.png" alt="">
                    </v-flex>
                </v-layout>
                <div class="row justify-content-sm-center">
                    <div class="col-md-10 col-sm-11">
                        <form class="form-layout top-right-form" @submit.prevent="submit">
                            <div class="form-group">
                                <v-text-field v-model="user.email" label="Email"></v-text-field>
                            </div>
                            <div class="form-group">
                                <v-text-field v-model="user.password" :type="'password'" label="Password"></v-text-field>
                            </div>
                            <div class="row">
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label>Or use your</label>
                                        <div class="form-inner">
                                            <ul class="soc-list">
                                                <li><a class="google-plus" href="#" @click="authenticate('google')"><v-icon dark>mdi-google-plus</v-icon></a></li>
                                                <li><a class="linkedin" href="#" @click="authenticate('linkedin')"><v-icon dark>mdi-linkedin</v-icon></a></li>
                                                <li><a class="facebook" href="#" @click="authenticate('facebook')"><v-icon dark>mdi-facebook</v-icon></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-7">
                                    <div class="form-inner">
                                        <p class="right-txt">
                                            <span>Access the beta version</span><br>
                                            30 days free access <br>
                                            No credit cards required
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group btn-wrapper">
                                <v-btn block color="primary" type="submit">
                                    Login / Register
                                </v-btn>
                            </div>
                            <v-layout>
                                <v-flex class="text-xs-center">
                                    <v-btn flat color="orange" class="px-4" @click.prevent="showForgotPassword = true">Forgot password?</v-btn>
                                    <v-btn flat color="orange" class="px-4" @click.prevent="showQuestion = true">Got a question?</v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                    </div>
                </div>
            </div>
            <setup-details v-if="showSetupDetails" :user="user"></setup-details>
            <question v-if="showQuestion" :showQuestion="showQuestion"></question>
            <setup-details v-if="showSetupDetails" :user="user"></setup-details>
            <forgot-password v-if="showForgotPassword" :showForgotPassword="showForgotPassword"></forgot-password>
            <two-factor-authorization :user="authUser" v-if="showTwoFactorAuthorization"></two-factor-authorization>
        </template>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'
    import ForgotPassword from './passwords/email'
    import SetupDetails from './setup-details'
    import TwoFactorAuthorization from './2fa'
    import Question from '@/app/dashboard/components/question'

    export default {
        /**
         * Component's local state
         */
        data() {
            return {
                user: {},
                showTwoFactorAuthorization: false,
                showForgotPassword: false,
                showSetupDetails: false,
                authUser: {},
                showQuestion: false,
            }
        },

        methods: {
            ...mapActions(['login', 'setMessage', 'setFetching', 'setToken', 'loadUser']),

            /**
             * Handle form's submit event
             */
            submit() {
                this.setFetching({fetching: true})

                this.login(this.user) // this is a Vuex action
                    .then(response => {
                        if (!response.token) {
                            this.twoFactorAuthorization(this.user)
                        } else {
                            this.$router.push({ name: 'dashboard' })

                            this.setMessage({ type: 'success', message: 'You have been successfully logged in!' })
                        }

                        this.setFetching({fetching: false})
                    })
            },

            /**
             * Authenticate user by social provider
             *
             * @param provider
             */
            authenticate(provider) {
                this.setFetching({fetching: true})

                this.$auth.authenticate(provider).then((response) => {
                    if (response.data.token) {
                        // if we have token then redirect to dashboard
                        this.setToken(response.data.token)
                        this.loadUser()

                        this.$router.push({ name: 'dashboard' })

                        this.setMessage({ type: 'success', message: 'You have been successfully logged in!' })
                    } else if (response.data.data && response.data.data.id) {
                        // if we have user id then show google 2fa
                        this.twoFactorAuthorization(response.data.data)
                    } else {
                        // if we have token then redirect to dashboard
                        this.updateSocialUser(response.data.data)
                    }
                }).catch((err) => {
                    console.log(err)

                    this.setFetching({ fetching: false })
                })
            },

            twoFactorAuthorization(user) {
                this.authUser = user
                this.showTwoFactorAuthorization = true

                this.setMessage({ type: 'success', message: 'Please type in the Google Authenticator code!' })
            },

            updateSocialUser(user) {
                this.user = user
                this.user.social = true

                this.showSetupDetails = true

                this.setMessage({ type: 'success', message: 'Please setup the details' })
            }
        },

        components: { ForgotPassword, SetupDetails, TwoFactorAuthorization, Question }
    }

</script>
<style scoped lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
    @import '~@/assets/scss/style.scss';
</style>
