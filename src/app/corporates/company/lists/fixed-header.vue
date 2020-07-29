<style>
    #header-fixed {
        position: fixed;
        top: 50px;
        display:none;
        width: 100%;
        background-color:white;
    }
</style>

<template>
    <v-data-table
            :headers="headers"
            :items="items"
            :hide-actions="true"
            id="header-fixed"
    >
        <template slot="items" slot-scope="props">
        </template>
    </v-data-table>
</template>


<script>
    export default {
        props: [
            'items',
            'headers'
        ]
    }
</script>