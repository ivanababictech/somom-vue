<template>
    <v-flex xs10 offset-xs1 class="mt-4">
        <v-layout row class="success-text title">
            <v-flex xs3>
                <span>Sub-account name</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Balance as per Trail balance</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Balance as per audit testing</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Difference</span>
            </v-flex>
        </v-layout>

        <template v-for="subAccount in subAccounts">
            <v-layout row mt-2 align-center mt-3 v-if="checkSubaccount(subAccount.name)">
                <v-flex xs3>
                    <span class="subheading grey--text text--darken-3"><strong>{{ subAccount.name }}</strong></span>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments">
                        </v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="pt-0"
                                v-model="subAccount.value"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments - subAccount.value">
                        </v-text-field>
                    </v-flex>
                </v-flex>
            </v-layout>
        </template>


        <v-layout row mt-2 align-center>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Total</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="pt-0" :value="totalBalancePerTrail"></v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="pt-0" :value="totalBalancePerAudit"></v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="pt-0" :value="totalDifference"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">1. Reviewed supporting documentation to determine ifother income is correctly stated.</span>
        </v-layout>

        <template v-for="subAccount in subAccounts">
            <template>
                <v-layout mt-4>
            <span class="subheading grey--text text--darken-3"
                  style="font-weight: 700">{{ subAccount.name }}</span>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-flex xs11>
                            <v-text-field hide-details :label="subAccount.name"></v-text-field>
                        </v-flex>
                    </v-flex>
                    <v-flex xs6>
                        <v-flex xs11>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.name"
                                    v-model="subAccount.value"
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </template>
        </template>

        <v-layout mt-4>
            <span class="subheading">2. Obtained supportig documentation related to  finance cost.</span>
        </v-layout>

        <template v-for="subAccount in subAccounts">
            <v-btn class="success">{{ subAccount.name }}</v-btn><br/>
        </template>

        <v-layout row mt-4>
            <v-flex xs8>
                <span class="primary-text subheading" style="font-weight: 700">Additional comments</span>
                <v-textarea label="Enter comments (optional)"></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row mt-4>
            <v-flex xs8>
                <span class="primary-text subheading" style="font-weight: 700">Conclusion</span><br/>
                <span class="subheading">Test satisfactorily</span>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    import isAccount from '../../mixins/isAccount'

    export default{
        mixins: [isAccount],
        data: () => ({
            subAccounts: [
                {
                    name: 'Tax refundable',
                    value: 0
                },
                {
                    name: 'Other income',
                    value: 0
                },
                {
                    name: 'Disposal of assets',
                    value: 0
                },
                {
                    name: 'Fair value movement',
                    value: 0
                }
            ]
        }),
        methods: {
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Tax refundable'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Other income'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Disposal of assets'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Fair value movement'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        }
    }
</script>