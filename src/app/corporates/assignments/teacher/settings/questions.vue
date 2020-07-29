<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex md10>
                <v-container grid-list-md v-for="(question, index) in questions" :key="index">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field
                                    label="Input question"
                                    v-model="question.question"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Input answer description"
                                    v-model="question.answer"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field
                                    label="Marks"
                                    v-model="question.marks"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex md10>
                            <v-container grid-list-md v-for="(keyword, index) in question.keywords" :key="index">
                                <v-layout row>
                                    <v-text-field
                                            label="Input answer description keywords"
                                            v-model="keyword.name"
                                    ></v-text-field>
                                </v-layout>
                            </v-container>
                        </v-flex>

                        <v-flex xs2>
                            <v-btn fab dark small color="success" @click="addKeyword(question)">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="error" @click="removeKeyword(question)">
                                <v-icon dark>remove</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-text-field
                                    label="Account name for Debit"
                                    :disabled="true"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Amount"
                                    v-model="question.amountDebit"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-select
                                    item-text="name"
                                    item-value="name"
                                    :items="names"
                                    v-model="question.amountNameDebit"
                                    label="Select"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-text-field
                                    label="Account name for Credit"
                                    :disabled="true"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Amount"
                                    v-model="question.amountCredit"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-select
                                    item-text="name"
                                    item-value="name"
                                    :items="names"
                                    v-model="question.amountNameCredit"
                                    label="Select"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12>
                        <v-divider v-if="index + 1 < questions.length"></v-divider>
                    </v-flex>
                </v-container>
            </v-flex>
            <v-flex xs2>
                <v-btn fab dark small color="success" @click="addQuestion">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="error" @click="removeQuestion">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                questionStructure: {
                    question: '',
                    answer: '',
                    marks: '',
                    keywords: [],
                },

                keywordStructure: {
                    name: null
                }
            }
        },

        props: ['questions', 'names'],

        mounted() {
            this.init()
        },

        methods: {
            init() {
                if(!this.questions.length) {
                    this.addQuestion()
                }
            },

            addKeyword(question) {
                question.keywords.push(JSON.parse(JSON.stringify(this.keywordStructure)))
            },

            removeKeyword(question) {
                if(question.keywords.length >=2) {
                    question.keywords.pop()
                }
            },

            addQuestion() {
                this.questions.push(Vue.util.extend({}, this.questionStructure))
                this.addKeyword(this.questions[this.questions.length - 1])
            },

            removeQuestion() {
                if(this.questions.length >=2) {
                    this.questions.pop()
                }
            },
        },
    }
</script>

<style scoped>

</style>