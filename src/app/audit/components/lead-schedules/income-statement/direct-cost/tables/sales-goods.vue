<template>
    <v-data-table
            :headers="headers"
            :items="goods"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.item_code }}</td>
            <td>{{ props.item.product_name }}</td>
            <td>{{ props.item.cost_price }}</td>
            <td>{{ props.item.selling_price }}</td>
            <td>{{ props.item.profit_margin }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            goods: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Item code', value: 'item_code' },
                { text: 'Product name', value: 'product_name' },
                { text: 'Cost price', value: 'cost_price' },
                { text: 'Selling price', value: 'selling_price' },
                { text: 'Profit margin', value: 'profit_margin' },
            ]
        })
    }
</script>