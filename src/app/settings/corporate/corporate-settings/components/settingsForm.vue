<template>
    <v-container grid-list-md>
        <v-form @submit.prevent="submit()" lazy-validation>
            <v-layout row>
                <v-flex xs4>
                    <v-text-field
                            label="Title"
                            v-model="item.title"
                            required
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-btn type="submit" color="info">Submit</v-btn>
            <v-btn :to="{ name: 'corporate.corporate-settings' }">Cancel</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        props: ['type', 'item'],

        methods: {
            submit() {
                if (this.type === 'create') this.$bus.$emit('createSettings', this.item.title);
                if (this.type === 'edit') this.$bus.$emit('editSettings', this.item);
            }
        }
    }
</script>