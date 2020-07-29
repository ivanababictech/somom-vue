<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">General Risk Assessment</div>
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
                    :items="assessments"
                    class="elevation-5"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.title }}</td>
                    <td v-html="questions(props.item.questions)">{{ props.item.questions }}</td>
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
                    <v-flex xs9>
                        <v-text-field
                                label="Title"
                                v-model="assessment.title"
                                required
                                @input="$v.assessment.title.$touch()"
                        ></v-text-field>
                    </v-flex>
                    <template v-for="(option, i) in assessment.questions">
                        <v-layout row align-center>
                            <v-flex xs9>
                                <v-text-field label="Answer" v-model="option.text"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-layout row>
                                    <v-flex xs6 class="text-xs-center">
                                        <v-btn fab dark small class="primary" @click="addQuestion"
                                               v-if="i === assessment.questions.length - 1">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs6 class="text-xs-center">
                                        <v-btn fab dark small class="danger" @click="removeQuestion(i)"
                                               v-if="assessment.questions.length > 1">
                                            <v-icon dark>remove</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout row align-center>
                            <v-flex xs9>
                                <v-layout row>
                                    <v-flex xs4>
                                        <v-text-field label="Low" v-model="option.low.text"></v-text-field>
                                    </v-flex>
                                    <v-flex xs4 mx-2>
                                        <v-text-field label="Medium" v-model="option.medium.text"></v-text-field>
                                    </v-flex>
                                    <v-flex xs4>
                                        <v-text-field label="High" v-model="option.high.text"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs3></v-flex>
                        </v-layout>
                    </template>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!assessment.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="assessment.deleted_at" flat success @click.native="restore">Restore</v-btn>
                    <v-btn v-else flat warning @click.native="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {http} from '@/plugins/http/index'
    import {required} from 'vuelidate/lib/validators';
    import * as assessmentsService from './service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title', value: 'title'},
                {text: 'Questions', value: 'questions'},
                {text: 'Actions', value: ''}
            ],
            assessment: {
                id: null,
                title: null,
                questions: [
                    {
                        text: '',
                        low: {
                            text: ''
                        },
                        medium: {
                            text: ''
                        },
                        high: {
                            text: ''
                        }
                    }
                ]
            },
            dialog: {
                visible: false,
                title: 'Add assessment',
            },
            assessments: []
        }),

        validations: {
            assessment: {
                title: {
                    required
                }
            }
        },

        mounted() {
            this.fetchAssessments()
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            questions(questions) {
                return questions.reduce((total, item) => {
                    total.push(item.text)
                    return total
                }, []).join(', ')
            },

            fetchAssessments() {
                assessmentsService.get()
                    .then(response => {
                        this.assessments = JSON.parse(response) || []
                    })
            },

            toggleDialog(assessment) {
                if (assessment.id) {
                    this.dialog.title = 'Edit Assessment';
                    this.assessment = assessment;
                } else {
                    this.dialog.title = 'Add Assessment';
                    this.assessment = {
                        title: null,
                        id: null,
                        questions: [
                            {
                                text: '',
                                low: {
                                    text: ''
                                },
                                medium: {
                                    text: ''
                                },
                                high: {
                                    text: ''
                                }
                            }
                        ]
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.assessment.id = this.assessments.length + 1
                let assessments = this.assessments
                assessments.push(this.assessment)
                assessmentsService.create(assessments)
                this.fetchAssessments()
                this.dialog.visible = false;
            },

            addQuestion() {
                let question =   {
                    text: '',
                    low: {
                        text: ''
                    },
                    medium: {
                        text: ''
                    },
                    high: {
                        text: ''
                    }
                }
                this.assessment.questions.push(question)
            },

            removeQuestion(index) {
                this.assessment.questions.splice(index, 1)
            },

            update() {
            },

            destroy() {
            },

            restore() {

            },
        },

    }
</script>
