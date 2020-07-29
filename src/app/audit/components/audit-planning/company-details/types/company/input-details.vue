<template>
    <v-dialog v-model="type.inputDetails.show" persistent max-width="700px">
        <v-card>
            <v-card-title>
                <span class="headline">Individual Details</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout row wrap align-center>
                        <v-flex md4 xs6>
                            <v-text-field
                                    v-model="type.inputDetails.firstName"
                                    label="First Name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4 xs6>
                            <v-text-field
                                    v-model="type.inputDetails.lastName"
                                    label="Last Name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4 xs5>
                            <v-text-field
                                    v-model="type.inputDetails.dob"
                                    label="Date of birthday"
                                    mask="##/##/####"
                                    hint="For example, 04/11/1989"
                                    :return-masked-value="true"
                                    persistent-hint
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4 xs5>
                            <v-autocomplete
                                    :items="nationalities"
                                    v-model="type.inputDetails.nationality"
                                    label="Select nationality"
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex md1 xs2 text-xs-center>
                            <v-btn-toggle v-model="type.inputDetails.loans">
                                <v-btn flat :value="true">
                                    <span>M</span>
                                </v-btn>
                                <v-btn flat :value="false">
                                    <span>F</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-flex>
                        <v-flex md3 xs6>
                            <v-select
                                    :items="identificationTypes"
                                    v-model="type.inputDetails.identificationType"
                                    label="Select"
                            ></v-select>
                        </v-flex>
                        <v-flex md4 xs6>
                            <v-text-field
                                    v-model="type.inputDetails.identificationNumber"
                                    label="Identification number"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    
                    <label>ADDRESS DETAILS</label>

                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-text-field
                                    v-model="type.inputDetails.buildingNumber"
                                    label="Building number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field
                                    v-model="type.inputDetails.street"
                                    label="Street name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    v-model="type.inputDetails.town"
                                    label="Town"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    v-model="type.inputDetails.postcode"
                                    label="Post code"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <countries v-model="type.inputDetails.country" label="Select Country"></countries>
                        </v-flex>
                    </v-layout>

                    <template v-if="type.value == 'individual' || type.value == 'shareholder'">
                        <label>LOGIN DETAILS</label>

                        <v-layout row>
                            <v-flex xs7>
                                <phone-number :object="type.inputDetails"></phone-number>
                            </v-flex>
                            <v-flex xs5>
                                <v-text-field
                                        v-model="type.inputDetails.email"
                                        label="email address"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </template>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="type.inputDetails.show = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="type.inputDetails.show = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import PhoneNumber from '@/components/phone-number'
    import Nationalities from '@/plugins/nationalities'

    export default {
        data() {
            return {
                identificationTypes: [
                    'Passport',
                    'ID card',
                    'Driving lisence'
                ],
                nationalities: Nationalities,
            }
        },

        props: ['type'],

        mounted() {
            if(!this.type.inputDetails.firstName) {
                this.type.inputDetails.firstName = this.type.name
            }

            if(!this.type.inputDetails.lastName) {
                this.type.inputDetails.lastName = this.type.surname
            }
        },

        components: { PhoneNumber }
    }
</script>