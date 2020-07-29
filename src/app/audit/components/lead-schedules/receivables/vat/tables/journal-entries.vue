<template>
    <v-data-table
            :headers="headers"
            :items="journals"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.journal_no }}</td>
            <td>{{ props.item.date_of_journal }}</td>
            <td>{{ props.item.customer }}</td>
            <td>{{ props.item.reason_of_journal }}</td>
            <td>{{ props.item.amount }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            journals: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Journal no.', value: 'journal_no' },
                { text: 'Date of journal', value: 'date_of_journal' },
                { text: 'Customer', value: 'customer' },
                { text: 'Reason of journal', value: 'reason_of_journal' },
                { text: 'Amount', value: 'amount' },
            ]
        })
    }
</script>