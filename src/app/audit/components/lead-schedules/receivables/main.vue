<template>
    <div class="mt-3">
        <v-tabs slider-color="accent" v-model="active">
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab">
                <loans v-if="tab === 'Loans'"></loans>
                <vat v-if="tab === 'VAT'"></vat>
                <receivables v-if="tab === 'Receivables'"></receivables>
                <other-receivables v-if="tab === 'Other receivables'"></other-receivables>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import loans from './loans/main.vue'
    import vat from './vat/main.vue'
    import receivables from './receivables/main.vue'
    import otherReceivables from './other-receivables/main.vue'

    export default{
        components: {
            loans,
            vat,
            receivables,
            otherReceivables,
        },
        data: () => ({
            tabs: ['Loans', 'VAT', 'Receivables', 'Other receivables'],
            active: null
        })
    }
</script>