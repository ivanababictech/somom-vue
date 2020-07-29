<template>
    <div class="px-2">
        <v-layout row mt-2>
            <v-flex xs6 py-2 style="border: 2px solid#000">
                <v-layout row fill-height align-center pl-2>
                    <span>Audit steps</span>
                </v-layout>
            </v-flex>
            <v-flex xs6 py-2 style="border: 2px solid#000;border-left: 0px">
                <v-layout row fill-height align-center pl-2>
                    <span>Remarks</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout column v-for="item in items" :key="item.title">
            <v-layout row v-for="question in item.questions" :key="question.text" align-center>
                <v-flex xs6 pa-3 style="border: 1px solid#000">
                    {{ question.text }}
                </v-flex>
                <v-flex xs6 pa-3 style="border: 1px solid#000;border-left: 0px">
                    Step remark
                </v-flex>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
    import * as acceptanceService from '@/app/settings/audit/acceptance/service'

    export default {
        data: () => ({
            items: []
        }),
        created () {
            this.fetchAcceptances()
        },
        methods: {
            fetchAcceptances() {
                acceptanceService.get()
                    .then(response => {
                        this.items = JSON.parse(response) || []
                    })
            },
        }
    }
</script>