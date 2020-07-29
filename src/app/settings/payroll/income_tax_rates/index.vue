<template>
    <router-view/>
</template>

<script>
    import IncomeTaxRates from "./components/income-tax-rates";

    export default {
        components: {IncomeTaxRates},
        name: "index"
    }
</script>

<style scoped>

</style>