<template>
    <v-layout>
        <pre>
            {{ currentUser }}
        </pre>
        <v-container v-if="false">
            <teacher-profile v-if="currentUser.type.name == 'educator'"></teacher-profile>
            <student-profile v-if="currentUser.type.name == 'student'"></student-profile>
        </v-container>
    </v-layout>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'
    import TeacherProfile from './teacher'
    import StudentProfile from './student'
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

        components: { TeacherProfile, StudentProfile }
    }
</script>