<template>
    <v-dialog
            v-model="dialog"
            width="500"
            persistent
    >
        <v-card>
            <v-card-title class="headline" primary-title>
                Vat period
            </v-card-title>

            <v-card-text>
                <v-flex xs12>
                    <date-picker
                            fullWidth
                            label="Start Date"
                            v-model="vat.start_date"
                            clearable>
                    </date-picker>
                </v-flex>
                <v-flex xs12>
                    <date-picker
                            fullWidth
                            label="Start Date"
                            v-model="vat.end_date"
                            clearable>
                    </date-picker>
                </v-flex>
                <v-flex xs12>
                    <v-select
                            :items="frequencies"
                            item-value="value"
                            item-text="text"
                            v-model="vat.frequency"
                            label="Select Frequency">
                    </v-select>
                </v-flex>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.stop="close">Cancel</v-btn>
                <v-btn
                        color="primary"
                        flat
                        @click="submit"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: true,
                frequencies: [
                    {
                        text: 'Monthly',
                        value: '1'
                    },
                    {
                        text: 'Quarterly',
                        value: '2'
                    },
                    {
                        text: 'Yearly',
                        value: '3'
                    }
                ]
            }
        },

        props: ['vat'],

        methods: {
            close() {
                this.dialog = false
                this.$parent.showVatDialog = false
            },

            submit() {
                if (this.vat.id) {
                    this.$emit('update-vat')
                } else {
                    this.$emit('create-vat')
                }
            },
        }
    }
</script>

<style>
    .v-date-picker-table .v-btn--active {
        background-color: #fb8c00 !important;
    }

    .v-date-picker-table .v-btn--outline {
        border: 1px solid #fb8c00 !important;
        color: #fb8c00 !important;
    }
    .v-menu__content{
        min-width: 0 !important;
    }
</style>