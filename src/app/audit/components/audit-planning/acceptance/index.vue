<!--<template>-->
    <!--<div class="px-2">-->
        <!--<v-layout row mt-2>-->
            <!--<v-flex xs10></v-flex>-->
            <!--<v-flex xs1 py-2 style="border: 2px solid#000">-->
                <!--<v-layout row fill-height align-center pl-2>-->
                    <!--<span>Yes</span>-->
                <!--</v-layout>-->
            <!--</v-flex>-->
            <!--<v-flex xs1 py-2 style="border: 2px solid#000;border-left: 0px">-->
                <!--<v-layout row fill-height align-center pl-2>-->
                    <!--<span>No</span>-->
                <!--</v-layout>-->
            <!--</v-flex>-->
        <!--</v-layout>-->
        <!--<v-layout column v-for="item in items" :key="item.title" class="mt-4">-->
            <!--<v-layout row><span>{{ item.title }}</span></v-layout>-->
            <!--<v-layout row v-for="question in item.questions" :key="question.text" align-center>-->
                <!--<v-flex xs10>-->
                    <!--<span>{{ question.text }}</span>-->
                <!--</v-flex>-->
                <!--<v-flex xs1 py-3 style="border: 1px solid#000">-->
                    <!--&lt;!&ndash;<v-radio-group v-model="question.value" row hide-details>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-radio label="Yes" :value="true"></v-radio>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-radio label="No" :value="false"></v-radio>&ndash;&gt;-->
                    <!--&lt;!&ndash;</v-radio-group>&ndash;&gt;-->
                <!--</v-flex>-->
                <!--<v-flex xs1 py-3 style="border: 1px solid#000;border-left: 0px"></v-flex>-->
            <!--</v-layout>-->
        <!--</v-layout>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import * as acceptanceService from '@/app/settings/audit/acceptance/service'-->

    <!--export default {-->
        <!--data: () => ({-->
            <!--items: []-->
        <!--}),-->
        <!--created () {-->
            <!--this.fetchAcceptances()-->
        <!--},-->
        <!--methods: {-->
            <!--fetchAcceptances() {-->
                <!--acceptanceService.get()-->
                    <!--.then(response => {-->
                        <!--this.items = JSON.parse(response) || []-->
                    <!--})-->
            <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->