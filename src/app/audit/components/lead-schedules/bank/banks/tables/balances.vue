<template>
    <v-data-table
            :headers="headers"
            :items="balances"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.bank_name }}</td>
            <td>{{ props.item.bank_statement_balance }}</td>
            <td>{{ props.item.currency }}</td>
            <td>{{ props.item.rate }}</td>
            <td>{{ props.item.converted_amount }}</td>
            <td>{{ props.item.unpresented_cheques }}</td>
            <td>{{ props.item.income_not_deposited }}</td>
            <td>{{ props.item.converted_amount - props.item.unpresented_cheques + props.item.income_not_deposited }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            balances: {
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
                { text: 'Unpresented cheques', value: 'unpresented_cheques' },
                { text: 'Income not deposited', value: 'income_not_deposited' },
                { text: 'Closing figure', value: '' },
            ]
        })
    }
</script>