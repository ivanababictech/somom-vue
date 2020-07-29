<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Documents</div>
            <v-flex text-xs-right>
                <v-btn fab dark small class="primary" :to="{ name: 'corporate.document-types.create' }">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="documentTypes"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.note }}</td>
                <td>{{ props.item.document_names }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'corporate.document-types.edit', params: { documentTypeId: props.item.id }}">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeDocumentType(props.item)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as documentTypeService from './service'

    export default {
        data() {
            return {
                documentTypes: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Type', value: 'type'},
                    {text: 'Note', value: 'note'},
                    {text: 'Documents', value: 'documents'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        mounted() {
            this.getDocumentTypes()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getDocumentTypes() {
                this.setFetching({ fetching: true })

                documentTypeService.get()
                    .then(response => {
                        this.documentTypes = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            removeDocumentType(documentType) {
                this.setFetching({ fetching: true })

                documentTypeService.remove(documentType)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Document type has been deleted successfully!' })

                        this.getDocumentTypes()
                    })
            }
        },
    }
</script>
