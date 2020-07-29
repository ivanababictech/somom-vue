<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline"> {{ corporateSetting.title }} questions </div>
            <v-flex text-xs-right>
                <v-btn color="info" :to="{ name: 'corporate.corporate-settings' }" text-xs-center>Return</v-btn>
                <v-btn color="info" :to="{ name: 'corporate.corporate-settings.items.create' }" text-xs-center>Create</v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="corporateSettingsItems"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.title }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'corporate.corporate-settings.items.edit', params: { corporateSettingsId: corporateSetting.id, corporateSettingsItemId: props.item.id }}">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeSettingsItem(props.item.id)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-checkbox v-model="props.item.include_in_col"
                                @change="updateIncludeInCol(props.item)"></v-checkbox>
                </td>
            </template>
        </v-data-table>

        <v-layout row headline> Risk threshold </v-layout>
        <v-layout row v-if="hasRiskData">
            <v-flex xs1 headline>Low</v-flex>
            <v-flex xs1>
                <v-text-field label="From" v-model.number="corporateSetting.data.low.from"></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field label="To" v-model.number="corporateSetting.data.low.to"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row v-if="hasRiskData">
            <v-flex xs1 headline>Medium</v-flex>
            <v-flex xs1>
                <v-text-field label="From" v-model.number="corporateSetting.data.medium.from"></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field label="To" v-model.number="corporateSetting.data.medium.to"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row v-if="hasRiskData">
            <v-flex xs1 headline>High</v-flex>
            <v-flex xs1>
                <v-text-field label="From" v-model.number="corporateSetting.data.high.from"></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field label="To" v-model.number="corporateSetting.data.high.to"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-btn color="info" text-xs-center @click="updateRiskThreshold">Update</v-btn>
        </v-layout>

    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as settingsService from  '.././service'
    export default {
        data() {
            return {
                corporateSetting: {},
                corporateSettingsItems: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Question title', value: 'title'},
                    {text: 'Actions', value: 'name', sortable: false},
                    {text: 'Include with customer overview list', value: 'col', sortable: false}
                ],
            }
        },

        computed: {
            corporateSettingsId() {
                return this.$route.params.corporateSettingsId
            },

            hasRiskData() {
                return this.corporateSetting.data !== null &&
                    this.corporateSetting.data !== undefined &&
                    Object.keys(this.corporateSetting.data).length > 0;
            }
        },

        created() {
            settingsService.getCorporateSettingsById(this.corporateSettingsId)
                .then(response => {
                    if (Object.keys(response.data.data).length === 0) {
                        response.data.data = {
                            low: {
                                from: null,
                                to: null
                            },
                            medium: {
                                from: null,
                                to: null
                            },
                            high: {
                                from: null,
                                to: null
                            }
                        }
                    }
                    this.corporateSetting = response.data;
                    this.getSettingsItems()
                })
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getSettingsItems() {
                settingsService.getSettingItems(this.corporateSettingsId)
                    .then(response => {
                        this.corporateSettingsItems = response.data
                    })
            },

            updateRiskThreshold() {
                this.setFetching({ fetching: true});

                settingsService.updateSettings(this.corporateSetting)
                    .then(response => {
                        this.setFetching({ fetching: false });
                    })
            },

            removeSettingsItem(settingItemId) {
                this.setFetching({ fetching: true })

                settingsService.removeSettingsItem(settingItemId)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Settings item has been deleted successfully!' })

                        this.getSettingsItems()
                        
                        this.setFetching({ fetching: false })
                    })
            },

            updateIncludeInCol(setting) {
                this.setFetching({ fetching: true });

                settingsService.updateIncludeInCol(setting)
                    .then(response => {
                        this.setFetching({fetching: false});
                    })
            },
        }
    }
</script>