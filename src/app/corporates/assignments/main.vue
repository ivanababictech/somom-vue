<template>
    <v-container grid-list-md>
        <teacher-assignments v-if="userIsHeadOfSchool() || userIsEducator()"></teacher-assignments>
        <student-assignments v-if="userIsStudent()"></student-assignments>
    </v-container>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'
    import TeacherAssignments from './teacher'
    import StudentAssignments from './student'
    var countries = require('country-list')()

    export default {
        data() {
            return {
                user: {},
                userTypes: [],
                countries: countries.getData()
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'isLogged']),
        },

        components: { TeacherAssignments, StudentAssignments }
    }
</script>