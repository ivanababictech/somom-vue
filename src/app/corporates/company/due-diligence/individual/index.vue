<template>
    <v-layout row wrap>
        <questionnaire :questionnaire="individual.questionnaire"
             :letters="letters"
             :questions="allQuestions"></questionnaire>
        <source-wealth :sourceWealth="individual.sourceWealth"
            v-if="showSourceOfWealthAndNetWorthBrackets"
            :letter="sourceOfWealthLetter"
            :wealthSources="wealthSources"></source-wealth>
        <net-worth-bracket v-if="showSourceOfWealthAndNetWorthBrackets"
            :letter="netWorthBracketLetter"  
            :net-worth-bracket="individual.netWorthBracket"></net-worth-bracket>
        <bank-reference-details :show-sof-docs-and-nwb="showSourceOfWealthAndNetWorthBrackets"
            :letter="bankReferenceDetailsLetter"
            :bank-reference-details="individual.bankReferenceDetails"></bank-reference-details>
        <professional-reference-details :show-sof-docs-and-nwb="showSourceOfWealthAndNetWorthBrackets"
            :letter="professionalReferenceDetailsLetter"
            :professional-reference-details="individual.professionalReferenceDetails"></professional-reference-details>
        <declaration :show-sof-docs-and-nwb="showSourceOfWealthAndNetWorthBrackets"
            :paragraphs="paragraphs"
            :letter="declarationLetter"></declaration>

        <google2fa @verified="google2faVerified" label="Digital signature" v-if="!digitalSigned"></google2fa>
        <v-card v-else>
            <v-card-text>
                <ul style="list-style: none">
                    <li><b>Signer:</b> Glen Azzopardi</li>
                    <li><b>Role:</b> CEO</li>
                    <li><b>Organization:</b> {{ corporate.company.name }}</li>
                    <li><b>Date:</b> {{ (new Date()).toLocaleDateString('en-GB') }}</li>
                    <li><b>Reason:</b> Due diligence declaration</li>
                </ul>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
    import ProfessionalCarer from './professional-carer'
    import Questionnaire from './questionnaire'
    import SourceWealth from './source-wealth'
    import NetWorthBracket from './net-worth-bracket'
    import BankReferenceDetails from './bank-reference-details'
    import ProfessionalReferenceDetails from '../components/professional-reference-details'
    import Declaration from '../components/declaration'
    import { getIndividualQuestions } from './../getDataService';

    export default {
        data() {
            return {
                digitalSigned: false,
                allQuestions: {}
            }
        },

        props: [
            'individual',
            'wealthSources',
            'involvements',
            'questions',
            'corporate',
            'declerations'
        ],

        mounted() {
            if (Array.isArray(this.individual.netWorthBracket))
                this.individual.netWorthBracket = {
                    type: null
                }

            if (Array.isArray(this.individual.questionnaire))
                this.individual.questionnaire = {};
        },

        computed: {
            showSourceOfWealthAndNetWorthBrackets() {
                const involvementIndex = _.findIndex(this.involvements, involvement => involvement.name === this.individual.name);

                if (involvementIndex !== -1) {
                    const involvement = this.involvements[involvementIndex];

                    if (involvement.hasOwnProperty('showSourceOfWealthDocuments'))
                        return involvement.showSourceOfWealthDocuments;
                }

                return false;
            },

            letters() {
                return String.fromCharCode(...Array(123).keys()).slice(97).toUpperCase().split("");
            },

            standardQuestions() {
                return _.filter(this.questions, question => question.is_standard);
            },

            groupedQuestionsLength() {
                return Object.keys(this.allQuestions).length;
            },
            
            sourceOfWealthLetter() {
                if (this.showSourceOfWealthAndNetWorthBrackets)
                    return this.letters[this.groupedQuestionsLength];
            },

            netWorthBracketLetter() {
                if (this.showSourceOfWealthAndNetWorthBrackets)
                    return this.letters[this.groupedQuestionsLength + 1];
            },

            bankReferenceDetailsLetter() {
                if (this.showSourceOfWealthAndNetWorthBrackets)
                    return this.letters[this.groupedQuestionsLength + 2];

                return this.letters[this.groupedQuestionsLength];
            },

            professionalReferenceDetailsLetter() {
                if (this.showSourceOfWealthAndNetWorthBrackets)
                    return this.letters[this.groupedQuestionsLength + 3];

                return this.letters[this.groupedQuestionsLength + 1];
            },

            declarationLetter() {
                if (this.showSourceOfWealthAndNetWorthBrackets)
                    return this.letters[this.groupedQuestionsLength + 4];

                return this.letters[this.groupedQuestionsLength + 2];
            },

            declerationParagraphs() {
                return _.flatten(_.map(this.declerations, decleration => decleration.data.paragraphs));
            },

            involvementsBasedDeclerations() {
                const involvement = _.find(this.involvements, involvement => involvement.name === this.individual.name);
                return _.filter(this.declerationParagraphs, paragraph => {
                    return ! paragraph.is_standard
                        && paragraph.involvements.some(i => _.includes(involvement.involvements, i))
                });
            },

            standardDeclerations() {
                return _.filter(this.declerationParagraphs, paragraph => paragraph.is_standard);
            },

            paragraphs() {
                return this.standardDeclerations.concat(this.involvementsBasedDeclerations);
            }
        },

        methods: {
            google2faVerified() {
                this.digitalSigned = true
            },
        },

        components: {
            ProfessionalCarer,
            Questionnaire,
            SourceWealth,
            NetWorthBracket,
            BankReferenceDetails,
            ProfessionalReferenceDetails,
            Declaration
        },

        watch: {
            questions: {
                handler(){
                    this.allQuestions = getIndividualQuestions(this.questions, this.involvements, this.individual);
                },
                immediate: true
            }
        }
    }
</script>