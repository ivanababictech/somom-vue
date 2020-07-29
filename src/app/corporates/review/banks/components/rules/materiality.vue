<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary">Materiality</v-btn>
        <v-card>
            <v-toolbar color="accent">
                <v-toolbar-title>Materiality</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout row>
                        <v-flex md6 class="text-xs-center">
                            <v-text-field
                                    label="Credit"
                                    v-model="rule.credit"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md6>
                            <v-text-field
                                    label="Debit"
                                    v-model="rule.debit"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-flex class="text-xs-right">
                    <v-btn color="primary" outline @click="dialog = false">Cancel</v-btn>
                    <v-btn color="primary" @click="submit()">Submit</v-btn>
                </v-flex>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as ruleService from './service'

    export default {
        props: ['editItem'],
        data() {
            return {
                rule: JSON.parse(JSON.stringify(this.materiality || {})),
                dialog: false,
            }
        },
        computed: {
            ...mapGetters({
                materiality: 'corporate/materialityRule'
            })
        },

        mounted() {
            this.updateRule()
        },

        methods: {
            submit() {
                ruleService.updateMateriality(this.rule)
            },
            updateRule() {
                this.rule = JSON.parse(JSON.stringify(this.materiality || {}))
            }
        },

        watch: {
            materiality: 'updateRule'
        }
    }
</script>