<template>
    <div class="mt-4">
        <v-tabs
                v-model="active"
                color="green"
                dark
                slider-color="white"
        >
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab">
                <auditor-details v-if="tab === 'Auditor details'"></auditor-details>
                <span v-if="tab === 'Client identity'">Client identity</span>
                <span v-if="tab === 'Income statement'">Income statement</span>
                <span v-if="tab === 'Balance sheet'">Balance sheet</span>
                <span v-if="tab === 'Analytics'">Analytics</span>
                <span v-if="tab === 'Questions to answer'">Questions to answer</span>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import auditorDetails from './auditor-details'

    export default {
        components: {auditorDetails},
        data() {
            return {
                tabs: ['Auditor details', 'Client identity', 'Income statement', 'Balance sheet', 'Analytics', 'Questions to answer'],
                active: null
            }
        }
    }
</script>