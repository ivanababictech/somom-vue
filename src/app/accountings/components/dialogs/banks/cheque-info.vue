<template>
    <v-dialog v-model="cheque.showInfo" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Cheque Info - {{ cheque.data.cheque_number }}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs6>
                            <v-text-field label="Allocation type" :value="cheque.allocation_type" disabled></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field label="Account" :value="cheque.account.name" disabled></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field label="Allocation" :value="cheque.allocation" disabled></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field label="Amount" :value="formatMoney(cheque.amount) + ' ' + cheque.currency" disabled></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea label="Description" :value="cheque.description" disabled outline></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="cheque.showInfo = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['cheque']
    }
</script>

<style scoped>

</style>