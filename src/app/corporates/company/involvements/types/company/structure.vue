<template>
    <v-card>
        <v-card-title>
            <span class="headline">Shareholders of {{ company.name }}</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout row wrap v-for="(type, index) in structure.types" :key="index">
                    <v-layout row>
                        <v-flex xs2>
                            <v-select
                                    item-text="label"
                                    item-value="value"
                                    v-model="type.value"
                                    :items="types"
                                    label="Select type"
                                    @input="typeSelected(type)"
                            ></v-select>
                        </v-flex>
                        <template v-if="type.value == 'individual'">
                            <v-flex xs2>
                                <v-text-field
                                        v-model="type.name"
                                        label="Name"
                                        @input="updateInputDetailsName(type)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-text-field
                                        v-model="type.surname"
                                        label="Surname"
                                        @input="updateInputDetailsSurname(type)"
                                ></v-text-field>
                            </v-flex>
                        </template>
                        <v-flex xs3 v-if="type.value == 'company'">
                            <v-text-field
                                    v-model="type.companyName"
                                    label="Company name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 v-if="type.value == 'foundation'">
                            <v-text-field
                                    v-model="type.foundationName"
                                    label="Foundation name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 v-if="type.value == 'trust'">
                            <v-text-field
                                    v-model="type.trustName"
                                    label="Trust name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2 v-if="type.value == 'company' || type.value == 'foundation'">
                            <v-text-field
                                    v-model="type.registrationNumber"
                                    label="Registration Number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2 v-if="type.value">
                            <v-text-field
                                    v-model="type.companyOwnership"
                                    :label="'% of ' + company. name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2 v-if="type.value == 'individual'">
                            <v-btn dark small color="primary" @click="openInputDetails(type)">
                                Input Details
                            </v-btn>
                        </v-flex>

                        <v-spacer></v-spacer>
                        <v-flex xs2 class="text-xs-right">
                            <v-btn fab dark small color="primary" @click="addType" v-if="index === 0">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="danger" @click="removeType(index)">
                                <v-icon dark>remove</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                    <template v-if="type.value == 'company'">
                        <v-flex xs12>
                            <label>Shareholders of {{ type.companyName }}</label>
                        </v-flex>

                        <v-layout row v-for="(shareholder, index) in type.shareholders" :key="index">
                            <v-flex xs3>
                                <v-text-field
                                        v-model="shareholder.name"
                                        label="Name"
                                        @input="updateInputDetailsName(shareholder)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="shareholder.surname"
                                        label="Surname"
                                        @input="updateInputDetailsSurname(shareholder)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="shareholder.ownership"
                                        :label="'% of ' + type.companyName"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-btn dark small color="primary" @click="openInputDetails(shareholder)">
                                    Input Details
                                </v-btn>
                            </v-flex>
                            <v-flex xs3 class="text-xs-right">
                                <v-btn fab dark small color="primary" @click="addShareholder(type)" v-if="index === 0">
                                    <v-icon dark>add</v-icon>
                                </v-btn>
                                <v-btn fab dark small color="danger" v-if="type.shareholders.length > 1" @click="removeShareholder(type, index)">
                                    <v-icon dark>remove</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </template>

                    <template v-if="type.value == 'foundation'">
                        <v-flex xs12>
                            <label>Beneficiaries of {{ type.foundationName }}</label>
                        </v-flex>

                        <v-layout row v-for="(beneficiary, index) in type.beneficiaries" :key="index">
                            <v-flex xs2>
                                <v-text-field
                                        v-model="beneficiary.name"
                                        label="Name"
                                        @input="updateInputDetailsName(beneficiary)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="beneficiary.surname"
                                        label="Surname"
                                        @input="updateInputDetailsSurname(beneficiary)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="beneficiary.foundation"
                                        :label="'% of ' + type.foundationName"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-btn dark small color="primary" @click="openInputDetails(beneficiary)">
                                    Input Details
                                </v-btn>
                            </v-flex>
                            <v-flex xs2 class="text-xs-right">
                                <v-btn fab dark small color="primary" @click="addBeneficiary(type)" v-if="index === 0">
                                    <v-icon dark>add</v-icon>
                                </v-btn>
                                <v-btn fab dark small color="danger" v-if="type.beneficiaries.length > 1" @click="removeBeneficiary(type, index)">
                                    <v-icon dark>remove</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12>
                            <label>Foundation administrator login details</label>
                        </v-flex>

                        <v-layout row>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="type.foundationAdministrator.name"
                                        label="Name & surname"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs5>
                                <phone-number :object="type.foundationAdministrator"></phone-number>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field
                                        v-model="type.foundationAdministrator.email"
                                        label="email address"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </template>

                    <template v-if="type.value === 'trust'">
                        <v-flex xs12>
                            <label>Beneficiaries of {{ type.trustName }}</label>
                        </v-flex>

                        <v-layout row v-for="(beneficiary, index) in type.beneficiaries" :key="index">
                            <v-flex xs3>
                                <v-text-field
                                        v-model="beneficiary.name"
                                        label="Name"
                                        @input="updateInputDetailsName(beneficiary)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="beneficiary.surname"
                                        label="Surname"
                                        @input="updateInputDetailsSurname(beneficiary)"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-text-field
                                        v-model="beneficiary.trust"
                                        :label="'% of ' + type.trustName"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-btn small color="primary" @click="openInputDetails(beneficiary)">
                                    Input Details
                                </v-btn>
                            </v-flex>
                            <v-flex xs2 class="text-xs-right">
                                <v-btn fab small color="primary" @click="addBeneficiary(type)" v-if="index === 0">
                                    <v-icon dark>add</v-icon>
                                </v-btn>
                                <v-btn fab small color="danger" v-if="type.beneficiaries.length > 1" @click="removeBeneficiary(type, index)">
                                    <v-icon dark>remove</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12>
                            <label>Trustee login details</label>
                        </v-flex>

                        <v-layout row>
                            <v-flex xs3>
                                <v-text-field
                                        v-model="type.loginDetails.name"
                                        label="Name & surname"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs5>
                                <phone-number :object="type.loginDetails"></phone-number>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field
                                        v-model="type.loginDetails.email"
                                        label="email address"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-flex xs12>
                            <v-divider v-if="index + 1 < structure.types.length"></v-divider>
                        </v-flex>
                    </template>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.native="structure.show = false">Cancel</v-btn>
            <v-btn color="primary" flat @click.native="structure.show = false">Save</v-btn>
        </v-card-actions>

        <input-details :type="type" v-if="type.inputDetails && type.inputDetails.show"></input-details>
    </v-card>
