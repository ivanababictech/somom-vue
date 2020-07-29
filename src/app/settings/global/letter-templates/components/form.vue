<template>
    <v-container grid-list-md>
        <v-form lazy-validation @submit.prevent="submit">
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <v-text-field
                            label="Engagement template name"
                            v-model="letterTemplate.name"
                    ></v-text-field>
                </v-flex>
                <label>Define paragraphs</label>
                <v-flex xs12>
                    <v-layout row wrap v-for="(paragraph, index) in letterTemplate.data.paragraphs" :key="index">
                        <v-flex xs10>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Paragraph title"
                                            v-model="paragraph.name"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            label="Engagement details"
                                            v-model="paragraph.details"
                                            outline
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <v-flex xs2 class="text-xs-right">
                            <v-btn fab dark small color="primary" @click="addParagraph" v-if="index === 0">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="warning" v-if="letterTemplate.data.paragraphs.length > 1" @click="removeParagraph(index)">
                                <v-icon dark>remove</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <label>Select where to show the services</label>
                <v-flex xs12>
                    <v-layout row wrap align-center>
                        <v-flex xs2>
                            Show paragraph
                        </v-flex>
                        <v-flex xs5>
                            <v-select
                                    :items="types"
                                    v-model="letterTemplate.data.type"
                                    label="Select"
                            ></v-select>
                        </v-flex>
                        <v-flex xs5>
                            <v-select
                                    :items="getParagraphs()"
                                    v-model="letterTemplate.data.number"
                                    label="Select"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12>
                    <v-btn type="submit" color="green" dark>Submit</v-btn>
                    <v-btn flat :to="{ name: 'global.letter-templates' }">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                paragraphStructure: {
                    name: '',
                    details: ''
                },
                types: ['before', 'after'],
                numbers: []
            }
        },

        props: ['letterTemplate'],

        mounted() {
            this.init()
        },

        methods: {
            ...mapActions(['setMessage']),

            init() {
                if(!this.letterTemplate.data.paragraphs.length) {
                    this.addParagraph()
                }
            },

            submit() {
                this.$emit('submit')
            },

            addParagraph() {
                this.letterTemplate.data.paragraphs.push(JSON.parse(JSON.stringify(this.paragraphStructure)))
            },

            removeParagraph(index) {
                this.letterTemplate.data.paragraphs.splice(index, 1)
            },

            getParagraphs() {
                return this.letterTemplate.data.paragraphs.map(paragraph => paragraph.name)
            }
        },
    }
</script>

<style scoped>

</style>