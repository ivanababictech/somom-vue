<template>
    <v-dialog v-model="showSocialSecurityContributionForm" persistent max-width="500px" lazy-valisation>
        <v-card>
            <v-card-title>
                {{ category.name }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-layout row wrap>
                        <v-flex xs10>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 mr-6>
                                    <v-text-field
                                            label="Weekly rate"
                                            v-model="socialSecurityContributionRates.weekly_rate">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 mr-6>
                                    <v-text-field
                                            label="Weekly maximum"
                                            v-model="socialSecurityContributionRates.weekly_max"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-btn
                            color="primary"
                            @click="save"
                    >
                        Save
                    </v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click="closeDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "form-social-security-contribution-rates",
        props: ['category', 'showSocialSecurityContributionForm'],
        watch : {
            showSocialSecurityContributionForm: function () {
                if (this.showSocialSecurityContributionForm === true){
                     this.socialSecurityContributionRates = {weekly_rate: null, weekly_max: null};
                     this.socialSecurityContributionRates =
                         this.category.social_security_contribution_rates != null ?
                             this.category.social_security_contribution_rates : this.socialSecurityContributionRates;
                }
            }
        },
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    this.category.social_security_contribution_rates = this.socialSecurityContributionRates;
                    this.$emit('saveRate', this.category);
                }
            },
            closeDialog() {
                this.$emit('closeDialog');
            }
        },
        data: function () {
            return {
                rateRules: [
                    v => (String(v) !== 'null') || 'Rate is required',
                ],
                socialSecurityContributionRates: []

            }
        }
    }
</script>

<style scoped>

</style>