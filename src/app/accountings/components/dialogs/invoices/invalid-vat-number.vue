<template>
    <v-dialog v-model="invoice.showNotification" max-width="290">
        <v-card>
            <v-card-title class="text-xs-center">EU VAT number is invalid!</v-card-title>
            <v-card-text>
                Do you want to continue with the invoice and pay 18%?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="warning" flat="flat" @click.native="cancel">No</v-btn>
                <v-btn color="primary" flat="flat" @click.native="confirm">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: true
            }
        },

        props: ['invoice'],

        methods: {
            cancel() {
                this.invoice.showNotification = false
            },
            confirm() {
                this.invoice.showNotification = false
                this.$emit('confirm')
            },
        },
    }
</script>

<style scoped>

</style>