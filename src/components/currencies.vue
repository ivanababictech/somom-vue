<template>
    <v-autocomplete
            :multiple="multiple"
            item-text="cc"
            item-value="cc"
            :items="currencies"
            :menu-props="value || defaultCurrency"
            v-model="selectedCurrencies"
            @input="$emit('input', selectedCurrencies)"
            :label="label"
            :disabled="disabled"
    ></v-autocomplete>
</template>

<script>
    import Currencies from '@/plugins/currencies'

    export default {
        data () {
            return {
                currencies: Currencies,
                selectedCurrencies: false,
                defaultCurrency: 'EUR'
            }
        },

        mounted() {
            this.selectedCurrencies = this.value
        },

        props: {
            value: [String, Array],
            multiple: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: 'Currencies'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        watch: {
            value() {
                this.selectedCurrencies = this.value
            }
        }
    }
</script>

<style scoped>

</style>