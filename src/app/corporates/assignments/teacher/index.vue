<template>
    <v-layout row wrap>
        <assignments :assignments="assignments" @delete-assignment="deleteAssignment" @selected-assignment="selectedAssignment"
                     @add-assignment="addAssignment" @update-assignment="updateAssignment">
        </assignments>
        <settings v-if="assignment.id" :settings="assignment.settings"></settings>
        <scoreboard></scoreboard>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import Assignments from './assignments'
    import Settings from './settings/index'
    import Scoreboard from './scoreboard'

    export default {
        data() {
            return {
                assignments: [],
                assignment: {},
            }
        },

        mounted() {
            this.getAssignments()
        },

        methods: {
            ...mapActions(['setMessage']),

            getAssignments() {
                this.$http.get('assignments').then(response => {
                    this.assignments = response.data.data
                    this.addingAssignment = false
                })
            },

            addAssignment(assignment) {
                this.$http.post('assignments', assignment).then(response => {
                    this.setMessage({ type: 'success', message: 'Assignment has been created successfully!'})

                    this.getAssignments()
                })
            },

            updateAssignment(assignment) {
                this.$http.put('assignments/' + assignment.id, assignment).then(response => {
                    this.setMessage({ type: 'success', message: 'Assignment has been updated successfully!'})

                    this.getAssignments()
                })
            },

            deleteAssignment(assignment) {
                this.$http.delete('assignments/' + assignment.id).then(response => {
                    this.setMessage({ type : 'success', message: 'Assignment has been deleted successfully!'})

                    this.getAssignments()
                })
            },

            selectedAssignment(assignment) {
                this.assignment = assignment
            }
        },

        components: { Assignments, Settings, Scoreboard }
    }
</script>