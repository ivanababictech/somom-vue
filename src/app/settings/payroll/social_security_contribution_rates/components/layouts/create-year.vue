<template>
    <v-layout row wrap>
        <v-flex xs12 md2 pt-3>
            <h3 class="text-xs-center">Create new year</h3>
        </v-flex>
        <v-flex xs12 md4>
            <v-form ref="form">
                <v-layout row wrap>
                    <v-flex xs12 sm4 mr-1>
                        <v-text-field
                                label="input year"
                                v-model="year"
                                :rules="yearRules"
                        />
                    </v-flex>
                    <v-flex xs12 sm3>
                        <v-btn
                                color="primary"
                                @click="save"
                        >
                            Save
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "create-year",
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    this.$emit('saveYearRates', this.year);
                }
            }
        },
        data: function () {
            return {
                year: null,
                yearRules: [
                    v => !!v || 'Year is required',
                ]
            }
        }
    }
</script>

<style scoped>

</style>