<template>
    <v-data-table
            :headers="headers"
            :items="balances"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.year_of_purchase }}</td>
            <td>{{ props.item.cost_bf }}</td>
            <td>{{ props.item.wdv_bf }}</td>
            <td>{{ props.item.additions }}</td>
            <td>{{ props.item.disposals }}</td>
            <td>{{ cost(props.item) }}</td>
            <td>{{ props.item.depn_bf }}</td>
            <td>{{ props.item.depn_for_the_year }}</td>
            <td>{{ dep(props.item) }}</td>
            <td>{{ cost(props.item) - dep(props.item) }}</td>
        </template>

        <template slot="footer">
            <td></td>
            <td>{{ total('cost_bf') }}</td>
            <td>{{ total('wdv_bf') }}</td>
            <td>{{ total('additions') }}</td>
            <td>{{ total('disposals') }}</td>
            <td></td>
            <td>{{ total('depn_bf') }}</td>
            <td>{{ total('depn_for_the_year') }}</td>
            <td></td>
            <td></td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            balances: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            headers: [
                { text: 'Year of purchase', value: 'year_of_purchase' },
                { text: 'Cost B/F', value: 'cost_bf' },
                { text: 'WDV B/F', value: 'wdv_bf' },
                { text: 'Additions', value: 'additions' },
                { text: 'Disposals', value: 'disposals' },
                { text: 'Cost C/F', value: '' },
                { text: 'Dep’n B/F', value: 'depn_bf' },
                { text: 'Dep’n for the year', value: 'depn_for_the_year' },
                { text: 'Dep’n C/F', value: '' },
                { text: 'WDV C/F', value: '' }
            ]
        }),
        methods: {
            cost (item) {
                return item.wdv_bf + item.additions - item.disposals
            },
            dep (item) {
                return item.depn_bf + item.depn_for_the_year
            },
            total(column) {
                return this.balances.reduce((total, balance) => total += balance[column], 0)
            }
        }
    }
</script>