<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    color="purple darken-2"
                    label="Description of shares "
                    required
                    v-model="document.data.descriptionOfShares"
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Name of seller "
                    v-model="document.data.nameOfSeller"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="How long held "
                    v-model="document.data.howLongHeld"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Sale amount "
                    v-model="document.data.saleAmount"
                    prefix="€"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Date funds received "
                    v-model="document.data.dateFundsReceived"
                    mask="##/##/####"
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