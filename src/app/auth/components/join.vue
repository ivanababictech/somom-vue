<template>
    <div class="top-right-side">
        <h2 class="sect-ttl">We <span>make</span> your life easier</h2>
        <div class="row justify-content-md-center">
            <div class="col-md-12 sub-ttl">capita.malta enables ordinary people to take control of their accounting.</div>
        </div>

        <div class="row justify-content-sm-center">
            <div class="col-md-10 col-sm-11">
                <form class="form-layout top-right-form" @submit.prevent="submit">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" placeholder="example@email.com" v-model="user.email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Your password" v-model="user.password">
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
                        <button type="submit" class="btn btn-danger">Get started</button>
                    </div>
                    <p class="bottom-txt">Got a question? <a href="#" @click.prevent="showQuestion = true">Click here</a></p>

                    <setup-details v-if="showSetupDetails" :user="user"></setup-details>
                    <question v-if="showQuestion" :showQuestion="showQuestion"></question>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import SetupDetails from './setup-details'
    import Question from '@/app/dashboard/components/question'
    var countries = require('country-list')()

    export default {
        /**
         * Component's local state
         */
        data() {
            return {
                user: {
                    country_code: ''
                },
                userTypes: [],
                countries: countries.getData(),
                showSetupDetails: false,
                showQuestion: false,
            }
        },

        methods: {
            /**
             * Map the actions from Vuex to this component.
             * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
             */
            ...mapActions(['register', 'setMessage', 'setFetching', 'setToken', 'loadUser', 'join']),

            /**
             * Handle form's submit event
             */
            submit() {
                this.join(this.user)
                    .then((response) => {
                        if(response.data === false) {
                            this.showSetupDetails = true
                        } else if (!response.token) {
                            this.$emit('two-factory-authorization', this.user)
                        } else {
                            this.$router.push({ name: 'dashboard' })

                            this.setMessage({ type: 'success', message: 'You have been successfully logged in!' })
                        }
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
                    // if we have user id then show google 2fa
                    if (response.data.data.id) {
                        this.$emit('two-factory-authorization', response.data.data)
                    } else if (response.data.token) {
                        // if we have token then redirect to dashboard
                        this.setToken(response.data.token)
                        this.loadUser()

                        this.$router.push({ name: 'dashboard' })

                        this.setMessage({ type: 'success', message: 'You have been successfully logged in!' })
                    } else {
                        // show popup for setup details
                        this.$emit('update-social-user', response.data.data)
                    }
                    this.setFetching({ fetching: false })
                }).catch((err) => {
                    console.log(err)

                    this.setFetching({ fetching: false })
                })
            },

        },

        components: { SetupDetails, Question }
    }

</script>

<style scoped lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
    @import '~@/assets/scss/style.scss';
</style>

