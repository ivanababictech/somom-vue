<template>
    <v-container fluid grid-list-md>
        <div class="headline">Services provided</div>
            <v-layout row wrap v-for="(service, index) in servicesProvided.services" :key="index">
                <v-flex xs10>
                    <v-layout align-center>
                        <v-flex md9>

                            <v-text-field
                                    v-if="checkCustomService(service, index)"
                                    v-model="service.name"
                                    label="Custom Service"
                                    :ref="'customName' + index"
                                    autofocus
                            ></v-text-field>

                            <v-autocomplete
                                    v-else
                                    item-text="title"
                                    item-value="id"
                                    :items="services"
                                    v-model="service.id"
                                    @input="setDefaultServiceFee(service)"
                                    label="Select"
                                    :search-input.sync="service.name"
                                    :ref="'selectName' + index"
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex md3>
                            <v-text-field
                                    v-model="service.fee"
                                    label="Service fee"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs2 class="text-xs-right">
                    <v-btn fab dark small color="primary" @click="addService" v-if="index === 0">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="danger" v-if="servicesProvided.services.length > 1" @click="removeService(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as serviceService from '@/app/settings/global/services/service'

    export default {
        data() {
            return {
                services: [],
                serviceStructure: {
                    id: null,
                    fee: 0,
                    name: ''
                },
                customServiceName: null
            }
        },

        props: ['servicesProvided'],

        mounted() {
            this.init()
        },

        methods: {
            ...mapActions(['setMessage']),

            getServices() {
                serviceService.get()
                    .then(response => this.services = response.data)
            },

            init() {
                this.getServices()

                if(!this.servicesProvided.services.length) {
                    this.addService ()
                }
            },

            submit() {
                this.$emit('submit', this.serviceProviderData)
            },

            addService () {
                this.servicesProvided.services.unshift(JSON.parse(JSON.stringify(this.serviceStructure)))
            },

            removeService (index) {
                this.servicesProvided.services.splice(index, 1)
            },

            setDefaultServiceFee(service) {
                let foundService = this.services.find(item => item.id === service.id)

                if(foundService) {
                    service.fee = foundService.fee
                }
            },

            checkCustomService(service, index) {
                return  service.name && !this.services.filter(item => item.title.includes(service.name)).length
            }
        },
    }
</script>

<style scoped>

</style>