<template>
    <v-dialog v-model="dialog" fullscreen>
        <v-card flat>
            <v-toolbar dense color="accent" fixed>
                <v-btn icon @click="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Reviews</v-toolbar-title>
            </v-toolbar>
            <v-layout row class="mt-5">
                <v-flex md2>
                    <v-list dense>
                        <div class="layout column pa-3">
                            <v-btn large block color="primary" dark>
                                <v-icon>add</v-icon>
                                COMPOSE
                            </v-btn>
                        </div>
                        <v-list-tile v-for="item in items" :key="item.text">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-subheader class="mt-3 grey--text text--darken-1">Users</v-subheader>
                        <v-list>
                            <v-list-tile v-for="item in items2" :key="item.text" avatar @click="openChat(item)">
                                <v-list-tile-avatar>
                                    <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
                                </v-list-tile-avatar>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-list>
                </v-flex>

                <v-flex md10>
                    <v-container grid-list-md fluid class="pa-0">
                        <v-tabs v-model="filters.status" v-if="!showRequest">
                            <v-tab
                                    v-for="status in statuses"
                                    :key="status"
                                    :href="'#' + status"
                            >
                                {{ status }}
                            </v-tab>
                            <v-tab-item
                                    v-for="status in statuses"
                                    :key="status"
                                    :value="status"
                                    v-if="filters.status == status"
                            >
                                <v-layout wrap>
                                    <v-flex xs6 md2>
                                        <date-picker label="Entry Date From" v-model="filters.entry_date_from" full-width hide-details clearable></date-picker>
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        <date-picker label="Entry Date To" v-model="filters.entry_date_to" full-width hide-details clearable></date-picker>
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        <date-picker label="Review Date From" v-model="filters.created_at_from" full-width hide-details clearable></date-picker>
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        <date-picker label="Review Date To" v-model="filters.created_at_to" full-width hide-details clearable></date-picker>
                                    </v-flex>
                                    <v-flex xs6 md4>
                                        <v-autocomplete
                                                v-model="filters.types"
                                                :items="types"
                                                label="Types"
                                                multiple
                                        ></v-autocomplete>
                                    </v-flex>
                                </v-layout>

                                <v-data-table
                                        :headers="headers"
                                        :items="requests.data"
                                        hide-actions
                                        class="elevation-1 mt-4"
                                >
                                    <template slot="items" slot-scope="props">
                                        <td>{{ props.item.ref_number }}</td>
                                        <td>{{ props.item.account.name }}</td>
                                        <td>
                                            <v-tooltip right max-width="300">
                                                <a href="#" slot="activator">{{ props.item.subject }}</a>
                                                <span>{{ props.item.message }}</span>
                                            </v-tooltip>
                                        </td>
                                        <td>{{ props.item.amount }}</td>
                                        <td>Glen Azzopardi</td>
                                        <td>{{ props.item.date | formatDate }}</td>
                                        <td>{{ props.item.created_at }}</td>
                                        <td>{{ props.item.due_date | formatDate }}</td>
                                        <td>
                                            <v-btn outline small color="primary" @click="viewBankRequest(props.item)">View</v-btn>
                                            <v-btn
                                                    v-if="!props.item.is_suspense"
                                                    small
                                                    color="primary"
                                                    class="white--text"
                                                    @click="setStatus(props.item, 'approved')"
                                            >approve</v-btn>
                                            <v-btn small color="primary" v-else @click="setStatus(props.item, 'open')">re-open</v-btn>
                                        </td>
                                    </template>
                                </v-data-table>

                                <div class="text-xs-center mt-2" v-if="requests.last_page > 1">
                                    <v-pagination :length="requests.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                                </div>
                            </v-tab-item>
                        </v-tabs>
                        <view-bank-request
                                v-else
                                :currentRequest="currentRequest"
                                :account="account"
                                @close="closeRequest"
                                @update-requests="getRequests"
                        ></view-bank-request>
                        <chat :chats="chats"></chat>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions} from 'vuex';
    import * as requestService from './service';
    import ViewBankRequest from './view/index';
    import Chat from './chat';

    export default {
        data() {
            return {
                headers: [
                    {text: 'Ref No', value: 'ref_number'},
                    {text: 'Company Name', value: 'company_date'},
                    {text: 'Subject', value: 'subject', width: 250},
                    {text: 'Amount', value: 'amount'},
                    {text: 'Review officer', value: 'review_officer'},
                    {text: 'Entry Date', value: 'date'},
                    {text: 'Review date', value: 'created_at'},
                    {text: 'Due date', value: 'due_date'},
                    {text: 'Actions', value: 'actions', width: 300},
                ],
                chats: [],
                dialog: true,
                requests: [],
                search: '',
                filters: {
                    types: [],
                    status: null,
                },
                types: ['clarification', 'invoice', 'contract', 'suspense'],
                currentPage: 1,
                currentStatus: 'open',
                statuses: ['open', 'approved', 'disapproved'],
                items: [
                    { icon: 'send', text: 'Sent' },
                    { icon: 'reply', text: 'Replies' },
                    { icon: 'star', text: 'Favorite' },
                    { icon: 'delete', text: 'Trash' },
                ],
                items2: [
                    { picture: 28, name: 'Joseph Morgan', messages: [
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                                name: 'Jack Deniels',
                                text: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                                name: 'Steve Jobs',
                                text: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                            },
                        ]
                    },
                    { picture: 38, name: 'Ronald Gordon', messages: [
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                                name: 'Garry Potter',
                                text: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                name: 'Melinda Fisher',
                                text: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                                name: 'Ronald Robson',
                                text: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                name: 'Melinda Fisher',
                                text: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                                name: 'Ronald Robson',
                                text: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                name: 'Melinda Fisher',
                                text: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                            },
                            {
                                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                                name: 'Ronald Robson',
                                text: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                            },
                        ]
                    },
                    { picture: 48, name: 'Gerard Butler', messages: [] },
                    { picture: 58, name: 'Keanu Reeves', messages: [] },
                    { picture: 78, name: 'Tom Hanks', messages: [] }
                ],
                currentRequest: {},
                showRequest: false,
                mini: true

            }
        },

        props: ['account'],

        mounted() {
            this.getRequests()
        },

        methods: {
            ...mapActions(['setMessage']),

            getRequests() {
                const params = {
                    page: this.currentPage,
                    filters: this.filters,
                }

                //params.filters.closed = this.currentStatus != 'open'

                requestService.get(this.account.id, params)
                    .then(response => {
                        this.requests = response.data
                    })
            },

            closeDialog() {
                this.dialog = false
                this.$emit('close')
            },

            setStatus(bankRequest, status) {
                requestService.setStatus(this.account.id, bankRequest.id, status)
                    .then(response => this.getRequests())
            },

            view(bankRequest) {
                requestService.resend(this.account.id, bankRequest.id)
                    .then(response => this.getRequests())
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            viewBankRequest(entry) {
                this.getDraft(entry)
                    .then(() => {
                        this.showRequest = true
                    })
            },

            getDraft(entry) {
                this.currentRequest = entry

                return requestService.getSuspenseRequestDraft(this.account.id, entry.id)
                    .then(response => {
                        if(response.data) {
                            this.currentRequest.data = response.data.data
                        }

                        return response;
                    })
            },

            closeRequest() {
                this.showRequest = false
            },

            openChat(item) {
                let chatIndex = this.chats.findIndex(chat => chat.name == item.name)

                if(chatIndex === -1) {
                    this.chats.push(item)
                } else {
                    this.chats.splice(chatIndex, 1)
                }
            },

            closeChat() {

            }
        },

        watch: {
            currentPage: 'getRequests',
            dialog: 'getRequests',
            filters: {
                handler: 'getRequests',
                deep: true
            },
            currentStatus() {
                this.resetCurrentPage()
                this.getRequests()

            },
        },

        components: { ViewBankRequest, Chat }
    }
</script>