<template>
    <v-flex>
        <v-layout row wrap align-center>
            <v-flex xs3>
                <v-text-field
                        v-model="individual.firstName"
                        label="First Name"
                ></v-text-field>
            </v-flex>
            <v-flex xs3>
                <v-text-field
                        v-model="individual.lastName"
                        label="Last Name"
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
                <v-text-field
                        v-model="individual.dob"
                        label="Date of birthday"
                        mask="##/##/####"
                        hint="For example, 04/11/1989"
                        :return-masked-value="true"
                        persistent-hint
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
                <v-autocomplete
                        :items="nationalities"
                        v-model="individual.nationality"
                        label="Select nationality"
                ></v-autocomplete>
            </v-flex>
            <v-flex xs1 text-xs-center>
                <v-btn-toggle v-model="individual.sex">
                    <v-btn flat :value="true">
                        <span>M</span>
                    </v-btn>
                    <v-btn flat :value="false">
                        <span>F</span>
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
            <v-flex xs3>
                <v-select
                        :items="identificationTypes"
                        v-model="individual.identificationType"
                        label="Select document type"
                ></v-select>
            </v-flex>
            <v-flex xs2>
                <v-text-field
                        v-model="individual.identificationNumber"
                        label="Identification number"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs6>
                <v-select
                        item-text="title"
                        item-value="id"
                        :items="involvements"
                        v-model="individual.involvements"
                        label="Select involvement"
                        multiple
                ></v-select>
            </v-flex>
            <v-flex xs6 v-if="hasInvolvement('Individual shareholder')">
                <v-text-field
                        v-model="individual.numberOfShares"
                        :label="'Number of shares held in ' + companyName"
                        type="number"
                        :rules="[rules.maxNumberOfShares(individual.numberOfShares, maxNumberOfShares)]"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <label>ADDRESS DETAILS</label>

        <v-layout row wrap>
            <v-flex xs2>
                <v-text-field
                        v-model="individual.address.buildingNumber"
                        label="Building number"
                ></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-text-field
                        v-model="individual.address.street"
                        label="Street name"
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
                <v-text-field
                        v-model="individual.address.town"
                        label="Town"
                ></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field
                        v-model="individual.address.postcode"
                        label="Post code"
                ></v-text-field>
            </v-flex>
            <v-flex xs3>
                <countries v-model="individual.address.country" label="Select Country"></countries>
            </v-flex>
        </v-layout>

        <label>LOGIN DETAILS</label>

        <v-layout row>
            <v-flex xs3>
                <phone-number :object="individual"></phone-number>
            </v-flex>
            <v-flex xs3>
                <v-text-field
                        v-model="individual.email"
                        label="email address"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
    </v-flex>
</template>

<script>
    import PhoneNumber from '@/components/phone-number'
    import Nationalities from '@/plugins/nationalities'
    import ValidationMixin from '@/mixins/validation'

    export default {
        data() {
            return {
                identificationTypes: [
                    'Passport',
                    'ID card',
                    'Driving lisence'
                ],

                involvements: [
                    'Individual director',
                    'Individual shareholder',
                    'Legal representative',
                    'Judicial representative',
                    'Company secretary',
                    'Bank signatory',
                    'Agent'
                ],
                nationalities: Nationalities,

            }
        },

        props: ['individual', 'maxNumberOfShares', 'companyName'],

        mixins: [ValidationMixin],

        methods: {
            hasInvolvement(involvement) {
                return this.individual.involvements.indexOf(involvement) !== -1
            }
        },

        components: { PhoneNumber }
    }
</script>