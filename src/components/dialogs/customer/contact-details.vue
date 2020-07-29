<template>
    <v-card>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap align-center>
                    <v-flex xs12 sm6>
                        <v-text-field label="Contact person" v-model="person" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="email address" v-model="email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Contact person position" v-model="position"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Contact number" v-model="number"></v-text-field>
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
            'contactDetails',
            'customerId'
        ],

        computed: {
            person: {
                get() {
                    return this.contactDetails.person;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'contactDetails',
                        field: 'person',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            },
            email: {
                get() {
                    return this.contactDetails.email;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'contactDetails',
                        field: 'email',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            },
            position: {
                get() {
                    return this.contactDetails.position;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'contactDetails',
                        field: 'position',
                        value
                    };
                    this.updateCustomerDetails(payload)
                }
            },
            number: {
                get() {
                    return this.contactDetails.position;
                },

                set(value) {
                    const payload = {
                        customerId: this.customerId,
                        key: 'contactDetails',
                        field: 'number',
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