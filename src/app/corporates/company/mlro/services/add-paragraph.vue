<template>
    <v-dialog v-model="$parent.showParagraphForm" persistent max-width="700px">
        <v-card>
            <v-card-title>
                <span class="headline">Paragraph</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-textarea
                                    v-model="paragraph.details"
                                    label="Input engagement details"
                                    outline
                            ></v-textarea>
                        </v-flex>

                        <v-flex xs12>
                            <v-layout row wrap align-center>
                                <v-flex xs4>
                                    Show paragraph
                                </v-flex>
                                <v-flex xs4>
                                    <v-select
                                            :items="types"
                                            v-model="paragraph.type"
                                            label="Select"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs4>
                                    <v-select
                                            :items="availableParagraphs"
                                            v-model="paragraph.number"
                                            label="Select"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="$parent.showParagraphForm = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="submit" v-if="!paragraph.edit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import PhoneNumber from '@/components/phone-number'
    import Nationalities from '@/plugins/nationalities'

    export default {
        data() {
            return {
                showForm: true,
                types: ['before', 'after'],
            }
        },

        props: ['paragraph', 'paragraphs'],

        computed: {
            availableParagraphs() {
                return _.map(this.paragraphs, paragraph => paragraph.name);
            }
        },

        methods: {
            submit() {
                this.$emit('submit', this.paragraph)
            },
        },

        components: { PhoneNumber }
    }
</script>