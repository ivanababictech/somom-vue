<template>
    <v-card>
        <v-card-title>
            <h2>Current available Income tax rates</h2>
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
                                        @click="loadYearRates(year.year)">
                                    View
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
                <v-flex xs10>
                    <categories-rate-list
                            v-if="getCategoriesRate(taxCategories)"
                            :categories="getCategoriesRate(taxCategories)"
                            @submitted="changeRate">
                    </categories-rate-list>
                </v-flex>
                <v-flex xs5 v-if="getCategoriesNoRate(taxCategories).length > 0">
                    <categories-no-rate-list
                            v-if="getCategoriesNoRate(taxCategories)"
                            :categories="getCategoriesNoRate(taxCategories)"
                            @submitted="changeRate">
                    </categories-no-rate-list>
                </v-flex>
            </v-layout>
        </v-card-text>
        <form-income-tax-rate
                :showIncomeTaxForm="showIncomeTaxForm"
                :category="taxCategory"
                @closeDialog="closeForm"
                @saveRate="saveTaxCategory">
        </form-income-tax-rate>
    </v-card>
</template>

<script>
    import * as service from '../service'
    import CreateYear from "./layouts/create-year";
    import CategoriesNoRateList from "./categories-no-rate-list";
    import FormIncomeTaxRate from "./form-income-tax-rate";
    import CategoriesRateList from "./categories-rate-list";

    export default {
        components: {
            CategoriesRateList,
            FormIncomeTaxRate,
            CategoriesNoRateList,
            CreateYear
        },
        name: "income-tax-rates",
        created() {
            this.currentYear = new Date().getFullYear();
            this.fetchData();
        },
        methods: {
            fetchData() {
                service.getIncomeTaxRates(this.year)
                    .then(response => {
                        this.years = response.data.years;
                        this.taxCategories = response.data.tax_rates;
                        if (this.years.length > 0) {
                            this.lastYear = this.years[0].year;
                        }
                    })
            },
            getCategoriesNoRate(categories) {
                let arr = categories.filter((category) => {
                    return category.income_tax_rates.length === 0;
                });
                return arr;
            },
            getCategoriesRate(categories) {
                let arr = categories.filter((category) => {
                    return category.income_tax_rates.length > 0;
                });
                return arr;
            },
            changeRate(taxCategory) {
                this.taxCategory = taxCategory;
                this.showIncomeTaxForm = true;
            },
            saveYearRates(year) {
                if (parseInt(year) !== this.lastYear) {
                    this.currentYear = parseInt(year);
                    this.taxCategories.forEach(category => {
                        this.saveTaxCategory(category);
                    });
                    this.years.push({year: year});
                } else {
                    let arrIndexsId = [];
                    this.taxCategories.forEach(category => {
                        category.income_tax_rates.forEach(rate => {
                            arrIndexsId.push(rate.id);
                        })
                    });
                    let request = {
                        year: year,
                        index: arrIndexsId
                    };
                    service.updateYear(request)
                        .then(response => {
                        })
                }
            },
            loadYearRates(year) {
                this.currentYear = year;

                service.getIncomeTaxRates(year)
                    .then(response => {
                        this.taxCategories = response.data.tax_rates;
                    })
            },
            closeForm() {
                this.showIncomeTaxForm = false;
            },
            saveTaxCategory(category) {
                let index = this.taxCategories.indexOf(category);

                category.income_tax_rates.forEach(rate => {
                    if (rate.year != this.currentYear && String(rate.id) != 'null') {
                        rate.id = null;
                        rate.year = this.currentYear;
                    }
                });
                service.saveIncomeTaxRate(category)
                    .then(response => {
                        this.taxCategories[index] = response.data;
                        this.showIncomeTaxForm = false;
                    });
            }

        },
        data: function () {
            return {
                currentYear: null,
                lastYear: null,
                taxCategory: {},
                showIncomeTaxForm: false,
                years: [],
                taxCategories: [{
                    name: '',
                    income_tax_rates: []

                }],
            }
        }
    }
</script>

<style scoped>

</style>