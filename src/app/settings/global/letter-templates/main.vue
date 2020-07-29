<template>
    <v-card>
        <v-card-title>
            <v-layout row align-center>
                <div class="headline">Engagement Letter Templates</div>
                <v-flex text-xs-right>
                    <v-btn
                            fab
                            small
                            class="primary white--text"
                            :to="{ name: 'global.letter-templates.create' }"
                            @click.native.stop="toggleDialog">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="letterTemplates"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'global.letter-templates.edit', params: { letterTemplateId: props.item.id }}">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeLetterTemplate(props.item)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as service from './service'
    import isSettings from '../../mixins/isSettings'

    export default {
        mixins: [isSettings],

        data() {
            return {
                letterTemplates: [],
                service: service,
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        mounted() {
            this.getLetterTemplates()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getLetterTemplates() {
                this.setFetching({ fetching: true })

                service.get()
                    .then(response => {
                        this.letterTemplates = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            removeLetterTemplate(letterTemplate) {
                this.setFetching({ fetching: true })

                service.remove(letterTemplate)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Document type has been deleted successfully!' })

                        this.getLetterTemplates()
                    })
            }
        },
    }
</script>
