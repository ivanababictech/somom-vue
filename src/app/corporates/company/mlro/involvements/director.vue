<template>
    <div>
        <v-layout row wrap v-for="(detail, index) in details" :key="index">
            <person-details :detail="detail" :is-company="isCompany"></person-details>
        </v-layout>
    </div>
</template>

<script>
    import personDetails from './person-details';

    export default {
        props: ['details', 'isCompany'],

        components: {personDetails}
    }
</script>