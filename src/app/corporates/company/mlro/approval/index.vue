<template>
    <v-container fluid grid-list-md>
        <div v-for="(question, index) in  approval.questions" :key="index">
            <v-layout row>
                <v-flex xs9>
                    <h3>{{ question.name }} ?</h3>
                </v-flex>
                <v-flex xs3>
                    <v-btn-toggle v-model="approval.questions[index].approved">
                        <v-btn flat :value="true">
                            <span>Y</span>
                        </v-btn>
                        <v-btn flat :value="false">
                            <span>N</span>
                        </v-btn>
                    </v-btn-toggle>
                </v-flex>
            </v-layout>

            <v-flex row md12 v-if="approval.questions[index].approved === false">
                <v-textarea
                        v-model="approval.questions[index].comment"
                        label="Enter comment"
                        outline
                ></v-textarea>
            </v-flex>
        </div>

        <v-text-field v-model="approval.mfsa_company_name" label="MFSA approved company name"></v-text-field>

        <v-text-field v-model="approval.company_reg_no" label="Company registration number"></v-text-field>

        <v-text-field v-model="approval.applicable_year" label="Applicable year"></v-text-field>

        <v-btn color="primary" @click="registerCompany">APPROVE COMPANY</v-btn>
    </v-container>
</template>

<script>
    import * as service from '../service';

    export default {
        props: ['approval'],

        mounted() {
            this.getApprovalQuestions();
        },

        methods: {
            getApprovalQuestions() {
                service.getApprovalQuestions()
                    .then(({data}) => {
                        this.setApprovalQuestions(data);
                    })
            },

            setApprovalQuestions(questions) {
                _.each(questions, question => {
                    if (_.findIndex(this.approval.questions, approvalQuestion => approvalQuestion.name === question.name) === -1) {
                        this.approval.questions.push({
                            name: question.name,
                            approved: null,
                            comment: null
                        })
                    }
                })
            },

            registerCompany() {
                this.$bus.$emit('save-and-register-company');
            }
        }
    }
</script>