<template>
    <v-dialog
            v-model="check.view"
            max-width="1100px"
    >
        <v-card>
            <v-card-text>
                <v-tabs
                        v-model="tab"
                        centered
                        color="cyan"
                        dark
                        icons-and-text
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab :key="'reports'">Reports<v-icon>report</v-icon></v-tab>
                    <v-tab :key="'documents'">Documents<v-icon>folder</v-icon></v-tab>
                    <v-tab :key="'photos'">Photos<v-icon>image</v-icon></v-tab>

                    <v-tab-item>
                        <check-reports :check="check" v-if="tab === 0"></check-reports>
                    </v-tab-item>

                    <v-tab-item>
                        <documents :applicant="applicant" v-if="tab === 1"></documents>
                    </v-tab-item>

                    <v-tab-item>
                        <photos :applicant="applicant" v-if="tab === 2"></photos>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import CheckReports from './components/reports'
    import Documents from './components/documents'
    import Photos from './components/photos'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false,
            tab: 'reports'
        }),

        props: ['applicant', 'check'],

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
        },

        components: { CheckReports, Documents, Photos }
    }
</script>