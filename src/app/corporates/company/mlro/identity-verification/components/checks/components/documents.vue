<template>
    <v-container fluid grid-list-md>
        <v-card flat>
            <v-list two-line subheader>
                <v-list-tile
                        v-for="document in documents"
                        :key="document.id"
                        avatar
                        @click=""
                >
                    <v-list-tile-avatar>
                        <v-icon class="blue white--text" v-if="document.file_type == 'jpeg'">image</v-icon>
                        <v-icon class="blue white--text" v-else-if="document.file_type == 'pdf'">file_copy</v-icon>
                        <v-icon class="blue white--text" v-else>assignment</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ document.type }} {{ document.side ? '(' + document.side + ')' : '' }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ document.file_name }} - {{ document.file_size }} Kb</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon ripple @click="downloadDocument(document)">
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
            documents: []
        }),

        props: ['applicant'],

        mounted() {
            this.getDocuments()
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            getDocuments() {
                IdentityService.getDocuments(this.applicant.applicant_id)
                    .then(response => {
                        this.documents = response.data
                    })
            },

            /**
             * @param document
             */
            downloadDocument(document) {
                IdentityService.downloadDocument(this.applicant.applicant_id, document.id)
            }
        },
    }
</script>