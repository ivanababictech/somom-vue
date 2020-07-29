<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Questions</div>
            <v-flex text-xs-right>
                <v-btn fab dark small class="primary" to="questions/create" @click="editVatRate({})">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="questions"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.yes }}</td>
                <td>{{ props.item.no }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'corporate.questions.edit', params: { questionId: props.item.id }}">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeQuestion(props.item)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as questionService from './service'

    export default {
        data() {
            return {
                questions: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Title', value: 'name'},
                    {text: 'Score Yes', value: 'yes'},
                    {text: 'Score No', value: 'no'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        mounted() {
            this.getQuestions()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getQuestions() {
                this.setFetching({ fetching: true })

                questionService.get()
                    .then(response => {
                        this.questions = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            removeQuestion(question) {
                this.setFetching({ fetching: true })

                questionService.remove(question)
                    .then(response => {
                        this.setMessage({ type: 'success', message: 'Question has been deleted successfully!' })

                        this.getQuestions()
                    })
            }
        },
    }
</script>
