<template>
    <v-layout row wrap>
        <v-tabs v-if="documents.length">
            <v-tab v-for="(documentType, index) in documents" :key="index">
                {{ documentType.person.name }}
            </v-tab>

            <v-tab-item :key="index" v-for="(documentType, index) in documents">
                <v-layout row wrap>
                    <v-container fluid grid-list-md>
                        <div class="headline">Notes</div>
                        <v-layout row wrap>
                            <v-flex md4>
                                <p v-html="documentType.note"></p>
                            </v-flex>
                        </v-layout>
                        <div class="headline">Documents to upload</div>
                        <documents :documentType="documentType"
                                   :due-diligence="dueDiligence"></documents>
                    </v-container>
                </v-layout>
            </v-tab-item>
        </v-tabs>
    </v-layout>
</template>

<script>

    import Documents from './documents'

    export default {
        props: ['documents', 'involvements', 'dueDiligence'],

        components: { Documents }
    }
</script>