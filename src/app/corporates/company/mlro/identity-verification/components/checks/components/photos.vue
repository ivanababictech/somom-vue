<template>
    <v-container fluid grid-list-md>
        <v-card flat>
            <v-list two-line subheader>
                <v-list-tile
                        v-for="photo in photos"
                        :key="photo.id"
                        avatar
                        @click=""
                >
                    <v-list-tile-avatar>
                        <v-icon class="blue white--text" v-if="photo.file_type == 'file_type'">image</v-icon>
                        <v-icon class="blue white--text" v-else>assignment</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ photo.file_size }} Kb</v-list-tile-title>
                        <v-list-tile-sub-title>{{ photo.created_at }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon ripple @click="downloadPhoto(photo)">
                            <v-icon color="grey lighten-1">cloud_download</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import * as IdentityService from '../../../service'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false,
            photos: []
        }),

        props: ['applicant'],

        mounted() {
            this.getPhotos()
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            getPhotos() {
                IdentityService.getPhotos(this.applicant.applicant_id)
                    .then(response => {
                        this.photos = response.data
                    })
            },

            /**
             * @param photo
             */
            downloadPhoto(photo) {
                IdentityService.downloadPhoto(this.applicant.applicant_id, photo.id)
            }
        },
    }
</script>