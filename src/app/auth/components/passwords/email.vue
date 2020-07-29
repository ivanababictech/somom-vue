<template>
    <v-dialog v-model="showForgotPassword" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Reset Password</span>
            </v-card-title>
            <v-card-text>
                <span>Enter your email address and we will send you a link to reset your password.</span>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                    label="Enter your email address"
                                    v-model="user.email"
                                    required
                                    prepend-icon="email"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outline @click.native="$parent.showForgotPassword = false">Close</v-btn>
                <v-btn color="primary" @click.native="sendResetLinkEmail()">Send Password Reset Link</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as authService from '../../service'

    export default {
        /**
         * Component's local state
         */
        data() {
            return {
                user: {
                    email: '',
                },
            }
        },

        props: ['showForgotPassword'],

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            sendResetLinkEmail() {
                this.setFetching({fetching: true})

                authService.sendResetLink(this.user)
                    .then((response) => {
                        this.$parent.showForgotPassword = false

                        this.setFetching({ fetching: false })
                        this.setMessage({ type: 'success', message: response.message })
                    })
            }
        }
    }
</script>