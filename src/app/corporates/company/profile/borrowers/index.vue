<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            D. Borrowing activities
            <questions-create :section="sectionType" v-if="sectionType"></questions-create>
        </div>
        <v-layout row>
            <v-flex xs3>
                <span class="subheading">Will the company borrow any funds?</span>
            </v-flex>
            <v-flex xs4>
                <yes-no v-model="borrowers.borrowAnyFunds"></yes-no>
            </v-flex>
        </v-layout>

        <template v-if="borrowers.borrowAnyFunds">
            <borrowers :borrowers="borrowers"></borrowers>

            <questions-list :section="sectionType" :data="borrowers" v-if="sectionType"></questions-list>
        </template>
    </v-container>
</template>

<script scoped>
    import borrowings from '@/app/corporates/mixins/borrowings';
    import * as corporateService from '@/app/corporates/service';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list';
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create';
    import Borrowers from './borrowers';

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_BORROWING_ACTIVITIES,
                malteseBanks: []
            }
        },

        props: ['borrowers'],

        mixins: [
            borrowings,
        ],



        components: {QuestionsList, QuestionsCreate, Borrowers}
    }
</script>