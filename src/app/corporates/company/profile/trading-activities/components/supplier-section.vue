<template>
    <v-container fluid grid-list-md>
        <v-layout row>
            <div class="headline">
                {{ index }}. {{ name }}
                <questions-create :section="sectionType" v-if="sectionType"></questions-create>
            </div>
        </v-layout>

        <v-layout row>
            <v-flex md12>
                <span class="subheading">{{ incurQuestion }}</span>
                <yes-no v-model="section.incur"></yes-no>
            </v-flex>
        </v-layout>

        <template v-if="section.incur">
            <v-layout row wrap>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                        v-model.number="section.localSuppliers"
                        type="number"
                        label="From local suppliers"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                        v-model.number="section.euSuppliers"
                        type="number"
                        label="From EU suppliers"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                        v-model.number="section.outsideEuSuppliers"
                        type="number"
                        label="From Outside EU suppliers"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                        :value="total()"
                        :label="totalLabel"
                        disabled
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <suppliers :section="section" :estimatedLabel="estimatedLabel"></suppliers>

            <questions-list :section="sectionType" :data="section" v-if="sectionType"></questions-list>
        </template>
    </v-container>
</template>

<script>
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create'
    import Suppliers from './suppliers'

    export default {
        props: ['name', 'index', 'section', 'sectionType', 'totalLabel', 'estimatedLabel', 'incurQuestion'],

        methods: {
            total() {
                return parseFloat(this.section.localSuppliers || 0) + parseFloat(this.section.euSuppliers || 0) + parseFloat(this.section.outsideEuSuppliers || 0)
            }
        },

        components: {QuestionsList, QuestionsCreate, Suppliers}
    }
</script>