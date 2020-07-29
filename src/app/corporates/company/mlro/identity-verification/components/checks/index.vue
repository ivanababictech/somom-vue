<template>
    <v-dialog
            v-model="applicant.showChecks"
            max-width="800px"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Checks</span>
            </v-card-title>
            <v-card-text>
                <v-list two-line subheader>
                    <v-list-tile
                            v-for="(check, index) in applicant.checks"
                            :key="'check' + index"
                            avatar
                            @click="showCheck(check)"
                    >
                        <v-list-tile-avatar>
                            <v-icon class="grey lighten-1 white--text'">file</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ check.id }} - {{ check.status }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ check.created_at }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn color="success" v-if="check.result == 'clear'" @click="showCheck(check)">Clear</v-btn>
                            <v-btn color="info" v-else  @click="showCheck(check)">{{ check.result  }}</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card-text>
        </v-card>
        <check-view :applicant="applicant" :check="check" v-if="check.view"></check-view>
    </v-dialog>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import CheckView from './view'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false,
            check: {}
        }),

        props: ['applicant'],

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            showCheck(check) {
                this.check = check
                this.$set(this.check, 'view' , true)
            }
        },

        components: { CheckView }
    }
</script>