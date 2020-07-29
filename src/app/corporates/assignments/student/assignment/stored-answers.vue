<template>
    <v-container grid-list-md>
        <v-card v-for="(answers, questionIndex) in storedAnswers" :key="questionIndex">
            <v-card-title>
                <b>{{ assignment.settings.questions[questionIndex].question }}</b>
            </v-card-title>
            <v-flex>
                <v-data-table
                        :headers="headers"
                        :items="answers"
                        hide-actions
                        class="elevation-1"
                        disable-initial-sort
                        hide-headers
                >
                    <template slot="items" slot-scope="props">
                        <td>
                            <v-select
                                    item-text="name"
                                    item-value="name"
                                    :items="assignment.settings.accountNames"
                                    v-model="props.item.accountName"
                                    label="Account Name"
                                    :disabled="!props.item.editable"
                            ></v-select>
                        </td>
                        <td>
                            <v-text-field
                                    label="enter description"
                                    v-model="props.item.description"
                                    :disabled="!props.item.editable"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                    label="input number"
                                    v-model="props.item.debit"
                                    :disabled="!props.item.editable"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                    label="input number"
                                    v-model="props.item.credit"
                                    :disabled="!props.item.editable"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-btn icon class="mx-0" v-if="!props.item.editable" @click="props.item.editable = true">
                                <v-icon color="teal">
                                    edit
                                </v-icon >
                            </v-btn>
                            <v-btn icon class="mx-0" v-else @click="props.item.editable = false">
                                <v-icon color="teal">
                                    check
                                </v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteAnswer(questionIndex, props.index)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
            </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    { text: 'Account name', value: 'name' },
                    { text: 'Description', value: 'description' },
                    { text: 'Debit', value: 'debit' },
                    { text: 'Credit', value: 'credit' },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
            }
        },

        props: ['storedAnswers', 'assignment'],

        methods: {
            deleteAnswer(questionIndex, answerIndex) {
                this.$emit('delete-answer', questionIndex, answerIndex)
            }
        },
    }
</script>

<style scoped>

</style>