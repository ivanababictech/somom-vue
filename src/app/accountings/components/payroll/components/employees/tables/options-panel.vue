<template>
        <v-content class="py-0">
            <v-btn color="error" @click="linkTo('terminationlist')">Termination List</v-btn>
            <v-btn color="primary" @click="linkTo('addnewemployee')">Add new employee</v-btn>
        </v-content>
</template>

<script>

    export default {
        name: "options-panel",
        methods: {
            linkTo (rout) {
                this.$router.push(rout);
            }
        }
    }
</script>

<style scoped>

</style>