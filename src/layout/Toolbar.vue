<template>
    <v-toolbar app dense clipped-left color="white" fixed>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat :to="{ name: 'dashboard' }">
                <img src="../../static/img/logo.png" height="100%">
            </v-btn>
            <v-btn flat :to="{ name: 'Accountings' }">
                Accounts
            </v-btn>
            <v-btn flat :to="{ name: 'audits' }">
                Audit
            </v-btn>
            <v-btn flat :to="{ name: 'corporates.index' }">
                Corporate
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-text-field
                flat
                hide-details
                prepend-inner-icon="search"
                label="Search"
                class="hidden-sm-and-down"
        ></v-text-field>
        <v-btn icon>
            <img src="../../static/img/upload.png" height="24px">
        </v-btn>
        <v-btn icon>
            <img src="../../static/img/chat.png" height="24px">
        </v-btn>
        <v-btn icon>
            <img src="../../static/img/notifications.png" height="24px">
        </v-btn>
        <v-menu>
            <v-btn icon slot="activator">
                <img src="../../static/img/settings.png" alt="" height="24px">
            </v-btn>
            <v-list dense>
                <v-list-tile to="/profile/edit">
                    <v-list-tile-title>Profile</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{ name: 'Settings' }">
                    <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{ name: 'users' }">
                    <v-list-tile-title>Users</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="logoutUser">
                    <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: mapGetters([
            'appName'
        ]),
        methods: {
            ...mapActions(['logout', 'setMessage']),

            logoutUser() {
                this.logout().then(() => {
                    this.$router.push('/')

                    this.setMessage({type: 'warning', message: 'You have been successfully logged out!'})
                })
            },
        },
    }

</script>
