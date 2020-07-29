<template>
    <v-layout row wrap>
        <v-flex md3 xs6 v-for="(document, index) in documentType.documents" :key="index" >
            <input type="file"
                   ref="files"
                   @change="submitFiles(document, index, $event)"
                   multiple
                   hidden>
            <v-card>
                <v-responsive
                        @click.prevent="openFiles(index)"
                        style="height:150px; height: 300px; cursor: pointer"
                >
                    <img :src="document.image" alt="">
                </v-responsive>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{ document.title }}</div>
                        <span class="grey--text">{{ document.note }}</span>
                        <br>
                        <p v-for="(file, fileIndex) in document.files">
                            <span class="grey--text" >
                                {{ file.label }} - <a :href="file.full_path" target="_blank">Download</a>
                                <v-icon @click="removeFile(index, fileIndex)">close</v-icon>
                            </span>
                        </p>
                        <br />
                        <p v-if="document.files && document.files.length > 0">
                            <v-flex>
                                <v-menu
                                        :ref="`documentDate-${index}`"
                                        lazy
                                        :close-on-content-click="false"
                                        v-model="documentType.documents[index].documentDate"
                                        transition="scale-transition"
                                        full-width
                                        :nudge-right="40"
                                        min-width="290px"
                                        :return-value.sync="documentType.documents[index].document_date"
                                >
                                    <v-text-field
                                            slot="activator"
                                            label="Document Date"
                                            v-model="documentType.documents[index].document_date"
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="documentType.documents[index].document_date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="closeDocumentDate(index)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                        </p>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex';
    import * as corporatesService from '@/app/corporates/service';

    export default {
        data() {
            return {
                documentTypes: [],
                sourceOfWealth: {},
                sourceOfWealths: [],
                sourceOfWealthDocuments: [],
                documentDate: false
            }
        },

        props: ['documentType', 'dueDiligence'],

        mounted() {
            this.getSourceOfWealth();
        },

        methods: {
            ...mapActions(['setMessage']),

            openFiles(index) {
                this.$refs.files[index].click()
            },

            getFormData(files) {
                let data = new FormData();
                for (let file of files) {
                    data.append('documents[]', file, file.name)
                }
                data.append('type', 'document-files');

                return data
            },

            submitFiles(document, index, $event) {
                this.$set(document, 'file', {});

                const files = $event.target.files || $event.dataTransfer.files;

                if (! this.documentType.documents[index].hasOwnProperty('files'))
                    this.$set(this.documentType.documents[index], 'files', []);

                if (this.documentType.documents[index].files.length + files.length > 5) {
                    this.$store.dispatch('setMessage', {type: 'error', message: 'You can only upload 5 documents in total'});
                    return;
                }

                let existingFiles = this.documentType.documents[index].files;
                corporatesService.uploadDocument( this.getFormData(files))
                    .then(response => {
                        existingFiles = existingFiles.concat(response.data);
                        this.$set(this.documentType.documents[index], 'files', existingFiles);
                    }).catch(() => {
                    this.loading = false
                })
            },

            removeFile(documentIndex, fileIndex) {
                this.documentType.documents[documentIndex].files.splice(fileIndex, 1);
            },

            getSourceOfWealth() {
                const personIndex = _.findIndex(this.dueDiligence, person => person.name === this.documentType.person.name);
                if (this.dueDiligence[personIndex] !== undefined ) {
                    if(this.dueDiligence[personIndex].sourceWealth !== undefined)
                        this.sourceOfWealth = this.dueDiligence[personIndex].sourceWealth.wealths;
                    if (! Array.isArray(this.dueDiligence[personIndex].netWorthBracket) && this.dueDiligence[personIndex].netWorthBracket !== undefined)
                        this.netWorthBracket = this.dueDiligence[personIndex].netWorthBracket.type - 1;
                }

                this.getSourceOfWealths();
            },

            getSourceOfWealths() {
                this.$http.get('settings/wealth-sources').then(response => {
                    this.sourceOfWealths = response.data;
                    this.getSourceOfWealthDocuments();
                })
            },

            getSourceOfWealthDocuments() {
                if (this.sourceOfWealth.length !== 0) {
                    this.sourceOfWealthDocuments = _.flatten(_.map(_.filter(this.sourceOfWealths, sourceOfWealth =>
                        _.includes(this.sourceOfWealth, sourceOfWealth.id)), sourceOfWealth => sourceOfWealth.document.documents));
                    _.each(this.sourceOfWealthDocuments, document => {
                        const documentIndex = _.findIndex(this.documentType.documents, existingDocument => existingDocument.title === document.title);
                        if (documentIndex === -1)
                            this.documentType.documents.push(document);
                    });

                    return;
                }
                _.each(this.sourceOfWealths, sourceOfWealth => {
                    if (sourceOfWealth.document !== null) {
                        _.each(sourceOfWealth.document.documents, document => {
                            const documentIndex = _.findIndex(this.documentType.documents, existingDocument => existingDocument.title === document.title);
                            if (documentIndex !== -1)
                                this.documentType.documents.splice(documentIndex, 1);
                        })
                    }
                });
            },

            closeDocumentDate(index) {
                const ref = `documentDate-${index}`;
                this.$refs[ref][0].save(this.documentType.documents[index].document_date)
            }
        }
    }
</script>