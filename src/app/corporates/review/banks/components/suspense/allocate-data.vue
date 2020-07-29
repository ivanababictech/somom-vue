<template>
    <v-card>
        <v-toolbar color="accent">
            <v-icon @click="close()">close</v-icon>
            <v-toolbar-title>Allocation of data</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-subheader class="mt-3 grey--text text--darken-1">
                        Try to allocate entries before sending request to client
                    </v-subheader>
                </v-layout>

                <v-layout row v-for="(entry, index) in entries" :key="index">
                    <v-flex xs12>
                        <v-layout>
                            <v-flex md2>
                                <date-picker v-model="entry.date" full-width hide-details clearable></date-picker>
                            </v-flex>
                            <v-flex md1>
                                <v-text-field
                                        v-model.number="entry.amount"
                                        label="Amount"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md3>
                                <v-textarea
                                        v-model="entry.description"
                                        label="Description"
                                        auto-grow
                                        rows="1"
                                ></v-textarea>
                            </v-flex>
                            <v-flex md3>
                                <v-autocomplete
                                        v-model="entry.allocation_type"
                                        :items="availableBankCorporateSections"
                                        @change="allocationTypeChanged(entry)"
                                        :disabled="!entry.description"
                                        hide-details
                                        clearable
                                        dense
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex md3>
                                <template v-if="entry.allocation_type">
                                    <v-layout row>
                                        <v-autocomplete
                                                :items="allocationsByType(entry.allocation_type)"
                                                v-model="entry.allocation_id"
                                                @change="allocationDataEntryChanged(entry)"
                                                item-text="text"
                                                item-value="value"
                                                hide-details
                                                clearable
                                                dense
                                        >
                                            <v-icon
                                                    slot="append-outer"
                                                    @click="showAllocationsData(entry)"
                                                    color="primary"
                                            >add</v-icon>
                                        </v-autocomplete>

                                        <allocations-data v-if="entry.showAllocationsData && entry.allocation_type"
                                                          :item="entry"
                                        ></allocations-data>
                                        <create-rule
                                                v-if="entry.showCreateRule"
                                                :editItem="entry"
                                                @save="saveRule"
                                                @close="entry.showCreateRule = false"
                                        ></create-rule>
                                    </v-layout>
                                </template>
                            </v-flex>
                            <v-flex md1>
                                <v-btn icon flat small @click="deleteRow(index)">
                                    <v-icon color="danger">clear</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" flat @click.stop="close">Close</v-btn>
            <v-layout justify-end>
                <v-btn color="primary" @click.stop="submit">Submit</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import AllocationsData from '../allocations-data';
    import CreateRule from '../rules/create';
    import * as rulesService from '../rules/service'

    export default {
        data() {
            return {
                dialog: true,
            }
        },

        mixins: [AllocationsMixin],

        props: ['account', 'entries'],

        methods: {
            close() {
                this.$emit('close')
            },

            submit() {
                this.$emit('submit')
            },

            async deleteRow(index) {
                if(this.entries.length === 1) {
                    let res = await this.$confirm('Are you sure?.<br>Do you want to proceed?')
                    if(!res) {
                        return false
                    }
                }

                this.entries.splice(index, 1);

                if(!this.entries.length) {
                    this.submit();
                }
            },

            saveRule(rules) {
                rulesService.create(rules)
                    .then(() => this.entries.map(entry => this.$set(entry, 'showCreateRule', false)));
            },

            allocationDataEntryChanged(item) {
                this.allocationDataChanged(item)

                this.$set(item, 'showCreateRule', true)
            },

        },

        components: {AllocationsData, CreateRule}
    }
</script>