import {parseDate, formatDate} from './util'

export const Helpers = {
    install(Vue, options) {
        Vue.prototype.$helpers = {
            parseDate: parseDate,
            formatDate: formatDate,
            n(n) {
                if (!n) {
                    return null
                }
                return Number(Number(n).toFixed(2)).toLocaleString()
            },
            number(n) {
                return parseFloat(Number(n).toFixed(2))
            },
            difference(n1, n2) {
                return Math.abs(n1 - n2)
            },
            slugify(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
            },
            titleize(slug) {
                var words = slug.replace(/_/g, '-').split("-");
                return words.map(function (word) {
                    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
                }).join(' ');
            }
        }
    }
}
