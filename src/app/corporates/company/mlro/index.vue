<template>
    <v-tabs grow v-model="active" slider-color="accent">
        <v-tab v-for="tab in tabs" :key="tab" ripple>
            {{ tab }}
        </v-tab>
        <v-tab-item v-for="tab in tabs" :key="tab">
            <identity-verification :corporate="corporate" v-if="tab === 'Identity verification'"></identity-verification>
            <questionnaire :questionnaire="mlro.questionnaire" v-if="tab === 'Risk Assessments'"></questionnaire>
            <results v-if="tab === 'Results' && resultDocumentsAreLoaded" :documents="mlro.documents"></results>
            <analytical-review v-if="tab === 'Analytical Review'"></analytical-review>
            <services :services="mlro.services" :involvements="involvements" v-if="tab === 'Services'"></services>
            <company-details :company="company" :company-details="mlro.companyDetails" v-if="tab === 'Company details'"></company-details>
            <involvements :company="company" v-if="tab === 'Involvements'">Involvements</involvements>
            <approval :approval="mlro.approval" v-if="tab === 'Approval'"></approval>
        </v-tab-item>
    </v-tabs>
</template>

<script>

    import IdentityVerification from './identity-verification/index'
    import Questionnaire from './questionnaire'
    import Results from './results'
    import AnalyticalReview from './analytical-review'
    import Services from './services/index'
    import CompanyDetails from './company-details'
    import Involvements from './involvements';
    import Approval from './approval';
    import * as documentTypeService from '@/app/settings/corporate/document-types/service';

    export default {
        data:() => ({
                active: null,
                tabs: [
                    'Identity verification',
                    'Risk Assessments',
                    'Results',
                    'Analytical Review',
                    'Services',
                    'Company details',
                    'Involvements',
                    'Approval'
                ],
                resultDocumentsAreLoaded: false
            }
        ),

        props: [
            'corporate',
            'mlro',
            'involvements',
            'documents',
            'company'
        ],

        components: {
            IdentityVerification,
            Questionnaire,
            Results,
            AnalyticalReview,
            Services,
            CompanyDetails,
            Involvements,
            Approval
        },

        mounted() {
            this.getMlroDocuments();
        },

        methods: {
            getMlroDocuments() {
                documentTypeService.get()
                    .then(response => {
                        const mergedDocuments = _.merge(this.mlro.documents, _.flatten(_.map(_.filter(response.data,
                            document => document.type === 'mlro'), mlroDocument => mlroDocument.documents)));
                        this.$set(this.mlro, 'documents', mergedDocuments);
                        this.resultDocumentsAreLoaded = true;
                    })
            }
        }
    }
</script>