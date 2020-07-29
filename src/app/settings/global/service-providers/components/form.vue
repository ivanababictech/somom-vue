<template>
    <v-container grid-list-md>
        <v-form lazy-validation @submit.prevent="submit">
            <v-layout row wrap align-center>
                <v-flex xs6>
                    <v-text-field
                            label="Provider name"
                            v-model="serviceProvider.data.name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                            label="Registration number"
                            v-model="serviceProvider.data.registrationNumber"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            label="Registered address"
                            v-model="serviceProvider.data.address"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <phone-number :object="serviceProvider.data" label="Telephone number"></phone-number>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                            label="Email address"
                            v-model="serviceProvider.data.email"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            label="additional information"
                            v-model="serviceProvider.data.additionalInformation"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row v-for="(director, index) in serviceProvider.data.directors" :key="index">
                <v-flex xs10>
                    <v-layout align-center>
                        <v-flex xs8>
                            <v-text-field
                                    label="Company director"
                                    v-model="director.name"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs2 class="text-xs-right">
                    <v-btn fab dark small color="primary" @click="addDirector" v-if="index === 0 && serviceProvider.data.directors.length < 4">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="error" v-if="serviceProvider.data.directors.length > 1" @click="removeDirector(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-flex xs12 class="text-xs-center">
                <input type="file" ref="logo" @change="onFileChange($event)"  hidden>
                <img :src="serviceProvider.logo.full_path || defaultLogo" @click="$refs.logo.click()"  width="100px">
            </v-flex>
            <v-flex xs12>
                <v-btn type="submit" color="info">Submit</v-btn>
                <v-btn :to="{ name: 'global.service-providers' }">Cancel</v-btn>
            </v-flex>
        </v-form>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import PhoneNumber from '@/components/phone-number'

    const objectToFormData = require('object-to-formdata')

    export default {
        data() {
            return {
                defaultLogo: 'https://cdn.shopify.com/s/files/1/2386/7675/files/Your_Logo_Here_200x200.png?v=1506155951',
                directorStructure: {
                    name: '',
                },
                types: [
                    'individual',
                    'corporate',
                    'trust',
                    'foundation',
                ],
                files: [],
            }
        },

        props: ['serviceProvider'],

        mounted() {
            this.init()
        },

        methods: {
            ...mapActions(['setMessage']),

            init() {
                if(!this.serviceProvider.data.directors.length) {
                    this.addDirector ()
                }
            },

            submit() {
                this.$emit('submit', this.serviceProviderData)
            },

            addDirector () {
                this.serviceProvider.data.directors.unshift(JSON.parse(JSON.stringify(this.directorStructure)))
            },

            removeDirector (index) {
                this.serviceProvider.data.directors.splice(index, 1)
            },

            onFileChange($event) {
                this.files = $event.target.files || $event.dataTransfer.files;
            },
        },

        computed: {
            serviceProviderData() {
                let serviceProviderData = objectToFormData(this.serviceProvider)

                if(this.files.length) {
                    serviceProviderData.append('image', this.files[0], this.files[0].name)
                }

                return serviceProviderData
            }
        },

        components: { PhoneNumber }
    }
</script>

<style scoped>

</style>