<template>
    <v-data-table
            :headers="headers"
            :items="investments"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.subsidiary_name }}</td>
            <td>{{ props.item.investment_at_cost }}</td>
            <td>{{ props.item.sub_nav }}</td>
            <td>{{ props.item.sub_nav - props.item.investment_at_cost }}</td>
            <td>{{ props.item.impairment_charged_required }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            investments: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Subsidiary name', value: 'subsidiary_name' },
                { text: 'Investment at cost/FV', value: 'investment_at_cost' },
                { text: 'Sub. NAV', value: 'sub_nav' },
                { text: 'Difference', value: '' },
                { text: 'Impairment charged required', value: 'impairment_charged_required' }
            ]
        })
    }
</script>