<template>
    <div class="px-2">
        <v-layout row mt-2>
            <v-flex xs9></v-flex>
            <v-flex xs1 py-2 style="border: 2px solid#000">
                <v-layout row fill-height align-center pl-2>
                    <span>Low</span>
                </v-layout>
            </v-flex>
            <v-flex xs1 py-2 style="border: 2px solid#000;border-left: 0px">
                <v-layout row fill-height align-center pl-2>
                    <span>Medium</span>
                </v-layout>
            </v-flex>
            <v-flex xs1 py-2 style="border: 2px solid#000;border-left: 0px">
                <v-layout row fill-height align-center pl-2>
                    <span>High</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout column v-for="item in assessments" :key="item.title" class="mt-4">
            <v-layout row><span>{{ item.title }}</span></v-layout>
            <v-layout row v-for="question in item.questions" :key="question.question" align-center>
                <v-flex xs9>
                    <span>{{ question.text }}</span>
                </v-flex>
                <v-flex xs1 py-3 style="border: 1px solid#000" class="text-xs-center">
                    <span>{{ question.low.text }}</span>
                </v-flex>
                <v-flex xs1 py-3 style="border: 1px solid#000;border-left: 0px" class="text-xs-center">
                    <span>{{ question.medium.text }}</span>
                </v-flex>
                <v-flex xs1 py-3 style="border: 1px solid#000;border-left: 0px" class="text-xs-center">
                    <span>{{ question.high.text }}</span>
                </v-flex>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
    import * as assessmentsService from '@/app/settings/audit/general-risk-assessment/service'

    export default {
        data: () => ({
            assessments: []
        }),
        mounted() {
            this.fetchAssessments()
        },
        methods: {
            fetchAssessments() {
                assessmentsService.get()
                    .then(response => {
                        this.assessments = JSON.parse(response) || []
                    })
            },
        }
    }
</script>