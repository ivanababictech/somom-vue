<template>
    <v-card class="pt-0">
        <v-card-text>
            <employee-table
                    v-if="employees"
                    :employees="employees"
            >
                <options-panel/>
            </employee-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import EmployeeTable from "./tables/employee-table";
    import * as service from "./service";
    import OptionsPanel from "./tables/options-panel";

    export default {
        components: {
            OptionsPanel,
            EmployeeTable,
        },
        data: () => ({
                employees: null
            }
        ),
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
                return employees.filter(employee => {
                    return employee.terminated === 0;
                });
            }
        }
    }
</script>