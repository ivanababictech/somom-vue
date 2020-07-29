<template>
    <v-container grid-list-md>
        <div class="headline">ADDING ASSIGNMENTS</div>
        <v-dialog v-model="addingAssignment" persistent max-width="500px">
            <v-btn color="primary" dark slot="activator">ADD ASSIGNMENT</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">New Assignment</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Assignment name"
                                        v-model="assignment.name"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        label="Grade"
                                        v-model="assignment.grade"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        label="Allocated Time (minutes)"
                                        v-model="assignment.time"
                                        mask="##"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        label="Chapter"
                                        v-model="assignment.chapter"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                        label="Level"
                                        v-model="assignment.level"
                                        mask="#"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="addingAssignment = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="addAssignment()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
                    <v-btn icon class="mx-0" v-if="selectedAssignment.id !== props.item.id" @click="selectedAssignment = props.item">
                        <v-icon>
                            settings
                        </v-icon >
                    </v-btn>
                    <template v-else>
                        <v-btn icon class="mx-0" @click="updateAssignment(props.item)">
                            <v-icon color="teal">
                                check
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-btn icon class="mx-0" @click="deleteAssignment(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
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
                addingAssignment: false,
                assignment: {
                    settings: {
                        accountNames: [],
                        questions: [],
                        allocatedTime: {},
                        allocation: {},
                        show: false
                    },
                },
                selectedAssignment: {}
            }
        },

        props: ['assignments'],



        methods: {
            addAssignment() {
                this.$emit('add-assignment', this.assignment)
                this.addingAssignment = false
            },

            updateAssignment(assignment) {
                this.$emit('update-assignment', assignment)
                this.selectedAssignment = {}
            },

            deleteAssignment(assignment) {
                this.$emit('delete-assignment', assignment)
            },
        },

        watch: {
            selectedAssignment() {
                this.$emit('selected-assignment', this.selectedAssignment)
            }
        }
    }
</script>