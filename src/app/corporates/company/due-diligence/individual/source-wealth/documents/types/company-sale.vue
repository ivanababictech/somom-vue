<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Name of company "
                    v-model="document.data.nameOfCompany"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Nature of the company "
                    v-model="document.data.natureOfTheCompany"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Total amount of sale "
                    v-model="document.data.totalAmountOfSale"
                    prefix="€"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Client’s share "
                    v-model="document.data.clientsShare"
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
