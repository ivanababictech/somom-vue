<template>
    <v-data-table
            :headers="headers"
            :items="invoices"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.invoice_no }}</td>
            <td>{{ props.item.date_of_invoice }}</td>
            <td>{{ props.item.details }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.year_related_to }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            invoices: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Invoice no', value: 'invoice_no' },
                { text: 'Date of invoice', value: 'date_of_invoice' },
                { text: 'Details', value: 'details' },
                { text: 'Amount', value: 'amount' },
                { text: 'Year related to', value: 'year_related_to' }
            ]
        })
    }
</script>