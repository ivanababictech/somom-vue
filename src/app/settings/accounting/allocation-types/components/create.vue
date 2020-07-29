<template>
    <v-layout row wrap>
        <v-flex xs12 md6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Create Document Type</div>
                <allocation-type-form :allocationType="allocationType" @submit="createDocument"></allocation-type-form>
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
                allocationType: {
                    documents: []
                }
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            createDocument() {
                allocationTypeService.create(this.allocationType)
                    .then(response => {
                        this.$router.push({ name: 'corporate.allocation-types' })

                        this.setMessage({ type: 'success', message: 'Document has been created successfully!' })
                    })
            }
        },

        components: { DocumentTypeForm }
    }
</script>

<style scoped>

</style>