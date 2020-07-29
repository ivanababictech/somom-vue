<template>
    <v-container fluid grid-list-md>
        <div class="headline">View Engagement letter</div>
        <v-layout row wrap v-if="serviceProvider" align-center>
            <v-flex md3>
                <v-layout fill-height align-center>
                    <img :src="serviceProvider.logo.full_path" width="100px">
                </v-layout>
            </v-flex>
            <v-flex md3>
                <v-layout fill-height align-center>
                    <span>{{ serviceProvider.data.name }}</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs3>
                <v-layout fill-height align-center>
                    <v-subheader>Date</v-subheader>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-layout fill-height align-center>
                    <span>{{ letterDetails.date }}</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs3>
                <v-layout fill-height align-center>
                    <v-subheader>The promoters of</v-subheader>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-layout fill-height align-center>
                    <span>{{ letterDetails.clientName }}</span>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs3>
                <v-subheader>Dear</v-subheader>
            </v-flex>
            <v-flex xs9>
                <v-combobox
                        label="Your favorite hobbies"
                        chips
                        multiple
                        solo
                        prepend-icon="filter_list"
                        append-icon=""
                        clearable
                        v-model="letterDetails.involvements"
                >
                    <template slot="selection" slot-scope="data">
                        <v-chip
                                close
                                color="grey lighten-3"
                                @input="removeInvolvements(data.item)"
                                :selected="data.selected"
                        >
                            <template v-if="isString(data.item)">
                                <strong>{{ data.item}}</strong>&nbsp;
                                <span>(custom)</span>
                            </template>
                            <template v-else>
                                <strong>{{ data.item.name }}</strong>&nbsp;
                                <span>({{ data.item.type }})</span>
                            </template>
                        </v-chip>
                    </template>
                </v-combobox>
            </v-flex>
        </v-layout>
        <v-flex mt-3>
            <h4>Engagement Letter – Professional Services</h4>
            <v-layout px-2>
                We are pleased to accept your instructions to provide you, as Promoters of {{ letterDetails.clientName }}
                (hereinafter the “Company”), with professional services.
                The purpose of this Engagement Letter is to set out the basis on which we shall act and to clarify our respective responsibilities.
            </v-layout>
        </v-flex>

        <v-btn color="primary" @click="openFormParagraphForm">ADD NEW PARAGRAPH</v-btn>
        <v-layout row v-for="(paragraphItem, index) in letterView.paragraphs" :key="index">
            <v-flex xs10>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                                label="Paragraph title"
                                v-model="paragraphItem.name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                                label="Engagement details"
                                v-model="paragraphItem.details"
                                outline
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs2>
                <v-btn fab dark small color="warning" @click="editParagraph(paragraphItem)">
                    <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn fab dark small color="error" @click="removeParagraph(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <add-paragraph @submit="addParagraph" :paragraph="paragraph"
                       :paragraphs="letterView.paragraphs"></add-paragraph>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as letterTemplateService from '@/app/settings/global/letter-templates/service'
    import * as serviceProviderService from '@/app/settings/global/service-providers/service'
    import AddParagraph from './add-paragraph'

    export default {
        data() {
            return {
                letterTemplates: [],
                serviceProviders: [],
                paragraph: {
                    edit: false
                },
                showParagraphForm: false
            }
        },

        props: ['letterView', 'letterDetails', 'servicesProvided', 'involvements'],

        mounted() {
            this.init()
        },

        methods: {
            ...mapActions(['setMessage']),

            init() {
                this.getLetterTemplates()
                this.getServiceProviders()
                this.letterDetails.involvements = this.involvements
            },

            getLetterTemplates() {
                letterTemplateService.get()
                    .then(response => {
                        this.letterTemplates = response.data
                    })
            },

            getServiceProviders() {
                serviceProviderService.get()
                    .then(response => {
                        this.serviceProviders = response.data
                    })
            },

            removeInvolvements(item) {
                this.letterDetails.involvements.splice(this.letterDetails.involvements.indexOf(item), 1)
            },

            addParagraph(paragraph) {
                if (!paragraph.hasOwnProperty('type') || (paragraph.hasOwnProperty('type') && !paragraph.hasOwnProperty('number')))
                    this.letterView.paragraphs.push(paragraph);
                else {
                    let replaceParagraphIndex = _.findIndex(this.letterView.paragraphs, par => par.name == paragraph.number);
                    if (paragraph.type === 'after')
                        replaceParagraphIndex += 1;
                    this.letterView.paragraphs.splice(replaceParagraphIndex, 0, paragraph);
                }
                this.paragraph = {};
                this.showParagraphForm = false;
            },

            removeParagraph(index) {
                this.letterView.paragraphs.splice(index, 1)
            },

            editParagraph(paragraph) {
                this.showParagraphForm = true
                this.paragraph = paragraph
                this.paragraph.edit = true
            },

            isString(value) {
                return typeof value === 'string'
            },

            openFormParagraphForm() {
                this.paragraph = {}
                this.showParagraphForm = true
            }
        },

        computed: {
            serviceProvider() {
                return this.serviceProviders.find(serviceProvider => serviceProvider.id === this.letterDetails.serviceProvider) || null
            },

            letterTemplate() {
                return this.letterTemplates.find(letterTemplate => letterTemplate.id === this.letterDetails.template) || null
            }
        },

        watch: {
            letterTemplate() {
                if (!this.letterView.paragraphs.length) {
                    this.letterView.paragraphs = this.letterTemplate.data.paragraphs
                }
            }
        },

        components: {AddParagraph}
    }
</script>

<style scoped>
    .letter-view-value {
        color: #2F80ED;
    }
</style>