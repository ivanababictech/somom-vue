<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    color="purple darken-2"
                    label="Sold property address "
                    v-model="document.data.soldPropertyAddress"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Date of sale "
                    v-model="document.data.dateOfSale"
                    mask="##/##/####"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Total amount of sale "
                    v-model="document.data.totalAmountOfSale"
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
