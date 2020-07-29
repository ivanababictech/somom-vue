<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs6 mx-auto elevation-6>
                <v-container fluid>
                    <v-form lazy-validation @submit.prevent="submit">
                        <div class="headline">Edit Profile</div>
                        <v-layout row wrap align-center>
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
                                <v-text-field
                                        label="E-mail"
                                        v-model="user.email"
                                        :rules="[rules.email]"
                                        required
                                        prepend-icon="email"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        label="Mobile"
                                        v-model="user.mobile"
                                        :rules="[rules.required]"
                                        required
                                        prepend-icon="phone"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-autocomplete
                                        item-text="name"
                                        item-value="code"
                                        :items="countries"
                                        v-model="user.country_code"
                                        label="Country"
                                        prepend-icon="map"
                                ></v-autocomplete>
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
                                        label="Password Confirmation"
                                        type="password"
                                        v-model="user.password_confirmation"
                                        :rules="[rules.required]"
                                        required
                                        prepend-icon="lock"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-btn color="info" type="submit">Submit</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex'
    import * as profileService from './service'
    import ValidationMixin from '@/mixins/validation'
    var countries = require('country-list')()

    export default {
        data() {
            return {
                user: {},
                userTypes: [],
                countries: countries.getData()
            }
        },

        mixins: [ValidationMixin],

        mounted() {
            this.getUser()
        },

        methods: {
            ...mapActions(['setUser', 'setFetching', 'setMessage', 'loadUser']),

            getUser() {
                this.user = _.clone(this.currentUser)
            },

            submit() {
                this.setFetching({ fetching: true })

                profileService.update(this.user)
                    .then(response => {
                        this.setUser(response.data)

                        this.setFetching({ fetching: false })
                        this.setMessage({ type: 'success', message: 'Profile has been updated!' })
                })
            },
        },
        computed: {
            /**
             * See src/app/auth/vuex/getters.js
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },

        watch: {
            'currentUser': 'getUser'
        }
    }



</script>