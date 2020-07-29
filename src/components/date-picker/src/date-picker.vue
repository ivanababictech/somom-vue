<template>
    <v-menu
            ref="menu"
            :lazy="lazy"
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            :full-width="fullWidth"
            :nudge-right="icon ? 40 : 0"
            :return-value.sync="date">

        <v-text-field
                slot="activator"
                :label="label"
                :placeholder="placeholder"
                v-model="formatted"
                @input="formattedDateInput"
                @change="formattedDateChange"
                :prepend-icon="icon"
                :required="required"
                :readonly="readonly"
                :disabled="disabled"
                :hide-details="hideDetails"
                :clearable="clearable"
        ></v-text-field>

        <v-date-picker v-model="date" no-title scrollable :readonly="readonly" :disabled="disabled">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="saveDate">OK</v-btn>
        </v-date-picker>

    </v-menu>
</template>

<script>
    export default {
        name: 'DatePicker',

        componentName: 'DatePicker',

        props: {
            value: String,
            label: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: null
            },
            icon: {
                type: String,
                default: null
            },
            lazy: {
                type: Boolean,
                default: true
            },
            fullWidth: {
                type: Boolean,
                default: false
            },
            required: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            hideDetails: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },

        data: () => ({
            menu: false,
            date: null,
            formatted: null,
        }),

        mounted() {
            if (this.value) {
                this.init()
            }
        },

        watch: {
            value(value) {
                // fix for parent component value change
                if (value != this.date) {
                    this.init()
                }
            },
            date(date) {
                this.formatted = this.$helpers.formatDate(date)
            }
        },

        methods: {
            init() {
                this.date = this.value
                this.formatted = this.$helpers.formatDate(this.value)
            },
            formattedDateInput(formatted) {
                if (!formatted) {
                    this.date = null
                    this.$refs.menu.save(this.date)
                    this.update()
                }
            },
            formattedDateChange(formatted) {
                const date = this.$helpers.parseDate(formatted)
                if (Date.parse(date)) {
                    this.date = date
                    this.update()
                } else {
                    this.formatted = this.$helpers.formatDate(this.date)
                }
            },

            saveDate() {
                this.$refs.menu.save(this.date)
                this.update()
            },

            update() {
                this.$emit('input', this.date)
            }
        }


    }
</script>