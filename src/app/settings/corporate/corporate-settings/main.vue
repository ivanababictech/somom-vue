<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Corporate Settings</div>
            <v-flex text-xs-right>
                <v-btn color="info" :to="{ name: 'corporate.corporate-settings.create' }" text-xs-center>Create a new section</v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="corporateSettings"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.title }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'corporate.corporate-settings.items', params: { corporateSettingsId: props.item.id }}">
                        <v-icon color="amber">add</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" :to="{ name: 'corporate.corporate-settings.edit', params: { corporateSettingsId: props.item.id }}">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeCorporateSettings(props.item.id)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as settingsService from './service'

    export default {
        data() {
            return {
                corporateSettings: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Section name', value: 'title'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        mounted() {
            this.getCorporateSettings()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getCorporateSettings() {
                this.setFetching({ fetching: true })

                settingsService.getSettings()
                    .then(response => {
                        this.corporateSettings = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            removeCorporateSettings(corporateSettingId) {
                this.setFetching({ fetching: true })

                settingsService.removeCorporateSettings(corporateSettingId)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Corporate settings type has been deleted successfully!' })

                        this.getCorporateSettings()
                    })
            }
        },
    }
</script>
