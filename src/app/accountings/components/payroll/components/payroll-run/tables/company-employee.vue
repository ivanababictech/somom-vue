<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                    :headers="headers"
                    :items="employees"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="grey lighten-4">
                        <span>{{ props.item.code }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.name }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.hours }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.basicSalary }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.commissions }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.carCash }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.gross }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.perDiem }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.other }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.ssc }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.tax }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.maternity }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <span>{{ props.item.netSalary }}</span></td>
                    <td class="text-xs-left grey lighten-4">
                        <v-layout fill-height align-center justify-space-between>
                            <v-icon color="primary">edit</v-icon>
                            <v-icon
                                    v-if="props.item.status === 'active'"
                                    @click="showTerminateDialog(true)"
                                    color="danger">delete
                            </v-icon>
                            <v-btn fab class="primary ma-0" dark style="width:24px;height:24px;">L</v-btn>
                        </v-layout>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
        <terminate-employee :toShowTerminateDialog="this.toShowTerminateDialog"
                            @closeDialog="showTerminateDialog(false)"></terminate-employee>
    </v-layout>

</template>

<script>
    import TerminateEmployee from "../../employees/tables/terminate-employee";

    export default {
        components: {TerminateEmployee},
        props: ['employees'],
        methods: {
            showTerminateDialog: function (value) {
                this.toShowTerminateDialog = value;
            }
        },
        data: function () {
            return {
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
                        text: 'Hours',
                        value: 'hours',
                        sortable: false
                    },
                    {
                        text: 'Basic',
                        value: 'basicSalary',
                        sortable: false
                    },
                    {
                        text: 'Com.',
                        value: 'commissions',
                        sortable: false
                    },
                    {
                        text: 'Car cache',
                        value: 'carCash',
                        sortable: false
                    },
                    {
                        text: 'Gross',
                        value: 'gross',
                        sortable: false
                    },
                    {
                        text: 'Per diem',
                        value: 'perDiem',
                        sortable: false
                    },
                    {
                        text: 'Other',
                        value: 'other',
                        sortable: false
                    },
                    {
                        text: 'SSC',
                        value: 'ssc',
                        sortable: false
                    },
                    {
                        text: 'Tax',
                        value: 'tax',
                        sortable: false
                    },
                    {
                        text: 'Maternity',
                        value: 'maternity',
                        sortable: false
                    },
                    {
                        text: 'Net Salary',
                        value: 'netSalary',
                        sortable: false
                    },
                    {
                        text: 'Actions',
                        sortable: false
                    },
                ],
                toShowTerminateDialog: false
            }
        }
    }
</script>

<style scoped>

</style>