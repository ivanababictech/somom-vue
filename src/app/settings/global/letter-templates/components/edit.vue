<template>
    <v-layout row wrap>
        <v-flex xs6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Edit Engagement Letter Template</div>
                <letter-template-form :letterTemplate="letterTemplate" @submit="updateLetterTemplate" v-if="letterTemplate.id"></letter-template-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import LetterTemplateForm from './form'
    import * as letterTemplateService from '../service'

    export default {
        data() {
            return {
                letterTemplate: {}
            }
        },

        mounted() {
            this.getLetterTemplate()
        },

        methods: {
            ...mapActions(['setMessage']),

            updateLetterTemplate() {
                letterTemplateService.update(this.letterTemplate)
                    .then(response => {
                        this.$router.push({ name: 'global.letter-templates' })

                        this.setMessage({ type: 'success', message: 'Document has been updated successfully!' })
                    })
            },

            getLetterTemplate() {
                letterTemplateService.find(this.letterTemplateId)
                    .then(response => this.letterTemplate = response.data)
            }
        },

        computed: {
            letterTemplateId() {
                return this.$route.params.letterTemplateId
            },
        },

        components: { LetterTemplateForm }
    }
</script>

<style scoped>

</style>