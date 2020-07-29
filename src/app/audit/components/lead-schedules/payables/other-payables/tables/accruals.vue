<template>
    <v-data-table
            :headers="headers"
            :items="accruals"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.account_name }}</td>
            <td>{{ props.item.date_of_invoice }}</td>
            <td>{{ props.item.details }}</td>
            <td>{{ props.item.amount }}</td>
        </template>
        <template slot="footer">
            <td colspan="3"><strong>Total:</strong></td>
            <td v-html="calculateTotalItems"></td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            accruals: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Account name', value: 'account_name' },
                { text: 'Date of invoice', value: 'date_of_invoice' },
                { text: 'Details', value: 'details' },
                { text: 'Amount', value: 'amount' }
            ]
        }),
        computed: {
            calculateTotalItems () {
                let total = this.accruals.reduce((total, accrual) => total += parseInt(accrual.amount), 0)
                this.$emit('accrual', total)
                return total
            }
        }
    }
</script>