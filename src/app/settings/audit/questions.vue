<template>
    <div>
        <v-card>
            <v-card-title>
                <h4 class="card-title">Questions</h4>
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
                    :items="questions"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-right"> {{ props.item.question }}</td>
                    <td class="text-xs-right"> {{ props.item.assigned_account.assigned_account_name }}</td>
                    <td class="text-xs-right"> {{ props.item.section.section_name }}</td>
                    <td class="text-xs-right">
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
                    <v-text-field
                            label="Question"
                            v-model="question.question"
                            required
                            @input="$v.question.question.$touch()"
                    ></v-text-field>
                    <v-autocomplete
                            label="Assigned account"
                            v-bind:items="assigned_accounts"
                            v-model="question.assigned_account_id"
                            item-text="assigned_account_name"
                            item-value="assigned_account_id"
                            required
                            @input="$v.question.assigned_account_id.$touch()"
                    ></v-autocomplete>
                    <v-autocomplete
                            label="Audit section"
                            v-bind:items="sections"
                            v-model="question.section_id"
                            item-text="section_name"
                            item-value="section_id"
                            required
                            @input="$v.question.section_id.$touch()"
                    ></v-autocomplete>
                    <v-text-field
                            label="Answer A"
                            v-model="question.answer_a"
                            required
                            @input="$v.question.answer_a.$touch()"
                    ></v-text-field>
                    <v-text-field
                            label="Answer B"
                            v-model="question.answer_b"
                            required
                            @input="$v.question.answer_b.$touch()"
                    ></v-text-field>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!question.question_id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn flat warning @click.native="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import { http } from '@/plugins/http/index';
    import {required} from 'vuelidate/lib/validators';
    import _ from 'lodash';

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'Question', value: 'question'},
                {text: 'Assigned Account', value: 'assigned_account_id'},
                {text: 'Audit Section', value: 'section_id'}
            ],
            assigned_accounts: [],
            // sections: [],
            questions: [],
            question: {
                question: null,
                assigned_account_id: null,
                section_id: null,
                answer_a: null,
                answer_b: null
            },
            dialog: {
                visible: false,
                title: '',
            }
        }),

        validations: {
            question: {
                question: {
                    required
                },
                assigned_account_id: {
                    required
                },
                section_id: {
                    required
                },
                answer_a: {
                    required
                },
                answer_b: {
                    required
                }
            }
        },

        computed: {
            // get audit sections from the selected assigned account
            sections: {
                get: (state) => {
                    const selected_aa = _.find(state.assigned_accounts, aa => aa.assigned_account_id == state.question.assigned_account_id);
                    if (selected_aa) {
                        return selected_aa.audit_sections;
                    }
                    return [];
                },
                set: () => {
                },
            }
        },

        methods: {
            toggleDialog(question) {
                if (question.question_id) {
                    this.dialog.title = 'Edit question';
                    this.question = question;
                } else {
                    this.dialog.title = 'Add question';
                    this.question = {
                        question_name: null,
                        assigned_account_id: null,
                        section_id: null,
                        answer_a: null,
                        answer_b: null
                    };
                }
                this.dialog.visible = true;
            },

            add() {
                http.post('questions', this.question)
                    .then(({data}) => {
                        if (data.success) {
                            // hide dialog
                            this.dialog.visible = false;
                            this.questions.push(data.question);
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
                    .catch(({response}) => {
                        // validation error
                        if (response.status === 422) {
                            const errors = response.data[Object.keys(response.data)[0]];
                            // show error notification
                            this.$store.dispatch('snackbar/update', {
                                visible: true,
                                error: true,
                                text: errors[0]
                            });
                        }
                    });
            },

            update() {
                const url = 'questions/' + this.question.question_id;
                http.put(url, this.question)
                    .then(({data}) => {
                        if (data.success) {
                            // hide dialog
                            this.dialog.visible = false;
                            // update question
                            this.questions = this.questions.map(question => {
                                if (question.question_id == data.question.question_id) {
                                    return data.question;
                                }
                                return question;
                            });
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
                    .catch(({response}) => {
                        // validation error
                        if (response.status === 422) {
                            const errors = response.data[Object.keys(response.data)[0]];
                            // show error notification
                            this.$store.dispatch('snackbar/update', {
                                visible: true,
                                error: true,
                                text: errors[0],
                            });
                        }
                    });
            },

            destroy() {
                const url = 'questions/' + this.question.question_id;
                http.delete(url)
                    .then(({data}) => {
                        if (data.success) {
                            this.dialog.visible = false;
                        }
                        // show success notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
                    .catch(({response}) => {
                        // show error notification
                        this.snackbar({
                            visible: true,
                            error: true,
                            text: 'There was an error... Please try again later.',
                        });
                    });
            },
        },

        created() {
            http.get('questions')
                .then(({data}) => {
                    if (data.success) {
                        this.assigned_accounts = data.assigned_accounts;
                        this.sections = data.sections;
                        this.questions = data.questions;
                    }
                });
        }

    }
</script>
