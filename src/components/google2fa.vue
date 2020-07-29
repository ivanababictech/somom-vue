<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="300px">
        <v-btn color="primary" slot="activator">{{ label }}</v-btn>
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
                                    v-model="auth.code"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn color="primary" flat @click="submit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                auth: {},
                qrCode: ''
            }
        },

        props: {
            label: {
                type: String,
                default: 'Google 2fa'
            }
        },

        methods: {
            cancel() {
                this.dialog = false
            },

            submit() {
                this.$http.post('auth/google-authenticator/verify', this.auth)
                    .then(response => {
                        this.dialog = false
                        this.$emit('verified')
                    })
            },

            getGoogleQrCode() {
                this.$http.get('auth/google-authenticator')
                    .then(response => {
                        this.qrCode = response.data.data
                    })
            }
        }
    }
</script>

<style scoped>

</style>