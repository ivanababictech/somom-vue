<template>
    <v-layout fixed style="position: fixed; bottom: 0px;right: 0">
        <v-flex v-for="(chat, indexChat) in chats"
                :key="indexChat"
                width="30%"
                class="mr-3">
            <v-card
                    max-height="600px"
                    height="600px"
            >
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>{{ chat.name }}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="removeChat(indexChat)">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <div class="scroll">
                    <v-list three-line v-if="chat.messages.length">
                        <template v-for="(item, index) in chat.messages">
                            <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                            >
                                {{ item.header }}
                            </v-subheader>

                            <v-list-tile
                                    v-else
                                    :key="item.title"
                                    avatar
                                    @click=""
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="item.text"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>1h ago</v-list-tile-action-text>
                                    <v-icon color="grey lighten-1">star_border</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider inset></v-divider>
                        </template>
                    </v-list>
                    <v-subheader v-else>
                        This is the very beginning of your direct message history with <br><b>@{{ chat.name }}</b>!
                    </v-subheader>
                </div>
                <v-card-actions class="chat-item">
                    <v-textarea
                            placeholder="Message"
                            v-model="chat.text"
                            append-icon="send"
                            @click:append="sendMessage(chat)"
                            auto-grow
                            rows="1"
                    ></v-textarea>
                </v-card-actions>
            </v-card
>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                items: [
                    { header: 'Today' },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        name: 'Jack Deniels',
                        text: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        name: 'Steve Jobs',
                        text: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        name: 'Garry Poter',
                        text: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                        name: 'Melinda Fisher',
                        text: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                    },
                    { divider: true, inset: true },
                    {
                        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                        name: 'Ronald Robson',
                        text: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                    }
                ]
            }
        },

        props: ['chats'],

        methods: {
            sendMessage(chat) {
                chat.messages.push({
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    name: 'Glen Azzopardi',
                    text: chat.text
                })
                chat.text = ''
            },

            removeChat(index) {
                this.chats.splice(index, 1)
            }
        }
    }
</script>

<style scoped>
    .chat-item {
        position: absolute;
        width: 100%;
        bottom: 0;
    }
    .scroll {
        overflow-y: auto;
        height: 400px;
    }
</style>