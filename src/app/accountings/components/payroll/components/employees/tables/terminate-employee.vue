<template>
    <v-dialog v-model="toShowTerminateDialog" max-width="500px">
        <v-card>
            <v-card-title>
                <h2 v-if="employeeTerminate">Terminate {{employeeTerminate.name}}</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                            type="date"
                            v-model="terminationDate"
                            label="Termination date"
                            :rules="terminationDateRules"
                            required
                    ></v-text-field>
                    <v-text-field
                            type="date"
                            v-model="noticePeriodDate"
                            label="Notice period date"
                            :rules="terminationDateRules"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="reasonsForTermination"
                            label="Reason for termination"
                            :rules="reasonsForTerminationRules"
                            required
                    ></v-text-field>
                    <v-btn color="info" @click="submitTermination">
                        Submit termination
                    </v-btn>
                    <v-btn @click="clear">Clear</v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click="close">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as service from "../service";

    export default {
        props: ['toShowTerminateDialog', 'employeeTerminate'],
        name: "terminate-employee",
        data () {
            return {
                employee :{},
                terminateDialog: false,
                terminationDate: null,
                noticePeriodDate: null,
                reasonsForTermination: null,
                terminationDateRules: [
                    v => !!v || 'Termination date is required'
                ],
                noticePeriodDateRules: [
                    v => !!v || 'Notice period date is required',
                ],
                reasonsForTerminationRules: [
                    v => !!v || 'Reason for termination is required',
                    v => (v && v.length <= 10) || 'Reason for termination must be less than 10 characters'
                ],
            }
        },
        methods: {
            submitTermination: function () {
                if (this.$refs.form.validate()) {
                    let terminationData = {
                        details: {
                            termination_date: this.terminationDate,
                            notice_period_date: this.noticePeriodDate,
                            reason_termination: this.reasonsForTermination
                        },
                        employee: this.employeeTerminate
                        // employee: {
                        //     name: this.employeeTerminate.name,
                        //     code: this.employeeTerminate.code
                        // }
                    };

                    service.terminateEmployee(terminationData)
                        .then( response => {
                            this.$emit('closeDialog', terminationData.employee);
                            this.clear();
                        });
                }
            },
            close() {
                this.$refs.form.reset();
                this.$emit('closeDialog');
            },
            clear() {
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

</style>