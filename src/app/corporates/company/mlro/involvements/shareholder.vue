<template>
    <div>
        <v-layout row wrap v-for="(detail, index) in details" :key="index">
            <company-details :detail="detail" :is-company="isCompany"></company-details>
        </v-layout>
    </div>
</template>

<script>
    import companyDetails from './company-details';

    export default {
        props: ['details', 'isCompany'],

        components: {companyDetails}
    }
</script>