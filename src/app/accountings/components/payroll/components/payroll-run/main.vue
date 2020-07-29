<template>
    <v-card>
        <v-card-text>
            <interval-panel></interval-panel>
            <hr/>
            <company-employee-table
                    v-if="employees"
                    :employees="employees"
                    class="mt-3">
            </company-employee-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import IntervalPanel from "./panels/interval";
    import CompanyEmployeeTable from "./tables/company-employee";
    import * as service from "./service";

    export default {
        components: {
            CompanyEmployeeTable,
            IntervalPanel,
        },
        name: "payroll-run",
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.employees = service.getActiveEmployees();
                console.log(service.getCompanyEmployeeList());
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