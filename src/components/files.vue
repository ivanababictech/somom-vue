<template>
    <v-flex xs12 sm12>
        <v-subheader>Documents required</v-subheader>
        <v-btn block color="grey" @click.native="$refs.files.click" style="width: 100%;">Upload</v-btn>
        <v-subheader>{{ label }}</v-subheader>
        <v-text-field prepend-icon="attach_file" single-line v-model="files" :required="required" :disabled="true" v-if="files"></v-text-field>
        <input type="file" :accept="accept" :multiple="true" :disabled="disabled"
               ref="files" @change="onFileChange" hidden>
    </v-flex>
</template>

<script>

    export default {
        data() {
            return {
                files: null
            }
        },

        props: {
            value: {
                type: [Array, String, Object, FormData]
            },
            accept: {
                type: String,
                default: "*"
            },
            label: {
                type: String,
                default: "Please choose..."
            },
            required: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean, // not yet possible because of data
                default: false
            },

        },

        mounted() {
            this.files = this.value;
        },

        methods: {
            getFormData(files) {
                let data = new FormData()
                for (let file of files) {
                    data.append('documents[]', file, file.name)
                }

                return data
            },

            onFileChange($event) {
                const files = $event.target.files || $event.dataTransfer.files;
                const form = this.getFormData(files);

                if (files) {
                    if (files.length > 0) {
                        this.files = [...files].map(file => file.name).join(', ');
                    } else {
                        this.files = null;
                    }
                } else {
                    this.files = $event.target.value.split('\\').pop();
                }

                this.$emit('input', this.files);
                this.$emit('formData', form);
            }
        },

        watch: {
            value(v) {
                this.files = v;
            }
        },

    }
</script>
