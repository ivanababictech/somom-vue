<template>
    <v-container grid-list-md>
        <v-form lazy-validation @submit.prevent="submit">
            <v-layout row wrap align-center>
                <v-flex xs12>
                    <v-select
                            :items="types"
                            v-model="allocationType.type"
                            label="Select type"
                    ></v-select>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                            label="Input notes for client"
                            v-model="allocationType.note"
                            outline
                    ></v-textarea>
                </v-flex>
                <label>Define what documents are required from the user</label>
                <v-flex xs12>
                    <v-layout row wrap v-for="(document, index) in allocationType.documents" :key="index">
                        <v-flex xs10>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Document title"
                                            v-model="document.title"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            label="Guidance notes"
                                            v-model="document.note"
                                            outline
                                    ></v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <input type="file" ref="files" @change="submitImage(document, $event)"  hidden>
                                    <img :src="document.image" @click="$refs.files[index].click()"  width="150px">
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>

                        <v-flex xs2 class="text-xs-right">
                            <v-btn fab dark small color="primary" @click="addDocument" v-if="index === 0">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="error" v-if="allocationType.documents.length > 1" @click="removeDocument(index)">
                                <v-icon dark>remove</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12>
                    <v-btn type="submit" color="info">Submit</v-btn>
                    <v-btn :to="{ name: 'corporate.allocation-types' }">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as allocationTypeService from '../service'

    export default {
        data() {
            return {
                documentStructure: {
                    title: '',
                    note: '',
                    image: 'https://www.openkm.com/resources/images/icon/document-management-big.png'
                },
                types: [
                    'individual',
                    'corporate',
                    'trust',
                    'foundation',
                ],
                files: []
            }
        },

        props: ['allocationType'],

        mounted() {
            this.init()
        },

        methods: {
            ...mapActions(['setMessage']),

            init() {
                if(!this.allocationType.documents.length) {
                    this.addDocument()
                }
            },

            submit() {
                this.$emit('submit')
            },

            addDocument() {
                this.allocationType.documents.unshift(JSON.parse(JSON.stringify(this.documentStructure)))
            },

            removeDocument(index) {
                this.allocationType.documents.splice(index, 1)
            },

            getFormData(files) {
                let data = new FormData()
                data.append('image', files[0], files[0].name)

                return data
            },

            submitImage(document, $event) {
                const files = $event.target.files || $event.dataTransfer.files;
                const formData = this.getFormData(files);

                allocationTypeService.uploadImage(formData)
                    .then(response => {
                        document.image = response.data

                        this.setMessage({ type: 'primary', message: 'Image has been uploaded successfully!' })
                    })
            }
        },
    }
</script>

<style scoped>

</style>