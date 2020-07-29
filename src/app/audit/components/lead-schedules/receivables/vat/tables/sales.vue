<template>
    <v-data-table
            :headers="headers"
            :items="sales"
            hide-actions
            disable-initial-sort
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.period_one }}</td>
            <td>{{ props.item.period_two }}</td>
            <td>{{ props.item.period_three }}</td>
            <td>{{ props.item.period_four }}</td>
            <td>{{ props.item.period_five }}</td>
            <td v-html="calculatePeriods(props.item)"></td>
            <td v-html="calculateVat(props.item)"></td>
        </template>
        <template slot="footer">
            <td>Total:</td>
            <td>{{ total.period_one }}</td>
            <td>{{ total.period_two }}</td>
            <td>{{ total.period_three }}</td>
            <td>{{ total.period_four }}</td>
            <td>{{ total.period_five }}</td>
            <td>{{ total.period }}</td>
            <td>{{ total.vat }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            sales: {
                type: Array,
                required: true
            },
            headers: {
                type: Array,
                required: true
            },
            total: {
                type: Object,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        mounted () {
            Object.keys(this.total)
                .forEach(key => {
                    if (!['vat', 'period'].find(column => column === key)) {
                        this.$emit('total', {name: this.name, column: key, total: this.calculateTotalColumn(key)})
                    }
                })

            this.$emit('total', {name: this.name, column: 'period', total: this.calculateTotalPeriods()})
            this.$emit('total', {name: this.name, column: 'vat', total: this.calculateTotalVat()})
        },
        methods: {
            calculatePeriods (item) {
                return item.period_one + item.period_two + item.period_three + item.period_four + item.period_five;
            },
            calculateVat (item) {
                let total = this.calculatePeriods(item);
                let vat = total * item.vat / 100
                return item.vat ? total + vat : total
            },
            calculateTotalColumn (column) {
                return this.sales.reduce((total, sale) => total += sale[column], 0)
            },
            calculateTotalPeriods () {
                return this.sales.reduce((total, sale) => total += this.calculatePeriods(sale), 0)
            },
            calculateTotalVat () {
                return this.sales.reduce((total, sale) => total += this.calculateVat(sale), 0)
            }
        }
    }
</script>