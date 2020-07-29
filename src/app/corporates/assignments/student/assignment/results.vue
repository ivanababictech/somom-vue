<template>
    <div>
        <v-btn color="success" dark @click="submitResults">SUBMIT RESULTS</v-btn>
        <v-dialog v-model="showResults" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Score for <b>{{ assignment.name }}</b></span>
                </v-card-title>
                <v-card-text>
                    <v-flex>
                        Your score - <b>{{ result.score }} / {{ result.total_score }}</b>
                    </v-flex>
                    <v-flex>
                        Time taken - <b>{{ result.time }}</b>
                    </v-flex>
                    <v-flex>
                        Score in % - <b>{{ (result.score / result.total_score * 100).toFixed(2) }}</b>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-layout row align-center>
                        <v-flex>
                            EITHER
                            <v-btn color="success" @click="tryAgain">RE-TRY</v-btn> OR
                            <v-btn color="info">VIEW CORRECTIONS</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="finishAssignment">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                showResults: false
            }
        },

        props: ['assignment', 'storedAnswers', 'result'],

        methods: {
            ...mapActions(['setMessage']),

            submitResults() {
                if(!this.storedAnswers.length) {
                    this.showResults = false
                    this.setMessage({ type: 'error', message: 'You have no submitted answers!' })
                    return false
                }

                this.$emit('submit-results')
                this.showResults = true
            },

            getSumScore() {

            },

            tryAgain() {
                this.$emit('try-again')

                this.showResults = false
            },

            finishAssignment() {
                this.showResults = false

                this.$router.push('/assignments');

                this.setMessage({ type: 'success', message: 'The assignment was submitted!' })
            }
        },
    }
</script>

<style scoped>

</style>