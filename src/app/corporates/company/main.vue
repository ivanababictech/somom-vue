<template>
        <company-form
                :corporate="corporate"
                @submit="updateCompany"
                v-if="corporate.id">
        </company-form>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import CompanyForm from './form';
    import * as corporateService from './../service';
    import * as settingsService from '@/app/settings/corporate/corporate-settings/service';
    import * as declerationService from '@/app/settings/corporate/due-diligence/components/declerations/service';
    import { getQuestions as getQuestionnaire }  from '@/app/settings/corporate/due-diligence/components/questionnaire/service';

    export default {
        data() {
            return {
                corporate: {
                    company: {},
                    data: {}
                },
            }
        },

        mounted() {
            this.getCorporate();
        },

        created() {
            this.$bus.$on('save-and-register-company', () => {
                this.updateCompany(true)
            });
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                setDeclerations: 'corporate/setDeclerations',
                setQuestions: 'questionnaire/setQuestions'
            }),

            getCorporate() {
                corporateService.show()
                    .then(response => {
                        this.corporate = response.data

                        this.getDeclerations();
                        this.getDueDiligenceQuestionnaire();
                    })
            },

            getSettings() {
                settingsService.getSettings()
                    .then(response => {
                        this.setting = response.data
                    })
            },

            updateCompany(registerCompany = false) {
                corporateService.update(this.corporate)
                    .then(() => {
                        if (registerCompany) {
                            corporateService.registerCompany(this.$route.params.corporate_id)
                                .then(() => {
                                    this.setMessage({type: 'success', message: 'Company approved successfully'});
                                    this.$router.push({name: 'corporates.index'});
                                })
                        }
                    })
            },

            getDueDiligenceQuestionnaire() {
                getQuestionnaire()
                    .then(({data}) => this.setQuestions(data))
            },

            getDeclerations() {
                declerationService.get()
                    .then(({data}) => this.setDeclerations(data));
            }
        },

        components: { CompanyForm },

        destroyed() {
            this.$bus.$off('save-and-register-company')
        },
    }
</script>