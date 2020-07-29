<template>
    <div>
        <v-snackbar
                v-if="hasSuccessMessage"
                :top="true"
                :timeout="timeout"
                color="accent"
                class="black--text"
                v-model="successMessage"
        >
            {{ messages.success }}
            <v-btn class="black--text" flat @click.native="resetMessages()">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                v-if="hasValidationMessages"
                :top="true"
                :timeout="timeout"
                color="error"
                v-model="validationMessage"
                :auto-height="true"
        >
            <span v-html="formatedValidationMessage"></span>
            <v-btn dark flat @click.native="resetMessages">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                v-if="hasWarningMessages"
                :top="true"
                :timeout="timeout"
                color="warning"
                v-model="warningMessage"
        >
            {{ messages.warning }}
            <v-btn dark flat @click.native="resetMessages">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                v-if="hasErrorMessages"
                :top="true"
                :timeout="timeout"
                color="error"
                v-model="errorMessage"
        >
            <span v-html="formatedErrorMessage"></span>
            <v-btn dark flat @click.native="resetMessages">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                timeout: 5000,
                snackbar: true,
                successMessage: !this.hasSuccessMessage,
                validationMessage: !this.hasValidationMessages,
                warningMessage: !this.hasWarningMessages,
                errorMessage: !this.hasErrorMessages,
            }
        },

        computed: {
            ...mapState(['messages']),

            hasSuccessMessage() {
                return this.messages.success !== ''
            },

            hasWarningMessages() {
                return this.messages.warning.length > 0
            },

            hasErrorMessages() {
                return this.messages.error.length > 0
            },

            hasValidationMessages() {
                return this.messages.validation.errors || false
            },

            formatedErrorMessage() {
                if (typeof this.messages.error === "string") {
                    return this.messages.error
                }
                return this.messages.error.map(msg => `${msg}`).join('<br>')
            },
            formatedValidationMessage() {
                let object = this.messages.validation.errors;
                return Object.keys(object).map(function (objectKey, index) {
                    var msg = typeof object[objectKey] === 'object' ? object[objectKey][0] : object[objectKey];
                    return `${msg}`
                }).join('<br>');
            },
        },
        methods: {
            ...mapActions(['setMessage', 'resetMessages']),

            init() {

            },

            dismiss(type) {
                let obj
                if (type === 'error') {
                    obj = {type, message: []}
                } else if (type === 'validation') {
                    obj = {type, message: {}}
                } else {
                    obj = {type, message: ''}
                }
                this.setMessage(obj)
            },
        },
    }
</script>