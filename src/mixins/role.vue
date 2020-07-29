<script>
    import {mapGetters} from 'vuex'
    import * as userService from '@/app/users/service'

    export default {
        methods: {
            userIsAdmin(user) {
                return this.hasRole(user, userService.ROLE_ADMIN)
            },

            userIsClient(user) {
                return this.hasRole(user, userService.ROLE_CLIENT)
            },

            userIsAgent(user) {
                return this.hasRole(user, userService.ROLE_AGENT)
            },

            userIsHeadOfSchool(user) {
                return this.hasRole(user, userService.ROLE_HEAD_OF_SCHOOL)
            },

            userIsEducator(user) {
                return this.hasRole(user, userService.ROLE_EDUCATOR)
            },

            userIsStudent(user) {
                return this.hasRole(user, userService.ROLE_STUDENT)
            },

            userIsHeadOfNgo(user) {
                return this.hasRole(user, userService.ROLE_HEAD_OF_NGO)
            },

            userIsCompany(user) {
                return this.hasRole(user, userService.ROLE_COMPANY)
            },

            userIsEmployee(user) {
                return this.hasRole(user, userService.ROLE_EMPLOYEE)
            },

            userIsVolunteer(user) {
                return this.hasRole(user, userService.ROLE_VOLUNTEER)
            },

            /**
             * Check if user has a role
             *
             * @param user
             * @param role
             */
            hasRole(user, role) {
                if(!user) {
                    user = this.currentUser
                }

                if(user.roles) {
                    return user.roles.filter(item => item.name === role).length
                }

                return false
            }
        },


        computed: {
            ...mapGetters(['currentUser', 'isLogged']),
        },
    }
</script>