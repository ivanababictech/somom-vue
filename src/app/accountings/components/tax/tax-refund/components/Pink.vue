<template>
    <v-layout row align-center justify-space-between mt-2>
        <v-layout row class="border-big pink lighten-3 pl-1 py-1">
            <h2 class="title uppercase">{{ text }}</h2>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>