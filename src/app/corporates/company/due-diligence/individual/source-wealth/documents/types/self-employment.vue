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
                    label="Company address "
                    v-model="document.data.companyAddress"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Amount of annual profit "
                    v-model="document.data.amountOfAnnualProfit"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    color="blue darken-2"
                    label="Nature of business "
                    v-model="document.data.natureOfBusiness"
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
