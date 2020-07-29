<template>
    <v-container fluid grid-list-md>
        <div class="headline">Company details</div>
        <v-layout row wrap v-if="company">
            <v-flex md4>
                <v-text-field
                        v-model="company.name"
                        label="Company name"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="company.registration_number"
                        label="Company registration number"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="company.country"
                        label="Company registration date"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <label>Company registered address</label>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.name"
                        label="Door name"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.email"
                        label="Street name"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.email"
                        label="Post code"
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.email"
                        label="City"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <countries v-model="companyDetails.country" label="Country"></countries>
            </v-flex>
        </v-layout>

        <label>Authorised share capital</label>
        <v-btn fab dark small color="primary" @click="addShareCapital">
            <v-icon dark>add</v-icon>
        </v-btn>
        <v-layout row v-for="(capital, index) in companyDetails.shareCapitals" :key="index">
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.shareCapitals[index].number"
                        label="Number of shares"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-select
                        v-model="companyDetails.shareCapitals[index].type"
                        :items="shares"
                        item-text="name"
                        item-value="id"
                        label="Type of shares"
                ></v-select>
                <!--<v-text-field-->
                <!--v-model="companyDetails.shareCapital.type"-->
                <!--label="Type of shares"-->
                <!--&gt;</v-text-field>-->
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.shareCapitals[index].class"
                        label="Class of shares"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.shareCapitals[index].value"
                        label="Value of shares"
                ></v-text-field>
            </v-flex>
            <v-flex xs2 class="text-xs-right">
                <v-btn fab dark small color="danger" v-if="companyDetails.shareCapitals.length > 1" @click="removeShareCapital(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <label>Issued</label>
        <v-btn fab dark small color="primary" @click="addIssue">
            <v-icon dark>add</v-icon>
        </v-btn>
        <v-layout row v-for="(issue, index) in companyDetails.issues" :key="`${index}-issue`">
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.issues[index].number"
                        label="Number of shares"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <!--<v-text-field-->
                <!--v-model="companyDetails.issued.type"-->
                <!--label="Type of shares"-->
                <!--&gt;</v-text-field>-->

                <v-select
                        v-model="companyDetails.issues[index].type"
                        :items="shares"
                        item-text="name"
                        item-value="id"
                        label="Type of shares"
                ></v-select>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.issues[index].class"
                        label="Class of shares"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.issues[index].value"
                        label="Value of shares"
                ></v-text-field>
            </v-flex>
            <v-flex md4>
                <v-text-field
                        v-model="companyDetails.issues[index].value"
                        label="% Paid up"
                ></v-text-field>
            </v-flex>
            <v-flex xs2 class="text-xs-right">
                <v-btn fab dark small color="danger" v-if="companyDetails.issues.length > 1" @click="removeIssue(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: ['companyDetails', 'company'],

        mounted() {
            this.fetchShares;
        },

        computed: {
            ...mapGetters({
                shares: 'corporate/shares'
            })
        },

        methods: {
            ...mapActions({
                fetchShares: 'corporate/fetchShares',
            }),

            addShareCapital() {
                this.companyDetails.shareCapitals.push({
                    number: null,
                    type: null,
                    class: null,
                    value: null
                })
            },

            addIssue() {
                this.companyDetails.issues.push({
                    number: null,
                    type: null,
                    class: null,
                    value: null
                })
            },

            removeShareCapital(index) {
                this.companyDetails.shareCapitals.splice(index, 1);
            },

            removeIssue(index) {
                this.companyDetails.issues.splice(index, 1);
            }
        },
    }
</script>