<template>
    <v-layout row wrap>
        <v-flex xs12 md6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Create Engagement Letter Template</div>
                <letter-template-form :letterTemplate="letterTemplate" @submit="createLetterTemplate"></letter-template-form>
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
                letterTemplate: {
                    data: {
                        paragraphs: []
                    }
                }
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            createLetterTemplate() {
                letterTemplateService.create(this.letterTemplate)
                    .then(response => {
                        this.$router.push({ name: 'global.letter-templates' })

                        this.setMessage({ type: 'success', message: 'Document has been created successfully!' })
                    })
            }
        },

        components: { LetterTemplateForm }
    }
</script>

<style scoped>

</style>