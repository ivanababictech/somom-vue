<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">Audit planning control checklist</div>
                </v-layout>
                <v-spacer></v-spacer>

                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                ></v-text-field>

                <v-btn fab dark small class="primary" @click.native.stop="toggleDialog">
                    <v-icon dark>add</v-icon>
                </v-btn>

            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="checklists"
                    class="elevation-5"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.input_issue }}</td>
                    <td>{{ props.item.comments }}</td>
                    <td>
                        <v-btn icon @click.native.stop="toggleDialog(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    From {{ pageStart }} to {{ pageStop }}
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog.visible" absolute width="600">
            <v-card>
                <v-card-title class="headline">{{ dialog.title }}</v-card-title>
                <v-card-text>
                        <v-textarea
                                label="Input issue"
                                v-model="checklist.input_issue"
                                required
                                @input="$v.checklist.input_issue.$touch()"
                        ></v-textarea>
                    <v-textarea
                            label="Comments"
                            v-model="checklist.comments"
                            required
                    ></v-textarea>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!checklist.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="checklist.deleted_at" flat success @click.native="restore">Restore</v-btn>
                    <v-btn v-else flat warning @click.native="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import { http } from '@/plugins/http/index'
    import {required} from 'vuelidate/lib/validators';
    import * as checklistsService from './service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Input Issue', value: 'input_issue'},
                {text: 'Comments', value: 'comments'},
                {text: 'Actions', value: ''}
            ],
            checklist: {
                id: null,
                input_issue: null,
                comments: ''
            },
            dialog: {
                visible: false,
                title: 'Add control checklist',
            },
            checklists: []
        }),

        validations: {
            checklist: {
                input_issue: {
                    required
                }
            }
        },

        mounted() {
            this.fetchChecklists()
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            fetchChecklists() {
                checklistsService.get()
                    .then(response => {
                        this.checklists = JSON.parse(response) || []
                    })
            },

            toggleDialog(checklist) {
                if (checklist.id) {
                    this.dialog.title = 'Edit Checklist';
                    this.checklist = checklist;
                } else {
                    this.dialog.title = 'Add Checklist';
                    this.checklist = {
                        title: null,
                        input_issue: null,
                        comments: ''
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.checklist.id = this.checklists.length + 1
                let checklists = this.checklists
                checklists.push(this.checklist)
                checklistsService.create(checklists)
                this.fetchChecklists()
                this.dialog.visible = false;
            },
            update() {},

            destroy() {},

            restore() {

            },
        },

    }
</script>
