<template>
    <v-data-table
            :headers="headers"
            :items="estimations"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.investment_name }}</td>
            <td>{{ props.item.no_of_units }}</td>
            <td>{{ props.item.price_at_year_end }}</td>
            <td>{{ props.item.no_of_units * props.item.price_at_year_end }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            estimations: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Investment name', value: 'investment_name' },
                { text: 'No of units', value: 'no_of_units' },
                { text: 'Price as at year end', value: 'price_at_year_end' },
                { text: 'Fair Value', value: '' },
            ]
        })
    }
</script>