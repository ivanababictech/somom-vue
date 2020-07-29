<template>
    <v-container grid-list-md>
        <v-form lazy-validation @submit.prevent="submit">
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <v-select
                            item-text="title"
                            item-value="id"
                            :items="sourceOfWealths"
                            v-model="sourceOfWealth.wealth_sources_id"
                            label="Select source of wealth"
                    ></v-select>
                </v-flex>
                <label>Define what documents are required from the user</label>
                <v-flex xs12>
                    <v-layout row wrap v-for="(document, index) in sourceOfWealth.documents" :key="index">
                        <v-flex xs10>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Document title"
                                            v-model="sourceOfWealth.documents[index].title"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            label="Guidance notes"
                                            v-model="sourceOfWealth.documents[index].note"
                                            outline
                                    ></v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <input type="file" ref="files" @change="submitDocument(index, $event)"  hidden>
                                    <img :src="document.image" @click="$refs.files[index].click()"  width="150px">
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <v-flex xs2 class="text-xs-right">
                            <v-btn fab dark small color="primary" @click="addDocument" v-if="index === 0">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="error" v-if="sourceOfWealth.documents.length > 1" @click="removeDocument(index)">
                                <v-icon dark>remove</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12>
                    <v-btn type="submit" color="info">Submit</v-btn>
                    <v-btn :to="{ name: 'corporate.document-types' }">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import * as sourceOfWealthService from '../service'

    export default {
        data() {
            return {
                documentStructure: {
                    title: null,
                    note: null,
                    file: null,
                    image: 'https://www.openkm.com/resources/images/icon/document-management-big.png'
                },
                sourceOfWealths: []
            }
        },

        mounted() {
            this.getSourceOfWealths();
        },

        props: ['sourceOfWealth'],

        computed: {
            ...mapGetters('sourceOfWealth', [
                'sourceOfWealthDocuments'
            ]),

            existingSourceOfWealths() {
                return _.map(this.sourceOfWealthDocuments, document => document.wealth_source.title)
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            submit() {
                this.$emit('submit')
            },

            addDocument() {
                this.sourceOfWealth.documents.push(JSON.parse(JSON.stringify(this.documentStructure)))
            },

            removeDocument(index) {
                this.sourceOfWealth.documents.splice(index, 1)
            },

            getFormData(files) {
                let data = new FormData();
                data.append('documents[]', files[0], files[0].name);
                data.append('type', 'source-of-wealth');

                return data
            },

            submitDocument(index, $event) {
                const files = $event.target.files || $event.dataTransfer.files;
                const formData = this.getFormData(files);

                sourceOfWealthService.uploadFile(formData)
                    .then(response => {
                        this.sourceOfWealth.documents[index].image = response.data.full_path
                    })
            },

            getSourceOfWealths() {
                sourceOfWealthService.getSourceOfWealths()
                    .then(data => {
                        this.sourceOfWealths = _.filter(data, sourceOfWealth => {
                            return ! _.includes(this.existingSourceOfWealths, sourceOfWealth.title)
                        });
                    })
            }
        },
    }
</script>

<style scoped>

</style>