<template>
    <v-dialog v-model="dialog" scrollable max-width="600px">
        <v-btn slot="activator" dark small color="primary">
            Create comment
        </v-btn>
        <v-card>
            <v-toolbar card color="accent">
                <v-icon @click="back">arrow_back</v-icon>
                <v-toolbar-title>Create comment</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-select
                                item-text="label"
                                item-value="value"
                                :items="sections"
                                v-model="form.section"
                                label="Select part">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 v-if="form.section">
                            <v-select
                                item-text="label"
                                item-value="value"
                                :items="types"
                                :return-object="true"
                                v-model="form.type"
                                label="Select type">
                            </v-select>
                        </v-flex>
                        <template v-if="form.type">
                            <v-flex xs1>
                                <v-avatar
                                    slot="activator"
                                    size="48px">
                                    <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                                         alt="Avatar">
                                </v-avatar>
                            </v-flex>
                            <v-flex xs3>
                                <strong class="pl-3 py-1">
                                    {{ currentUser.full_name }}
                                </strong>
                                <v-btn
                                    :color="'primary'"
                                    :flat="true"
                                    tag="span"
                                    small>
                                    <strong>{{ form.type.label }}</strong>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12>
                                <editor @update="html => form.message = html"></editor>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="dialog = false">Cancel</v-btn>
                <v-btn v-if="form.type"
                       :disabled="!form.message"
                       color="primary" flat
                       @click="create">
                    Create
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Editor from './editor'
    import {COMMENT_SECTIONS, createComment} from './../../../../service';
    import * as getDataService from './../../getDataService';
    import {mapGetters} from 'vuex';

    export default {
        name: "create",
        components: {Editor},
        props: ['questions', 'individual', 'involvements', 'corporate', 'wealthSources'],
        data()
        {
            return {
                dialog: false,
                sections: COMMENT_SECTIONS,
                sectionsTypes: {
                    questionnaire: {},
                    wealth_sources: []
                },
                form: {
                    section: null,
                    type: null,
                    message: null,
                }
            }
        },
        methods: {
            setQuestions()
            {
                if (this.individual) {
                    this.sectionsTypes.questionnaire =
                        getDataService.getIndividualQuestions(this.questions, this.involvements, this.individual);
                } else {
                    this.sectionsTypes.questionnaire =
                        getDataService.getCompanyQuestions(this.questions, this.involvement);
                }

            },
            back()
            {
                this.dialog = false;
                this.resetForm();
            },
            resetForm()
            {
                for (let key in this.form) {
                    this.form[key] = null;
                }
            },
            create()
            {
                createComment({
                    section_person_id: this.individual ? this.individual.id : this.corporate.id,
                    section: this.form.section,
                    type: this.form.type.value,
                    comment: this.form.message,
                }).then(() => {
                    this.$emit('update');
                    this.back()
                });
            }
        },
        computed: {
            involvement()
            {
                if (!this.individual)
                    return getDataService.getInvolmentByName(this.involvements, this.corporate.name);
            },
            types()
            {
                switch (this.form.section) {
                    case 'questionnaire':
                        let questionsTypes = [];
                        _.each(this.sectionsTypes.questionnaire, section => {
                            _.each(section, question => {
                                questionsTypes.push({label: question.question.title, value: question.id});
                            });
                        });

                        return questionsTypes;
                    case 'wealth_sources':
                        let wosTypes = [];
                        _.each(this.wealthSources, wealthSource => {
                            wosTypes.push({label: wealthSource.title, value: wealthSource.id});
                        });

                        return wosTypes;
                    default:
                        return [];
                }
            },
            ...mapGetters(['currentUser'])
        },
        watch: {
            questions: {
                handler: 'setQuestions',
                immediate: true
            }
        }
    }
</script>