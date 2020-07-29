<template>
    <v-container fill-height>
        <v-layout align-center>
            <v-flex class="text-xs-center">
                <h1 class="display-2 primary--text">Whoops, {{ code }}</h1>
                <p>{{ message }}</p>
                <v-btn to="/" outline color="primary">Get me out of here!</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                code: 403,
                message: 'You do not have permission to access the document or program you requested!'
            }
        },
        mounted () {
        }
    }
</script>