<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">Independence Questionnaire</div>
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
                    :items="independenceQuestionnaires"
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
                                v-model="independenceQuestionnaire.title"
                                required
                                @input="$v.independenceQuestionnaire.title.$touch()"
                        ></v-text-field>
                    </v-flex>
                    <template v-for="(option, i) in independenceQuestionnaire.questions">
                        <v-layout row align-center>
                            <v-flex xs9>
                                <v-text-field label="Answer" v-model="option.text"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-layout row>
                                    <v-flex xs6 class="text-xs-center">
                                        <v-btn fab dark small class="primary" @click="addQuestion"
                                               v-if="i === independenceQuestionnaire.questions.length - 1">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs6 class="text-xs-center">
                                        <v-btn fab dark small class="danger" @click="removeQuestion(i)"
                                               v-if="independenceQuestionnaire.questions.length > 1">
                                            <v-icon dark>remove</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </template>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!independenceQuestionnaire.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="independenceQuestionnaire.deleted_at" flat success @click.native="restore">Restore</v-btn>
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
    import * as independenceQuestionnaireService from './service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title', value: 'title'},
                {text: 'Questions', value: 'questions'},
                {text: 'Actions', value: ''}
            ],
            independenceQuestionnaire: {
                id: null,
                title: null,
                questions: [
                    {text: ''}
                ]
            },
            dialog: {
                visible: false,
                title: 'Add independence questionnaire',
            },
            independenceQuestionnaires: []
        }),

        validations: {
            independenceQuestionnaire: {
                title: {
                    required
                }
            }
        },

        mounted() {
            this.fetchIndependenceQuestionnaires()
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            questions (questions) {
              return questions.reduce((total, item) => {
                  total.push(item.text)
                  return total
              }, []).join(', ')
            },

            fetchIndependenceQuestionnaires() {
                independenceQuestionnaireService.get()
                    .then(response => {
                        this.independenceQuestionnaires = JSON.parse(response) || []
                    })
            },

            toggleDialog(independenceQuestionnaire) {
                if (independenceQuestionnaire.id) {
                    this.dialog.title = 'Edit Independence Questionnaire';
                    this.independenceQuestionnaire = independenceQuestionnaire;
                } else {
                    this.dialog.title = 'Add Independence Questionnaire';
                    this.independenceQuestionnaire = {
                        title: null,
                        id: null,
                        questions: [{
                            text: ''
                        }]
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.independenceQuestionnaire.id = this.independenceQuestionnaires.length + 1
                let independenceQuestionnaires = this.independenceQuestionnaires
                independenceQuestionnaires.push(this.independenceQuestionnaire)
                independenceQuestionnaireService.create(independenceQuestionnaires)
                this.fetchIndependenceQuestionnaires()
                this.dialog.visible = false;
            },

            addQuestion () {
                this.independenceQuestionnaire.questions.push({text: ''})
            },

            removeQuestion(index) {
              this.independenceQuestionnaire.questions.splice(index, 1)
            },

            update() {},

            destroy() {},

            restore() {

            },
        },

    }
</script>
