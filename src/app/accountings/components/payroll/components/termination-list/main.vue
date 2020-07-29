<template>
    <v-card>
        <v-card-text>
            <employee-table v-if="employees" :employees="employees">
                <options-panel/>
            </employee-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import EmployeeTable from "../employees/tables/employee-table";
    import * as service from "./service";
    import OptionsPanel from "./options-panel";

    export default {
        components: {
            OptionsPanel,
            EmployeeTable,
        },
        name: "termination-list",
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                service.getEmployees()
                    .then( response => {
                        this.employees = this.getActiveEmployees(response.data);
                    });
            },
            getActiveEmployees(employees) {
                let arr = employees.filter((employee) => {
                    return employee.terminated == 1;
                });
                return arr;
            }
        },
        data: function () {
            return {
                employees: null
            }
        }
    }
</script>

<style scoped>

</style>