<template>
    <v-dialog v-model="reconciling.showConfirmation" max-width="290">
        <v-card>
            <v-card-title class="text-xs-center">Are you sure?</v-card-title>
            <v-card-text>
                Shall we allocate the difference of
                <b>{{ formatMoney(reconciling.amount) }}</b> as a <b>{{ reconciling.typeDifference }}</b>?
                <date-picker label="Effective Date" v-model="reconciling.date" full-width hide-details clearable></date-picker>
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

        props: ['reconciling'],

        methods: {
            cancel() {
                this.reconciling.showConfirmation = false
            },
            confirm() {
                this.reconciling.showConfirmation = false
                this.$emit('confirm', true)
            },
        },
    }
</script>

<style scoped>

</style>