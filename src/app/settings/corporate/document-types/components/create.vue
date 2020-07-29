<template>
    <v-layout row wrap>
        <v-flex xs12 md6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Create Document Type</div>
                <document-type-form :documentType="documentType" @submit="createDocument"></document-type-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import DocumentTypeForm from './form'
    import * as documentTypeService from '../service'

    export default {
        data() {
            return {
                documentType: {
                    documents: []
                }
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            createDocument() {
                documentTypeService.create(this.documentType)
                    .then(response => {
                        this.$router.push({ name: 'corporate.document-types' })

                        this.setMessage({ type: 'success', message: 'Document has been created successfully!' })
                    })
            }
        },

        components: { DocumentTypeForm }
    }
</script>

<style scoped>

</style>