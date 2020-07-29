<template>
    <v-navigation-drawer fixed  app v-model="drawer" v-if="isLogged"  :clipped="$vuetify.breakpoint.lgAndUp">
        <v-list dense>
            <template v-if="isLogged">
                <v-list-tile :to="'/profile'">
                    <v-list-tile-action>
                        <v-icon>fa-user</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ currentUser.full_name }} (<b>{{ currentUser.role_name }}</b>)
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="'/profile/edit'">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            Profile
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>

        <v-divider ></v-divider>

        <!--<admin-menu v-if="userIsAdmin()"></admin-menu>-->
        <admin-menu></admin-menu>
        <client-menu v-if="userIsClient()"></client-menu>
        <agent-menu v-if="userIsAgent()"></agent-menu>
        <head-of-school-menu v-if="userIsHeadOfSchool()"></head-of-school-menu>
        <educator-menu v-if="userIsEducator()"></educator-menu>
        <student-menu v-if="userIsStudent()"></student-menu>
        <company-menu v-if="userIsCompany()"></company-menu>
        <employee-menu v-if="userIsEmployee()"></employee-menu>
        <v-list dense>
            <v-list-tile @click="logoutUser">
                <v-list-tile-action>
                    <v-icon>fa-sign-out</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Logout
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import AdminMenu from './menu/admin'
    import ClientMenu from './menu/client'
    import AgentMenu from './menu/agent'
    import HeadOfSchoolMenu from './menu/head-of-school'
    import EducatorMenu from './menu/educator'
    import StudentMenu from './menu/student'
    import CompanyMenu from './menu/company'
    import EmployeeMenu from './menu/employee'

    export default {
        data: () => ({
            dialog: false,
        }),

        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'token']),
            ...mapGetters({
                navDrawer: 'navDrawer',
            }),
            drawer: {
                get: state => state.navDrawer,
                set(drawer) {
                    if (drawer != this.navDrawer) {
                        this.toggleNavDrawer()
                    }
                }
            }
        },

        methods: {
            ...mapActions(['logout', 'setMessage']),

            logoutUser() {
                this.logout().then(() => {
                    this.$router.push('/')

                    this.setMessage({ type: 'warning', message: 'You have been successfully logged out!' })
                })
            },
        },

        components: { AdminMenu, ClientMenu, AgentMenu, HeadOfSchoolMenu, EducatorMenu, StudentMenu, CompanyMenu, EmployeeMenu }
    }
</script>
