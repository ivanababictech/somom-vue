<template>
    <v-container fluid>
        <div class="headline">Create Corporate Settings</div>
        <settings-form type="create" :item="item"></settings-form>
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

        mounted() {
          this.$bus.$on('createSettings', (title) => {
              settingsService.createSettings(title)
                  .then(this.$router.push({ name: 'corporate.corporate-settings' }))
          })
        },

        destroyed() {
            this.$bus.$off('createSettings');
        },

        components: {settingsForm}
    }
</script>