<template>
    <v-card>
        <v-card-title class="grey lighten-4 elevation-1 pb-0">
            <v-layout row wrap>
                <v-flex sm6 xs12>
                    <v-text-field
                            prepend-icon="search"
                            v-model="search"
                            label="Search for employee"
                            flat>
                    </v-text-field>
                </v-flex>
                <v-flex sm6 xs12 class="text-xs-right">
                    <slot/>
                </v-flex>
            </v-layout>
        </v-card-title>
        <v-divider class="grey lighten-2"/>
        <v-data-table
                :headers="headers"
                :items="employees"
                :search="search"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="grey lighten-4">
                    <span class="info--text">{{ props.item.code }}</span></td>
                <td class="text-xs-left grey lighten-4">
                    <span class="info--text">{{ props.item.name }}</span></td>
                <td class="text-xs-left grey lighten-4">
                    <span class="info--text">{{ props.item.department.name }}</span></td>
                <td class="text-xs-left grey lighten-4">
                    <span class="info--text">{{ props.item.gross_salary_earned }}</span></td>
                <td class="text-xs-left grey lighten-4">
                    <span class="info--text">{{ props.item.employment_start_date }}</span></td>
                <td class="text-xs-left grey lighten-4">
                    <span class="info--text">{{ props.item.income_tax_paid }}</span></td>
                <td class="text-xs-left grey lighten-4">
                    <v-btn v-if="!props.item.terminated"
                           color="error" @click="showTerminateDialog(props.item)" small>Terminate
                    </v-btn>
                    <v-btn v-if="props.item.terminated"
                           color="success" small @click="activateEmployee(props.item)">Activate
                    </v-btn>
                    <v-btn color="info" small @click="linkTo(`editemployee/${props.item.id}`)">Edit</v-btn>
                </td>
            </template>
        </v-data-table>
        <terminate-employee
                :toShowTerminateDialog="this.toShowTerminateDialog"
                :employeeTerminate = "employeeTerminate"
                @closeDialog="closeTerminateDialog">
        </terminate-employee>
    </v-card>
</template>

<script>
    import TerminateEmployee from "./terminate-employee";
    import * as service from "../service";

    import OptionsPanel from "./options-panel";

    export default {
        components: {
            OptionsPanel,
            TerminateEmployee
        },
        name: "employee-table",
        props: ['employees'],
        methods: {
          showTerminateDialog: function(employee) {
            this.employeeTerminate = employee;
            this.toShowTerminateDialog = true;
          },
          closeTerminateDialog(employee) {
              this.employees.splice(this.employees.indexOf(employee), 1);
            this.toShowTerminateDialog = false;
          },
          linkTo(route) {
              this.$router.push(route);
          },
            activateEmployee(employee) {
                service.activateEmployee(employee)
                    .then( response => {
                        this.employees.splice(this.employees.indexOf(employee), 1);
                    });
            }
        },
        data () {
            return {
                search: '',
                headers: [
                    {
                        text: 'Code',
                        align: 'left',
                        sortable: false,
                        value: 'code'
                    },
                    {
                        text: 'Name',
                        value: 'name',
                        sortable: false,

                    },
                    {
                        text: 'Department',
                        value: 'department',
                        sortable: false
                    },
                    {
                        text: 'Basic salary',
                        value: 'basicSalary',
                        sortable: false
                    },
                    {
                        text: 'Start date',
                        value: 'startDate',
                        sortable: false
                    },
                    {
                        text: 'Tax rate',
                        value: 'taxRate',
                        sortable: false
                    },
                    {
                        text: '',
                        value: 'options',
                        sortable: false
                    },
                ],
                toShowTerminateDialog: false,
                employeeTerminate: null
            }
        }
    }
</script>

<style scoped>

</style>