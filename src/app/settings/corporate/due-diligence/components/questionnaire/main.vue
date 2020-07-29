<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Due diligence questionnaire</div>
            <v-flex text-xs-right>
                <v-btn color="primary" :to="{ name: 'due-diligence.questionnaire.create' }" text-xs-center>Create a new question</v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="dueDiligenceQuestions"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.section }}</td>
                <td>{{ props.item.type }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'due-diligence.questionnaire.edit', params: { questionId: props.item.id }}">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeDueDiligenceQuestion(props.item.id)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import * as questionsService from './service';

    export default {
        data() {
            return {
                dueDiligenceQuestions: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Section', value: 'section'},
                    {text: 'Type', value: 'type'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        mounted() {
            this.getDueDiligenceQuestions();
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            ...mapMutations('questionnaire', [
                'setQuestions'
            ]),

            getDueDiligenceQuestions() {
                this.setFetching({ fetching: true });

                questionsService.getQuestions()
                    .then(({data}) => {
                        this.dueDiligenceQuestions = data;

                        this.setFetching({ fetching: false });
                        this.setQuestions(data);
                    })
            },

            removeDueDiligenceQuestion(questionId) {
                this.setFetching({ fetching: true });

                questionsService.removeQuestion(questionId)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Corporate question has been deleted successfully!' })

                        this.getDueDiligenceQuestions()
                    })
            }
        },
    }
</script>
