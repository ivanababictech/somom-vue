<template>
    <v-dialog v-model="request.showAllocationsFiles" max-width="600px" scrollable>
        <v-card>
            <v-toolbar color="accent">
                <v-icon @click="close">close</v-icon>
                <v-toolbar-title>Files</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="$refs.files.click()">Upload files</v-btn>
                <input type="file" multiple ref="files" @change="onFileChange($event)" hidden>
                <v-btn color="primary" @click="save()">Save</v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-list two-line subheader>
                    <template v-for="(file, index) in files">
                        <v-list-tile :key="file.id" @click="" avatar>
                            <v-list-tile-avatar>
                                <v-icon class="blue white--text" v-if="file.file_type == 'jpeg'">image</v-icon>
                                <v-icon class="blue white--text" v-else-if="file.file_type == 'pdf'">file_copy</v-icon>
                                <v-icon class="blue white--text" v-else>assignment</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ file.label }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ file.size }} Kb</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon small ripple @click="removeFile(index)">
                                    <v-icon color="grey lighten-1">close</v-icon>
                                </v-btn>
                                <v-btn icon small ripple>
                                    <a :href="file.full_path" target="_blank">
                                        <v-icon color="primary lighten-1">cloud_download</v-icon>
                                    </a>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';

    export default {
        data() {
            return {
                files: [],
            }
        },

        props: ['entry', 'request'],

        mounted() {
            if(!this.entry.files) {
                this.$set(this.entry, 'files', [])
            }

            this.getFiles();
        },

        methods: {
            save() {
                this.close()
                this.$emit('submit')
            },

            close() {
                this.request.showAllocationsFiles = false
            },

            getFormData(files) {
                let data = new FormData();
                for (let file of files) {
                    data.append('files[]', file, file.name)
                }
                data.append('type', 'evidence');

                return data
            },

            onFileChange($event) {
                const files = $event.target.files || $event.dataTransfer.files;
                const formData = this.getFormData(files);

                corporateService.uploadFiles(formData)
                    .then(response => {
                        response.data.map(file => this.entry.files.push(file.id))
                        this.mergeFiles(response.data)
                    })
            },

            getFiles() {
                corporateService.getFiles(this.entry.files)
                    .then(response => {
                        this.mergeFiles(response.data)
                    })
            },

            removeFile(fileIndex) {
                this.entry.files.splice(fileIndex, 1);
                this.files.splice(fileIndex, 1);
            },

            mergeFiles(files) {
                this.files = this.files.concat(files)
            }
        }
    }
</script>

<style scoped>

</style>