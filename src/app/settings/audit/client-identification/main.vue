<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">Client Identification</div>
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
                    :items="clientIdentifications"
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
                                v-model="clientIdentification.title"
                                required
                                @input="$v.clientIdentification.title.$touch()"
                        ></v-text-field>
                    </v-flex>
                    <template v-for="(option, i) in clientIdentification.questions">
                        <v-layout row align-center>
                            <v-flex xs9>
                                <v-text-field label="Question" v-model="option.text"></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-layout row>
                                    <v-flex xs6 class="text-xs-center">
                                        <v-btn fab dark small class="primary" @click="addQuestion"
                                               v-if="i === clientIdentification.questions.length - 1">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs6 class="text-xs-center">
                                        <v-btn fab dark small class="danger" @click="removeQuestion(i)"
                                               v-if="clientIdentification.questions.length > 1">
                                            <v-icon dark>remove</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </template>

                    <v-layout row>
                        <v-flex xs6>
                            <v-textarea
                                    label="Remark if question is answered yes"
                                    v-model="clientIdentification.remarkYes"
                                    required
                                    @input="$v.clientIdentification.remarkYes.$touch()"
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs6 ml-3>
                            <v-textarea
                                    label="Remark if question is answered no"
                                    v-model="clientIdentification.remarkNo"
                                    required
                                    @input="$v.clientIdentification.remarkNo.$touch()"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-checkbox v-model="clientIdentification.uniqueAnswer" label="Require unique answer" :value="false"></v-checkbox>
                    </v-layout>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!clientIdentification.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="clientIdentification.deleted_at" flat success @click.native="restore">Restore</v-btn>
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
    import * as clientIdentificationService from './service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title', value: 'title'},
                {text: 'Questions', value: 'questions'},
                {text: 'Actions', value: ''}
            ],
            clientIdentification: {
                id: null,
                title: null,
                questions: [
                    {text: ''}
                ],
                remarkYes: null,
                remarkNo: null,
                uniqueAnswer: null
            },
            dialog: {
                visible: false,
                title: 'Add client identification',
            },
            clientIdentifications: []
        }),

        validations: {
            clientIdentification: {
                title: {
                    required
                }
            }
        },

        mounted() {
            this.fetchClientIdentifications()
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

            fetchClientIdentifications() {
                clientIdentificationService.get()
                    .then(response => {
                        this.clientIdentifications = JSON.parse(response) || []
                    })
            },

            toggleDialog(clientIdentification) {
                if (clientIdentification.id) {
                    this.dialog.title = 'Edit client identification';
                    this.clientIdentification = clientIdentification;
                } else {
                    this.dialog.title = 'Add client identification';
                    this.clientIdentification = {
                        id: null,
                        title: null,
                        questions: [
                            {text: ''}
                        ],
                        remarkYes: null,
                        remarkNo: null,
                        uniqueAnswer: null
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.clientIdentification.id = this.clientIdentifications.length + 1
                let clientIdentifications = this.clientIdentifications
                clientIdentifications.push(this.clientIdentification)
                clientIdentificationService.create(clientIdentifications)
                this.fetchClientIdentifications()
                this.dialog.visible = false;
            },

            addQuestion () {
                this.clientIdentification.questions.push({text: ''})
            },

            removeQuestion(index) {
              this.clientIdentification.questions.splice(index, 1)
            },

            update() {},

            destroy() {},

            restore() {

            },
        },

    }
</script>
