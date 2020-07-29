<template>
    <v-layout row wrap>
        <v-flex xs6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Edit Document Type</div>
                <allocation-type-form :allocationType="allocationType" @submit="updateDocumentType" v-if="allocationType.id"></allocation-type-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import DocumentTypeForm from './form'
    import * as allocationTypeService from '../service'

    export default {
        data() {
            return {
                allocationType: {}
            }
        },

        mounted() {
            this.getDocumentType()
        },

        methods: {
            ...mapActions(['setMessage']),

            updateDocumentType() {
                allocationTypeService.update(this.allocationType)
                    .then(response => {
                        this.$router.push({ name: 'corporate.allocation-types' })

                        this.setMessage({ type: 'success', message: 'Document has been updated successfully!' })
                    })
            },

            getDocumentType() {
                allocationTypeService.find(this.allocationTypeId)
                    .then(response => this.allocationType = response.data)
            }
        },

        computed: {
            allocationTypeId() {
                return this.$route.params.allocationTypeId
            },
        },

        components: { DocumentTypeForm }
    }
</script>

<style scoped>

</style>