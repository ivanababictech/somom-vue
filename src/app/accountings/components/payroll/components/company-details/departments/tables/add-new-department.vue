<template>
    <v-dialog v-model="showDepartmentForm" persistent max-width="500px" lazy-valisation>
        <v-card>
            <v-card-title>
                Add new department
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                            label="Department title"
                            v-model="department.name"
                            :rules="nameRules"
                            required
                    />
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
        name: "add-new-department",
        props: ['editDepartment', 'showDepartmentForm'],
        watch: {
            showDepartmentForm: function () {
                if(this.showDepartmentForm === true) {
                    this.clear();
                    Object.assign(this.department, this.editDepartment);
                }
            }
        },
        data: function () {
            return {
                nameRules: [
                    v => !!v || 'Name is required',
                    // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
                ],
                department: {
                    name: null
                }
            }
        },
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    this.$emit('saveDepartment', this.department);
                }
            },
            closeDialog() {
                this.clear();
                this.$emit('closeDialog');
            },
            clear() {
                Object.assign(this.department, { id: null, name: null});
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

</style>