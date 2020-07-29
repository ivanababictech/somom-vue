<template>
    <v-container grid-list-md>
        <v-form @submit.prevent="submit()" lazy-validation>
            <v-layout row>
                <v-flex xs4>
                    <v-text-field
                            label="Title"
                            v-model="question.title"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>

                    <v-text-field
                            label="Score Yes"
                            v-model="question.yes"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                            label="Score No"
                            v-model="question.no"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-btn type="submit" color="info">Submit</v-btn>
            <v-btn :to="{ name: 'corporate.questions' }">Cancel</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        props: ['question'],

        methods: {
            submit() {
                this.$emit('submit')
            }
        }
    }
</script>

<style scoped>

</style>