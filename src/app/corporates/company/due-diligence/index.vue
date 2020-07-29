<template>
    <div class="fill-width">
        <v-tabs v-if="dueDiligence.length">
            <v-tab
                    v-for="(person, index) in dueDiligence"
                    :key="index"
                    @click="activeTab = index">
                {{ person.name }}
                <v-icon
                        v-if="getPersonCommentsCounters(person.id)"
                        :small="true"
                        color="primary">
                    flag
                </v-icon>
            </v-tab>

            <v-tab-item :key="index" v-for="(person, index) in dueDiligence">
                <template v-if="activeTab === index">
                    <v-flex xs12 class="text-xs-right">
                        <view-comments
                                v-if="person.type === 'individual'"
                                :individual="person"
                                :questions="individualQuestions"
                                :involvements="involvements"
                                :wealthSources="wealthSources">
                        </view-comments>
                        <view-comments
                                v-else
                                :questions="companyQuestions"
                                :involvements="involvements"
                                :corporate="person">
                        </view-comments>
                    </v-flex>
                    <individual :individual="person"
                                :questions="individualQuestions"
                                :involvements="involvements"
                                :corporate="corporate"
                                :wealthSources="wealthSources"
                                :declerations="individualDeclerations"
                                v-if="person.type === 'individual'"></individual>
                    <corporate :questions="companyQuestions"
                               :declerations="corporateDeclerations"
                               :involvements="involvements"
                               :corporate="person" v-else></corporate>
                </template>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import Individual from './individual';
    import Corporate from './corporate';
    import ViewComments from './components/comments/view'
    import {mapGetters} from 'vuex';
    import {getCommentsCounters} from './../../service';

    export default {
        data()
        {
            return {
                activeTab: null,
                wealthSources: [],
                individualStructure: {
                    name: '',
                    type: '',
                    professionalCarer: {},
                    questionnaire: {},
                    sourceWealth: {
                        wealths: [],
                        documents: []
                    },
                    netWorthBracket: {
                        type: null
                    },
                    bankReferenceDetails: {},
                    professionalReferenceDetails: {},
                    declaration: {},
                },
                corporateStructure: {
                    name: '',
                    type: '',
                    companyDetails: {
                        companyBankers: []
                    },
                    directorship: {
                        corporates: [],
                        individuals: []
                    },
                    shareholders: {
                        corporates: [],
                        individuals: []
                    },
                    auditDetails: {},
                    questionnaire: {
                        bankReferenceDetails: {},
                    },
                    professionalReferenceDetails: {},
                    declaration: {},
                },
                dueDiligenceQuestions: []
            }
        },

        computed: {
            ...mapGetters('corporate', [
                'declerations', 'getPersonCommentsCounters'
            ]),

            ...mapGetters('questionnaire', [
                'questions'
            ]),

            individualQuestions()
            {
                return _.filter(this.questions, question => question.type === 'Individual');
            },

            companyQuestions()
            {
                return _.filter(this.questions, question => question.type !== 'Individual');
            },

            individualDeclerations()
            {
                return _.filter(this.declerations, decleration => decleration.type === 'Individual');
            },

            corporateDeclerations()
            {
                return _.filter(this.declerations, decleration => decleration.type !== 'Individual');
            }
        },

        props: [
            'dueDiligence',
            'involvements',
            'corporate'
        ],

        mounted()
        {
            this.getWealthSources();
            this.updateInvolvements();
            this.activeTab = 0;
            getCommentsCounters();
        },

        methods: {
            addPerson(type, index, name)
            {
                type.id = name.id;
                type.name = name.name;
                type.type = name.type;

                this.dueDiligence.push(JSON.parse(JSON.stringify(type)))
            },

            getWealthSources()
            {
                this.$http.get('settings/wealth-sources').then(response => {
                    this.wealthSources = response.data
                })
            },

            updateInvolvements()
            {
                // match all involvements and persons
                this.involvements.map((name, index) => {
                    let existsPerson = this.dueDiligence.find(person => {
                        return person.name == name.name
                    })

                    if (!existsPerson) {
                        if (name.type === 'individual') {
                            this.addPerson(this.individualStructure, index, name)
                        } else {
                            this.addPerson(this.corporateStructure, index, name)
                        }
                    }
                });

                // match all persons and involvements
                this.dueDiligence.map((person, index) => {
                    let existsPerson = this.involvements.find(name => {
                        return person.name === name.name
                    });

                    if (!existsPerson) {
                        this.dueDiligence.splice(index, 1)
                    }
                });
            }
        },

        watch: {
            involvements()
            {
                this.updateInvolvements()
            }
        },

        components: {Individual, Corporate, ViewComments}
    }
</script>