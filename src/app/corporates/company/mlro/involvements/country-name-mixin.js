import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('settings', [
            'countries'
        ]),
    },

    methods: {
        getCountryName(countryCode) {
            if (!_.isEmpty(countryCode))
                return _.find(this.countries, country => country.code === countryCode).name;

            return '';
        }
    }
}