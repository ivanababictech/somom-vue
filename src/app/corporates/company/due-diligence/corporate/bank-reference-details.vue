<template>
    <v-container grid-list-md>
        <div class="headline">E. Bank reference details</div>
        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="bankReferenceDetails.nameOfBank"
                        label="Name of bank"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="bankReferenceDetails.branchName"
                        label="Branch name"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <countries v-model="bankReferenceDetails.country" label="Country"></countries>
            </v-flex>
        </v-layout>

        <label>Details of bank manager</label>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="bankReferenceDetails.name"
                        label="Name & surname"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="bankReferenceDetails.email"
                        label="Email address"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="bankReferenceDetails.number"
                        label="Contact number"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="bankReferenceDetails.fax"
                        label="Fax number"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['bankReferenceDetails']
    }
</script>