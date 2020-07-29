<template>
    <v-container fluid grid-list-md>
        <div class="headline">{{ letter }}. Source of wealth</div>
        <v-layout row wrap align-center>
            <v-flex md4>
                <p>Select one or more source of wealth applicable in your case</p>
            </v-flex>
            <v-flex md8>
                <v-select
                        multiple
                        item-text="title"
                        item-value="id"
                        :items="wealthSources"
                        v-model="sourceWealth.wealths"
                        label="Select"
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <document v-for="(document, index) in sourceWealth.documents" :document="document" :key="index" :wealth-sources="wealthSources"></document>
        </v-layout>
    </v-container>
</template>

<script>
    import Document from './documents/document'

    export default {
        data() {
            return {
                documents: [],
                documentStructure: {
                    wealth_source_id: null,
                    data: {},
                }
            }
        },

        watch: {
            'sourceWealth.wealths'() {
                // match all wealths and documents
                this.sourceWealth.wealths.map((wealthId, index) => {
                    let existsDocument = this.sourceWealth.documents.find(document => {
                        return document.wealth_source_id == wealthId
                    })

                    if(!existsDocument) {
                        let document = this.documentStructure

                        document.wealth_source_id = wealthId

                        this.sourceWealth.documents.push(JSON.parse(JSON.stringify(document)))
                    }
                })

                // match all documents and wealths
                this.sourceWealth.documents.map((document, index) => {
                    let existsWealth = this.sourceWealth.wealths.find(wealthId => {
                        return document.wealth_source_id === wealthId
                    })

                    if(!existsWealth) {
                        this.sourceWealth.documents.splice(index, 1)
                    }
                })
            }
        },

        props: [
            'sourceWealth',
            'wealthSources',
            'letter'
        ],

        components: { Document }
    }
</script>