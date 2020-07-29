import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('settings', [
            'countries'
        ]),
    },

    methods: {
        getLogColor(item) {
            switch (item.event) {
                case 'created':
                    return this.$vuetify.theme.primary;
                case 'deleted':
                    return this.$vuetify.theme.danger;
            }
        },

        highlight(newText, oldText) {
            if(newText !== oldText) {
                return "<span style='background-color: " + this.$vuetify.theme.accent + "'>" + newText + "</span>"
            }
            return newText;
        },
    }
}