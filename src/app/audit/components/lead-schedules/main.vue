<template>
    <div>
        <v-tabs slider-color="yellow" v-model="active">
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab" >
                <income-statement v-if="tab === 'Income statement'"></income-statement>
                <taxation v-if="tab === 'Taxation'"></taxation>
                <equity v-if="tab === 'Equity'"></equity>
                <intangible-assets v-if="tab === 'Intangible assets'"></intangible-assets>
                <tangible-assets v-if="tab === 'Tangible assets'"></tangible-assets>
                <investments v-if="tab === 'Investments'"></investments>
                <inventory v-if="tab === 'Inventory'"></inventory>
                <receivables v-if="tab === 'Receivables'"></receivables>
                <payables v-if="tab === 'Payables'"></payables>
                <bank v-if="tab === 'Bank'"></bank>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import incomeStatement from './income-statement/main.vue'
    import taxation from './taxation/main.vue'
    import equity from './equity/main.vue'
    import intangibleAssets from './intangible-assets/main.vue'
    import tangibleAssets from './tangible-assets/main.vue'
    import investments from './investments/main.vue'
    import inventory from './inventory/main.vue'
    import receivables from './receivables/main.vue'
    import payables from './payables/main.vue'
    import bank from './bank/main.vue'

    export default{
        components: {
            incomeStatement,
            taxation,
            equity,
            intangibleAssets,
            tangibleAssets,
            investments,
            inventory,
            receivables,
            payables,
            bank
        },
        data: () => ({
            tabs: [
                'Income statement',
                'Taxation',
                'Equity',
                'Intangible assets',
                'Tangible assets',
                'Investments',
                'Inventory',
                'Receivables',
                'Payables',
                'Bank'
            ],
            active: null
        })
    }
</script>

<style>
    .audit-tabs .v-tabs__container{
        background-color: #ffeb3b;
    }
    .audit-tabs a{
        color: #000;
        font-weight: bold;
        font-family: Roboto, sans-serif;
    }
</style>