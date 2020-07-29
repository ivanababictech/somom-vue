<template>
    <v-data-table
            :headers="headers"
            :items="properties"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.property_held }}</td>
            <td>{{ props.item.opening_carrying_amount }}</td>
            <td>{{ props.item.additions }}</td>
            <td>{{ props.item.disposal }}</td>
            <td>{{ totalRow(props.item) }}</td>
        </template>

        <template slot="footer">
            <td><strong>Total</strong></td>
            <td>{{ totalSum('opening_carrying_amount') }}</td>
            <td>{{ totalSum('additions') }}</td>
            <td>{{ totalSum('disposal') }}</td>
            <td>{{ total }}</td>
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
                {text: 'Property held for re-sale name', value: 'property_held'},
                {text: 'Opening carrying amount', value: 'opening_carrying_amount'},
                {text: 'Additions', value: 'additions'},
                {text: 'Disposal', value: 'disposal'},
                {text: 'Closing carrying amount', value: 'closing_carrying_amount'},
            ]
        }),
        methods: {
            totalRow (item){
                let carryingAmount = parseInt(item.opening_carrying_amount) || 0
                let additions = parseInt(item.additions) || 0
                let disposal = parseInt(item.disposal) || 0
                return carryingAmount + additions + disposal
            },
            totalSum (column) {
                return this.properties.reduce((total, property) => total += parseInt(property[column]) || 0, 0)
            }
        },
        computed: {
            total () {
                return this.properties.reduce((total, property) => total += this.totalRow(property), 0)
            }
        }
    }
</script>