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
                <payables v-if="tab === 'Payables'"></payables>
                <other-payables v-if="tab === 'Other payables'"></other-payables>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import payables from './payables/main.vue'
    import otherPayables from './other-payables/main.vue'

    export default{
        components: {
            payables,
            otherPayables
        },
        data: () => ({
            tabs: ['Payables', 'Other payables'],
            active: null
        })
    }
</script>