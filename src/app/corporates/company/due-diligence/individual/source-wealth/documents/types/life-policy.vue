<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Amount received "
                    v-model="document.data.amountReceived"
                    prefix="€"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Policy provider "
                    v-model="document.data.policyProvider"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Policy number/reference "
                    v-model="document.data.policyNumber"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Date of surrender "
                    v-model="document.data.dateOfSurrender"
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