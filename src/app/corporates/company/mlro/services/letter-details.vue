<template>
    <v-container fluid grid-list-md>
        <div class="headline">Engagement letter details</div>
        <v-layout row wrap>
            <v-flex md6>
                <v-select
                        item-text="name"
                        item-value="id"
                        :items="letterTemplates"
                        v-model="letterDetails.template"
                        label="Select template"
                ></v-select>
            </v-flex>
            <v-flex md6>
                <v-menu
                        ref="menu"
                        lazy
                        :close-on-content-click="false"
                        v-model="menu"
                        transition="scale-transition"
                        full-width
                        :nudge-right="40"
                        min-width="290px"
                        :return-value.sync="letterDetails.date"
                >
                    <v-text-field
                            slot="activator"
                            label="Picker in menu"
                            v-model="letterDetails.date"
                            prepend-icon="event"
                            readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex md6>
                <v-select
                        item-text="data.name"
                        item-value="id"
                        :items="serviceProviders"
                        v-model="letterDetails.serviceProvider"
                        label="Select service provider"
                ></v-select>
            </v-flex>
            <v-flex md6>
                <v-select
                        item-text="name"
                        item-value="id"
                        :items="directors"
                        v-model="letterDetails.directors"
                        label="Select director's signing"
                        prepend-icon="group"
                        multiple
                ></v-select>
            </v-flex>
            <v-flex md6>
                <v-text-field
                        v-model="letterDetails.clientName"
                        label="Client name"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as letterTemplateService from '@/app/settings/global/letter-templates/service'
    import * as serviceProviderService from '@/app/settings/global/service-providers/service'

    export default {
        data() {
            return {
                letterTemplates: [],
                serviceProviders: [],
                dateMenu: false,
                date: null,
                menu: false,
            }
        },

        props: ['letterDetails'],


        mounted() {
            this.getLetterTemplates()
            this.getServiceProviders()
        },

        methods: {
            getLetterTemplates() {
                letterTemplateService.get()
                    .then(response => {
                        this.letterTemplates = response.data
                    })
            },

            getServiceProviders() {
                serviceProviderService.get()
                    .then(response => {
                        this.serviceProviders = response.data
                    })
            },
        },

        computed: {
            directors() {
                let serviceProvider = this.serviceProviders.find(item => item.id === this.letterDetails.serviceProvider)

                if(serviceProvider) {
                    return serviceProvider.data.directors
                }

                return []
            }
        }
    }
</script>

<style scoped>

</style>