<template>
    <v-container fluid>
        <div class="headline">Create {{ corporateSetting.title }} item</div>
        <settings-item-form type="create" :item="item" :items="itemOptions" :corporateSetting="corporateSetting"></settings-item-form>
    </v-container>
</template>

<script>
    import * as settingsService from  '.././service'
    import settingsItemForm from './settingsItemForm'
    export default {
        data() {
            return {
                corporateSetting: {},
                item: {},
                itemOptions: [{}]
            }
        },
        computed: {
            corporateSettingsId() {
                return this.$route.params.corporateSettingsId
            },
        },
        created() {
            settingsService.getCorporateSettingsById(this.corporateSettingsId)
                .then(response => this.corporateSetting = response.data)
        },
        mounted() {
            this.$bus.$on('createSettingsItem', (item) => {
                settingsService.createSettingsItem(this.corporateSetting.id, item)
                    .then(this.$router.push({ name: 'corporate.corporate-settings.items', params: { corporateSettingsId: this.corporateSetting.id } }))
            })
        },

        destroyed() {
            this.$bus.$off('createSettingsItem');
        },

        components: {settingsItemForm}
    }
</script>