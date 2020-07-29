<template>
    <v-card>
        <v-toolbar card color="grey lighten-4">
            <v-btn icon small>
                <v-icon @click="$emit('close')">arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{ currentRequest.subject }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon color="yellow" small>star</v-icon>
            </v-btn>
            <div class="caption">{{ currentRequest.created_at }}</div>
            <v-btn icon small>
                <v-icon small>reply</v-icon>
            </v-btn>
            <v-btn icon small>
                <v-icon small>reply_all</v-icon>
            </v-btn>
            <v-btn icon small>
                <v-icon small>delete</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4">
            <div class="mail-reply--item">
                <div class="layout column">
                    <h3 class="headline">{{ currentRequest.bank_officier }}</h3>
                    <v-layout row>
                        <v-flex md12>
                            <v-alert outline color="success" icon="check_circle" :value="currentRequest.status === 'approved'">
                                Success! Bank Request was approved!
                            </v-alert>
                            <v-alert outline color="danger" icon="priority_high" :value="currentRequest.status === 'disapproved'">
                                Ooops... Bank Request was disapproved! Please check again!
                            </v-alert>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs3>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="primary">access_time</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ currentRequest.date }}</v-list-tile-title>
                                        <v-list-tile-sub-title>bank entry date</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs3>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="primary">money</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ currentRequest.amount }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Entry amount</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs3>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="primary">description</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ currentRequest.data.description }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Bank entry description</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs12>
                            <v-layout row fill-height align-center>
                                <v-flex xs6>
                                    <p>{{ currentRequest.data.description }}</p>
                                    <h4> {{ currentRequest.account.name }}
                                        <br>
                                        Thanks
                                    </h4>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <suspense
                                v-if="currentRequest.is_suspense"
                                :account="account"
                                :request="currentRequest"
                                @submit="submitSuspense"
                        ></suspense>
                    </v-layout>

                    <v-divider class="my-4"></v-divider>
                    <v-layout wrap v-if="!showReply">
                        <v-btn color="primary" @click="showReply = true">
                            <v-icon>reply</v-icon>
                            Reply
                        </v-btn>
                        <v-btn color="primary" @click="showReply = true">
                            <v-icon>reply_all</v-icon>
                            Reply all
                        </v-btn>
                    </v-layout>
                    <v-card v-else>
                        <v-card-text class="pa-0">
                            <v-autocomplete
                                    :items="people"
                                    label="To"
                                    item-text="name"
                                    item-value="email"
                                    multiple
                            >
                                <template
                                        slot="item"
                                        slot-scope="data"
                                >
                                    <template v-if="typeof data.item !== 'object'">
                                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                    </template>
                                    <template v-else>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-list-tile-avatar>
                                            <img :src="data.item.avatar">
                                        </v-list-tile-avatar>
                                    </template>
                                </template>
                            </v-autocomplete>
                            <v-textarea
                                    v-model="currentRequest.message"
                                    placeholder="Your reply here"
                                    full-width
                            ></v-textarea>
                        </v-card-text>
                        <v-toolbar dense flat>
                            <v-btn icon>
                                <v-icon>attach_file</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>link</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>camera</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat icon @click="submit">
                                <v-icon>send</v-icon>
                            </v-btn>
                        </v-toolbar>
                    </v-card>

                    <v-list three-line>
                        <template v-for="(item, index) in items">
                            <v-list-tile
                                    :key="item.title"
                                    avatar
                                    @click="item.show = !item.show"
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                                    <v-list-tile-sub-title v-if="!item.show" v-html="item.message.substring(0, 50) + ' ...'"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>02/05/2018</v-list-tile-action-text>
                                    <v-btn icon ripple @click.native="false">
                                        <v-icon color="grey darken-2">star</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>


                            <v-container fluid grid-list-md v-if="item.show">
                                <v-layout wrap>
                                    <v-list-tile-sub-title>
                                        <b>to:</b> Arsen S, Jack Nicholson, Susan Mindi

                                        <v-spacer></v-spacer>
                                        <v-btn small icon ripple @click="reply(index)">
                                            <v-icon color="grey lighten-1">reply</v-icon>
                                        </v-btn>
                                    </v-list-tile-sub-title>
                                </v-layout>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <p>{{ item.message }}</p>
                                        <div class="py-3">
                                            <v-alert outline color="primary" icon="attach_file" :value="true" v-if="item.file">
                                                Download invoice
                                            </v-alert>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </template>
                    </v-list>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as bankRequestService from '../service'
    import Suspense from './suspense/index'
    import * as requestService from '../service'

    export default {
        props: ['currentRequest', 'account'],
        data() {
            const srcs = {
                1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
            };

            return {
                newRequestStatus: 'open',
                requestStructure: {
                    subject: null,
                    to: null,
                },
                confirmationText: 'The request of information related to this\n' +
                                    'bank entry was alredy sent\n' +
                                    'Do you want to proceed ?',
                people: [
                    { name: 'Sander Adams', email: 'adams@gmail.com', avatar: srcs[1] },
                    { name: 'Ali Connors', email: 'ali@hotmail.com', avatar: srcs[2] },
                    { name: 'Trevor Hansen', email: 'trevoe.hansen@gmail.com', avatar: srcs[3] },
                    { name: 'Tucker Smith', email: 'ticke.smith@goog.com', avatar: srcs[2] },
                    { name: 'Britta Holt', email: 'brittahost@yandex.com', avatar: srcs[4] },
                    { name: 'Jane Smith ', email: 'jane@gmail.com', avatar: srcs[5] },
                    { name: 'John Smith', email: 'john.smmm@gmail.com', avatar: srcs[1] },
                    { name: 'Sandra Williams', email: 'wsandndra@gmail.com', avatar: srcs[3] }
                ],
                items: [
                    {
                        show: false,
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        name: 'Sander Adams',
                        message: "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                    },
                    {
                        show: false,
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        name: 'Ali Connors',
                        message: "to Alex, Scott, Jennifer Wish I could come, but I'm out of town this weekend.",
                        file: true
                    },
                    {
                        show: false,
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        name: 'Trevor Hansen',
                        message: "Sandra Adams Do you have Paris recommendations? Have you ever been?"
                    },
                    {
                        show: false,
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                        name: 'Britta Holt',
                        message: "Trevor Hansen Have any ideas about what we should get Heidi for her birthday?"
                    },
                    {
                        show: false,
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                        name: 'Sandra Williams',
                        message: "Britta Holt We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                    }
                ],
                showReply: false
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            submit() {
                bankRequestService.reply(this.account.id, this.currentRequest)
                    .then(() => {
                        this.items.push({
                            show: false,
                            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                            name: 'Glen Azzopardi',
                            message: this.currentRequest.message
                        });

                        this.$emit('close')
                        this.$emit('update-requests')
                    })
            },

            submitSuspense(status) {
                this.currentRequest.newStatus = status  || this.newRequestStatus;
                this.submit();
            },

            reply(index) {
                this.showReply = true;
                this.currentRequest.to = this.people[index]
            },
        },

        components: {Suspense}
    }
</script>

<style scoped>

</style>