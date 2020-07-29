<template>
    <v-container fluid>
        <div class="headline">Edit Question</div>
        <question-form v-if="questionIsSet" :question="question" @submit="updateQuestion"></question-form>
    </v-container>
</template>

<script>
    import QuestionForm from './form';
    import * as questionService from '../service';
    import dueDiligenceMixin from '../../mixins/tab-mixin';

    export default {
        mixins: [dueDiligenceMixin],

        data() {
            return {
                question: {},
                questionIsSet: false
            }
        },

        mounted() {
            this.getQuestion();
        },

        methods: {
            updateQuestion() {
                questionService.update(this.question)
                    .then(response => {
                        this.$router.push({ name: 'corporate.due-diligence' });
                        this.setQuestionnaireTab();

                        this.setMessage({ type: 'success', message: 'Question has been updated successfully!' });
                    })
            },

            getQuestion() {
                questionService.find(this.questionId)
                    .then(({data}) => {
                        this.question = data;
                        this.questionIsSet = true;
                    })
            }
        },

        computed: {
            questionId() {
                return this.$route.params.questionId
            },
        },

        components: { QuestionForm }
    }
</script>

<style scoped>

</style>