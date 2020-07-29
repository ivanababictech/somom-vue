<template>
    <v-card>
            <v-card-text>
                <v-tabs grow v-model="currentTab">
                    <v-tab v-for="(tab, index) in tabs" :key="index">
                        {{ tab }}
                    </v-tab>
                    <v-tab-item
                            v-for="(tab, index) in tabs"
                            :key="index"
                            :value="index"
                            v-if="currentTab == index"
                    >
                        <company-profile v-if="currentTab === 1"></company-profile>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
    </v-card>
</template>

<script>
    import CompanyProfile from './components/company-profile/index';

    export default {
        data () {
            return {
                currentTab: 0,
                tabs: [
                    'Company involvements',
                    'Company Profile',
                    'Documents',
                    'Bank transactions',
                    'Issues',
                    'Risk assesment',
                    'STR',
                ]
            }
        },

        components: {
            CompanyProfile,
        },
    }
</script>