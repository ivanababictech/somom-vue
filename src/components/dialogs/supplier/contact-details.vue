<template>
    <v-card>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap align-center>
                    <v-flex xs12 sm6>
                        <v-text-field label="Contact person" v-model="contactDetails.person" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="email address" v-model="contactDetails.email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Contact person position" v-model="contactDetails.position"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label="Contact number" v-model="contactDetails.number"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>

</template>

<script>
    export default {
        props: ['contactDetails']
    }
</script>

<style scoped>

</style>