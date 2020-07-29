<template>
    <div>
        <v-layout row align-center v-for="(item, index) in payroll.items" :key="`payroll-${index}`">
            <v-flex xs12 md3>
                <v-text-field v-model="item.number" label="Number of employees"></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
                <countries v-model="item.locations" label="Location of employees" multiple></countries>
            </v-flex>
            <v-flex xs12 md3>
                <v-text-field v-model="item.yearly_wage" label="Expected yearly wage cost"></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
                <v-text-field v-model="item.yearly_director" label="Expected yearly director fees"></v-text-field>
            </v-flex>
            <v-flex sm2 xs12>
                <v-layout row justify-end>
                    <v-btn v-if="index === 0"
                        fab
                        small
                        color="primary"
                        @click="addPayroll">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <v-btn
                        fab
                        small
                        dark
                        color="danger"
                        @click="removePayroll(index)"
                        v-if="payroll.items.length > 1">
                        <v-icon>remove</v-icon>
                    </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create'

    const uuidv4  = require('uuid/v4');

    export default {
        props: ['payroll',],

        data() {
            return {
                section: 'Payroll',
                defaultStructure: {
                    id: uuidv4(),
                    number: null,
                    locations: [],
                    yearly_wage: null,
                    yearly_director: null
                }
            }
        },

        mounted () {
            if (this.payroll.items.length === 0)
                this.addPayroll();
        },

        methods: {
            addPayroll () {
                this.defaultStructure.id = uuidv4()

                this.payroll.items.unshift(JSON.parse(JSON.stringify(this.defaultStructure)))
            },

            removePayroll (index) {
                this.payroll.items.splice(index, 1)
            }
        },

        components: {QuestionsList, QuestionsCreate}
    }
</script>