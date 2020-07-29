<template>
    <v-container>
        <v-form lazy-validation @submit.prevent="resetPassword">
            <v-layout row wrap>
                <v-flex xs6 mx-auto elevation-6>
                    <v-container fluid >
                        <div class="headline">Reset password</div>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Enter your email address"
                                        v-model="user.email"
                                        :rules="[rules.email]"
                                        required
                                        prepend-icon="email"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        label="Password"
                                        type="password"
                                        v-model="user.password"
                                        :rules="[rules.required]"
                                        required
                                        prepend-icon="lock"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        label="Confirm Password"
                                        type="password"
                                        v-model="user.password_confirmation"
                                        :rules="[rules.required]"
                                        required
                                        prepend-icon="lock"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-flex class="text-xs-center">
                            <v-btn type="submit" outline color="success" block>Reset Password</v-btn>
                        </v-flex>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as userService from '../../service'

    export default {
        /**
         * Component's local state
         */
        data() {
            return {
                user: {
                    token: this.$route.params.token
                },
            }
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            resetPassword() {
                this.setFetching({fetching: true})

                userService.resetPassword(this.user)
                    .then((response) => {
                        this.$router.push({ name: 'dashboard' })

                        this.setFetching({ fetching: false })
                        this.setMessage({ type: 'success', message: response.message })
                    })
            }
        }
    }
</script>

<style scoped>

</style>