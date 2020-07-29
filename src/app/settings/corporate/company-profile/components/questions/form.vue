<template>
    <v-container grid-list-md>
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
                <v-flex xs12 md4>
                    <v-select
                        :items="sectionTypes"
                        v-model="question.section"
                        label="Select section"
                    ></v-select>
                </v-flex>
                <v-flex xs12 md4 v-if="! question.is_standard">
                    <v-select
                        :items="companyActivities"
                        v-model="question.data.activities"
                        label="Select activities"
                        item-text="name"
                        item-value="id"
                        multiple
                    ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                    <v-checkbox v-model="question.is_standard"
                        label="Standard question"></v-checkbox>
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
            <v-btn type="submit" color="primary">Submit</v-btn>
            <v-btn :to="{ name: 'corporate.corporate-questions' }">Cancel</v-btn>
        </v-form>
    </v-container>
</template>

<script scoped>
    import {mapGetters} from 'vuex'

    export default {
        props: ['question'],

        computed: {
            ...mapGetters({
                companyActivities: 'settings/company_activities',
                sectionTypes: 'settings/corporateSections',
            }),
        },

        methods: {
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

            submit() {
                this.$emit('submit')
            }
        },

        watch: {
            'question.is_standard': {
                handler(newVal) {
                    if (! newVal)
                        this.question.data.activities = [];
                }
            }
        }
    }
</script>