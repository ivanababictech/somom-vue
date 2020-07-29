<template>
    <v-container fluid grid-list-md>
        <div class="headline">Questionnaire</div>

        <v-layout row align-center v-for="(setting, settingIndex) in settings" :key="settingIndex">
            <v-flex xs12 md8>
                <h3>{{ setting.title }}</h3>

                <v-flex md12 style="padding-left: 15px" v-for="(item, itemIndex) in setting.items" :key="itemIndex">
                    <h4>{{ itemIndex + 1 }} {{ item.title }}</h4>
                    <v-select
                            :items="item.options"
                            v-model="questionnaire.settings[setting.id][item.id].selected"
                            @change="updateUserAnswer"
                            label="Select one or more"
                            item-text="title"
                            item-value="id"
                            multiple
                    ></v-select>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as settingsService from '@/app/settings/corporate/corporate-settings/service';
    import { mapMutations} from 'vuex';

    export default {
        props: ['questionnaire'],
        data() {
            return {
                settings: [],
            }
        },

        mounted() {
            this.getSettings();
        },

        methods: {
            ...mapMutations({
                setResults: 'corporate/setResults',
                updateResultScore: 'corporate/updateResultScore'
            }),

            getSettings() {
                settingsService.getSettings()
                    .then(response => {
                        response.data.forEach((setting) => {
                            if (this.questionnaire.settings[setting.id] === undefined) this.questionnaire.settings[setting.id] = {};
                            setting.items.forEach((item) => {
                                if (this.questionnaire.settings[setting.id][item.id] === undefined) {
                                    this.questionnaire.settings[setting.id][item.id] = {};
                                    this.questionnaire.settings[setting.id][item.id].selected = [];
                                }
                            })
                        })
                        this.setResults(response.data);
                        this.settings = response.data;
                        this.updateUserAnswer();
                    })
            },

            updateUserAnswer() {
                _.each(this.questionnaire.settings, (settings, resultId) => {
                    const resultIndex = _.findIndex(this.settings, result => result.id == resultId);
                    const result = this.settings[resultIndex];
                    let score = 0;
                    if (result !== undefined) {
                        _.each(settings, (setting, settingId) => {
                            if (setting.selected.length > 0) {
                                const itemIndex = _.findIndex(result.items, item => item.id == settingId);
                                const item = result.items[itemIndex];
                                _.each(setting.selected, optionId => {
                                    const optionIndex = _.findIndex(item.options, option => option.id == optionId);
                                    const option = item.options[optionIndex];
                                    score += option.mark;
                                });
                            }
                        });
                    }

                    const payload = {
                        resultId,
                        score
                    };

                    this.updateResultScore(payload);
                })
            }
        },

    }
</script>