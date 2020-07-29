<template>
    <v-card>
        <v-layout row v-for="(question, index) in questions" :key="`questions_${index}`">
            <v-flex xs8 md6>
                <div style="position: relative">

                </div>
                <v-list expand>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-speed-dial v-model="data[`question_${question.id}`]"
                                          transition="slide-y-reverse-transition"
                            >
                                <v-btn
                                        slot="activator"
                                        v-model="data[`question_${question.id}`]"
                                        color="primary"
                                        small
                                        flat
                                        dark
                                        fab
                                >
                                    <v-icon>edit</v-icon>
                                    <v-icon>close</v-icon>
                                </v-btn>
                                <questions-create
                                        :section="section"
                                        v-if="section"
                                        icon="edit"
                                        :questionObject="question"
                                        color="secondary"
                                        @submit="closeButton(question.id)"
                                ></questions-create>

                                <v-btn
                                        fab
                                        dark
                                        small
                                        color="red"
                                        @click="remove(question)"
                                >
                                    <v-icon>delete</v-icon>
                                </v-btn>

                                <questions-create
                                        v-if="section"
                                        :section="section"
                                        icon="add"
                                        :question="question"
                                        @submit="closeButton(question.id)"
                                ></questions-create>
                            </v-speed-dial>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ question.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <template v-if="question.format === 'y_n'">
                <v-flex xs4 md6>
                    <yes-no v-model="data[`answer_${question.id}`]"></yes-no>
                </v-flex>
            </template>
            <template v-if="question.format === 'dropdown'">
                <v-flex xs4 md6>
                    <v-combobox
                            :items="question.data.dropdownItems"
                            item-text="value"
                            item-value="value"
                            label="Select answer"
                            v-model="data[`answer_${question.id}`]"
                            multiple
                    ></v-combobox>
                </v-flex>
            </template>
            <template v-if="question.format === 'textarea'">
                <v-flex xs4 md6>
                    <v-textarea
                            solo
                            name="input-7-4"
                            v-model="data[`answer_${question.id}`]"
                            label="Input answer"
                    ></v-textarea>
                </v-flex>
            </template>
        </v-layout>
    </v-card>
</template>

<script scoped>
    import { mapGetters, mapMutations } from 'vuex';
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create';
    import * as questionService from '@/app/settings/corporate/company-profile/components/questions/service';

    export default {
        data() {
            return {
                action: null
            }
        },

        props: ['section', 'data'],

        computed: {
            ...mapGetters({
                corporateQuestions: 'corporate/corporateQuestions',
                corporate: 'corporate/data',
            }),

            activities() {
                return this.corporate.profile.principalActivity.activities
            },

            standardQuestions() {
                return this.corporateQuestions.filter(question => question.section === this.section && question.is_standard);
            },

            activityBasedQuestions() {
                return this.corporateQuestions.filter(question => {
                    return question.section === this.section && ! question.is_standard
                        && question.data.activities.some(a => _.includes(this.activities, a))
                });
            },

            questions() {
                return this.standardQuestions.concat(this.activityBasedQuestions);
            }
        },

        methods: {
            remove(question) {
                questionService.destroy(question.id)
            },

            closeButton(id) {
                this.data[`question_${id}`] = false
            }
        },

        watch: {
            questions(questions) {
                questions.map(question => {
                    if (! this.data.hasOwnProperty(`answer_${question.id}`))
                        this.$set(this.data, `answer_${question.id}`, question.format === 'dropdown' ? [] : null);
                })
            }
        },

        components: {QuestionsCreate}
    }
</script>