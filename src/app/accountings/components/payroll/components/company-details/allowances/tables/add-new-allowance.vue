<template>
    <v-dialog v-model="showDialog" persistent max-width="500px" lazy-valisation>
        <v-card>
            <v-card-title>
                <span class="headline">{{title}} allowance</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                            label="Allowance title"
                            v-model="allowance.name"
                            :rules="nameRules"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Default value"
                            type="number"
                            v-model="allowance.value"
                            :rules="defaultValueRules"
                            required
                    ></v-text-field>
                    <v-select
                            :items="frequencies"
                            label="Frequency"
                            v-model="allowance.frequency"
                            :rules="frequencyRules"
                            required
                    ></v-select>
                </v-form>
            </v-card-text>
            <v-card-actions class="grey lighten-4">
                <v-spacer></v-spacer>
                <v-btn
                        dark
                        color="primary"
                        @click="save">
                    Add
                </v-btn>
                <v-btn flat @click="closeDialog">Cancel</v-btn>
                <v-btn flat @click="clear">clear</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['editAllowance', 'showDialog'],
        computed: {
            title () {
                return this.editAllowance ? 'Edit' : 'Add new'
            }
        },
        watch: {
            showDialog () {
                if (this.showDialog === true) {
                    this.clear();
                    Object.assign(this.allowance, this.editAllowance);
                }
            }
        },
        data: () => ({
                frequencies: [
                    'Yearly',
                    'Quarterly',
                    'Monthly',
                    'Weekly',
                    'Daily'
                ],
                nameRules: [
                    v => !!v || 'Name is required',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],
                defaultValueRules: [
                    v => !!v || 'Default value is required',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],
                frequencyRules: [
                    v => !!v || 'Frequency is required',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],
                allowance: {
                    name: null,
                    value: null,
                    frequency: null
                }
            }
        ),
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    this.$emit('saveAllowance', this.allowance);
                }
            },
            closeDialog() {
                this.$emit('closeDialog');
                this.clear();
            },
            clear () {
                Object.assign(this.allowance, {name: null, value: null, frequency: null});
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

</style>