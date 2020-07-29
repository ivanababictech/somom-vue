<template>
    <v-data-table
            :headers="headers"
            :items="debtors"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.creditor_name }}</td>
            <td>{{ props.item.balance_at_year_end }}</td>
            <td>{{ props.item.after_year_end_payables }}</td>
            <td>{{ props.item.balance_at_year_end - props.item.after_year_end_payables }}</td>
            <td>{{ props.item.balance_as_per_debtors_circularisation }}</td>
        </template>

        <template slot="footer">
            <td><strong>Total</strong></td>
            <td v-html="totalBalance"></td>
            <td v-html="totalPayables"></td>
            <td v-html="totalBalance - totalPayables"></td>
            <td></td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            debtors: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Creditor name', value: 'creditor_name' },
                { text: 'Balance at year end', value: 'balance_at_year_end' },
                { text: 'After year end payables', value: 'after_year_end_payables' },
                { text: 'Difference', value: '' },
                { text: 'Balance as per Debtors circularisation ', value: 'balance_as_per_debtors_circularisation' }
            ]
        }),
        computed: {
            totalBalance () {
                return this.debtors.reduce((total, debtor) => total += debtor.balance_at_year_end ,0)
            },
            totalPayables () {
                return this.debtors.reduce((total, debtor) => total += debtor.after_year_end_payables ,0)
            },
        }
    }
</script>