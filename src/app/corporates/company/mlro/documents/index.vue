<template>
    <v-layout row wrap>
        <v-flex md3 xs6 v-for="(document, index) in documents" :key="index" v-if="document">
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
                        <p v-for="(file, fileIndex) in documents[index].files">
                            <span class="grey--text">
                            {{ file.label }} - <a :href="file.full_path" target="_blank">Download</a>
                            <v-icon @click="removeFile(index, fileIndex)">close</v-icon>
                        </span>
                        </p>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import * as corporatesService from '@/app/corporates/service';
    import * as documentTypeService from '@/app/settings/corporate/document-types/service';

    export default {
        props: ['documents'],

        methods: {
            openFiles(index) {
                this.$refs.files[index].click()
            },

            getFormData(files) {
                let data = new FormData();

                for (let file of files) {
                    data.append('documents[]', file, file.name);
                }
                data.append('type', 'mlro-files');

                return data
            },

            submitFiles(document, index, $event) {
                const files = $event.target.files || $event.dataTransfer.files;
                if (! this.documents[index].hasOwnProperty('files'))
                    this.$set(this.documents[index], 'files', []);

                if (this.documents[index].files.length + files.length > 5) {
                    this.$store.dispatch('setMessage', {type: 'error', message: 'You can only upload 5 documents in total'});
                    return;
                }

                let existingFiles = this.documents[index].files;
                corporatesService.uploadDocument( this.getFormData(files))
                    .then(response => {
                        existingFiles = existingFiles.concat(response.data);
                        this.$set(this.documents[index], 'files', existingFiles);
                    }).catch(() => {
                    this.loading = false
                })
            },

            removeFile(documentIndex, fileIndex) {
                this.documents[documentIndex].files.splice(fileIndex, 1);
            }
        }
    }
</script>