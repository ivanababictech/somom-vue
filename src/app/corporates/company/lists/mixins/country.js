import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('settings', [
            'countries'
        ]),
    },

    methods: {
        getCountryName(countryCode) {
            if (!_.isEmpty(countryCode)) {
                const country = _.find(this.countries, country => country.code === countryCode);
                if (country !== undefined)
                    return country.name
            }

            return countryCode;
        }
    }
}