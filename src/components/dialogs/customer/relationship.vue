<template>
    <v-card>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap align-center>
                    <label>Define your relationship with this customer (to track related party transactions)</label>
                    <v-flex xs12>
                        <v-autocomplete
                                :items="types"
                                v-model="relationship.type"
                                label="select relationship type"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                        <label>Is this customer related to your organisation and registered on our platform?</label>
                        <v-btn-toggle v-model="relationship.customerRegistered">
                            <v-btn flat :value="true">
                                <span>Y</span>
                            </v-btn>
                            <v-btn flat :value="false">
                                <span>N</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn color="info">SEND LINK REQUEST</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>

</template>

<script>
    export default {
        data() {
            return {
                types: [
                    'unrelated party',
                    'director',
                    'shareholder',
                    'related company',
                    'parent company',
                    'subsidiary company',
                    'associate company'
                ]
            }
        },
        props: ['relationship']
    }
</script>

<style scoped>

</style>