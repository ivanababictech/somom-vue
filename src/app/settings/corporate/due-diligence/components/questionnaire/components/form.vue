<template>
    <v-container grid-list-md>
        <v-form @submit.prevent="submit()" lazy-validation>
            <v-layout row>
                <v-flex xs12 md6>
                    <v-text-field
                        label="Section name"
                        v-model="question.section"
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-select
                        :items="types"
                        v-model="question.type"
                        label="Select type"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md2>
                    <v-btn color="primary" @click="addQuestion">Add question</v-btn>
                </v-flex>
            </v-layout>
            <template v-for="(questionnaire, index) in question.data.questions">
                <v-layout row>
                    <v-flex xs12 md10>
                        <v-text-field
                            label="Question title"
                            v-model="question.data.questions[index].title"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2 md2>
                        <v-btn
                            fab
                            small
                            dark
                            color="danger"
                            v-if="question.data.questions.length > 1"
                            @click="removeQuestion(index)">
                            <v-icon>remove</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="involvementsAvailable">
                    <v-flex xs12 md6 v-if="! question.data.questions[index].is_standard">
                        <v-select
                            :items="involvements"
                            v-model="question.data.questions[index].involvements"
                            label="Select involvement"
                            multiple
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-checkbox v-model="question.data.questions[index].is_standard"
                            @change="questionStandardChange(index)"
                            label="Standard question"></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-label>Select Answer format</v-label>
                </v-layout>
                <v-layout>
                    <v-btn :color="isActiveFormat('y_n', index) ? 'primary' : ''"
                        @click="setFormat('y_n', index)">Y/N Format</v-btn>
                    <v-btn :color="isActiveFormat('textarea', index) ? 'primary' : ''"
                        @click="setFormat('textarea', index)">Textarea</v-btn>
                    <v-btn :color="isActiveFormat('dropdown', index) ? 'primary' : ''"
                        @click="setFormat('dropdown', index)">Dropdown</v-btn>
                </v-layout>
                <div v-if="question.data.questions[index].format === 'dropdown'">
                    <v-label>Input dropdown list</v-label>
                    <v-btn fab dark small color="primary" @click="addDropdownItem(index)">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-layout v-for="(item, dropdownIndex) in question.data.questions[index].dropdownItems" :key="`${index}${dropdownIndex}`">
                        <v-text-field label="Input dropdown item value"
                            v-model="question.data.questions[index].dropdownItems[dropdownIndex].value"></v-text-field>
                        <v-btn v-if="index > 0"
                            fab dark small color="error" @click="removeDropdownItem(index,dropdownIndex)">
                            <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                </div>
            </template>
            <v-btn :disabled="formNotValidToSubmit()"
                type="submit"
                color="primary">Submit</v-btn>
            <v-btn :to="{ name: 'corporate.due-diligence' }">Cancel</v-btn>
        </v-form>
    </v-container>
</template>

<script scoped>
    import { mapGetters } from 'vuex';
    import formMixin from '../../mixins/form';

    export default {
        props: ['question'],

        mixins: [formMixin],

        computed: {
            ...mapGetters('questionnaire', [
                'questions'
            ]),

            involvements() {
                return this[`involvements${this.question.type}`];
            },

            involvementsAvailable() {
                return this.question.type !== 'Trust' && this.question.type !== 'Foundation';
            }
        },

        methods: {
            addQuestion() {
                this.question.data.questions.push({
                    title: null,
                    involvements: [],
                    dropdownItems: [
                        {value: null}
                    ],
                    is_standard: ! this.involvementsAvailable,
                    format: null
                })
            },

            removeQuestion(index) {
                this.question.data.questions.splice(index, 1);
            },

            questionStandardChange(index) {
                this.question.data.questions[index].involvements = [];
            },

            setFormat(format, index) {
                this.question.data.questions[index].format = format;
            },

            isActiveFormat(format, index) {
                return this.question.data.questions[index].format === format;
            },

            addDropdownItem(index) {
                this.question.data.questions[index].dropdownItems.push({value: null})
            },

            removeDropdownItem(index, dropdownIndex) {
                this.question.data.questions[index].dropdownItems.splice(dropdownIndex, 1);
            },

            formNotValidToSubmit() {
                return _.filter(this.question.data.questions, question =>
                    (question.involvements.length > 0
                    || question.is_standard)
                    && ! _.isEmpty(question.format)).length !== this.question.data.questions.length;
            },

            submit() {
                this.$emit('submit')
            }
        },

        watch: {
            involvementsAvailable(involvementsAvailable) {
                if (! involvementsAvailable)
                    _.each(this.question.data.questions, question => {
                        question.is_standard = true;
                        question.involvements = [];
                    })
            }
        }
    }
</script>