</template>

<script>
    import InputDetails from './input-details'
    import PhoneNumber from '@/components/phone-number'

    const uuidv4  = require('uuid/v4');

    export default {
        data() {
            return {
                typeStructure: {
                    foundationName: '',
                    trustName: '',
                    companyName: '',
                    label: '',
                    value: '',
                    shareholders: [],
                    beneficiaries: [],
                    inputDetails: {
                        firstName: null,
                        lastName: null,
                        show: false
                    },
                    foundationAdministrator: {},
                    loginDetails: {}
                },
                beneficiaryStructure: {
                    inputDetails: {
                        firstName: null,
                        lastName: null,
                        show: false,
                    },
                },
                shareholderStructure: {
                    inputDetails: {
                        firstName: null,
                        lastName: null,
                        show: false,
                    },
                    value: 'shareholder'
                },

                types: [
                    {
                        label: 'Individual',
                        value: 'individual'
                    },

                    {
                        label: 'Company',
                        value: 'company',
                    },
                    {
                        label: 'Foundation',
                        value: 'foundation'
                    },
                    {
                        label: 'Trust',
                        value: 'trust'
                    }
                ],
                showInputDetails: false,
                type: {}
            }
        },

        props: ['structure', 'company'],

        mounted() {
            this.init()
        },


        methods: {
            init() {
                if(!this.structure.types.length) {
                    this.addType()
                }
            },

            resetStructure() {
                this.structure.types = []
                this.addType()
            },

            typeSelected(type) {
                this.resetObject(type, this.typeStructure, 'value')

                type.beneficiaries = []
                type.shareholders = []

                if(type.value === 'company' && !type.shareholders.length) {
                    this.addShareholder(type)
                }

                if(type.value === 'foundation' && !type.beneficiaries.length) {
                    this.addBeneficiary(type)
                }

                if(type.value === 'trust' && !type.beneficiaries.length) {
                    this.addBeneficiary(type)
                }
            },

            addType() {
                this.typeStructure.id = uuidv4();
                this.structure.types.unshift(JSON.parse(JSON.stringify(this.typeStructure)))
            },

            removeType(index) {
                this.structure.types.splice(index, 1)

                if(!this.structure.types.length) {
                    this.resetStructure()
                }
            },

            addShareholder(type) {
                let structure = JSON.parse(JSON.stringify(this.shareholderStructure));
                structure.id = uuidv4();

                type.shareholders.unshift(structure)
            },

            removeShareholder(type, index) {
                type.shareholders.splice(index, 1)
            },

            addBeneficiary(type) {
                let structure = JSON.parse(JSON.stringify(this.beneficiaryStructure));
                structure.id = uuidv4();

                type.beneficiaries.unshift(structure)
            },

            removeBeneficiary(type, index) {
                type.beneficiaries.splice(index, 1)
            },

            openInputDetails(type) {
                type.inputDetails.show = true
                this.type = type
            },

            updateInputDetailsName(type) {
                type.inputDetails.firstName = type.name;
            },

            updateInputDetailsSurname(type) {
                type.inputDetails.lastName = type.surname;
            }
        },

        components: { InputDetails, PhoneNumber }
    }
</script>