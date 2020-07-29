<template>
    <v-dialog
            v-model="dialog"
            width="794"
    >
        <v-btn
                slot="activator"
                small
                fab
                dark
                color="white"
        >
            <v-icon color="primary">{{ icon }}</v-icon>
        </v-btn>
        <v-card>
            <v-card-title class="headline" primary-title v-if="!question.id">
                Create new corporate question
            </v-card-title>
            <v-card-title class="headline" primary-title v-else>
                Edit corporate question
            </v-card-title>

            <v-card-text>
                <v-form @submit.prevent="submit()" lazy-validation>
                    <v-layout row>
                        <v-flex xs12 md12>
                            <v-text-field
                                label="Question title"
                                v-model="question.title"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 md12>
                            <v-select
                                :disabled="true"
                                :items="sectionTypes"
                                v-model="question.section"
                                label="Select section"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-label>Select Answer format</v-label>
                    </v-layout>
                    <v-layout>
                        <v-btn :color="isActiveFormat('y_n') ? 'primary' : ''"
                               @click="setFormat('y_n')">Y/N Format</v-btn>
                        <v-btn :color="isActiveFormat('textarea') ? 'primary' : ''"
                               @click="setFormat('textarea')">Textarea</v-btn>
                        <v-btn :color="isActiveFormat('dropdown') ? 'primary' : ''"
                               @click="setFormat('dropdown')">Dropdown</v-btn>
                    </v-layout>
                    <div v-if="question.format === 'dropdown'">
                        <v-label>Input dropdown list</v-label>
                        <v-btn fab dark small color="primary" @click="addDropdownItem()">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <v-layout v-for="(item, index) in question.data.dropdownItems" :key="index">
                            <v-text-field label="Input dropdown item value"
                                v-model="question.data.dropdownItems[index].value"></v-text-field>
                            <v-btn v-if="index > 0"
                                 fab dark small color="error" @click="removeDropdownItem(index)">
                                <v-icon dark>remove</v-icon>
                            </v-btn>
                        </v-layout>
                    </div>
                    <v-btn @click.prevent="submit" color="primary">Submit</v-btn>
                    <v-btn @click.prevent="closeDialog">Cancel</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script scoped>
    import { mapGetters, mapMutations } from 'vuex';
    import * as corporateQuestionsService from '@/app/settings/corporate/company-profile/components/questions/service';

    export default {
        props: {
            // question object
            questionObject: {
                type: Object,
                required: false,
                default: () => ({}),

            },
            section: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: false,
                default: 'fa fa-question'
            },
            color: {
                type: String,
                required: false,
                default: 'primary'
            },
            dark: {
                type: Boolean,
                required: false,
                default: true
            },
        },

        computed: {
            ...mapGetters({
                sectionTypes: 'settings/corporateSections',
            }),
        },

        data() {
            return {
                dialog: false,
                question: {},
                defaultQuestion: {
                    title: null,
                    section: null,
                    is_standard: true,
                    data: {
                        activities: [],
                        dropdownItems: [
                            {value: null}
                        ]
                    },
                    format: null,
                    corporate_id: this.$route.params.corporate_id
                },
            }
        },

        mounted() {
            this.initQuestion()
        },

        methods: {
            initQuestion() {
                this.question = JSON.parse(JSON.stringify(this.questionObject.id ? this.questionObject : this.defaultQuestion));
                this.question.section = this.section;
            },

            submit() {
                if(this.question.id) {
                    return this.update()
                }

                return this.create()
            },


            setFormat(format) {
                this.question.format = format;
            },

            isActiveFormat(format) {
                return this.question.format === format;
            },

            addDropdownItem() {
                this.question.data.dropdownItems.push({value: null})
            },

            removeDropdownItem(index) {
                this.question.data.dropdownItems.splice(index, 1);
            },

            create() {
                corporateQuestionsService.create(this.question)
                    .then(() => {
                        this.closeDialog()
                        this.$emit('submit')
                    })
            },

            update() {
                corporateQuestionsService.update(this.question)
                    .then(() => {
                        this.closeDialog()
                        this.$emit('submit')
                    })
            },

            closeDialog() {
                this.initQuestion()
                this.dialog = false
            }
        },

        watch: {
            section(newSection) {
                this.question.section = newSection;
            },
            questionObject: 'initQuestion'
        }
    }
</script>