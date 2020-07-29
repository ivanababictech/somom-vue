<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Declarations</div>
            <v-flex text-xs-right>
                <v-btn color="primary" :to="{ name: 'due-diligence.declerations.create' }" text-xs-center>Create a new declaration</v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
            :headers="headers"
            :items="declerations"
            class="elevation-5"
            :hide-actions="true"
            :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.type }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'due-diligence.declerations.edit', params: { declerationId: props.item.id }}">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeDecleration(props.item.id)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'
    import * as declerationService from './service'

    export default {
        data() {
            return {
                declerations: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Type', value: 'type'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        mounted() {
            this.getDeclerations();
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            ...mapMutations('declerations', [
                'setDeclerations'
            ]),

            getDeclerations() {
                this.setFetching({ fetching: true });

                declerationService.get()
                   .then(({data}) => {
                        this.declerations = data;

                        this.setFetching({ fetching: false });

                        this.setDeclerations(data);
                    })
            },

            removeDecleration(declerationId) {
                this.setFetching({ fetching: true });

                declerationService.remove(declerationId)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Corporate question has been deleted successfully!' });

                        this.getDeclerations();
                    });
            }
        },
    }
</script>
