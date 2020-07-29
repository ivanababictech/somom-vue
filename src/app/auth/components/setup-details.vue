<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Set up your details</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                    label="First Name"
                                    v-model="user.first_name"
                                    :rules="[rules.required]"
                                    required
                                    prepend-icon="mdi-account"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Last Name"
                                    v-model="user.last_name"
                                    :rules="[rules.required]"
                                    required
                                    prepend-icon="mdi-account"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout row>
                                <v-flex xs12>
                                    <phone-number :object="user"></phone-number>
                                </v-flex>
                                <!--v-flex xs4>
                                    <v-btn color="info" outline block @click="sendMobileCode()">Send code</v-btn>
                                </v-flex-->
                            </v-layout>
                        </v-flex>
                        <!--v-flex xs12>
                            <v-text-field
                                    label="Enter the 6-digit verification code sent to your phone"
                                    v-model="user.verification_code"
                                    :rules="[rules.required]"
                                    required
                                    prepend-icon="mdi-key"
                            ></v-text-field>
                        </v-flex-->
                        <terms-conditions :user="user"></terms-conditions>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" outline block @click.native="$parent.showSetupDetails = false">Cancel</v-btn>
                <v-btn color="primary" block @click.native="submit()">Sign up</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions } from 'vuex'
    import TermsConditions from './terms-conditions'
    import PhoneNumber from '@/components/phone-number'
    import * as authService from '../service'
    import PhonesData from '@/plugins/phones-data'
    import ValidationMixin from '@/mixins/validation'
    var countries = require('country-list')()

    export default {
        data() {
            return {
                dialog: true,
                countries: countries.getData(),
                phonesData: PhonesData,
                phoneNumber: ''

            }
        },

        props: ['user'],

        mixins: [ValidationMixin],

        methods: {
            /**
             * Map the actions from Vuex to this component.
             * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
             */
            ...mapActions(['register']),

            /**
             * Handle form's submit event
             */
            submit() {
                this.register(this.user)
                    .then((response) => {
                        this.$parent.showSetupDetails = false
                    })
            },

            sendMobileCode() {
                authService.sendMobileCode(this.user.mobile)
            },
        },

        watch: {
            user() {
                this.dialog = true
            }
        },

        components: { TermsConditions, PhoneNumber }
    }
</script>

<style scoped>
    .selected-flag {
        z-index: 1;
        position: relative;
        width: 46px;
        height: 100%;
        padding: 0 0 0 16px;
    }

    .selected-flag .iti-arrow {
        position: absolute;
        top: 50%;
        margin-top: -2px;
        right: 6px;
        width: 0;
        height: 0;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-top: 4px solid #555;
    }
</style>