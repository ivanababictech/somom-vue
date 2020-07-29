<template>
    <v-container fluid grid-list-md>
        <template row v-for="(sectionQuestions, section) in questions">
            <div class="headline">{{ getSectionLetter(section)}}. {{ section }}</div>
            <v-layout row v-for="(question, index) in sectionQuestions" :key="`questions_${question.id}_${index}`">
                <v-flex xs8 md6>
                    {{ question.question.title }}
                </v-flex>
                <template v-if="question.question.format === 'y_n'">
                    <v-flex xs4 md6>
                        <v-btn-toggle v-model="questionnaire[`answer_${question.id}_${index}`]">
                            <v-btn flat :value="true"
                                   :style="addButtonsStyle(questionnaire[`answer_${question.id}_${index}`], 'y')"
                                   active-class="primary">
                                <span>Y</span>
                            </v-btn>
                            <v-btn flat :value="false"
                                   :style="addButtonsStyle(questionnaire[`answer_${question.id}_${index}`], 'n')"
                                   active-class="primary">
                                <span>N</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                </template>
                <template v-if="question.question.format === 'dropdown'">
                    <v-flex xs4 md6>
                        <v-combobox
                            :items="question.question.dropdownItems"
                            item-text="value"
                            item-value="value"
                            label="Select answer"
                            v-model="questionnaire[`answer_${question.id}_${index}`]"
                            multiple
                        ></v-combobox>
                    </v-flex>
                </template>
                <template v-if="question.question.format === 'textarea'">
                    <v-flex xs4 md6>
                        <v-textarea
                            solo
                            name="input-7-4"
                            v-model="questionnaire[`answer_${question.id}_${index}`]"
                            label="Input answer"
                        ></v-textarea>
                    </v-flex>
                </template>
            </v-layout>

        </template>
    </v-container>
</template>

<script scoped>
    export default {
        props: [
            'questions',
            'questionnaire',
            'letters'
        ],

        methods: {
            getSectionLetter(section) {
                return this.letters[_.findIndex(Object.keys(this.questions), question => question === section)];
            },

            setAnswers() {
                _.each(this.questions, questions => {
                    _.each(questions, (question, index) => {
                        if (! this.questionnaire.hasOwnProperty(`answer_${question.id}_${index}`))
                            this.$set(this.questionnaire, `answer_${question.id}_${index}`, question.question.format === 'dropdown' ? [] : null)
                    })
                })
            }
        },

        watch: {
            questions: {
                handler: 'setAnswers',
                immediate: true
            }
        }
    }
</script>