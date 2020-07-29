<template>
    <div>
        <v-flex xs3 mt-2>
            <v-select
                    :items="items"
                    label="Basis of calculation"
            ></v-select>
        </v-flex>
    </div>
</template>

<script>
    export default {
        data: () => ({
            items: ['Turnover', 'Gross assets', 'Profit/Loss before taxation']
        })
    }
</script>