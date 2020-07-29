<template>
    <v-content class="py-0">
        <v-btn @click="linkTo('employeelist')" color="info">Go back to Employee List</v-btn>
    </v-content>
</template>

<script>
    export default {
        name: "options-panel",
        methods: {
            linkTo: function (route) {
                this.$router.push(route);
            }
        }
    }
</script>

<style scoped>

</style>