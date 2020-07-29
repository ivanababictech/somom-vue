<template>
    <v-btn color="primary" dark @click="goToLists()">Lists</v-btn>
</template>

<script scoped>
    export default {
        methods: {
            goToLists() {
                this.$router.push({name: 'corporates.lists.index'});
            }
        }
    }
</script>