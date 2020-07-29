<template>
    <v-data-table
            :headers="headers"
            :items="investments"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.subsidiary_name }}</td>
            <td>{{ props.item.opening_carrying_amount }}</td>
            <td>{{ props.item.additions }}</td>
            <td>{{ props.item.disposal }}</td>
            <td>{{ props.item.fair_value_movement }}</td>
            <td>{{ totalRow(props.item) }}</td>
        </template>

        <template slot="footer">
            <td><strong>Total</strong></td>
            <td>{{ totalSum('opening_carrying_amount') }}</td>
            <td>{{ totalSum('additions') }}</td>
            <td>{{ totalSum('disposal') }}</td>
            <td>{{ totalSum('fair_value_movement') }}</td>
            <td>{{ total }}</td>
        </template>
    </v-data-table>
</template>

<script>
    export default{
        props: {
            investments: {
                type: Array,
                required: true
            },
            headers: {
                type: Array,
                required: true
            }
        },
        methods: {
            totalRow (item){
                let carryingAmount = parseInt(item.opening_carrying_amount) || 0
                let additions = parseInt(item.additions) || 0
                let disposal = parseInt(item.disposal) || 0
                let fairValueMovement = parseInt(item.fair_value_movement) || 0
                return carryingAmount + additions + disposal + fairValueMovement
            },
            totalSum (column) {
                return this.investments.reduce((total, investment) => total += parseInt(investment[column]) || 0, 0)
            }
        },
        computed: {
            total () {
                return this.investments.reduce((total, investment) => total += this.totalRow(investment), 0)
            }
        }
    }
</script>