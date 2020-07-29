<template>
    <v-dialog v-model="dialog" max-width="1024px" persistent>
        <allocate-data
                v-if="showAllocate"
                :account="account"
                :entries="unAllocatedData"
                @close="close"
                @submit="showAllocate = false"
        ></allocate-data>

        <v-card v-else>
            <v-toolbar color="accent">
                <v-icon @click="close()">close</v-icon>
                <v-toolbar-title>Suspense</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn flat @click.native="submit">
                    <v-icon>send</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex md12>
                            <v-autocomplete
                                    v-model="suspense.to"
                                    :items="people"
                                    label="To"
                                    item-text="name"
                                    item-value="email"
                                    multiple
                            >
                                <template
                                        slot="item"
                                        slot-scope="data"
                                >
                                    <template v-if="typeof data.item !== 'object'">
                                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                    </template>
                                    <template v-else>
                                        <v-list-tile-avatar>
                                            <img :egrg="data" :src="'https://cdn.vuetifyjs.com/images/lists/' + data.item.id + '.jpg'">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </v-flex>
                        <v-flex md12>
                            <v-text-field
                                    v-model.number="suspense.subject"
                                    placeholder="Subject"
                                    hide-details
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row v-for="(entry, index) in suspense.data.entries" :key="index">
                        <v-flex xs12>
                            <v-layout>
                                <v-flex md2>
                                    <date-picker v-model="entry.date" full-width hide-details clearable></date-picker>
                                </v-flex>
                                <v-flex md2>
                                    <v-text-field
                                            v-model="entry.amount"
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
                                <v-flex md2>
                                    <date-picker v-model="entry.due_date" full-width hide-details clearable></date-picker>
                                </v-flex>
                                <v-flex md3>
                                    <v-checkbox v-model="entry.proof" label="Proof required"></v-checkbox>
                                </v-flex>
                                <v-flex md1>
                                    <v-btn icon flat small @click="deleteRow(index)">
                                        <v-icon color="danger">clear</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex md12>
                            <v-textarea
                                    v-model.number="suspense.message"
                                    label="Description"
                                    hide-details
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="showAllocate = true">Cancel</v-btn>
                <v-layout justify-end>
                    <v-btn color="primary" @click.stop="submit">Submit</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import * as bankRequestService from '../request/service';
    import * as bankService from '../../service';
    import AllocateData from './allocate-data';
    const moment = require('moment');

    export default {
        data() {
            return {
                suspense: {
                    types: 'suspense',
                    data: {
                        entries: [],
                    },
                    subject: 'Company profile update required'
                },
                dialog: true,
                suspenseEntries: [],
                people: [
                    { id: 1, name: 'Sandra Adams', email: 'adams@gmail.com'},
                    { id: 2, name: 'Ali Connors', email: 'ali@hotmail.com'},
                    { id: 3, name: 'Trevor Hansen', email: 'trevoe.hansen@gmail.com'},
                    { id: 4, name: 'Tucker Smith', email: 'ticke.smith@goog.com'},
                    { id: 5, name: 'Britta Holt', email: 'brittahost@yandex.com'},
                    { id: 3, name: 'Jane Smith ', email: 'jane@gmail.com'},
                    { id: 2, name: 'Gerard Smith', email: 'john.smmm@gmail.com'},
                    { id: 1, name: 'Sandra Williams', email: 'wsandndra@gmail.com'}
                ],
                showAllocate: true,
                unAllocatedData: []
            }
        },

        props: ['account', 'entries'],

        mounted() {
            this.initEntries();
        },

        methods: {
            close() {
                this.$emit('close')
            },

            submit() {
                bankRequestService.create(this.account.id, this.suspense)
                    .then(response => {
                        this.$emit('submit')
                    });
            },
            initEntries() {
                this.suspense.entries = JSON.parse(JSON.stringify(this.entries));
                this.unAllocatedData = this.filterEntries(this.entries);

                // check if there is no more suspense entries
                // and submit data
                if(!this.unAllocatedData.length) {
                    this.create();
                }

                this.suspense.data.entries = this.unAllocatedData.map(entry => {
                    const dateEntry = moment(entry.date, 'YYYY-MM-DD');
                    entry.due_date = dateEntry.add(7, 'days').format('YYYY-MM-DD');
                    return entry
                })
            },

            deleteRow(index) {
                this.suspense.data.entries.splice(index, 1)
            },

            filterEntries(entries) {
                return entries.filter(entry => !entry.allocation_id || !entry.allocation_type || entry.allocation_type === corporateService.SECTION_SUSPENSE)
            }

        },

        watch: {
            showAllocate() {
                this.suspense.data.entries = this.filterEntries(this.unAllocatedData)
                if(!this.unAllocatedData.length || !this.suspense.data.entries.length) {
                    this.submit()
                }
            }
        },

        components: {AllocateData}
    }
</script>