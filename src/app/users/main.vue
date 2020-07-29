<template>
    <v-card>
        <v-card-title>
            <v-layout row align-center>
                <div class="headline">Users</div>
                <v-btn fab dark small class="success" to="/users/create" @click.native.stop="toggleDialog">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-layout>
            <v-spacer></v-spacer>
            <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="users.data"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.full_name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.mobile }}</td>
                <td>{{ props.item.roles.map(role => role.name).join(', ') }}</td>
                <td>
                    <template v-if="userIsAdmin()">
                        <v-tooltip top v-if="!props.item.activated">
                            <v-btn icon slot="activator" class="mx-0" @click="activateUser(props.item)">
                                <v-icon color="warning">cancel</v-icon>
                            </v-btn>
                            <span>Activate Account</span>
                        </v-tooltip>
                        <v-tooltip top v-else>
                            <v-btn icon slot="activator" class="mx-0" @click="deactivateUser(props.item)">
                                <v-icon color="success">check</v-icon>
                            </v-btn>
                            <span>Deactivate Account</span>
                        </v-tooltip>
                    </template>
                    <v-btn icon class="mx-0" :to="'/users/' + props.item.id + '/edit'">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>

                    <v-btn icon class="mx-0" @click="removeUser(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
        <div class="text-xs-center">
            <v-pagination :length="users.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as userService from './service'

    export default {
        data() {
            return {
                users: {
                    data: []
                },
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Name', value: 'full_name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Mobile', value: 'mobile'},
                    {text: 'Type', value: 'type'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
                currentPage: 1,
                search: ''
            }
        },

        mounted() {
            this.getUsers()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getUsers() {
                this.setFetching({ fetching: true })

                var params = {
                    params: {
                        page: this.currentPage,
                        search: this.search
                    }
                }
                userService.get(params)
                    .then(response => {
                        this.users = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            activateUser(user) {
                this.setFetching({ fetching: true })

                this.$http.post('users/' + user.id + '/activate').then(response => {
                    user.activated = true

                    this.setFetching({ fetching: false })

                    this.setMessage({ type: 'success', message: response.data.message })
                })
            },


            deactivateUser(user) {
                this.setFetching({ fetching: true })

                this.$http.post('users/' + user.id + '/deactivate').then(response => {
                    user.activated = false

                    this.setFetching({ fetching: false })

                    this.setMessage({ type: 'warning', message: response.data.message })
                })
            },


            removeUser(user) {
                this.setFetching({ fetching: true })

                userService.remove(user)
                    .then(response => {
                        this.getUsers()

                        this.setMessage({ type: 'success', message: response.data.message })
                    })
            }

        },

        watch: {
            currentPage: 'getUsers',
            search: 'getUsers'
        }
    }
</script>
