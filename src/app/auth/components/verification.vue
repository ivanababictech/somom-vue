<template>
    <v-container>
        <google2fa v-if="showGoogle2fa" @submit="closeGoogle2fa"></google2fa>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import Google2fa from './google2fa'

    export default {
        /**
         * Component's local state
         */
        data() {
            return {
                showGoogle2fa: false
            }
        },

        mounted() {
            this.verification()
        },

        methods: {
            /**
             * Map the actions from Vuex to this component.
             * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
             */
            ...mapActions(['verificationEmail', 'setMessage']),

            /**
             * Verification User Email
             */
            verification() {
                this.verificationEmail(this.$route.params.token)
                    .then((response) => {
                        this.setMessage({ type: 'success', message: 'You have successfully verified email!' })

                        this.google2fa()
                    })
            },

            google2fa() {
                this.showGoogle2fa = true
            },

            closeGoogle2fa() {
                this.showGoogle2fa = false
            }
        },

        components: { Google2fa }
    }

</script>