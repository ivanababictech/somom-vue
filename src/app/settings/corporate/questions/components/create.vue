<template>
    <v-container fluid>
        <div class="headline">Create Question</div>
        <question-form :question="question" @submit="createQuestion"></question-form>
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

        },

        methods: {
            ...mapActions(['setMessage']),

            createQuestion() {
                questionService.create(this.question)
                    .then(response => {
                        this.$router.push({ name: 'corporate.questions' })

                        this.setMessage({ type: 'success', message: 'Question has been created successfully!' })
                    })
            }
        },

        components: { QuestionForm }
    }
</script>

<style scoped>

</style>