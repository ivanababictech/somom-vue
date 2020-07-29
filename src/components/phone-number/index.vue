<template>
    <v-layout row wrap>
        <v-flex :class="[countryClass || 'xs4']">
            <v-autocomplete
                    style="min-width: 100px"
                    item-text="name"
                    item-value="code"
                    :items="countries"
                    v-model="object.country_code"
            >
                <template slot="selection" slot-scope="data">
                    <flag :iso="data.item.code" />
                    <span style="color: #999;margin-left: 5px;">
                        {{ getCountryDialCode(data.item.code) }}
                    </span>
                </template>
                <template slot="item" slot-scope="data">
                    <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                        <v-list-tile-avatar>
                            <flag :iso="data.item.code" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ data.item.name }}
                                <span style="color: #999;float: right">
                                    {{ getCountryDialCode(data.item.code) }}
                                </span>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </template>
                </template>
            </v-autocomplete>
        </v-flex>
        <v-flex :class="[mobileClass ? mobileClass : 'xs8']">
            <v-text-field
                    :label="label || 'Mobile'"
                    v-model="object.mobile"
            ></v-text-field>
        </v-flex>
    </v-layout>
</template>

<script>
    import PhonesData from '@/plugins/phones-data'
    var countries = require('country-list')()
    import * as userService from '@/app/users/service'

    export default {
        data() {
            return {
                countries: countries.getData(),
                phonesData: PhonesData,
                phoneNumber: this.object.mobile,
            }
        },

        props: ['object', 'countryClass', 'mobileClass', 'label'],

        mounted() {
            if(!this.object.country_code) {
                this.getDefaultCountryCode()
            }
        },

        methods: {

            getCountryDialCode(countryCode) {
                return '(+' + (this.phonesData[(countryCode).toLowerCase()] ? this.phonesData[(countryCode).toLowerCase()].dialCode  : '') + ')'
            },

            getDefaultCountryCode() {
                userService.getIpInfo()
                    .then(response => {
                        this.$set(this.object, 'country_code', response.data.country)
                    })
            }
        },

        watch: {
            /**
             * Merge country phone code and phone number
             *
             * @param value
             */
            phoneNumber(value) {
                this.object.mobile = this.phonesData[(this.object.country_code).toLowerCase()].dialCode + value
            }
        },
    }
</script>

<style scoped>

</style>