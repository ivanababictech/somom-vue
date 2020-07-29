<template>
    <v-layout wrap>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Employer name "
                    v-model="document.data.employerName"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Employer address "
                    v-model="document.data.employerAddress"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Occupation "
                    v-model="document.data.occupation"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Nature of business "
                    v-model="document.data.natureOfBusiness"
                    :rules="[rules.required]"
                    required
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
            <v-text-field
                    label="Salary per annum "
                    v-model="document.data.salaryPerAnnum"
                    prefix="€"
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

