<template>
    <v-dialog v-model="showQuestion" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Got a question?</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                    label="Name"
                                    v-model="question.name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Email"
                                    v-model="question.email"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                    v-model="question.message"
                                    label="Message"
                                    outline
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outline @click.native="$parent.showQuestion = false">Close</v-btn>
                <v-btn color="primary" @click.native="$parent.showQuestion = false">Send</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                question: {}
            }
        },

        props: ['showQuestion']
    }
</script>

<style scoped>

</style>