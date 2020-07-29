<template>
    <v-layout row wrap align-center>
        <v-flex xs12 md3>
            <v-layout row align-center>
                <v-flex xs4>
                    <v-subheader><h2>Month</h2></v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-select
                            :items="monthList"
                            v-model="month"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md3>
            <v-layout row align-center>
                <v-flex xs4>
                    <v-subheader><h2>Year</h2></v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-select
                            :items="yearList"
                            v-model="year"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md3 pl-3>
            <v-btn color="primary">Save</v-btn>
        </v-flex>
        <v-flex xs12 md3>
            <v-btn @click="linkTo('addnewemployee')" color="primary">Add new employee</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import * as service from '../service'
    export default {
        name: "interval-panel",
        data: () => ({
                month: null,
                year: null,
                monthList: null,
                yearList: null
            }
        ),
        methods: {
            getMonthList: () => this.monthList = service.getMonthList(),
            getYearList: () => this.yearList = service.getYearList()
        },
        created () {
            this.getMonthList();
            this.getYearList();
        }
    }
</script>

<style scoped>

</style>