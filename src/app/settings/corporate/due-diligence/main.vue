<template>
    <v-container fluid>
        <v-layout row align-center>
            <div class="headline">Due Diligence</div>
        </v-layout>
        <v-tabs grow color="accent" v-model="tab">
            <v-tab key="questionnaire">Questionnaire</v-tab>
            <v-tab key="declerations">Declerations</v-tab>
            <v-tab key="reference-letters">Reference Letters</v-tab>
            <v-tab-item key="questionnaire">
                <questionnaire v-if="tab === 0"></questionnaire>
            </v-tab-item>
            <v-tab-item key="declerations">
                <declerations v-if="tab === 1"></declerations>
            </v-tab-item>
            <v-tab-item key="reference-letters">
                <reference-letters v-if="tab === 2"></reference-letters>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import Questionnaire from './components/questionnaire/main';
    import Declerations from './components/declerations/main';
    import ReferenceLetters from './components/reference-letters/main';
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
                tabs: [
                    'questionnaire',
                    'declerations',
                    'reference-letters'
                ]
            }
        },

        computed: {
            tab: {
                get() {
                    return _.indexOf(this.tabs, this.$store.getters['dueDiligence/currentTab']);
                },

                set(index) {
                    this.setCurrentTab(this.tabs[index]);
                }
            }
        },

        methods: {
            ...mapMutations('dueDiligence', [
                'setCurrentTab'
            ])
        },

        components: {
            Questionnaire,
            Declerations,
            ReferenceLetters
        }
    }
</script>
