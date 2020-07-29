<template>
    <v-layout row wrap>
        <v-flex xs12 md6 mx-auto elevation-6>
            <v-container fluid>
                <div class="headline">Source of wealth documents</div>
                <source-of-wealth-form :sourceOfWealth="sourceOfWealth" @submit="createDocument"></source-of-wealth-form>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex';
    import * as sourceOfWealthService from '../service';
    import sourceOfWealthForm from './form';

    export default {
        data() {
            return {
                sourceOfWealth: {
                    wealth_sources_id: null,
                    documents: [{
                        title: null,
                        note: null,
                        file: null,
                        image: 'https://www.openkm.com/resources/images/icon/document-management-big.png'
                    }]
                }
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            createDocument() {
                sourceOfWealthService.create(this.sourceOfWealth)
                    .then(response => {
                        this.$router.push({ name: 'corporate.source-of-wealth-documents' });

                        this.setMessage({ type: 'success', message: 'Document has been created successfully!' })
                    })
            }
        },

        components: {sourceOfWealthForm}
    }
</script>