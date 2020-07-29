<template>
    <v-data-table
            :headers="headers"
            :items="properties"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.investment_property_name }}</td>
            <td>{{ props.item.property_address }}</td>
            <td>{{ props.item.country }}</td>
            <td>{{ props.item.no_of_units }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            properties: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Investment property name', value: 'investment_property_name' },
                { text: 'Property address', value: 'property_address' },
                { text: 'Country', value: 'country' },
                { text: 'No. of units', value: 'no_of_units' },
            ]
        })
    }
</script>