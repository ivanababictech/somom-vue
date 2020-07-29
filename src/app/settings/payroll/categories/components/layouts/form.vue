<template>
    <v-dialog v-model="showForm" persistent max-width="500px" lazy-validation>
        <v-card>
            <v-card-title>
                Add new {{ category.name }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <template v-for="field in item" v-if="field.display">
                        <date-picker
                                :label="category.name + ' ' + field.name"
                                v-model="field.value"
                                v-if="field.type === 'date'"
                                full-width
                                hide-details
                                clearable>
                        </date-picker>
                        <v-text-field
                                v-else
                                :label="category.name + ' ' + field.name"
                                v-model="field.value"
                                :rules="field.rules"
                                :type="field.type || 'text'"
                                required>
                        </v-text-field>
                    </template>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save">Save</v-btn>
                <v-btn color="primary" flat @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "form-income-tax-category",
        props: {
            category: {
                type: Object,
                required: true
            },
            item: {
                type: Array,
                required: true
            },
            showForm: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    let id = this.item.find(field => field.name === 'id')
                    id && id.value ?
                        this.$emit('updateCategory', this.item, this.category) :
                        this.$emit('saveCategory', this.item, this.category)
                }
            },
            closeDialog() {
                this.$emit('closeDialog');
            }
        }
    }
</script>

<style scoped>

</style>