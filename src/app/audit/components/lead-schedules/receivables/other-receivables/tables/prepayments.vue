<template>
    <v-data-table
            :headers="headers"
            :items="prepayments"
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
            prepayments: {
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
                let total = this.prepayments.reduce((total, prepayment) => total += parseInt(prepayment.amount), 0)
                this.$emit('prepayment', total)
                return total
            }
        }
    }
</script>