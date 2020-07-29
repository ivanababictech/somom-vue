
<template>
    <v-container fluid grid-list-md>
        <div class="headline">Results</div>
        <v-layout row v-for="result in results" :key="result.id">
            <v-flex md3>
                <h3>{{ result.title}} / Rating score?</h3>
            </v-flex>
            <v-flex md3>
                <h3>{{ result.score }} / {{ getOverallScore(result) }}</h3>
            </v-flex>
            <v-flex md3>
                <h3>{{ getRisk(result) }} risk</h3>
            </v-flex>
        </v-layout>

        <v-layout row align-center>
            <v-flex xs6>
                <h3>Is the applicant accepted?</h3>
            </v-flex>
            <v-flex xs3>
                <v-btn-toggle v-model="results.applicantAccepted">
                    <v-btn flat
                        :value="true"
                        active-class="primary"
                        :style="addButtonsStyle(results.applicantAccepted, 'y')">
                        <span>Y</span>
                    </v-btn>
                    <v-btn flat
                        :value="false"
                        active-class="primary"
                        :style="addButtonsStyle(results.applicantAccepted, 'n')">
                        <span>N</span>
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
        </v-layout>

        <v-layout row v-if="results.applicantAccepted === false">
            <v-flex xs12>
                <v-textarea
                        v-model="results.explainationOfRejected"
                        label="Explain why the client was rejected"
                        outline
                ></v-textarea>
            </v-flex>
        </v-layout>

        <v-layout row align-center>
            <v-flex xs6>
                <h3>Is an STR required to be filed?</h3>
            </v-flex>

            <v-flex xs3>
                <v-btn-toggle v-model="results.strRequired">
                    <v-btn flat
                        :value="true"
                        active-class="primary"
                        :style="addButtonsStyle(results.strRequired, 'y')">
                        <span>Y</span>
                    </v-btn>
                    <v-btn flat
                        :value="false"
                        active-class="primary"
                        :style="addButtonsStyle(results.strRequired, 'n')">
                        <span>N</span>
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
        </v-layout>

        <v-layout row v-if="results.strRequired === false">
            <v-flex xs12>
                <v-textarea
                        v-model="results.explainationStrRequired"
                        label="Explain why an STR is not required"
                        outline
                ></v-textarea>
            </v-flex>
        </v-layout>

        <documents :documents="documents" :mlro-documents="mlroDocuments"></documents>
    </v-container>
</template>

<script>
    import * as questionService from '@/app/settings/corporate/questions/service';

    import Documents from '../documents';

    import { mapGetters } from 'vuex';
    export default {

        props: ['documents'],

        data() {
            return {
                questions: [],
                settings: [],
                mlroDocuments: []
            }
        },

        components: {Documents},

        mounted() {
            this.getQuestions();
        },

        methods: {
            getQuestions() {
                questionService.get()
                    .then(response => {
                        this.questions = response.data
                    })
            },

            getOverallScore(setting) {
                let score = 0;
                setting.items.forEach(item => {
                    item.options.forEach(option => {
                        score += option.mark;
                    })
                });

                return score;
            },

            getRisk(result) {
                const overallScore = this.getOverallScore(result);

                const percent = Math.round(100 * result.score / overallScore);

                if (result.data !== null) {
                    if (result.data.low !== undefined && result.data.low.from !== null && result.data.low.to !== null &&
                        percent >= result.data.low.from && percent <= result.data.low.to)
                        return 'Low';
                    if (result.data.medium !== undefined && result.data.medium.from !== null &&
                        result.data.medium.to !== null &&
                        percent >= result.data.medium.from && percent <= result.data.medium.to)
                        return 'Medium';
                    if ( result.data.high !== undefined && result.data.high.from !== null && result.data.high.to !== null &&
                        percent >= result.data.high.from && percent <= result.data.high.to)
                        return 'High';
                }

                return 'N/A';
            }
        },

        computed: {
            ...mapGetters({
                results: 'corporate/results'
            })
        },
    }
</script>