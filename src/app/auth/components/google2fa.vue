<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-toolbar color="accent">
                <v-btn icon>
                    <v-icon>mdi-key</v-icon>
                </v-btn>

                <v-toolbar-title>Setup Two-factor authentication</v-toolbar-title>

                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-title primary-title>
                    <div>Somom require 2-step verirication as an added layer of security to your account</div>
            </v-card-title>
            <template v-if="showInstructions">
                <v-card-text>
                    <v-container grid-list-md>
                        <p>Get started by downloading an authenticator app on your mobile phone</p>
                        <ul>
                            <li>Android <a href="">Google Authenticator App</a></li>
                            <li>IOS <a href="">Google Authenticator App</a></li>
                            <li>Windows <a href="">Google Authenticator App</a></li>
                        </ul>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-flex class="text-xs-center">
                        <v-btn color="primary" @click="submit">Got it</v-btn>
                    </v-flex>
                </v-card-actions>
            </template>

            <template v-else>
                <v-card-text>
                    <v-container grid-list-md>
                        <p>Open the app and scan the QR Code below to add your account</p>
                        <v-flex xx12 class="text-xs-center">
                            <img :src="qrCode" alt="">
                        </v-flex>
                        <v-flex xx12>
                            <v-text-field
                                    label="Verification code"
                                    v-model="auth.code"
                            ></v-text-field>
                        </v-flex>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-flex class="text-xs-center">
                        <v-btn color="primary" @click="verifyGoogle2fa">Submit</v-btn>
                        <v-btn color="default" outline @click="showInstructions = true">Cancel</v-btn>
                    </v-flex>
                </v-card-actions>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions } from 'vuex'
    import ValidationMixin from '@/mixins/validation'
    import * as userService from '../service'

    export default {
        /**
         * Component's local state
         */
        data() {
            return {
                dialog: true,
                showInstructions: true,
                qrCode: null,
                auth: {}
            }
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            submit() {
                this.showInstructions = false

                this.getGoogleQrCode()
            },

            getGoogleQrCode() {
                this.$http.get('auth/google-authenticator')
                    .then(response => {
                        this.qrCode = response.data.data
                    })
            },

            verifyGoogle2fa() {
                this.$http.post('auth/google-authenticator/verify', this.auth)
                    .then(response => {
                        this.$router.push({ name: 'dashboard' })

                        this.setMessage({ type: 'success', message: 'Congratulations! You became a member of future!!' })
                    })
            }

        },
    }

</script>