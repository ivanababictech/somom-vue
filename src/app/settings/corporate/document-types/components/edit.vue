<template>
    <v-layout row wrap>
        <v-flex xs6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Edit Document Type</div>
                <document-type-form :documentType="documentType" @submit="updateDocumentType" v-if="documentType.id"></document-type-form>
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
                documentType: {}
            }
        },

        mounted() {
            this.getDocumentType()
        },

        methods: {
            ...mapActions(['setMessage']),

            updateDocumentType() {
                documentTypeService.update(this.documentType)
                    .then(response => {
                        this.$router.push({ name: 'corporate.document-types' })

                        this.setMessage({ type: 'success', message: 'Document has been updated successfully!' })
                    })
            },

            getDocumentType() {
                documentTypeService.find(this.documentTypeId)
                    .then(response => this.documentType = response.data)
            }
        },

        computed: {
            documentTypeId() {
                return this.$route.params.documentTypeId
            },
        },

        components: { DocumentTypeForm }
    }
</script>

<style scoped>

</style>