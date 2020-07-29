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
                <property-plan-equipment v-if="tab === 'Property, plant & equipment'"></property-plan-equipment>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import propertyPlanEquipment from '../tangible-assets/property-plan-equipment/main.vue'

    export default{
        components: {
            propertyPlanEquipment
        },
        data: () => ({
            tabs: ['Property, plant & equipment'],
            active: null
        })
    }
</script>