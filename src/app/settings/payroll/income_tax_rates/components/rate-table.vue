<template>
    <v-data-table
            :headers="headers"
            :items="rates"
            class="rate-table"
            hide-actions
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.from }}</td>
            <td class="text-xs-right">
                <span v-if="String(props.item.to) === 'null'">
                    and over
                </span>
                {{ props.item.to }}
            </td>
            <td class="text-xs-right">{{ props.item.rate }} %</td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "rate-table",
        props: ['rates'],
        data: function () {
            return {
                headers: [
                    {
                        text: 'From',
                        align: 'left',
                        sortable: false,
                        value: 'from'
                    },
                    {
                        text: 'To',
                        align: 'left',
                        sortable: false,
                        value: 'to'
                    },
                    {
                        text: 'Rate',
                        align: 'left',
                        sortable: false,
                        value: 'rate'
                    }
                ]
            }
        }

    }
</script>

<style>
    .rate-table table.table tbody td{
        height: 10px;
    }
    .rate-table table.table thead tr{
        height: 25px;
    }
    .rate-table table.table thead th{
        height: 25px;
    }
    .theme--light .rate-table .table tbody tr:not(:last-child){
        border-bottom: 0;
    }
</style>