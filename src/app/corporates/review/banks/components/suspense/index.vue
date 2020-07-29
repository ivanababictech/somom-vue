<template>
        <v-dialog v-model="display" fullscreen persistent>
            <v-card>
                <v-toolbar dense color="accent">
                    <v-icon @click="closeDialog">close</v-icon>
                    <v-toolbar-title>Suspense entries</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.stop="submit">Update allocation data</v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-data-table
                            :headers="headers"
                            :items="entries.data"
                            hide-actions
                            class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.date }}</td>
                            <td>{{ props.item.description }}</td>
                            <td>{{ formatMoney(props.item.foreign_debit) }}</td>
                            <td>{{ formatMoney(props.item.foreign_credit) }}</td>
                            <td class="px-1">
                                <v-autocomplete
                                        :disabled="!props.item.description"
                                        :items="availableBankCorporateSections"
                                        @change="allocationTypeChanged(props.item)"
                                        :item-disabled="'Immaterial'"
                                        :itemDisable="'Immaterial'"
                                        v-model="props.item.allocation_type"
                                        hide-details
                                        clearable
                                        dense
                                ></v-autocomplete>
                            </td>
                            <td class="px-1">
                                <template v-if="props.item.allocation_type">
                                    <v-layout row>
                                        <v-autocomplete
                                                :items="allocationsByType(props.item.allocation_type)"
                                                v-model="props.item.allocation_id"
                                                @change="allocationDataChanged(props.item)"
                                                item-text="text"
                                                item-value="value"
                                                hide-details
                                                clearable
                                                dense
                                        >
                                            <v-icon
                                                    slot="append-outer"
                                                    v-if="!isSuspense(props.item.allocation_type)"
                                                    @click="showAllocationsData(props.item)"
                                                    color="primary"
                                            >add</v-icon>
                                        </v-autocomplete>
                                        <v-btn icon small @click="viewBankRequest(props.item)" v-if="!props.item.data.suspenseRequest">
                                            <img src="/static/img/icons/polygon.png" width="24px" alt="">
                                            <create-bank-request :entry="props.item"></create-bank-request>
                                        </v-btn>

                                        <allocations-data v-if="props.item.showAllocationsData && props.item.allocation_type"
                                                          :item="props.item"
                                        ></allocations-data>
                                    </v-layout>
                                </template>
                            </td>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <div class="text-xs-center" v-if="entries.last_page > 1">
                        <v-pagination :length="entries.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
    import * as bankService from '../../service';
    import * as corporateSerice from '@/app/corporates/service';
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import AllocationsData from '../allocations-data';
    import CreateBankRequest from '../request/create';

    export default {
        data() {
            return {
                headers: [
                    {text: 'Date', value: 'date'},
                    {text: 'Description', value: 'description', width: '400px'},
                    {text: 'Debit', value: 'debit', width: '150px'},
                    {text: 'Credit', value: 'credit', width: '150px'},
                    {text: 'Allocation type', value: 'allocation_type'},
                    {text: 'Allocation data', value: 'allocation_data'},
                ],
                display: true,
                entries: {
                    data: []
                },
                currentPage: 1,
            }
        },

        mixins: [AllocationsMixin],

        props: ['account'],

        mounted() {
            this.getEntries()
        },

        methods: {
            getEntries() {
                const params = {
                    page: this.currentPage,
                };

                bankService.getSuspenseTransactions(this.account.id, params)
                    .then(response => {
                        this.entries = response.data
                    })
            },

            closeDialog() {
                this.$emit('close')
            },

            viewBankRequest(entry) {
                this.$set(entry, 'viewBankRequest', true)
            },

            submit() {
                return bankService.updateEntries(this.entries.data)
                    .then(response => {
                        this.$emit('submit')
                    })
            },

        },


        watch: {
            currentPage: 'getEntries',
        },

        components: {AllocationsData, CreateBankRequest},
    }
</script>