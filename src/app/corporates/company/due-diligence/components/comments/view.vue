<template>
    <v-dialog v-model="dialog" scrollable max-width="600px">
        <v-btn slot="activator" dark small color="primary">
            <v-badge color="red">
                <span slot="badge">{{ getPersonCommentsCounters(this.personId) }}</span>
                Comments
            </v-badge>
        </v-btn>
        <v-card>
            <v-toolbar card color="accent">
                <v-icon @click="dialog = false">close</v-icon>
                <v-toolbar-title>View comments</v-toolbar-title>
                <v-spacer></v-spacer>
                <create-comment
                    @update="loadComments"
                    :individual="individual"
                    :questions="questions"
                    :involvements="involvements"
                    :corporate="corporate"
                    :wealthSources="wealthSources">
                </create-comment>
            </v-toolbar>
            <v-card-text>
                <v-tabs v-model="filters.is_resolved"
                        @change="loadComments">
                    <v-tab>
                        Open
                    </v-tab>
                    <v-tab>
                        Resolved
                    </v-tab>
                    <v-tab-item
                        v-for="n in 2"
                        :key="n - 1">
                        <v-card
                            v-for="(comment, i) in comments"
                            :key="i"
                            class="mb-2">
                            <v-card-text>
                                <v-layout
                                    slot="header"
                                    row>
                                    <v-flex xs8>
                                        <div class="mt-3">
                                            <strong>{{ comment.title }}</strong>
                                        </div>
                                    </v-flex>
                                    <v-flex xs4>
                                        <div class="text-xs-right">
                                            <v-avatar
                                                slot="activator"
                                                size="36px">
                                                <img
                                                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                                    alt="Avatar">
                                            </v-avatar>
                                            <strong>{{ comment.user.full_name }}</strong>
                                            <p class="font-weight-thin mb-0">{{ comment.created_at }}</p>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <hr class="mt-1"/>
                                <v-layout>
                                    <v-flex
                                        v-if="editingComment.id !== comment.id"
                                        v-html="comment.comment">
                                    </v-flex>
                                    <v-flex v-else>
                                        <editor
                                            :content="comment.comment"
                                            @update="html => editingComment.newComment = html">
                                        </editor>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions v-if="!filters.is_resolved">
                                <v-spacer></v-spacer>
                                <v-btn
                                    v-if="editingComment.id !== comment.id"
                                    small color="orange"
                                    @click="editingComment.id = comment.id">
                                    Edit
                                </v-btn>
                                <template v-else>
                                    <v-btn
                                        small color="gray"
                                        @click="editingComment = {id: null,newComment: null}">
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        small color="green"
                                        @click="edit">
                                        Save
                                    </v-btn>
                                </template>
                                <v-btn small color="red"
                                       @click="resolve(comment.id)">Resolve
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import Editor from './editor'
    import CreateComment from './create'
    import {editComment, getComments, resolveComment} from './../../../../service';
    import {mapGetters} from 'vuex';

    export default {
        name: "comments",
        components: {CreateComment, Editor},
        props: ['questions', 'individual', 'involvements', 'corporate', 'wealthSources'],
        data()
        {
            return {
                dialog: false,
                editingComment: {
                    id: null,
                    newComment: null
                },
                filters: {
                    is_resolved: 0
                },
                comments: [],
            }
        },
        beforeMount()
        {
            this.loadComments();
        },
        methods: {
            loadComments()
            {
                getComments(this.personId, {
                    is_resolved: !!this.filters.is_resolved
                })
                    .then(response => {
                        this.comments = response.data;
                    });
            },
            resolve(id)
            {
                let index = _.findIndex(this.comments, (o) => o.id === id);

                resolveComment(id)
                    .then(() => this.comments.splice(index, 1));
            },
            edit()
            {
                editComment(this.editingComment.id, this.editingComment.newComment)
                    .then(() => {
                        let edited = this.comments.find((comment) => comment.id === this.editingComment.id);
                        edited.comment = this.editingComment.newComment;
                        this.editingComment.id = null;
                        this.editingComment.newComment = null;
                    });
            }
        },
        computed: {
            ...mapGetters('corporate', [
                'getPersonCommentsCounters'
            ]),
            personId()
            {
                return this.individual ? this.individual.id : this.corporate.id;
            }
        },
    }
</script>