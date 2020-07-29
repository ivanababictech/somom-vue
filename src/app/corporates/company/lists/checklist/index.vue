<template>
    <v-layout row wrap>
        <v-tabs v-model="tab" class="fill-width">
            <v-tab key="individual">
                Individual
            </v-tab>
            <v-tab key="company">
                Company
            </v-tab>
            <v-tab key="trust">
                Trust
            </v-tab>
            <v-tab key="foundation">
                Foundation
            </v-tab>

            <v-tab-item key="individual">
                <individuals v-if="tab === 0"
                     :companies="companies"
                     :sow-documents="sowOfWealthDocuments"
                     :documents="individualDocuments"></individuals>
            </v-tab-item>

            <v-tab-item key="company">
                <companies v-if="tab === 1"
                    :companies="companies"
                    :documents="companiesDocuments"></companies>
            </v-tab-item>

            <v-tab-item key="trust">
                <trusts v-if="tab === 2"
                    :companies="companies"
                    :documents="trustsDocuments"></trusts>
            </v-tab-item>

            <v-tab-item key="foundation">
                <foundations v-if="tab === 3"
                    :companies="companies"
                    :documents="foundationDocuments"></foundations>
            </v-tab-item>
        </v-tabs>
    </v-layout>
</template>

<script scoped>
    import Individuals from './individuals';
    import Companies from './companies';
    import Trusts from './trusts';
    import Foundations from './foundations';
    import * as documentTypeService from '@/app/settings/corporate/document-types/service';
    import * as sowDocumentsService from '@/app/settings/corporate/source-of-wealth-documents/service';

    export default {
        props: ['companies'],

        components: {
            Individuals,
            Companies,
            Trusts,
            Foundations
        },

        data() {
            return {
                tab: null,
                documents: [],
                sowOfWealthDocuments: []
            }
        },

        mounted() {
            this.getDocuments();
            this.getSourceOfWealthDocuments();
        },

        computed: {
            individualDocuments() {
                return _.filter(this.documents, document => document.type === 'individual')
            },

            companiesDocuments() {
                return _.filter(this.documents, document => document.type === 'company')
            },

            trustsDocuments() {
                return _.filter(this.documents, document => document.type === 'trust')
            },

            foundationDocuments() {
                return _.filter(this.documents, document => document.type === 'foundation')
            }
        },

        methods: {
            getDocuments() {
                documentTypeService.get()
                    .then(({data}) => {
                        this.documents = data;
                    })
            },

            getSourceOfWealthDocuments() {
                sowDocumentsService.getSourceOfWealthDocuments()
                    .then(({data}) => {
                        this.sowOfWealthDocuments = data;
                    })
            }
        }
    }
</script>