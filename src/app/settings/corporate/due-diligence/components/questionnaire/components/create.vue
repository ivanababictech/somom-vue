<template>
    <v-container fluid>
        <div class="headline">Create Question</div>
        <question-form :question="question" @submit="createQuestion"></question-form>
    </v-container>
</template>

<script scoped>
    import QuestionForm from './form';
    import * as questionService from '../service';
    import dueDiligenceMixin from '../../mixins/tab-mixin';

    export default {
        mixins: [dueDiligenceMixin],

        data() {
            return {
                question: {
                    section: null,
                    type: null,
                    data: {
                        questions: [{
                            title: null,
                            involvements: [],
                            dropdownItems: [
                                {value: null}
                            ],
                            is_standard: false,
                            format: null
                        }]
                    }
                }
            }
        },

        methods: {
            createQuestion() {
                questionService.create(this.question)
                    .then(response => {
                        this.$router.push({ name: 'corporate.due-diligence'});
                        this.setQuestionnaireTab();

                        this.setMessage({ type: 'success', message: 'Question has been created successfully!' });
                    })
            }
        },

        components: { QuestionForm }
    }
</script>