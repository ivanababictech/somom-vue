<template>
    <div style="line-height: 40%;" v-if="detail">
        <div v-if="isCompany">
            <p>{{ detail.name }}</p>
            <p>{{ detail.companyDetails.registrationNumber}}</p>
            <p><strong>Registered address</strong></p>
            <p>{{ detail.companyDetails.doorName}},</p>
            <p>{{ detail.companyDetails.streetName}}</p>
            <p>{{ detail.companyDetails.town}}, {{ detail.companyDetails.postCode}}</p>
            <p>{{ getCountryName(detail.companyDetails.country)}}</p>
        </div>
        <div v-else>
            <p>{{ detail.firstName}} {{ detail.lastName}}</p>
            <p><strong>Holder of</strong>{{ detail.nationality }}, {{ detail.identificationType }} <strong>number</strong> {{ detail.identificationNumber }}</p>
            <p><strong>Residing at</strong></p>
            <p>{{ detail.address.buildingNumber }}, {{ detail.address.street }}</p>
            <p>{{ detail.address.town }}, {{ detail.address.postcode}}</p>
            <p>{{ getCountryName(detail.address.country)}}</p>
        </div>
    </div>
</template>

<script>
    import CountryNameMixin from './country-name-mixin';

    export default {
        mixins: [CountryNameMixin],

        props: ['detail', 'isCompany'],
    }
</script>