<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            E. Payroll
            <questions-create :section="section"></questions-create>
        </div>
        <v-layout row>
            <v-flex md12>
                <span class="subheading">Will the company employee personnel (including directors)?</span>
                <yes-no v-model="payroll.employeePersonnel"></yes-no>
            </v-flex>
        </v-layout>

        <template v-if="payroll.employeePersonnel">
            <payroll :payroll="payroll"></payroll>

            <v-layout row>
                <v-flex xs6>
                    <span class="subheading">Are they (or will the be) registered with the Maltese employment authorities?</span>
                </v-flex>
                <v-flex xs4>
                    <yes-no v-model="payroll.registeredMaltese"></yes-no>
                </v-flex>
            </v-layout>

            <questions-list :section="section" :data="payroll"></questions-list>
        </template>
    </v-container>
</template>

<script>
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list';
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create';
    import Payroll from './payroll'

    export default {
        props: ['payroll',],

        data() {
            return {
                section: 'Payroll',
            }
        },

        components: {QuestionsList, QuestionsCreate, Payroll}
    }
</script>