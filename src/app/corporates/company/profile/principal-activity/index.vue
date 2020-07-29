<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            A. Principal activity details
            <questions-create :section="sectionType" v-if="sectionType"></questions-create>
        </div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-textarea
                    v-model="principalActivity.description"
                    label="Enter a detailed description about the company’s activity"
                    class="black--text"
                    outline
                ></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
            <v-flex xs4>
                <span class="subheading">Location of assets ( select one ore more countries)</span>
            </v-flex>
            <v-flex xs8>
                <countries v-model="principalActivity.countries" label="Select" :multiple="true"></countries>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
            <v-flex xs4>
                <span class="subheading"> Company activity</span>
            </v-flex>
            <v-flex xs8>
                <v-autocomplete
                    multiple
                    item-text="name"
                    item-value="id"
                    :items="activities"
                    v-model="principalActivity.activities"
                    label="Select"
                    append-icon="map"
                ></v-autocomplete>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    v-model="principalActivity.companyWebsite"
                    label="Company website url"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <questions-list :section="sectionType" :data="principalActivity" v-if="sectionType"></questions-list>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as corporateService from '@/app/corporates/service';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create'

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_PRINCIPAL_ACTIVITY_DETAILS
            }
        },

        computed: {
            ...mapGetters({
                activities: 'settings/company_activities',
            }),
        },

        props: ['principalActivity'],

        components: {QuestionsList, QuestionsCreate}
    }
</script>