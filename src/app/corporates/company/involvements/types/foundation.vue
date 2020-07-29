<template>
    <v-flex>
        <v-layout row>
            <v-flex xs3>
                <v-text-field
                        v-model="foundation.name"
                        label="Foundation name"
                ></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-text-field
                        v-model="foundation.registrationNumber"
                        label="Registration number"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field
                        v-model="foundation.numberOfShares"
                        :label="'Number of shares held in ' + companyName"
                        type="number"
                        :rules="[rules.maxNumberOfShares(foundation.numberOfShares, maxNumberOfShares)]"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <label>Number of beneficiaries</label>

        <v-layout row v-for="(beneficiary, index) in foundation.beneficiaries" :key="index">
            <v-flex xs10>
                <v-layout>
                    <v-flex xs3>
                        <v-text-field
                                v-model="beneficiary.name"
                                label="Name"
                                @input="updateDetailsName(beneficiary)"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                v-model="beneficiary.surname"
                                label="Surname"
                                @input="updateDetailsLastName(beneficiary)"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                v-model="beneficiary.foundationOwnership"
                                :label="'% of ' + foundation.name"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs3>
                        <v-btn dark small color="primary" @click="openInputDetails(beneficiary)">
                            Input Details
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs2 class="text-xs-right">
                <v-btn fab dark small color="primary" @click="addBeneficiary" v-if="index === 0 && foundation.beneficiaries.length < 4">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="error" v-if="foundation.beneficiaries.length > 1" @click="removeBeneficiary(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <label>FOUNDATION ADMINISTRATOR LOGIN DETAILS</label>

        <v-layout row>
            <v-flex xs4>
                <v-text-field
                        v-model="foundation.administratorName"
                        label="Name & surname"
                ></v-text-field>
            </v-flex>
            <v-flex xs4>
                <phone-number :object="foundation"></phone-number>
            </v-flex>
            <v-flex xs4>
                <v-text-field
                        v-model="foundation.administratorEmail"
                        label="email address"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <input-details :type="beneficiary" v-if="beneficiary.inputDetails && beneficiary.inputDetails.show"></input-details>
    </v-flex>
</template>

<script>
    import PhoneNumber from '@/components/phone-number'
    import InputDetails from './company/input-details'
    import ValidationMixin from '@/mixins/validation'

    const uuidv4  = require('uuid/v4');

    export default {
        data() {
            return {
                structureBeneficiary: {
                    name: null,
                    inputDetails: {
                        firstName: null,
                        lastName: null,
                        buildingNumber: null,
                        identificationNumber: null,
                        identificationType: null,
                        nationality: null,
                        postcode: null,
                        street: null,
                        town: null,
                        show: false,
                    },
                    foundationOwnership: null,
                },

                beneficiary: {}
            }
        },

        props: ['foundation', 'maxNumberOfShares', 'companyName'],

        mixins: [ValidationMixin],

        mounted() {
            if(!this.foundation.beneficiaries.length) {
                this.addBeneficiary()
            }
        },

        methods: {
            addBeneficiary() {
                let structure = JSON.parse(JSON.stringify(this.structureBeneficiary));
                structure.id = uuidv4();

                this.foundation.beneficiaries.unshift(structure)
            },

            removeBeneficiary(index) {
                this.foundation.beneficiaries.splice(index, 1)
            },

            openInputDetails(beneficiary) {
                beneficiary.inputDetails.show = true
                this.beneficiary = beneficiary
            },

            updateDetailsName(type) {
                type.inputDetails.firstName = type.name;
            },

            updateDetailsLastName(type) {
                type.inputDetails.lastName = type.surname;
            }
        },

        components: { PhoneNumber, InputDetails }
    }
</script>