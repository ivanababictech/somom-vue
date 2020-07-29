<template>
    <employee-form v-if="loadEmployee"
                   button-text="Save changes"
                   :employee="employee"
                   @submitted = "saveEmployee"
    ></employee-form>
</template>

<script>
    import * as service from "../service";
    import EmployeeForm from "../../layouts/employee-form";
    export default {
        components: {EmployeeForm},
        created() {
            const employeeId = this.$route.params.id;
            this.fetchData(employeeId);
        },
        methods: {
            fetchData(employeeId) {
                service.getEmployee(employeeId)
                    .then( response => {
                        this.employee = response.data;
                        this.loadEmployee = true;
                    });
            },
            saveEmployee(employee) {
                service.editEmployee(employee)
                    .then( response => {
                    });
            }
        },
        data:  () => ({
                loadEmployee: false,
                employee:{
                    name: null,
                    code: null,
                    department_id: null,
                    income_tax_category_id: null,
                    social_security_contrib_cat_id: null,
                    type_of_contract_id: null,
                    employment_status_id: null,
                    id_card_passport_no: null,
                    date_of_birth: null,
                    door_name: null,
                    street_name: null,
                    locality: null,
                    national_insurance_no: null,
                    income_tax_reg_no: null,
                    date_of_marriage: null,
                    date_of_arrive: null,
                    employment_start_date: null,
                    duration_of_contract: null,
                    probation_period: null,
                    job_title: null,
                    hourly_gross_basic_salary: null,
                    is_income_earned: null,
                    gross_salary_earned: null,
                    income_tax_paid: null,
                    social_security_paid: null,
                    terminated: null,

                    employee_pre_taxes: [{
                        pre_tax_allowance_id: '',
                        value: ''
                    }],

                    employee_post_taxes: [{
                        post_tax_allowance_id: '',
                        value: ''
                    }],
                }
            }
        )
    }
</script>

<style scoped>

</style>