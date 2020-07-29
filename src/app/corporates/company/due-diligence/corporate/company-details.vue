<template>
    <v-container fluid grid-list-md>
        <div class="headline">A. Company Details</div>
        <v-layout row>
            <v-flex xs6>
                <v-text-field
                        label="Registration Number"
                        v-model="companyDetails.registrationNumber"
                        required
                ></v-text-field>
            </v-flex>
        </v-layout>

        <label>Company registered address</label>
        <v-layout row>
            <v-flex xs6>
                <v-text-field
                        label="Door name"
                        v-model="companyDetails.doorName"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs6>
                <v-text-field
                        label="Street name"
                        v-model="companyDetails.streetName"
                ></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field
                        label="Post code"
                        v-model="companyDetails.postCode"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs6>
                <v-text-field
                        label="Town"
                        v-model="companyDetails.town"
                ></v-text-field>
            </v-flex>
            <v-flex xs6>
                <countries v-model="companyDetails.country" label="Country"></countries>
            </v-flex>
        </v-layout>


        <label>Authorised share capital</label>
        <v-layout row>
            <v-flex xs4>
                <v-text-field
                        label="Number of shares"
                        v-model="companyDetails.numberOfShares"
                        type="number"
                ></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-text-field
                        label="Type of shares"
                        v-model="companyDetails.typeOfShares"
                ></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-text-field
                        label="Class of shares"
                        v-model="companyDetails.classOfShares"
                ></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-text-field
                        label="Value per shares"
                        v-model="companyDetails.valuePerShares"
                        type="number"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['companyDetails']
    }
</script>