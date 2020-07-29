<template>
    <v-layout row wrap>
        <v-layout row wrap v-for="(item, itemIndex) in section.items" :key="'item' + itemIndex">
            <v-flex xs10>
                <v-layout row>
                    <v-flex xs12 sm6 md2 v-if="availableCorporateTypes().length">
                        <v-select
                                v-model="item.type"
                                label="Select type"
                                :items="availableCorporateTypes()"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-combobox
                                :items="suppliers()"
                                :value="item.name"
                                @input="supplierChanged(item, $event)"
                                item-text="name"
                                item-value="name"
                                label="Supplier name"
                        ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-textarea
                                v-model="item.goodName"
                                label="Good name"
                                auto-grow
                                rows="1"
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <countries v-model="item.countries" label="Supplier country" :multiple="true"></countries>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                                v-model="item.estimatedAmount"
                                :label="estimatedLabel"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md1>
                        <currencies v-model="item.currency" label="Currency"></currencies>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-select
                                v-model="item.methodOfPayment"
                                label="Method of payment"
                                :items="paymentMethods"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex md2 class="text-xs-right">
                <v-btn fab dark small color="primary" v-if="itemIndex === 0" @click="addItem()">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="danger" v-if="section.items.length > 1" @click="removeItem(itemIndex)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex'
    const uuidv4  = require('uuid/v4');

    export default {
        props: ['section', 'estimatedLabel'],

        mounted() {
            if(!this.section.items.length) {
                this.addItem(this.itemStructure)
            }
        },

        computed: {
            ...mapGetters({
                'corporateSellingDistributionTypes': 'settings/corporateSellingDistributionTypes',
                'corporateAdministrativeExpensesTypes': 'settings/corporateAdministrativeExpensesTypes',
                'corporateTypes': 'settings/corporateTypes',
                'paymentMethods': 'settings/corporate_payment_methods',
                'defaultPaymentMethod': 'settings/corporate_default_payment_method'
            }),

            itemStructure() {
                return {
                    id: uuidv4(),
                    name: null,
                    goodName: null,
                    countries: [],
                    estimatedAmount: null,
                    currency: 'EUR',
                    methodOfPayment: this.defaultPaymentMethod ? this.defaultPaymentMethod.id : null,
                }
            },
        },

        methods: {
            addItem() {
                this.itemStructure.id = uuidv4()

                this.section.items.unshift(JSON.parse(JSON.stringify(this.itemStructure)))
            },

            removeItem(index) {
                this.section.items.splice(index, 1)
            },

            supplierChanged(item, $event) {
                if (typeof $event === 'string') {
                    item.name = $event
                }
                if (typeof $event === 'object') {
                    item.name = $event.name
                    item.countries = $event.countries
                }
            },

            suppliers() {
                return this.section.items.filter(item => item.name)
            },

            availableCorporateTypes() {
                let types = []

                switch (this.sectionType) {
                    case 'selling-distribution':
                        types = this.corporateSellingDistributionTypes
                        break
                    case 'administrative-expenses':
                        types = this.corporateAdministrativeExpensesTypes
                        break
                }

                return types
            },
        },
    }
</script>

<style scoped>

</style>