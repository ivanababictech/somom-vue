<template>
    <v-layout row wrap>
        <v-flex xs6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Edit User</div>
                <user-form :user="user" @submit="updateUser" v-if="user.id"></user-form>
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
                user: {}
            }
        },

        mounted() {
            this.getUser()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            updateUser() {
                this.setFetching({ fetching: true })

                userService.update(this.user)
                    .then(response => {
                        this.$router.push('/users');

                        this.setFetching({ fetching: true })
                        this.setMessage({ type: 'success', message: response.message })
                    })
            },

            getUser() {
                userService.find(this.userId)
                    .then(response => this.user = response.data)
            }
        },

        computed: {
            userId() {
                return this.$route.params.userId
            },
        },

        components: { UserForm }
    }
</script>

<style scoped>

</style>