<template>
    <v-layout row wrap>
        <v-flex xs6 mx-auto elevation-6>
            <v-container>
                <div class="headline">Create User</div>
                <user-form :user="user" @submit="createUser"></user-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import UserForm from './form'
    import * as userService from '../service'

    export default {
        data() {
            return {
                user: {
                    country_code: '',
                    roles_id: []
                }
            }
        },

        mounted() {

        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            createUser() {
                this.setFetching({ fetching: true })

                userService.create(this.user)
                    .then(response => {
                        this.$router.push('/users');

                        this.setFetching({ fetching: false })
                        this.setMessage({ type: 'success', message: response.message })
                    })
            }
        },

        components: { UserForm }
    }
</script>

<style scoped>

</style>