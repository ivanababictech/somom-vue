<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <h2>Allowances</h2>
        </v-layout>
        <hr/>
        <allowances-tables/>
    </v-container>
</template>

<script>
    import AllowancesTables from "./tables/allowances-tables";

    export default {
        components: {
            AllowancesTables
        },
        name: "allowances",
        methods: {

        }
    }
</script>

<style scoped>

</style>