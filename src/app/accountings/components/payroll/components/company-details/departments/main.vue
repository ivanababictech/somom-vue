<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <h2>Departments</h2>
        </v-layout>
        <hr/>
        <v-layout row wrap>
            <v-flex md6 xs12>
                <departments-table
                    v-if="departments"
                    :departments="departments"
                    @edit = "editDepartment"
                    @addNewDepartment = 'createDepartment'
                />
            </v-flex>
        </v-layout>
        <add-new-department :showDepartmentForm="showDepartmentForm"
                            :editDepartment="department"
                            @closeDialog="closeAddForm"
                            @saveDepartment="saveDepartment"/>
    </v-container>
</template>

<script>
    // import * as service from "./service";
    import AddNewDepartment from "./tables/add-new-department";
    import DepartmentsTable from "./tables/departments-table";
    import {mapGetters} from "vuex";
    import {mapActions} from 'vuex';

    export default {
        components: {
            DepartmentsTable,
            AddNewDepartment
        },
        name: "departments",
        created() {
            this.fetchData();
        },
        computed: {
            ...mapGetters({
               departments : 'getDepartments'
           }),
        },
        methods: {
            ...mapActions({
                getDepartments: 'loadDepartments',
                addDepartment : 'createDepartment',
                updateDepartment: 'editDepartment'
            }),
            fetchData() {
                this.getDepartments();
            },
            showAddForm() {
                this.showDepartmentForm = true;
            },
            closeAddForm() {
                this.showDepartmentForm = false;
            },
            saveDepartment(department) {
                this.closeAddForm();
                if (department.id == null){
                    this.addDepartment(department);
                } else {
                    this.updateDepartment(department)
                }
            },
            createDepartment() {
                this.department = null;
                this.showAddForm();
            },
            editDepartment(department) {
                this.department = department;
                this.showAddForm();
            }
        },
        data: function () {
            return {
                department: null,
                showDepartmentForm: false,
            }
        }
    }
</script>

<style scoped>

</style>