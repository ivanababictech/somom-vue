<template>
    <div>
        <v-layout row wrap v-for="(detail, index) in details" :key="index">
            <div style="line-height: 40%;">
                <p>{{ detail.firstName}} {{ detail.lastName}}</p>
                <p><strong>Holder of</strong>{{ detail.nationality }}, {{ detail.identificationType }} <strong>number</strong> {{ detail.identificationNumber }}</p>
                <p><strong>Residing at</strong></p>
                <p>{{ detail.buildingNumber }}, {{ detail.street }}</p>
                <p>{{ detail.town }}, {{ detail.postcode}}</p>
                <p>{{ getCountryName(detail.country)}}</p>
            </div>
            <hr width="100%" />
        </v-layout>
    </div>
</template>

<script>
    import CountryNameMixin from './country-name-mixin';

    export default {
        mixins: [CountryNameMixin],

        props: ['details'],
    }
</script>