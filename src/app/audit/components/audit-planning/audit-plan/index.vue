<template>
    <div class="mt-4">
        <v-tabs dark v-model="active" slider-color="white">
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab">
                <auditor-checklist v-if="tab === 'Auditor checklist'"></auditor-checklist>
                <auditor-approach v-if="tab === 'Audit approach'"></auditor-approach>
                <independence-questionnaire v-if="tab === 'Independence questionnaire'"></independence-questionnaire>
                <general-risk-assessment v-if="tab === 'General risk assessment'"></general-risk-assessment>
                <assessment-of-risk v-if="tab === 'Assessment of risk'"></assessment-of-risk>
                <materiality v-if="tab === 'Materiality'"></materiality>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import auditorChecklist from './auditor-checklist'
    import auditorApproach from './auditor-approach'
    import assessmentOfRisk from './assessment-of-risk'
    import independenceQuestionnaire from './independence-questionnaire'
    import generalRiskAssessment from './general-risk-assessment'
    import materiality from './materiality'

    export default {
        components: {auditorChecklist, auditorApproach, assessmentOfRisk, independenceQuestionnaire, generalRiskAssessment, materiality},
        data() {
            return {
                tabs: ['Auditor checklist', 'Audit approach', 'Independence questionnaire', 'General risk assessment', 'Assessment of risk', 'Materiality'],
                active: null
            }
        }
    }
</script>