<template>
    <v-layout row wrap>
        <v-flex xs6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Edit Service Provider</div>
                <service-provider-form :serviceProvider="serviceProvider" @submit="updateServiceProvider" v-if="serviceProvider.id"></service-provider-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import ServiceProviderForm from './form'
    import * as serviceProviderService from '../service'

    export default {
        data() {
            return {
                serviceProvider: {}
            }
        },

        mounted() {
            this.getServiceProvider()
        },

        methods: {
            ...mapActions(['setMessage']),

            updateServiceProvider() {
                serviceProviderService.update(this.serviceProvider)
                    .then(response => {
                        this.$router.push({ name: 'global.service-providers' })

                        this.setMessage({ type: 'success', message: 'Service Provider has been updated successfully!' })
                    })
            },

            getServiceProvider() {
                serviceProviderService.find(this.serviceProviderId)
                    .then(response => this.serviceProvider = response.data)
            }
        },

        computed: {
            serviceProviderId() {
                return this.$route.params.serviceProviderId
            },
        },

        components: { ServiceProviderForm }
    }
</script>

<style scoped>

</style>