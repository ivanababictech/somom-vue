<template>
    <v-container fluid grid-list-md>
        <div class="headline">{{ letter }} . Professional reference details</div>
        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="professionalReferenceDetails.nameOfBank"
                        label="Name & surname"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="professionalReferenceDetails.profession"
                        label="Profession"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <countries v-model="professionalReferenceDetails.country" label="Country"></countries>
            </v-flex>
        </v-layout>

        <label>Details of referee</label>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="professionalReferenceDetails.name"
                        label="Name & surname"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="professionalReferenceDetails.email"
                        label="Email address"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="professionalReferenceDetails.number"
                        label="Contact number"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="professionalReferenceDetails.fax"
                        label="Fax number"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: [
            'professionalReferenceDetails',
            'showSofDocsAndNwb',
            'letter'
        ]
    }
</script>