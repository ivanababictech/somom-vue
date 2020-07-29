<template>
    <v-dialog v-model="showIncomeTaxForm" persistent max-width="500px" lazy-valisation>
        <v-card>
            <v-card-title>
                {{ category.name }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-layout row wrap>
                        <v-flex xs10>
                            <v-layout row wrap v-for="incomeTaxRate in incomeTaxRates" :key="incomeTaxRate.id">
                                <v-flex xs12 sm3 mr-3>
                                    <v-text-field
                                            label="From"
                                            v-model="incomeTaxRate.from"
                                    />
                                </v-flex>
                                <v-flex xs12 sm3 mr-3>
                                    <v-text-field
                                            label="To"
                                            v-model="incomeTaxRate.to"
                                    />
                                </v-flex>
                                <v-flex xs12 sm3 mr-3>
                                    <v-text-field
                                            label="Rate value"
                                            v-model="incomeTaxRate.rate"
                                            :rules="rateRules"
                                            required
                                    />
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs2 class="align-and justify-center">
                            <v-btn
                                    dark
                                    color="teal"
                                    small
                                    fab
                                    @click="addTaxRate"
                            >
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-btn
                            color="primary"
                            @click="save"
                    >
                        Save
                    </v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "form-income-tax-rate",
        props: ['category', 'showIncomeTaxForm'],
        watch : {
            showIncomeTaxForm: function () {
                if (this.showIncomeTaxForm === true){
                    this.incomeTaxRates = [ {from: null, to: null, rate: null} ];
                    this.incomeTaxRates = this.category.income_tax_rates.length > 0 ? this.category.income_tax_rates : this.incomeTaxRates;
                }
            }
        },
        methods: {
            addTaxRate () {
                this.incomeTaxRates.push({
                    from: '',
                    to: '',
                    rate: ''
                })
            },
            save() {
                if (this.$refs.form.validate()) {
                    this.category.income_tax_rates = this.incomeTaxRates;
                    this.$emit('saveRate', this.category);
                }
            },
            closeDialog() {
                this.$emit('closeDialog');
            }
        },
        data: function () {
            return {
                rateRules: [
                    v => (String(v) !== 'null') || 'Rate is required',
                ],
                incomeTaxRates: []

            }
        }
    }
</script>

<style scoped>

</style>