<template>
    <v-container fluid>
        <div class="headline">Edit Question</div>
        <question-form :question="question" @submit="updateQuestion"></question-form>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import QuestionForm from './form'
    import * as questionService from '../service'

    export default {
        data() {
            return {
                question: {}
            }
        },

        mounted() {
            this.getQuestion()
        },

        methods: {
            ...mapActions(['setMessage']),

            updateQuestion() {
                questionService.update(this.question)
                    .then(response => {
                        this.$router.push({ name: 'corporate.questions' })

                        this.setMessage({ type: 'success', message: 'Question has been updated successfully!' })
                    })
            },

            getQuestion() {
                questionService.find(this.questionId)
                    .then(response => this.question = response.data)
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