<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Date received "
                    v-model="document.data.dateReceived"
                    mask="##/##/####"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Total amount received "
                    v-model="document.data.totalAmountReceived"
                    prefix="€"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Name of divorced partner "
                    v-model="document.data.nameOfDivorcedPartner"
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
