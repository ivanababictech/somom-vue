<template>
    <div class="editor">
        <editor-menu-bar :editor="editor">
            <div
                    class="menubar"
                    slot-scope="{ commands, isActive }">
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold">
                    <v-icon>format_bold</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic">
                    <v-icon>format_italic</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike">
                    <v-icon>format_strikethrough</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline">
                    <v-icon>format_underlined</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code">
                    <v-icon>code</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })">
                    H1
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })">
                    H2
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })">
                    H3
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list">
                    <v-icon>format_list_bulleted</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list">
                    <v-icon>format_list_numbered</v-icon>
                </button>
                <button
                        class="menubar__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote">
                    <v-icon>format_quote</v-icon>
                </button>
            </div>
        </editor-menu-bar>
        <editor-content class="editor__content" :editor="editor"/>
    </div>
</template>

<script>
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
    import {
        Blockquote,
        Bold,
        BulletList,
        Code,
        CodeBlock,
        HardBreak,
        Heading,
        History,
        Italic,
        Link,
        ListItem,
        OrderedList,
        Placeholder,
        Strike,
        TodoItem,
        TodoList,
        Underline,
    } from 'tiptap-extensions'

    export default {
        props: ['content'],
        components: {
            EditorContent,
            EditorMenuBar,
        },
        data()
        {
            return {
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({levels: [1, 2, 3]}),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem(),
                        new TodoList(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Link(),
                        new Strike(),
                        new Underline(),
                        new History(),
                        new Placeholder({
                            emptyClass: 'is-empty',
                        }),
                    ],
                    content: this.content,
                    onUpdate: ({getJSON, getHTML}) => {
                        this.$emit('update', getHTML());
                    },
                }),
                html: null,
            }
        },
        beforeDestroy()
        {
            this.editor.destroy()
        },
    }
</script>

<style>
    :focus {
        outline: none
    }

    :after,
    :before {
        -webkit-box-sizing: border-box;
        box-sizing: border-box
    }

    blockquote,
    h1,
    h2,
    h3,
    ol,
    p,
    pre,
    ul {
        margin: 1rem 0
    }

    blockquote:first-child,
    h1:first-child,
    h2:first-child,
    h3:first-child,
    ol:first-child,
    p:first-child,
    pre:first-child,
    ul:first-child {
        margin-top: 0
    }

    blockquote:last-child,
    h1:last-child,
    h2:last-child,
    h3:last-child,
    ol:last-child,
    p:last-child,
    pre:last-child,
    ul:last-child {
        margin-bottom: 0
    }

    h1,
    h2,
    h3 {
        line-height: 1.3
    }

    .button {
        font-weight: 700;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: rgba(0, 0, 0, 0);
        border: 0;
        color: #000;
        padding: .2rem .5rem;
        margin-right: .2rem;
        border-radius: 3px;
        cursor: pointer;
        background-color: rgba(0, 0, 0, .1)
    }

    .editor__content li > ol,
    .editor__content li > p,
    .editor__content li > ul {
        margin: 0
    }

    .editor {
        position: relative;
        max-width: 36rem;
        margin: 0 auto 5rem
    }

    .editor__content pre {
        padding: .7rem 1rem;
        border-radius: 5px;
        background: #000;
        color: #fff;
        font-size: .8rem;
        overflow-x: auto
    }

    .editor__content pre code {
        display: block
    }

    .editor__content p code {
        display: inline-block;
        padding: 0 .4rem;
        border-radius: 5px;
        font-size: .8rem;
        font-weight: 700;
        background: rgba(0, 0, 0, .1);
        color: rgba(0, 0, 0, .8)
    }

    .editor__content ol,
    .editor__content ul {
        padding-left: 1rem
    }

    .editor__content a {
        color: inherit
    }

    .editor__content blockquote {
        border-left: 3px solid rgba(0, 0, 0, .1);
        color: rgba(0, 0, 0, .8);
        padding-left: .8rem;
        font-style: italic
    }

    .editor__content blockquote p {
        margin: 0
    }

    .editor__content img {
        max-width: 100%;
        border-radius: 3px
    }

    .editor p.is-empty:first-child::before {
        content: 'Type a comment please…';
        float: left;
        color: #aaa;
        pointer-events: none;
        height: 0;
        font-style: italic;
    }

    .menububble {
        position: absolute;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 20;
        background: #000;
        border-radius: 5px;
        padding: .3rem;
        margin-bottom: .5rem;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        visibility: hidden;
        opacity: 0;
        -webkit-transition: opacity .2s, visibility .2s;
        transition: opacity .2s, visibility .2s
    }

    .menububble.is-active {
        opacity: 1;
        visibility: visible
    }

    .menububble__button {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: rgba(0, 0, 0, 0);
        border: 0;
        color: #fff;
        padding: .2rem .5rem;
        margin-right: .2rem;
        border-radius: 3px;
        cursor: pointer
    }

    .menububble__button:last-child {
        margin-right: 0
    }

    .menububble__button:hover {
        background-color: hsla(0, 0%, 100%, .1)
    }

    .menububble__button.is-active {
        background-color: hsla(0, 0%, 100%, .2)
    }

    .menububble__form {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .menububble__input {
        font: inherit;
        border: none;
        background: rgba(0, 0, 0, 0);
        color: #fff
    }

    .menubar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-bottom: 1rem;
        -webkit-transition: visibility .2s .4s, opacity .2s .4s;
        transition: visibility .2s .4s, opacity .2s .4s
    }

    .menubar.is-hidden {
        visibility: hidden;
        opacity: 0
    }

    .menubar__button {
        font-weight: 700;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        background: rgba(0, 0, 0, 0);
        border: 0;
        color: #000;
        padding: .2rem .5rem;
        margin-right: .2rem;
        border-radius: 3px;
        cursor: pointer
    }

    .menubar__button:hover {
        background-color: rgba(0, 0, 0, .05)
    }

    .menubar__button.is-active {
        background-color: rgba(0, 0, 0, .1)
    }
</style>