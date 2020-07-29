<template>
    <v-dialog v-model="dialog" fullscreen>
        <v-btn slot="activator" color="primary" dark>Client Inbox</v-btn>
        <v-card max-width="600px">
            <v-toolbar card color="accent">
                <v-icon @click="dialog = false">arrow_back</v-icon>
                <v-toolbar-title>Client Inbox</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="submit">
                    <v-icon>send</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout row wrap class="text-xs-center">
                        <v-flex md4 class="text-xs-center" v-for="reply in replies" :key="reply.id">
                            <v-layout wrap>
                                <v-flex md4>
                                    <v-text-field label="From" required v-model="reply.from"></v-text-field>
                                </v-flex>
                                <v-flex md4>
                                    <v-text-field label="Request date" required v-model="reply.date" mask="##/##/####" :return-masked-value="true"></v-text-field>
                                </v-flex>
                                <v-flex md4>
                                    <v-text-field label="Due date" required v-model="reply.due_date" mask="##/##/####" :return-masked-value="true"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Subject" v-model="reply.subject"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Bank entry reply amount" v-model="reply.amount"></v-text-field>
                                </v-flex>
                                <v-flex md6>
                                    <v-text-field label="Bank entry date" required v-model="reply.entry_date" mask="##/##/####" :return-masked-value="true"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Bank entry Description" v-model="reply.description"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Message from the bank" auto-grow rows="5" v-model="reply.message" hide-details></v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Enter your reply" auto-grow rows="5" v-model="reply.reply" hide-details></v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn color="primary" @click.prevent="$refs.invoice.click()">Upload invoice</v-btn>
                                    {{ invoice.name }}
                                    <input type="file" ref="invoice" @change="onFileChange($event)"  hidden>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as bankRequestService from './service'
    const objectToFormData = require('object-to-formdata')

    export default {
        data() {
            return {
                reply: {},
                invoice: {},
                dialog: false,
                replies: []
            }
        },

        props: ['accountId'],

        mounted() {
            this.getReplies()
        },

        methods: {
            getReplies() {
                bankRequestService.getReplies(this.accountId)
                    .then(response => {
                        this.replies = response.data
                    })
            },

            submit() {
                let reply = objectToFormData(this.reply)

                if(this.invoice) {
                    reply.append('invoice', this.invoice, this.invoice.name)
                }
                
                bankRequestService.reply(this.accountId, reply)
                    .then(response => {
                        this.dialog = false
                    })
            },

            onFileChange($event) {
                this.invoice = $event.target.files[0] || $event.dataTransfer.files[0];
            },
        },

        watch: {
            reply: {
                handler: 'updateEmailMessage',
                deep: true
            },
        }
    }
</script>

<style scoped>

</style>