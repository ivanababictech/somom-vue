<template>
    <v-dialog v-model="$parent.dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span v-if="!bank.id" class="headline">Add bank</span>
                <span v-else class="headline">Edit bank #{{ bank.name }}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <v-text-field label="Bank internal reference" v-model="bank.reference"
                                          required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="Bank name" v-model="bank.name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="SWIFT code" v-model="bank.swift" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field label="IBAN" v-model.number="bank.iban" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Account holder name" v-model="bank.holder" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-checkbox label="Set as default" v-model="bank.is_default"></v-checkbox>
                        </v-flex>

                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$parent.toggleDialog">Cancel</v-btn>
                <v-btn flat color="primary" @click="submit" v-if="!bank.id">Save</v-btn>
                <v-btn flat color="primary" @click="submit" v-else>Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['bank'],

        methods: {
            submit() {
                this.$emit('submit')
            }
        },
    }

</script>