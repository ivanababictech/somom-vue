export default {
    methods: {
        totals(items, property) {
            return this[items].reduce((carry, item) => carry += item[property] ? parseInt(item[property]) : 0, 0)
        },
        averagePercentage(items, property) {
            let total = this[items].filter(item => item[property]).length
            return this.totals(items, property) / total
        }
    },
    filters: {
        twoDecimals(value) {
            return value ? value.toFixed(2) : 0;
        }
    }
}