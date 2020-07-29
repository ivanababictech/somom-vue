<template>
    <v-layout row wrap>
        <v-container grid-list-md v-if="assignment.id">
            <div class="headline">ACCESSING AN ASSIGNMENTS</div>
            <v-card>
                <v-card-title>
                    <b>{{ assignment.name }}</b>
                    <v-spacer></v-spacer>
                    <all-questions :questions="assignment.settings.questions"></all-questions>
                    <timer :assignment="assignment"></timer>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="answers"
                        hide-actions
                        class="elevation-1"
                        disable-initial-sort
                >
                    <template slot="items" slot-scope="props">
                        <td>
                            <v-select
                                    item-text="name"
                                    item-value="name"
                                    :items="assignment.settings.accountNames"
                                    v-model="props.item.accountName"
                                    label="Select "
                                    required
                            ></v-select>
                        </td>
                        <td>
                            <v-text-field
                                    label="enter description "
                                    v-model="props.item.description"
                                    required
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                    label="input number"
                                    v-model="props.item.debit"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                    label="input number"
                                    v-model="props.item.credit"
                            ></v-text-field>
                        </td>
                    </template>
                </v-data-table>

                <v-flex xs12  text-xs-center>
                    <v-card dark color="success">
                        <v-card-text class="px-0">
                            <span>{{ currentQuestion.question }}</span>
                            <v-btn color="default" @click="prevQuestion"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
                            <v-btn color="default" @click="nextQuestion">Next <v-icon>mdi-arrow-right</v-icon></v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 class="text-xs-right">
                    <results :stored-answers="storedAnswers" :assignment="assignment" :result="result" @submit-results="submitResults" @try-again="tryAgain"></results>
                </v-flex>
            </v-card>
        </v-container>
        <stored-answers :stored-answers="storedAnswers" :assignment="assignment" @delete-answer="deleteAnswer"></stored-answers>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import AllQuestions from './all-questions'
    import Timer from './timer'
    import StoredAnswers from './stored-answers'
    import Results from './results'
    import Vue from 'vue'

    export default {
        data() {
            return {
                answers: [],
                storedAnswers: [],
                answerStructure: {
                    accountName: '',
                    description: '',
                    debit: '',
                    credit: '',
                    editable: false
                },
                headers: [
                    { text: 'Account name', value: 'name' },
                    { text: 'Description', value: 'description' },
                    { text: 'Debit', value: 'debit' },
                    { text: 'Credit', value: 'credit' },
                ],
                assignment: {},
                numberOfCurrentQuestion: 0,
                result: {}
            }
        },

        mounted() {
            this.getAssignment()
        },

        methods: {
            ...mapActions(['setMessage']),

            /**
             * Init answers by account names
             */
            initAnswers() {
                for (let i = 0; i < this.assignment.settings.accountNames.length; i ++) {
                    this.answers.push(Vue.util.extend({}, this.answerStructure))
                }
            },

            /**
             * Get current assignment for answers
             */
            getAssignment() {
                this.$http.get('assignments/' + this.assignmentId).then(response => {
                    this.assignment = response.data.data

                    this.$set(this.assignment, 'timer', '00:00:00')
                    this.$set(this.assignment, 'timerIsRunning', false)
                    this.initAnswers()
                })
            },

            /**
             * Go to the next question
             */
            nextQuestion() {
                this.storeAnswers()

                if(this.numberOfCurrentQuestion < this.assignment.settings.questions.length - 1) {
                    this.numberOfCurrentQuestion++
                } else {
                    this.setMessage({ type: 'warning', message: 'No more questions!'})
                }

                this.resetAnswers()
            },

            /**
             * Go to the previous question
             */
            prevQuestion() {
                if(this.numberOfCurrentQuestion > 0) {
                    this.numberOfCurrentQuestion--

                    this.resetAnswers()
                } else {
                    this.setMessage({ type: 'warning', message: 'No more questions!'})
                }
            },

            /**
             * Submit all results and stop timer
             */
            submitResults() {
                this.$bus.$emit('stop-timer')

                let params = {
                    answers: this.storedAnswers,
                    timer: this.assignment.timer,
                }

                this.$http.post('assignments/' + this.assignmentId + '/results', params).then(response => {
                    this.result = response.data.data

                    this.setMessage({ type: 'success', message: response.data.message})
                })
            },

            /**
             * Check if the answer is valid for storing
             */
            answerIsValid(answer) {
                return answer.accountName
            },

            /**
             * Reset all answers
             */
            resetAnswers() {
                this.answers = []
                this.initAnswers()
            },

            /**
             * Store new answers
             */
            storeAnswers() {
                this.$set(this.storedAnswers, this.numberOfCurrentQuestion, [])

                this.answers.map(answer => {
                    if(this.answerIsValid(answer)) {
                        this.storedAnswers[this.numberOfCurrentQuestion].push(answer)
                    }
                })
            },

            /**
             * Delete stoted answer
             *
             * @param questionIndex
             * @param answerIndex
             */
            deleteAnswer(questionIndex, answerIndex) {
                this.storedAnswers[questionIndex].splice(answerIndex, 1)

                // remove question
                if(!this.storedAnswers[questionIndex].length) {
                    this.storedAnswers.splice(questionIndex, 1)
                }
            },

            /**
             * User tries again to give answers
             */
            tryAgain() {
                this.resetAnswers()

                this.storedAnswers = []
                this.numberOfCurrentQuestion = 0

                this.setMessage({ type: 'warning', message: 'You have one more chance!'})
            }
        },

        computed: {
            assignmentId() {
                return this.$route.params.assignmentId
            },

            currentQuestion() {
                return this.assignment.settings.questions[this.numberOfCurrentQuestion] || {}
            }
        },

        components: { AllQuestions, Timer, StoredAnswers, Results }
    }
</script>

<style scoped>

</style>