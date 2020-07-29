<template>
    <v-tabs v-model="type" slider-color="accent">
        <v-tab ripple key="income-statement">
            Income statement
        </v-tab>
        <v-tab ripple key="balance-sheet">
            Balance sheet
        </v-tab>
        <v-tab-item key="income-statement">
            <revenue></revenue>
        </v-tab-item>
        <v-tab-item key="balance-sheet">
            empty page
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import Revenue from './revenue'

    export default {
        data:() => ({
                type: 0
            }
        ),

        mounted() {

        },

        methods: {

        },

        components: {Revenue},
    }
</script>