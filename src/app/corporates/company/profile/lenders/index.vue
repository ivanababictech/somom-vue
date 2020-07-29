<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            E. Lending activities
            <questions-create :section="sectionType" v-if="sectionType"></questions-create>
        </div>
        <v-layout row>
            <v-flex xs3>
                <span class="subheading">Will the company lend any funds?</span>
            </v-flex>
            <v-flex xs4>
                <yes-no v-model="lenders.lendAnyFunds"></yes-no>
            </v-flex>
        </v-layout>

        <template v-if="lenders.lendAnyFunds">
            <lenders :lenders="lenders"></lenders>

            <questions-list :section="sectionType" :data="lenders" v-if="sectionType"></questions-list>
        </template>

    </v-container>
</template>

<script scoped>
    import {mapGetters} from 'vuex'
    import borrowings from '@/app/corporates/mixins/borrowings';
    import * as corporateService from '@/app/corporates/service';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list';
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create';
    import Lenders from './lenders';

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_LENDING_ACTIVITIES,
                malteseBanks: [],
            }
        },

        props: ['lenders'],

        mixins: [
            borrowings,
        ],

        computed: {
            ...mapGetters({
                'corporateTypes': 'settings/corporateTypes',
            }),
        },

        components: {QuestionsList, QuestionsCreate, Lenders}
    }
</script>