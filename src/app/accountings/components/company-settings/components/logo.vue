<template>
    <section>
        <v-dialog
                v-model="showLogoDialog"
                width="300"
        >
            <v-card>
                <v-card-title class="headline" primary-title>
                    <v-layout row justify-center>
                        <span class="display-1">Upload logo</span>
                        <!--<span>Logo</span>-->
                    </v-layout>

                    <v-card-text>
                        <div  v-if="editLogo">
                            <v-icon color="teal" @click="editLogo = false">close</v-icon>
                            <vue-dropzone
                                    ref="logo"
                                    id="logo"
                                    v-on:vdropzone-mounted="dropzoneMounted"
                                    v-on:vdropzone-success="logoUploaded"
                                    :options="dropzoneOptions"></vue-dropzone>
                        </div>
                        <div v-else class="justify-center">
                            <v-icon color="teal" @click="editLogo = true">edit</v-icon>
                            <img :src="company.logo.full_path" style="max-width: 150px; max-height: 150px" />
                        </div>
                    </v-card-text>

                </v-card-title>
            </v-card>
        </v-dialog>
    </section>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'
    import VueDropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import * as config from "@/config";
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                dialog: false,
                search: '',
                showLogoDialog: true,
                dropzoneOptions: {
                    url: '/',
                    thumbnailWidth: 300,
                    maxFilesize: 5,
                    maxFiles: 1,
                    paramName: 'logo',
                    acceptedFiles: 'image/*'
                },
                editLogo: false
            }
        },

        computed: {
            ...mapGetters({
                'token': 'token',
                company: 'accounting/company',
            })
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            ...mapMutations({
                updateLogo: 'accounting/updateLogo'
            }),

            dropzoneMounted() {
                this.$refs.logo.setOption('url', `${config.apiUrl}/companies/${this.company.id}/logo`);
                this.$refs.logo.setOption('headers', { "Authorization": `Bearer ${this.token}` });
            },

            logoUploaded(file, response) {
                this.editLogo = false;
                this.updateLogo(response.data);
            }

        },

        components: { VueDropzone }
    }
</script>
