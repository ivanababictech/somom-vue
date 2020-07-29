<template>
    <v-data-table
            :headers="headers"
            :items="companies"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.subsidiary_name }}</td>
            <td>{{ props.item.registered_address }}</td>
            <td>{{ props.item.country }}</td>
            <td>{{ props.item.class_of_shares_held }}</td>
            <td>{{ props.item.percentage_of_shares_held + '%' }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            companies: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Subsidiary name', value: 'subsidiary_name' },
                { text: 'Registered address', value: 'registered_address' },
                { text: 'Country', value: 'country' },
                { text: 'Class of shares held', value: 'class_of_shares_held' },
                { text: '% of shares held', value: 'percentage_of_shares_held' }
            ]
        })
    }
</script>