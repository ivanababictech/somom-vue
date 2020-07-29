<template>
    <v-layout row wrap>
        <letter-details :letterDetails="services.letterDetails"></letter-details>
        <services-provided :servicesProvided="services.servicesProvided"></services-provided>
        <letter-view :letterView="services.letterView" :letterDetails="services.letterDetails" :servicesProvided="services.servicesProvided" :involvements="involvements"></letter-view>
    </v-layout>
</template>

<script>
    import LetterDetails from './letter-details'
    import ServicesProvided from './services-provived'
    import LetterView from './letter-view'

    export default {
        props: ['services', 'involvements'],

        components: { LetterDetails, ServicesProvided, LetterView }
    }
</script>