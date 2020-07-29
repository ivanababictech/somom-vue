<template>
    <v-layout row wrap>
        <company-details :company-details="corporate.companyDetails"></company-details>
        <directorship :directorship="corporate.directorship"></directorship>
        <questionnaire :questions="allQuestions"
            :letters="letters"
            :questionnaire="corporate.questionnaire"></questionnaire>
        <professional-reference-details :letter="professionalReferenceDetailsLetter"
            :professional-reference-details="corporate.professionalReferenceDetails"></professional-reference-details>
        <declaration :paragraphs="paragraphs"
            :letter="declarationLetter"></declaration>
    </v-layout>
</template>

<script>

    import CompanyDetails from './company-details'
    import Directorship from './directorship'
    import Questionnaire from './questionnaire'
    import ProfessionalReferenceDetails from '../components/professional-reference-details'
    import Declaration from '../components/declaration'
    import { getCompanyQuestions, getInvolmentByName } from './../getDataService';

    export default {
        props: [
            'corporate',
            'questions',
            'involvements',
            'declerations'
        ],

        data() {
            return {
                allQuestions: {}
            }
        },

        components: {
            CompanyDetails,
            Directorship,
            Questionnaire,
            ProfessionalReferenceDetails,
            Declaration
        },

        computed: {
            involvement() {
                return  getInvolmentByName(this.involvements, this.corporate.name);
            },

            letters() {
                return String.fromCharCode(...Array(123).keys()).slice(97).toUpperCase().split("").splice(1);
            },

            groupedQuestionsLength() {
                return Object.keys(this.allQuestions).length;
            },

            professionalReferenceDetailsLetter() {
                return this.letters[this.groupedQuestionsLength];
            },

            declarationLetter() {
                return this.letters[this.groupedQuestionsLength + 1];
            },

            declerationParagraphs() {
                return _.flatten(
                    _.map(_.filter(this.declerations, decleration => this.involvement.sub_type === decleration.type), decleration => decleration.data.paragraphs)
                );
            },

            involvementsBasedDeclerations() {
                return _.filter(this.declerationParagraphs, paragraph => {
                    return ! paragraph.is_standard
                        && paragraph.involvements.some(i => _.includes(this.involvement.involvements, i))
                });
            },

            standardDeclerations() {
                return _.filter(this.declerationParagraphs, paragraph => paragraph.is_standard);
            },

            paragraphs() {
                return this.involvementsBasedDeclerations.concat(this.standardDeclerations);
            }
        },
        watch: {
            questions: {
                handler(){
                    this.allQuestions = getCompanyQuestions(this.questions, this.involvement);
                },
                immediate: true
            }
        }
    }
</script>