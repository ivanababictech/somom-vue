<template>
    <div class="px-2">
        <v-layout row fill-height align-center style="border-bottom: 1px solid#aaa">
            <v-flex xs6>
                <span class="body-2">Issues</span>
            </v-flex>
            <v-flex xs6>
                <span class="body-2">Comments</span>
            </v-flex>
        </v-layout>
        <v-layout column v-for="checklist in checklists" :key="checklist.input_issue" class="mt-4" style="border-bottom: 1px solid #ccc">
            <v-layout row fill-height align-center>
                <v-flex xs6>
                    <span>{{ checklist.input_issue }}</span>
                </v-flex>
                <v-flex xs6>
                    <span>{{ checklist.comments }}</span>
                </v-flex>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
    import * as checklistsService from '@/app/settings/audit/audit-planning-control-checklist/service'

    export default {
        data: () => ({
            checklists: []
        }),
        created () {
            this.fetchChecklists()
        },
        methods: {
            fetchChecklists() {
                checklistsService.get()
                    .then(response => {
                        this.checklists = JSON.parse(response) || []
                    })
            },
        }
    }
</script>