<template>
    <v-layout row wrap>
        <v-container fluid grid-list-md>
            <v-layout row>
                <h4>Select the type of investment the company will hold</h4>
            </v-layout>
            <v-layout row wrap>
                <v-btn
                    :color="isActiveType(type) ? 'primary' : ''"
                    @click="activateType(type)"
                    v-for="(type, index) in types"
                    :key="index"
                >{{ type.title }}</v-btn>
            </v-layout>
            <v-card row wrap v-for="(item, index) in investments.types" :key="index" elevation-6>
                <v-toolbar color="primary" dark>
                    <v-btn icon @click="activateType(item)">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                        {{ alphabet[index].toUpperCase() }}. {{ item.title }}

                        <questions-create :section="item.sectionType" v-if="item.sectionType"></questions-create>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-container fluid my-3>
                    <financial :type="item"
                               :sectionType="item.sectionType"
                               v-if="item.name == 'financial'"
                    ></financial>
                    <investment :sectionType="item.sectionType"
                                :type="item"
                                v-if="item.name == 'investment'"
                    ></investment>
                    <intellectual :sectionType="item.sectionType"
                                  :type="item"
                                  v-if="item.name == 'intellectual'"
                    ></intellectual>

                    <tangible :type="item" :sectionType="item.sectionType" v-if="item.name == 'tangible'"></tangible>

                    <shares :type="item" v-if="item.name == 'shares'"></shares>

                    <cryptocurrency :type="item" v-if="item.name == 'cryptocurrency'" :sectionType="item.sectionType"></cryptocurrency>
                </v-container>
            </v-card>
        </v-container>
    </v-layout>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create'
    import Financial from './financial';
    import Investment from './investment';
    import Intellectual from './intellectual';
    import Tangible from './tangible';
    //import Cryptocurrency from './cryptocurrency';
    import Shares from './shares';

    export default {
        data() {
            return {
                type: null,
                types: [
                    {
                        name: 'shares',
                        title: 'Shares in companies',
                        sectionType: corporateService.SECTION_SHARES_IN_COMPANIES,
                        items: [],
                        hasQuestion: true
                    },
                    {
                        name: 'financial',
                        sectionType: corporateService.SECTION_FINANCIAL_ASSETS,
                        title: 'Financial assets',
                        items: []
                    },
                    {
                        name: 'investment',
                        sectionType: corporateService.SECTION_INVESTMENT_PROPERTY,
                        title: 'Investment property',
                        items: []
                    },
                    {
                        name: 'intellectual',
                        sectionType: corporateService.SECTION_INTELLECTUAL_PROPERTY,
                        title: 'Intellectual property',
                        items: []
                    },
                    {
                        name: 'tangible',
                        sectionType: corporateService.SECTION_TANGIBLE_ASSETS,
                        title: 'Tangible assets',
                        items: []
                    },
                    {
                        name: 'cryptocurrency',
                        sectionType: corporateService.SECTION_CRYPTOCURRENCY,
                        title: 'Cryptocurrency',
                        items: []
                    },
                ],
                alphabet: 'abcdefghijklmnopqrstuvwxyz'.split('')
            }
        },

        props: ['investments'],

        methods: {
            activateType(type) {
                let index = this.investments.types.findIndex(item => item.name === type.name);

                if(index !== -1) {
                    this.investments.types.splice(index, 1)
                } else {
                    this.investments.types.unshift(JSON.parse(JSON.stringify(type)))
                }
            },

            isActiveType(type) {
                return this.investments.types.filter(item => item.name === type.name).length
            },
        },

        components: {
            Shares,
            Financial,
            Investment,
            Intellectual,
            Tangible,
            Cryptocurrency: () => import("./cryptocurrency"),
            QuestionsCreate
        }
    }
</script>