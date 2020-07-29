<template>
    <v-data-table
            :headers="headers"
            :items="overdrafts"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.bank_name }}</td>
            <td>{{ props.item.bank_statement_balance }}</td>
            <td>{{ props.item.currency }}</td>
            <td>{{ props.item.rate }}</td>
            <td>{{ props.item.converted_amount }}</td>
            <td>{{ props.item.interest_rate }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            overdrafts: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Bank name', value: 'bank_name' },
                { text: 'Bank statement balance', value: 'bank_statement_balance' },
                { text: 'Currency', value: 'currency' },
                { text: 'Rate', value: 'rate' },
                { text: 'Converted amount', value: 'converted_amount' },
                { text: 'Interest rate', value: 'interest_rate' },
            ]
        })
    }
</script>