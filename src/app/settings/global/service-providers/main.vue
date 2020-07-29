<template>
    <v-card>
        <v-card-title>
            <v-layout row align-center>
                <div class="headline">Service Providers</div>
                <v-flex text-xs-right>
                    <v-btn
                            fab
                            small
                            class="primary white--text"
                            :to="{ name: 'global.service-providers.create' }"
                            @click.native.stop="toggleDialog">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="serviceProviders"
                class="elevation-5"
                :hide-actions="true"
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.data.name }}</td>
                <td>{{ props.item.data.registrationNumber }}</td>
                <td>
                    <v-btn icon class="mx-0" :to="{ name: 'global.service-providers.edit', params: { serviceProviderId: props.item.id }}">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="removeServiceProvider(props.item)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';
    import * as service from './service';
    import isSettings from '../../mixins/isSettings'

    export default {
        mixins: [isSettings],

        data() {
            return {
                serviceProviders: [],
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Name'},
                    {text: 'Registration number'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
                service: service
            }
        },

        mounted() {
            this.getServiceProviders()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getServiceProviders() {
                this.setFetching({ fetching: true })

                service.get()
                    .then(response => {
                        this.serviceProviders = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            removeServiceProvider(serviceProvider) {
                this.setFetching({ fetching: true })

                service.remove(serviceProvider)
                    .then(response => {
                        this.setMessage({ type: 'success',  message: 'Service Provider type has been deleted successfully!' })

                        this.getServiceProviders()
                    })
            }
        },
    }
</script>
