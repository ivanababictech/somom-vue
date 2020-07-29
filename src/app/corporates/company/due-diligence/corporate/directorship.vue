<template>
    <v-container fluid grid-list-md>
        <label>Corporate directors</label>

        <v-layout row>
            <v-flex sx11>
                <v-layout row wrap v-for="(director, index) in directorship.corporates" :key="index">
                    <v-flex xs3>
                        <v-text-field
                                label="Company name"
                                v-model="director.companyName"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-text-field
                                label="Reg number"
                                v-model="director.regNumber"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field
                                label="Company address"
                                v-model="director.companyAddress"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                label="Domicile"
                                v-model="director.domicile"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs5>
                        <v-text-field
                                label="Name of person signing on behalf of corporate director"
                                v-model="director.corporateDirector"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-btn-toggle v-model="director.sex">
                            <v-btn flat :value="true">
                                <span>M</span>
                            </v-btn>
                            <v-btn flat :value="false">
                                <span>F</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                v-model="director.identificationNumber"
                                label="Identification number"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn :color="director.idType == 'id' ? 'info' : ''" @click="director.idType = 'id'">Identity card</v-btn>
                        <v-btn :color="director.idType == 'passport' ? 'info' : ''" @click="director.idType = 'passport'">Passport</v-btn>
                    </v-flex>

                    <v-flex xs12>
                        <v-divider v-if="index + 1 < directorship.corporates.length"></v-divider>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs1 class="text-xs-right">
                <v-btn fab dark small color="success" @click="addCorporateDirector">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="error" v-if="directorship.corporates.length > 1" @click="removeCorporatelDirector">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <label>Individual directors</label>

        <v-layout row>
            <v-flex xs11>
                <v-layout row wrap v-for="(individualDirector, index) in directorship.individuals" :key="index">
                    <v-flex xs3>
                        <v-text-field
                                label="Name & surname"
                                v-model="individualDirector.name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <countries v-model="individualDirector.country" label="Country of residence"></countries>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                label="Residential address"
                                v-model="individualDirector.address"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-autocomplete
                                :items="nationalities"
                                v-model="individualDirector.nationality"
                                label="Select nationality"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex xs1>
                        <v-btn-toggle v-model="individualDirector.sex">
                            <v-btn flat :value="true">
                                <span>M</span>
                            </v-btn>
                            <v-btn flat :value="false">
                                <span>F</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                                v-model="individualDirector.identificationNumber"
                                label="Identification number"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn :color="individualDirector.idType == 'id' ? 'info' : ''" @click="individualDirector.idType = 'id'">Identity card</v-btn>
                        <v-btn :color="individualDirector.idType == 'passport' ? 'info' : ''" @click="individualDirector.idType = 'passport'">Passport</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-divider v-if="index + 1 < directorship.individuals.length"></v-divider>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs1>
                <v-spacer></v-spacer>
                <v-btn fab dark small color="success" @click="addIndividualDirector">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="error" v-if="directorship.individuals.length > 1" @click="removeIndividualDirector">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue'
    import Nationalities from '@/plugins/nationalities'

    export default {

        data() {
            return {
                corporateDirectorStructure: {
                    name: null,
                    sex: null,
                    idType: null,
                    idNumber: null,
                    address: null,
                    domicile: null,

                },
                individualDirectorStructure: {
                    name: null,
                    sex: null,
                    idType: null,
                    idNumber: null,
                    address: null,
                    domicile: null,
                    companyName: null,
                    regNumber: null,
                    country: []
                },
                idTypes: [
                    'ID Card',
                    'Passport'
                ],
                nationalities: Nationalities,
            }
        },

        props: ['directorship'],

        mounted () {
            this.init()
        },

        methods: {

            init() {
                if(!this.directorship.corporates.length) {
                    this.addCorporateDirector()
                }

                if(!this.directorship.individuals.length) {
                    this.addIndividualDirector()
                }
            },

            addCorporateDirector () {
                this.directorship.corporates.push(Vue.util.extend({}, this.corporateDirectorStructure))
            },

            addIndividualDirector () {
                this.directorship.individuals.push(Vue.util.extend({}, this.individualDirectorStructure))
            },


            removeCorporatelDirector() {
                if(this.directorship.corporates.length > 1) {
                    this.directorship.corporates.pop()
                }
            },

            removeIndividualDirector() {
                if(this.directorship.individuals.length > 1) {
                    this.directorship.individuals.pop()
                }
            }
        }
    }
</script>