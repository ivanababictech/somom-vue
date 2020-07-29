<template>
    <v-container grid-list-md>
        <v-form @submit.prevent="submit()" lazy-validation>
            <v-layout row>
                <v-flex xs12 md3>
                    <v-select
                        :items="availableTypes"
                        v-model="decleration.type"
                        label="Select type"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md9>
                    <v-btn color="primary" @click.prevent="addParagraph">Add paragraph</v-btn>
                </v-flex>
            </v-layout>
            <template v-for="(paragraph, index) in decleration.data.paragraphs">
                <v-layout row  :key="index">
                    <v-flex xs12 md5 v-if="! decleration.data.paragraphs[index].is_standard">
                        <v-select
                            :items="involvements"
                            v-model="decleration.data.paragraphs[index].involvements"
                            label="Select involvement"
                            multiple
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 md5>
                        <v-checkbox v-model="decleration.data.paragraphs[index].is_standard"
                            @change="standardQuestionChanged(index)"
                            label="Standard question"></v-checkbox>
                    </v-flex>
                    <v-flex xs2 md2>
                        <v-btn
                            fab
                            small
                            dark
                            color="danger"
                            v-if="decleration.data.paragraphs.length > 1"
                            @click="removeParagraph(index)">
                            <v-icon>remove</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 md12>
                        <v-textarea
                            label="Decleration text"
                            v-model="decleration.data.paragraphs[index].text"
                            required
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </template>
            <v-btn :disabled="formNotValidToSubmit()"
                @click.prevent="$emit('submit')"
                color="primary">Submit</v-btn>
            <v-btn :to="{ name: 'corporate.due-diligence' }">Cancel</v-btn>
        </v-form>
    </v-container>
</template>

<script scoped>
    import { mapGetters } from 'vuex';
    import formMixin from '../../mixins/form';

    export default {
        props: ['decleration'],

        mixins: [formMixin],

        computed: {
            ...mapGetters('declerations', [
                'declerations'
            ]),

            involvements() {
                return this[`involvements${this.decleration.type}`];
            },

            availableTypes() {
                const usedTypes = _.map(this.declerations, decleration => decleration.type);

                let availableTypes = _.filter(this.types, type => ! _.includes(usedTypes, type));

                if (this.decleration.type !== null)
                    availableTypes.push(this.decleration.type);

                return availableTypes;
            }
        },

        methods: {
            addParagraph() {
                this.decleration.data.paragraphs.push({
                    text: null,
                    is_standard: false,
                    involvements: []
                })
            },

            removeParagraph(index) {
                this.decleration.data.paragraphs.splice(index, 1);
            },

            formNotValidToSubmit() {
                return _.filter(this.decleration.data.paragraphs, paragraph =>
                    paragraph.involvements.length > 0 || paragraph.is_standard).length !== this.decleration.data.paragraphs.length;
            },

            standardQuestionChanged(index) {
                this.decleration.data.paragraphs[index].involvements = [];
            }
        },

        watch: {
            involvements(involvements) {
                if (involvements !== undefined && involvements.length === 0) {
                    _.each(this.decleration.data.paragraphs, paragraph => {
                        paragraph.is_standard = true;
                        paragraph.involvements = [];
                    })
                }
            }
        }
    }
</script>