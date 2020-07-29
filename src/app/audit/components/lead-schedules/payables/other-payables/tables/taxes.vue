<template>
    <v-data-table
            :headers="headers"
            :items="taxes"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.month }}</td>
            <td>{{ props.item.year }}</td>
            <td>{{ props.item.receipt_no }}</td>
            <td>{{ props.item.fss_tax }}</td>
            <td>{{ props.item.ssc }}</td>
            <td>{{ props.item.maternity_fund }}</td>
            <td v-html="calculateTotal(props.item)"></td>
        </template>
        <template slot="footer">
            <td colspan="6"><strong>Total:</strong></td>
            <td v-html="calculateTotalItems"></td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            taxes: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                {text: 'Month', value: 'month'},
                {text: 'Year', value: 'year'},
                {text: 'Receipt no.', value: 'receipt_no'},
                {text: 'FSS tax', value: 'fss_tax'},
                {text: 'SSC', value: 'ssc'},
                {text: 'Maternity fund', value: 'maternity_fund'},
                {text: 'Total', value: ''},
            ]
        }),
        methods: {
            calculateTotal (item) {
                return parseInt(item.fss_tax) + parseInt(item.ssc) + parseInt(item.maternity_fund)
            }
        },
        computed: {
            calculateTotalItems () {
                let total = this.taxes.reduce((total, tax) => total += this.calculateTotal(tax), 0)
                this.$emit('tax', total)
                return total
            }
        }
    }
</script>