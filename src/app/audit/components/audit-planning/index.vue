<template>
    <div>
        <v-tabs dark v-model="active" slider-color="white">
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab">
                <company-details v-if="tab === 'Company Details'"></company-details>
                <audit-details v-if="tab === 'Audit Details'"></audit-details>
                <audit-plan v-if="tab === 'Audit Plan'"></audit-plan>
                <preliminary-ar v-if="tab === 'Preliminary AR'"></preliminary-ar>
                <span v-if="tab === ''">Preliminary AR</span>
                <is-review v-if="tab === 'Is Review'"></is-review>
                <acceptance v-if="tab === 'Acceptance'"></acceptance>
                <client-identification v-if="tab === 'Client Identification'"></client-identification>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import companyDetails from './company-details'
    import auditDetails from './audit-details'
    import auditPlan from './audit-plan'
    import acceptance from './acceptance'
    import preliminaryAr  from './preliminary-ar'
    import clientIdentification  from './client-identification'
    import isReview  from './is-review'

    export default {
        components: {
            companyDetails,
            auditDetails,
            auditPlan,
            acceptance,
            isReview,
            preliminaryAr,
            clientIdentification,
        },
        data() {
            return {
                tabs: ['Company Details', 'Audit Details', 'Audit Plan', 'Preliminary AR', 'Is Review', 'Acceptance', 'Client Identification'],
                active: null
            }
        }
    }
</script>