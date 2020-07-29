<template>
    <v-dialog v-model="dialog" absolute width="600">
        <v-card>
            <v-card-title class="headline">NEW LINK REQUEST</v-card-title>
            <v-card-text>
                <v-text-field
                        label="Company name"
                        v-model="item.name"
                        @input="$v.item.name.$touch()"
                        required
                ></v-text-field>
                <v-text-field
                        label="Reg. no."
                        v-model="item.reg_no"
                        @input="$v.item.reg_no.$touch()"
                        required
                ></v-text-field>
                <v-layout wrap align-center>
                    <label>Define your relationship with this customer (to track related party transactions)</label>
                    <v-flex xs12>
                        <v-autocomplete
                                :items="types"
                                v-model="item.relationship.type"
                                label="select relationship type"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                        <label>Is this customer related to your organisation and registered on our platform?</label>
                        <v-btn-toggle v-model="item.relationship.customerRegistered">
                            <v-btn flat :value="true">
                                <span>Y</span>
                            </v-btn>
                            <v-btn flat :value="false">
                                <span>N</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-flex>
                </v-layout>
                <v-layout align-center mb-2>
                    <span class="subheading">Is this company on our platform?</span>
                    <v-radio-group v-model="ourPlatform" row hide-details class="ml-4 mt-0 py-0">
                        <v-radio label="Yes" :value="1" class="mb-0"></v-radio>
                        <v-radio label="No" :value="0" class="mb-0"></v-radio>
                    </v-radio-group>
                </v-layout>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions class="grey lighten-4">
                <v-spacer></v-spacer>
                <v-btn
                        color="green"
                        :dark="!$v.invalid"
                        :disabled="$v.invalid"
                        @click.native="add()">
                    Add
                </v-btn>
                <v-btn flat @click="closeDialog()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';

    export default{
        props: {
            dialog: {
                type: Boolean,
                required: true
            }
        },
        data: () => ({
            item: {
                name: '',
                reg_no: '',
                relationship: {
                    type: '',
                    customerRegistered: '',
                }
            },
            ourPlatform: null,
            types: [
                'unrelated party',
                'director',
                'shareholder',
                'related company',
                'parent company',
                'subsidiary company',
                'associate company'
            ]
        }),
        validations: {
            item: {
                name: {
                    required
                },
                reg_no: {
                    required
                }
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeDialog')
            },
            add () {

            }
        }
    }
</script>