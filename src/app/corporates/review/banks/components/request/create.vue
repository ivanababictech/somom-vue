<template>
    <v-dialog v-model="entry.viewBankRequest" persistent max-width="600px">
        <v-card>
            <v-toolbar card color="accent">
                <v-icon @click="entry.viewBankRequest = false">arrow_back</v-icon>
                <v-toolbar-title>Request additional information</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn flat @click.native="submit">
                    <v-icon>send</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-autocomplete
                                    v-model="request.types"
                                    :items="types"
                                    label="Types"
                                    multiple
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12>
                            <v-autocomplete
                                    v-model="request.to"
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
                                            <img :src="data.item.avatar">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Subject" hint="example of helper text only on focus"  v-model="request.subject"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <date-picker v-model="request.date" full-width hide-details clearable label="Transaction date"></date-picker>
                        </v-flex>
                        <v-flex xs4>
                            <date-picker label="Due date" v-model="request.due_date" hide-details clearable></date-picker>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Amount"
                                    v-model="request.amount"
                                    :suffix="request.credit ? 'deposit' : request.debit ? 'withdrawal' : ''"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Description" v-model="request.description"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea label="Message" auto-grow rows="5" v-model="request.message" hide-details></v-textarea>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>

        <confirm v-if="showConfirm" :text="confirmationText" @confirm="confirm" ref="confirm" :activator="false"></confirm>
    </v-dialog>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as bankRequestService from './service'

    export default {
        props: ['entry'],
        data() {
            const srcs = {
                1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
            }

            return {
                request: {},
                entryStructure: {
                    subject: null,
                    to: null,
                },
                showConfirm: false,
                confirmationText: 'The request of information related to this\n' +
                                    'bank entry was alredy sent\n' +
                                    'Do you want to proceed ?',
                people: [
                    { name: 'Sandra Adams', email: 'adams@gmail.com', avatar: srcs[1] },
                    { name: 'Ali Connors', email: 'ali@hotmail.com', avatar: srcs[2] },
                    { name: 'Trevor Hansen', email: 'trevoe.hansen@gmail.com', avatar: srcs[3] },
                    { name: 'Tucker Smith', email: 'ticke.smith@goog.com', avatar: srcs[2] },
                    { name: 'Britta Holt', email: 'brittahost@yandex.com', avatar: srcs[4] },
                    { name: 'Jane Smith ', email: 'jane@gmail.com', avatar: srcs[5] },
                    { name: 'John Smith', email: 'john.smmm@gmail.com', avatar: srcs[1] },
                    { name: 'Sandra Williams', email: 'wsandndra@gmail.com', avatar: srcs[3] }
                ],

                types: ['clarification', 'invoice', 'contract']
            }
        },

        computed: {
            isClarificationType() {
                return this.request.types.indexOf('clarification') !== -1;
            },
            isInvoiceType() {
                return this.request.types.indexOf('invoice') !== -1;
            },
            isContractType() {
                return this.request.types.indexOf('contract') !== -1;
            },
        },

        mounted() {
            this.initData()
        },

        methods: {
            ...mapActions(['setMessage']),

            initData() {
                this.request = JSON.parse(JSON.stringify(this.entry))

                this.$set(this.request, 'to', [])
                this.$set(this.request, 'subject', this.request.subject || this.request.description)
                this.$set(this.request, 'types', [])

                this.updateAmount()
            },

            updateEmailMessage() {
                if(!this.isClarificationType && !this.isInvoiceType && !this.isContractType) {
                    this.request.message = ''
                    return
                }

                this.request.message = 'Hi,\n'+
                            (this.isClarificationType ? 'Kindly reply back to this email by provide us an explanation related to this transaction.\n' : '') +
                            (this.isInvoiceType ? 'Kindly reply back to this email by uploading a copy of the invoice related to this transaction.\n' : '') +
                            (this.isContractType ? 'Kindly reply back to this email by uploading a copy of the contract related to this transaction.\n' : '') +
                            'If you have any questions, please let us know.\n' +
                            'Thanks';
            },

            updateAmount() {
                this.$set(this.request, 'amount', this.request.credit || this.request.debit)
                if(this.request.id) {
                    this.request.amount = this.formatMoney(this.request.amount,  2, 3, '')
                }
            },

            async submit() {
                if(this.entry.used) {
                    let res = await this.$confirm('The request of information related to this bank entry was alredy sent.<br>Do you want to proceed?')
                    if(!res) {
                        return false
                    }
                }

                bankRequestService.create(this.request.account_id, this.request)
                    .then(response => {
                        this.entry.id = response.data.id
                        this.entry.viewBankRequest = false
                        this.$set(this.entry, 'used', true)
                    })
            },

            confirm() {
                this.showConfirm = false
            }
        },

        watch: {
            request: {
                handler: 'updateEmailMessage',
                deep: true
            },
            entry: {
                handler: 'initData',
                deep: true
            },
        },
    }
</script>

<style scoped>

</style>