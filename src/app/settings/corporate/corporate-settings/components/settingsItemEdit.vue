<template>
    <v-container fluid>
        <div class="headline">Edit {{ corporateSetting.title }} questions</div>
        <settings-item-form type="edit" :item="item" :items="item.options" :corporateSetting="corporateSetting"></settings-item-form>
    </v-container>
</template>

<script>
    import * as settingsService from  '.././service'
    import settingsItemForm from './settingsItemForm'
    export default {
        data() {
            return {
                corporateSetting: {},
                item: {}
            }
        },
        computed: {
            corporateSettingsId() {
                return this.$route.params.corporateSettingsId
            },
            corporateSettingsItemId() {
                return this.$route.params.corporateSettingsItemId
            },
        },
        created() {
            settingsService.getCorporateSettingsById(this.corporateSettingsId)
                .then(response => this.corporateSetting = response.data)
            settingsService.getSettingItemById(this.corporateSettingsItemId)
                .then(response => {
                    this.item = response.data.filter(el => {
                        if (el.id === this.corporateSettingsItemId) return el
                    })[0]
                })
        },
        mounted() {
            this.$bus.$on('editSettingsItem', (item) => {
                console.debug(item, 'item');
                settingsService.updateSettingsItem(item.id, item)
                    .then(this.$router.push({ name: 'corporate.corporate-settings.items', params: { corporateSettingsId: this.corporateSetting.id } }))
            })
        },

        destroyed() {
            this.$bus.$off('editSettingsItem');
        },

        components: {settingsItemForm}
    }
</script>