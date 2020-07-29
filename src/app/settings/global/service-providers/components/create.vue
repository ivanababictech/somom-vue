<template>
    <v-layout row wrap>
        <v-flex xs12 md6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Create Service Provider</div>
                <service-provider-form :serviceProvider="serviceProvider" @submit="createServiceProvider "></service-provider-form>
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
                serviceProvider: {
                    data: {
                        directors: []
                    },
                    logo: {
                        full_path: null
                    }
                }
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            createServiceProvider (serviceProviderData) {
                serviceProviderService.create(serviceProviderData)
                    .then(response => {
                        this.$router.push({ name: 'global.service-providers' })

                        this.setMessage({ type: 'success', message: 'Service Provider has been created successfully!' })
                    })
            }
        },

        components: { ServiceProviderForm }
    }
</script>

<style scoped>

</style>