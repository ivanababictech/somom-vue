<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            C. Source of funds
            <questions-create :section="sectionType" v-if="sectionType"></questions-create>
        </div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                    v-model="sourceFunds.amount"
                    label="Amount of funds required to start the business?"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-textarea
                    v-model="sourceFunds.description"
                    label="How will the company obtain such funds to start?"
                    outline
                ></v-textarea>
            </v-flex>
        </v-layout>
        <questions-list :section="sectionType" :data="sourceFunds" v-if="sectionType"></questions-list>
    </v-container>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list';
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create';

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_SOURCE_OF_FUNDS,
            }
        },
        props: ['sourceFunds'],

        components: {QuestionsList, QuestionsCreate}
    }
</script>