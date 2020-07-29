<template>
    <v-layout row wrap>
        <v-flex xs12 md6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Source of wealth documents</div>
                <source-of-wealth-form :sourceOfWealth="sourceOfWealth" @submit="updateDocument" v-if="documentId"></source-of-wealth-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as sourceOfWealthService from '../service';
    import sourceOfWealthForm from './form';

    export default {
        data() {
            return {
                sourceOfWealth: {}
            }
        },

        computed: {
            ...mapGetters('sourceOfWealth', [
                'sourceOfWealthDocuments'
            ]),

            documentId() {
                return this.$route.params.documentId
            }
        },

        mounted() {
            this.getSourceOfWealth();
        },

        methods: {
            ...mapActions(['setMessage']),

            updateDocument() {
                sourceOfWealthService.update(this.sourceOfWealth)
                    .then(response => {
                        this.$router.push({ name: 'corporate.source-of-wealth-documents' });

                        this.setMessage({ type: 'success', message: 'Document has been created successfully!' })
                    })
            },

            getSourceOfWealth() {
                const documentIndex = _.findIndex(this.sourceOfWealthDocuments, document => document.id == this.$route.params.documentId);

                this.sourceOfWealth = JSON.parse(JSON.stringify(this.sourceOfWealthDocuments[documentIndex]));
            }
        },

        components: {sourceOfWealthForm}
    }
</script>