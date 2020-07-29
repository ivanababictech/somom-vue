<template>
    <v-flex xs1>
        <v-autocomplete
                style="width: 70px"
                item-text="name"
                item-value="code"
                :items="countries"
                v-model="object.flag"
        >
            <template slot="selection" slot-scope="data">
                <flag :iso="data.item.code" />
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
                        </v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </template>
        </v-autocomplete>
    </v-flex>
</template>

<script>
    var countries = require('country-list')()
    import * as userService from '@/app/users/service'

    export default {
        data() {
            return {
                countries: countries.getData(),
            }
        },

        props: ['object', 'countryClass', 'mobileClass', 'label'],

        mounted() {
            if(!this.object.flag) {
                this.getDefaultCountryCode()
            }
        },

        methods: {
            getDefaultCountryCode() {
                userService.getIpInfo()
                    .then(response => {
                        this.$set(this.object, 'flag', response.data.country)
                    })
            }
        }
    }
</script>