<template>
    <v-container fluid>
        <div class="headline">Edit Corporate Settings</div>
        <settings-form type="edit" :item="item"></settings-form>
    </v-container>
</template>

<script>
    import * as settingsService from  '.././service'
    import settingsForm from './settingsForm'
    export default {
        data() {
            return {
                item: {}
            }
        },
        
        computed: {
            corporateSettingsId() {
                return this.$route.params.corporateSettingsId
            },
        },

        mounted() {
            this.$bus.$on('editSettings', (item) => {
                settingsService.updateSettings(item)
                    .then(this.$router.push({ name: 'corporate.corporate-settings' }))
            })
            settingsService.getCorporateSettingsById(this.corporateSettingsId)
                .then(response => this.item = response.data)
        },

        destroyed() {
            this.$bus.$off('editSettings');
        },

        components: {settingsForm}
    }
</script>