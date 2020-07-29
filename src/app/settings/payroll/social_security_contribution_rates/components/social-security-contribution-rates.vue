<template>
    <v-card>
        <v-card-title>
            <h2>Social Security contribution rates</h2>
        </v-card-title>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xs2>
                    <v-list>
                        <v-list-tile v-if="years" v-for="year of years" :key="year.year">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <span :class="{ 'blue--text' : year.year === currentYear}">
                                        {{year.year}}
                                    </span>
                                </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn
                                        color="primary"
                                       @click="loadYearRates(year.year)">View
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <create-year @saveYearRates="saveYearRates"></create-year>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs5 v-if="getCategoriesNoRate(socialSecurityContributionCategories).length">
                    <categories-no-rate-list
                            v-if="getCategoriesNoRate(socialSecurityContributionCategories)"
                            :categories="getCategoriesNoRate(socialSecurityContributionCategories)"
                            @submitted="changeRate">
                    </categories-no-rate-list>
                </v-flex>
            </v-layout>
        </v-card-text>
        <form-social-security-contribution-rates
                :showSocialSecurityContributionForm="showSocialSecurityContributionForm"
                :category="socialSecurityContributionCategory"
                @closeDialog="closeForm"
                @saveRate="saveSocialCategory">
        </form-social-security-contribution-rates>
    </v-card>
</template>

<script>
    import * as service from '../service';
    import CreateYear from "./layouts/create-year";
    import CategoriesNoRateList from "./categories-no-rate-list";
    import CategoriesRateList from "./categories-rate-list";
    import FormSocialSecurityContributionRates from "./form-social-security-contribution-rates";

    export default {
        components: {
            FormSocialSecurityContributionRates,
            CreateYear,
            CategoriesNoRateList,
            CategoriesRateList
        },
        name: "social-security-contribution-rates",
        created() {
            this.currentYear = new Date().getFullYear();
            this.fetchData();
        },
        methods: {
            fetchData() {
                service.getSocialSecurityContributionRates(this.year)
                    .then(response => {
                        this.years = response.data.years;
                        this.socialSecurityContributionCategories = response.data.social_rates;
                        if (this.years.length > 0) {
                            this.lastYear = this.years[0].year;
                        }
                    })
            },
            getCategoriesRate(categories) {
                let arr = categories.filter((category) => {
                    return category.social_security_contribution_rates != null;
                });
                return arr;
            },
            getCategoriesNoRate(categories) {
                let arr = categories.filter((category) => {
                    return category.social_security_contribution_rates === null;
                });
                return arr;
            },
            changeRate(socCategory) {
                this.socialSecurityContributionCategory = socCategory;
                this.showSocialSecurityContributionForm = true;
            },
            loadYearRates(year) {
                this.currentYear = year;
                service.getSocialSecurityContributionRates(year)
                    .then(response => {
                        this.socialSecurityContributionCategories = response.data.social_rates;
                    })
            },
            saveYearRates(year) {
                if (parseInt(year) !== this.lastYear) {
                    let newYear = true;
                    this.currentYear = parseInt(year);
                    this.socialSecurityContributionCategories.forEach( category => {
                        if(category.social_security_contribution_rates != null){
                            this.saveSocialCategory(category);
                        }
                    });
                    this.years.forEach( years => {
                        if(years.year == year){
                            newYear = false;
                        }
                    });
                    if(newYear){
                        this.years.push({year: year});
                    }
                } else {
                    let arrIndexsId = [];
                    this.socialSecurityContributionCategories.forEach( category => {
                            arrIndexsId.push(category.socialSecurityContributionRates.id);
                    } );
                    let request = {
                        year: year,
                        index: arrIndexsId
                    };
                    service.updateYear(request)
                        .then( response => {
                        })
                }
            },
            closeForm() {
                this.showSocialSecurityContributionForm = false;
            },
            saveSocialCategory(category) {

                let index = this.socialSecurityContributionCategories.indexOf(category);

                if (category.social_security_contribution_rates.year != this.currentYear
                    && String(category.social_security_contribution_rates.id) != 'null') {
                    category.social_security_contribution_rates.id = null;
                    category.social_security_contribution_rates.year = this.currentYear;
                }
                service.saveSocialSecurityContributionRate(category)
                    .then(response => {
                        this.socialSecurityContributionCategories[index] = response.data;
                        this.showSocialSecurityContributionForm = false;
                    });
            }
        },
        data: function () {
            return {
                currentYear: null,
                lastYear: null,
                socialSecurityContributionCategory: {},
                showSocialSecurityContributionForm: false,
                years: [],
                socialSecurityContributionCategories: [],
            }
        }
    }
</script>

<style scoped>

</style>