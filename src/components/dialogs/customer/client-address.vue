<template>
    <v-card>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap align-center>
                    <v-flex xs12 sm6>
                        <v-text-field label="Door name" v-model="doorName" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Street name" v-model="streetName"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="City" v-model="city"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Post code" v-model="zip"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>

</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        props: [
            'clientAddress',
            'customerId'
        ],

        computed: {
            doorName: {
                get() {
                    return this.clientAddress.doorName;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'clientAddress',
                        field: 'doorName',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            },
            streetName: {
                get() {
                    return this.clientAddress.streetName;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'clientAddress',
                        field: 'streetName',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            },
            city: {
                get() {
                    return this.clientAddress.city;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'clientAddress',
                        field: 'city',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            },
            zip: {
                get() {
                    return this.clientAddress.zip;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'clientAddress',
                        field: 'zip',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            }
        },

        methods: {
            ...mapMutations({
                updateCustomerDetails: 'accounting/updateCustomerDetails'
            })
        }
    }
</script>

<style scoped>

</style>