<template>
    <div>
        <v-layout row wrap v-for="(detail, index) in details" :key="index">
            <person-details :detail="detail"></person-details>
            <hr width="100%" />
        </v-layout>
    </div>
</template>

<script>
    import personDetails from './person-details';

    export default {
        props: ['details'],

        components: {personDetails}
    }
</script>