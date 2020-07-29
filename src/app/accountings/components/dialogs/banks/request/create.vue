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
                            <v-btn :color="entry.clarification ? 'primary' : ''" @click="entry.clarification = !entry.clarification">Clarification</v-btn>
                            <v-btn :color="entry.invoice ? 'primary' : ''" @click="entry.invoice = !entry.invoice">Invoice</v-btn>
                            <v-btn :color="entry.contract ? 'primary' : ''" @click="entry.contract = !entry.contract">Contract</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-autocomplete
                                    v-model="entry.to"
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
                            <v-text-field label="Subject" hint="example of helper text only on focus"  v-model="entry.subject"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Transaction date"
                                    v-model="entry.date"
                                    mask="##/##/####"
                                    :return-masked-value="true"
                                    hide-details
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <date-picker label="Due date" v-model="entry.due_date" hide-details clearable></date-picker>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Amount"
                                    v-model="entry.amount"
                                    :suffix="entry.credit ? 'deposit' : entry.debit ? 'withdrawal' : ''"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Description" v-model="entry.description"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea label="Message" auto-grow rows="5" v-model="entry.message" hide-details></v-textarea>
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
            }
        },

        mounted() {
            this.initData()
        },

        methods: {
            ...mapActions(['setMessage']),

            initData() {
                this.$set(this.entry, 'to', [])
                this.$set(this.entry, 'subject', this.entry.subject || this.entry.description)
                this.$set(this.entry, 'clarification', this.entry.clarification)
                this.$set(this.entry, 'invoice', this.entry.invoice)
                this.$set(this.entry, 'contract', this.entry.contract)

                if(this.entry.id) {
                    this.entry.amount = this.formatMoney(this.entry.amount,  2, 3, '')
                }
            },

            updateEmailMessage() {
                if(!this.entry.clarification && !this.entry.invoice && !this.entry.contract) {
                    this.entry.message = ''
                    return
                }

                this.entry.message = 'Hi,\n'+
                            (this.entry.clarification ? 'Kindly reply back to this email by provide us an explanation related to this transaction.\n' : '') +
                            (this.entry.invoice ? 'Kindly reply back to this email by uploading a copy of the invoice related to this transaction.\n' : '') +
                            (this.entry.contract ? 'Kindly reply back to this email by uploading a copy of the contract related to this transaction.\n' : '') +
                            'If you have any questions, please let us know.\n' +
                            'Thanks';
            },

            updateAmount() {
                this.$set(this.entry, 'amount', this.entry.credit || this.entry.debit)
            },

            async submit() {
                if(this.entry.used) {
                    let res = await this.$confirm('The request of information related to this bank entry was alredy sent.<br>Do you want to proceed?')
                    if(!res) {
                        return false
                    }
                }

                bankRequestService.create(this.entry.account_id, this.entry)
                    .then(response => {
                        this.entry.id = response.data.id
                        this.entry.viewBankRequest = false
                        this.$set(this.entry, 'used', true)
                    })
            },

            confirm() {
                this.showConfirm = false
                console.log('good')
            }
        },

        watch: {
            entry: {
                handler: 'updateEmailMessage',
                deep: true
            },
            'entry.credit': 'updateAmount',
            'entry.debit': 'updateAmount',
        },
    }
</script>

<style scoped>

</style>