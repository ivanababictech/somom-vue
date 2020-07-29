<template>
    <v-container fluid grid-list-md>
        <div class="headline">A. Professional career details</div>
        <v-layout row wrap>
            <v-flex md4>
                <v-text-field
                        v-model="professionalCarer.occupation"
                        label="Current occupation"
                        mask="##/##/####"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-select
                        :items="types"
                        v-model="professionalCarer.type"
                        label="Type"
                ></v-select>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="professionalCarer.streetName"
                        label="Name of business"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                        v-model="professionalCarer.career"
                        label="Write brief history about your professional career"
                        outline
                ></v-textarea>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                        v-model="professionalCarer.educational"
                        label="Write about your educational achievements"
                        outline
                ></v-textarea>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                        v-model="professionalCarer.briefHistory"
                        label="What expertise do you have to run the business undertaken by the malta company?"
                        otuline
                ></v-textarea>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                types: [
                    'Self-employed',
                    'Business owner',
                    'Employee',
                    'Retired',
                ]
            }
        },

        props: ['professionalCarer']
    }
</script>