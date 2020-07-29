<template>
    <v-layout column align-center justify-center class="welcome-bg">


    </v-layout>
</template>
<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: mapGetters({
            appName: 'appName',
        })
    }
</script>

<style scoped>
    .welcome-bg {
        min-height: 400px;
    }
</style>
