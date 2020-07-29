<template>
    <v-flex flex xs12 sm6 md4 xl4>
        <v-card flat>
            <v-container>
                <v-flex xs12 sm12>
                    <v-select
                            item-text="title"
                            item-value="id"
                            label="Type "
                            v-model="document.wealth_source_id"
                            :items="wealthSources"
                            :disabled="true"
                    ></v-select>
                </v-flex>
                <v-subheader>Details required</v-subheader>
                <type-income-savings v-if="document.wealth_source_id == 1" :document="document"></type-income-savings>
                <type-life-policy v-if="document.wealth_source_id == 2" :document="document"></type-life-policy>
                <type-divorce-settlement v-if="document.wealth_source_id == 3" :document="document"></type-divorce-settlement>
                <type-sale-investments v-if="document.wealth_source_id == 4" :document="document"></type-sale-investments>
                <type-sale-property v-if="document.wealth_source_id == 5" :document="document"></type-sale-property>
                <type-self-employment v-if="document.wealth_source_id == 6" :document="document"></type-self-employment>
                <type-company-sale v-if="document.wealth_source_id == 7" :document="document"></type-company-sale>
                <type-inheritance v-if="document.wealth_source_id == 8" :document="document"@formData="formData"></type-inheritance>
            </v-container>
        </v-card>
    </v-flex>
</template>
<script>
    import TypeLifePolicy from './types/life-policy'
    import TypeIncomeSavings from './types/income-savings'
    import TypeDivorceSettlement from './types/divorce-settlement'
    import TypeSaleInvestments from './types/sale-investments'
    import TypeSaleProperty from './types/sale-property'
    import TypeSelfEmployment from './types/self-employment'
    import TypeCompanySale from './types/company-sale'
    import TypeInheritance from './types/inheritance'

    export default {
        data() {
            return {

            }
        },

        props: ['wealthSources', 'document'],

        components: {
            TypeIncomeSavings,
            TypeLifePolicy,
            TypeSaleInvestments,
            TypeDivorceSettlement,
            TypeSaleProperty,
            TypeSelfEmployment,
            TypeCompanySale,
            TypeInheritance
        }
    }
</script>
