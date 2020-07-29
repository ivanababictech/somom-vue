<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    color="purple darken-2"
                    label="Name of deceased "
                    v-model="document.data.nameOfCeceased"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Date of death "
                    v-model="document.data.dateOfDeath"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Relationship to client "
                    v-model="document.data.relationshipToClient"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Date received "
                    v-model="document.data.dateReceived"
                    mask="##/##/####"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Total amount "
                    v-model="document.data.totalAmount"
                    prefix="€"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Solicitor’s details "
                    v-model="document.data.solicitorsDetails"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
    import ValidationMixin from '@/mixins/validation'

    export default {
        mixins: [ValidationMixin],

        props: ['document'],
    }
</script>
