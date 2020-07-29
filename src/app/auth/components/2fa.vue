<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="300px">
        <v-card>
            <v-card-title>
                <span class="headline">Google authenticator</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout wrap>
                        <v-flex xx12>
                            <v-text-field
                                    label="Verification code"
                                    v-model="user.code"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-flex class="text-xs-center">
                    <v-btn color="primary" outline @click="cancel">Cancel</v-btn>
                    <v-btn color="primary" @click="submit">Submit</v-btn>
                </v-flex>
            </v-card-actions>
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
                dialog: true
            }
        },

        props: ['user'],

        methods: {
            ...mapActions(['verificationGoogleTwoFactorCode', 'setMessage', 'setFetching']),

            cancel() {
                this.$parent.showTwoFactorAuthorization = false
            },

            submit() {
                this.verificationGoogleTwoFactorCode(this.user)
                    .then((response) => {
                        this.$parent.showTwoFactorAuthorization = false

                        this.$router.push('/dashboard')
                        this.setMessage({ type: 'success', message: 'You have been successfully logged in!' })
                    })
            },
        },
    }

</script>