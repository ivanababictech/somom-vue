<template>
    <v-autocomplete
            :multiple="multiple"
            item-text="name"
            item-value="code"
            :items="countries"
            :menu-props="value"
            v-model="selectedCountries"
            @input="$emit('input', selectedCountries)"
            :label="label"
            append-icon="map"
            :hide-details="hideDetails"
            :disabled="disabled"
    ></v-autocomplete>
</template>

<script>
    var countries = require('country-list')();

    export default {
        data () {
            return {
                countries: countries.getData(),
                selectedCountries: false
            }
        },

        mounted() {
            this.selectedCountries = this.value
        },

        props: {
            value: [String, Array, Boolean],
            multiple: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: 'Country'
            },
            hideDetails: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },

        watch: {
            value() {
                this.selectedCountries = this.value
            }
        }
    }
</script>

<style scoped>

</style>