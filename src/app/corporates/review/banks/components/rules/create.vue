<template>
    <v-dialog v-model="display" max-width="1024px" persistent>
        <v-card>
            <v-toolbar color="accent">
                <v-icon @click="close">close</v-icon>
                <v-toolbar-title>
                    <span v-if="editItem.id">Edit rule</span>
                    <span v-else>Create new rule</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout row v-if="editItem.id">
                        <v-flex xs5>
                            <v-combobox
                                    v-model="editItem.keywords"
                                    :items="[]"
                                    label="Keyword(s)"
                                    chips
                                    multiple
                                    deletable-chips
                                    dense
                            ></v-combobox>
                        </v-flex>
                        <v-flex xs3 mx-2>
                            <v-autocomplete
                                    v-model="editItem.allocation_type"
                                    :items="availableBankCorporateSections"
                                    @change="allocationTypeChanged(r)"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs3 mr-2>
                            <v-layout row>
                                <v-autocomplete
                                        :items="allocationsByType(editItem.allocation_type)"
                                        :label="'Select ' + allocationDataLabelByType(editItem.allocation_type)"
                                        v-model="editItem.allocation_id"
                                        @change="allocationDataChanged(editItem)"
                                        item-text="text"
                                        item-value="value"
                                        hide-details
                                        dense
                                >
                                    <v-icon
                                            slot="append-outer"
                                            @click="showAllocationsData(editItem)"
                                            color="primary"
                                    >add</v-icon>
                                </v-autocomplete>

                                <allocations-data v-if="editItem.showAllocationsData && editItem.allocation_type"
                                                  :item="editItem"
                                ></allocations-data>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row v-else v-for="(r, i) in rules" :key="i">
                        <v-flex xs5>
                            <v-combobox
                                    v-model="r.keywords"
                                    :items="[]"
                                    @change="keywordsChanged(r)"
                                    label="Keyword(s)"
                                    chips
                                    multiple
                                    deletable-chips
                            ></v-combobox>
                        </v-flex>
                        <v-flex md3>
                            <v-autocomplete
                                    v-model="r.allocation_type"
                                    :items="availableBankCorporateSections"
                                    @change="allocationTypeChanged(r)"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex md3>
                            <v-layout row>
                                <v-autocomplete
                                        :items="allocationsByType(r.allocation_type)"
                                        :label="'Select ' + allocationDataLabelByType(r.allocation_type)"
                                        v-model="r.allocation_id"
                                        @change="allocationDataChanged(r)"
                                        item-text="text"
                                        item-value="value"
                                        hide-details
                                        dense
                                >
                                    <v-icon
                                            slot="append-outer"
                                            @click="showAllocationsData(r)"
                                            color="primary"
                                    >add</v-icon>
                                </v-autocomplete>

                                <allocations-data v-if="r.showAllocationsData && r.allocation_type"
                                                  :item="r"
                                ></allocations-data>
                            </v-layout>
                        </v-flex>
                        <v-icon color="primary" large @click="addRow">add</v-icon>
                        <v-icon color="red" large @click="removeRow(i)" v-if="rules.length > 1">close</v-icon>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="close">Close</v-btn>
                <v-layout justify-end>
                    <v-btn color="primary" @click.stop="save" v-if="!editItem.id">Save</v-btn>
                    <v-btn color="primary" @click.stop="update" v-else>Update</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import AllocationsData from '../allocations-data';


    export default {
        props: {
            editItem: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                rules: [],
                cheque: null,
                display: true
            }
        },

        computed: {
            ...mapGetters({
                corporateSections: 'settings/corporateSections',
                filteredKeywords: 'settings/filteredKeywords',
            }),
        },

        mixins: [AllocationsMixin],

        created() {
            this.addRow()
        },

        methods: {
            onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            },

            addRow() {
                let rule = {
                    keywords: this.editItem && this.editItem.description ? this.editItem.description.split(' ').filter(this.onlyUnique) : null,
                    allocation_type: this.editItem.allocation_type || null,
                    allocation: this.editItem.allocation || null,
                    allocation_id: this.editItem.allocation_id || null
                };
                this.keywordsChanged(rule);

                this.rules.push(rule)
            },
            removeRow(index) {
                this.rules.splice(index, 1)
            },
            save() {
                this.$emit('save', this.rules)
            },
            update() {
                this.$emit('update')
            },

            close() {
                this.display = false
                this.$emit('close')
            },
            keywordsChanged(item) {
                item.keywords = item.keywords.filter(keyword => keyword.length && !this.filteredKeywords.find(filteredKeyword => filteredKeyword.name === keyword));
            }
        },

        components: {AllocationsData}
    }
</script>