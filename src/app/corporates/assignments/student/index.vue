<template>
    <v-layout row wrap>
        <v-container grid-list-md>
            <div class="headline">ASSIGNMENTS</div>
            <v-data-table
                    :headers="headers"
                    :items="assignments"
                    hide-actions
                    class="elevation-1"
                    disable-initial-sort
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.grade }}</td>
                    <td>{{ props.item.time }}</td>
                    <td>{{ props.item.chapter }}</td>
                    <td>{{ props.item.level }}</td>
                    <td class="justify-center">
                        <v-btn icon class="mx-0" :to="'/assignments/' + props.item.id">
                            <v-icon color="teal">
                                timer
                            </v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-container>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                headers: [
                    { text: 'Id', value: 'id' },
                    { text: 'Name', value: 'name' },
                    { text: 'Grade', value: 'grade' },
                    { text: 'Allocated Time', value: 'time' },
                    { text: 'Chapter', value: 'chapter' },
                    { text: 'Level', value: 'level' },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
                assignments: [],
                assignment: {},
            }
        },

        mounted() {
            this.getAssignments()
        },

        methods: {
            getAssignments() {
                this.$http.get('assignments').then(response => {
                    this.assignments = response.data.data
                })
            },
        },
    }
</script>