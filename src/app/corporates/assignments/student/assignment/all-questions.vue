<template>
    <v-dialog v-model="showQuestions" persistent max-width="500px">
        <v-btn color="success" dark slot="activator">VIEW ALL QUESTIONS</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">All Questions</span>
            </v-card-title>
            <v-card-text>
                <v-list two-line>
                    <template v-for="(question, index) in questions">
                        <v-divider :key="index"></v-divider>
                        <v-list-tile avatar :key="question.question">
                            <v-list-tile-content>
                                <v-list-tile-title v-html="question.question"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="showQuestions = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                showQuestions: false
            }
        },

        props: ['questions']
    }
</script>

<style scoped>

</style>