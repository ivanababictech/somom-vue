<template>
    <v-dialog
            v-model="showEmailDialog"
            width="794"
    >
        <v-card>
            <v-card-text>
                <v-layout row>
                    <v-text-field label="To" v-model="email.to"></v-text-field>
                </v-layout>
                <v-layout row>
                    <v-text-field label="Subject" v-model="email.subject"></v-text-field>
                </v-layout>
                <v-layout row>
                    Message
                    <v-textarea auto-grow rows="5" v-model="email.message" hide-details></v-textarea>
                </v-layout>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$emit('closeDialog')">Cancel</v-btn>
                <v-btn flat color="primary" @click="sendEmail">Send</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as invoiceService from './service'

    export default {
        props: [
            'showEmailDialog',
            'email',
            'company',
            'invoice',
            'totalBaseVat',
            'selectedBank'
        ],

        methods: {
            sendEmail() {
                const data = {
                    invoice: this.invoice,
                    company: this.company,
                    totalBaseVat: this.totalBaseVat,
                    selectedBank: this.selectedBank,
                    email: this.email
                };
                invoiceService.sendInvoiceEmail(data)
                    .then(data => {
                        this.$emit('closeDialog');
                    })
            },
        },
    }
</script>