<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Source of wealth documents</div>
            <v-flex text-xs-right>
                <v-btn color="info" :to="{ name: 'corporate.source-of-wealth-documents.create' }" text-xs-center>Create a new document</v-btn>
            </v-flex>
        </v-layout>

        <v-data-table
                :headers="headers"
                :items="sourceOfWealthDocuments"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.wealth_source.title }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'corporate.source-of-wealth-documents.edit', params: { documentId: props.item.id }}">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeSourceOfWealthDocuments(props.item.id)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    import * as sourceOfWealthDocumentsService from './service'

    export  default {
        data() {
            return {
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Source of wealth name', value: 'title'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
                sourceOfWealths: []
            }
        },

        mounted() {
            this.getSourceOfWealthDocuments();
        },

        computed: {
            ...mapGetters('sourceOfWealth', [
                'sourceOfWealthDocuments'
            ])
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            ...mapMutations('sourceOfWealth', [
                'setSourceOfWealthDocuments',
                'removeSourceOfWealthDocument'
            ]),

            getSourceOfWealthDocuments() {
                this.setFetching({ fetching: true });

                sourceOfWealthDocumentsService.getSourceOfWealthDocuments()
                    .then(({data}) => {
                         this.setSourceOfWealthDocuments(data);

                         this.setFetching({ fetching: false});
                    })
            },

            removeSourceOfWealthDocuments(documentId) {
                this.setFetching({ fetching: true});

                sourceOfWealthDocumentsService.remove(documentId)
                    .then(({data}) => {
                        this.removeSourceOfWealthDocument(documentId);

                        this.setFetching({ fetching: false});
                    })
            }
        }
    }
</script>
