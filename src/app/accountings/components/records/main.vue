<template>
    <div>
        <v-toolbar dense flat height="38">
            <v-toolbar-items>
                <v-btn
                        flat
                        @click="tab = 'links'"
                        :color="tab === 'links' ? 'primary' : 'black'">
                    Links
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'entries'"
                        :color="tab === 'entries' ? 'primary' : 'black'">
                    Entries
                </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-btn flat @click="dialog = true">Send new link request</v-btn>
        </v-toolbar>

        <link-request-dialog
                v-if="dialog"
                :dialog="dialog"
                @closeDialog="dialog = false">
        </link-request-dialog>

        <links v-show="tab === 'links'"></links>
        <entries v-show="tab === 'entries'"></entries>
    </div>
</template>

<script>
    import LinkRequestDialog from './dialogs/link-request.vue'
    import Links from './links/main.vue'
    import Entries from './entries/main.vue'

    export default{
        components: {
            Links, Entries, LinkRequestDialog
        },
        data: () => ({
            tab: 'links',
            dialog: false
        })
    }
</script>