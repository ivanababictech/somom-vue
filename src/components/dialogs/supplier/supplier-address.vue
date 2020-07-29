<template>
    <v-card>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap align-center>
                    <v-flex xs12 sm6>
                        <v-text-field label="Door name" v-model="supplierAddress.door"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Street name" v-model="supplierAddress.streetName"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="City" v-model="supplierAddress.city"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Post code" v-model="supplierAddress.zip"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: ['supplierAddress']
    }
</script>