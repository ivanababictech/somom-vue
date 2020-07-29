<template>
    <v-container grid-list-md>
        <v-form lazy-validation @submit.prevent="submit">
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <v-text-field
                            label="First Name"
                            v-model="user.first_name"
                            required
                            prepend-icon="mdi-account"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            label="Last Name"
                            v-model="user.last_name"
                            required
                            prepend-icon="mdi-account"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            label="Email"
                            v-model="user.email"
                            required
                            prepend-icon="mdi-email"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <phone-number :object="user" country-class="xs2" mobile-class="xs10"></phone-number>
                </v-flex>
                <v-flex xs12>
                    <v-autocomplete
                            item-text="title"
                            item-value="id"
                            label="Type"
                            chips
                            v-model="user.roles_id"
                            :items="roles"
                            required
                            :disabled="!rolesIsEditable"
                            prepend-icon="mdi-briefcase"
                            multiple
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                    <v-btn type="submit" color="info">Submit</v-btn>
                    <v-btn to="/users">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex'
    import * as userService from '../service'
    import PhoneNumber from '@/components/phone-number'
    import PhonesData from '@/plugins/phones-data'
    var countries = require('country-list')()

    export default {
        data() {
            return {
                rolesIsEditable: true,
                roles: [],
                countries: countries.getData(),
                phonesData: PhonesData,
                phoneNumber: ''
            }
        },

        props: ['user'],

        mounted() {
            this.getDefaultCountryCode()
            this.getUserRoles()
        },

        methods: {
            initUserRole() {

                if(this.userIsAdmin()) {
                    return;
                }

                let roleId = null

                if(this.userIsHeadOfSchool()) {
                     roleId = this.roles.find(role => role.name === userService.ROLE_EDUCATOR).id
                } else if(this.userIsEducator()) {
                    roleId = this.roles.find(role => role.name === userService.ROLE_STUDENT).id
                } else if(this.userIsHeadOfNgo()) {
                    roleId = this.roles.find(role => role.name === userService.ROLE_VOLUNTEER).id
                } else if(this.userIsCompany()) {
                    roleId = this.roles.find(role => role.name === userService.ROLE_EMPLOYEE).id
                }

                if(roleId) {
                    this.user.roles_id = [roleId]
                }

                this.rolesIsEditable = false
            },

            submit() {
                this.$emit('submit')
            },

            getUserRoles() {
                userService.getUserRoles()
                    .then(response => {
                        this.roles = response.data

                        this.initUserRole()
                    })
            },

            getCountryDialCode(country) {
                return '(+' + (this.phonesData[(country.code).toLowerCase()] ? this.phonesData[(country.code).toLowerCase()].dialCode  : '') + ')'
            },

            getDefaultCountryCode() {
                userService.getIpInfo()
                    .then(response => {
                        this.user.country_code = response.data.country
                    })
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'isLogged']),
        },

        watch: {
            'phoneNumber'(value) {
                this.user.mobile = this.phonesData[(this.user.country_code).toLowerCase()].dialCode + value
            }
        },

        components: { PhoneNumber }
    }
</script>

<style scoped>

</style>