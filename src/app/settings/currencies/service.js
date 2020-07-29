// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from "@/main";

/**
 *
 * @param date
 * @param currency
 * @param base
 * @param amount
 */
export const convert = (date, currency, base, amount) => {
    const url = 'https://api.fixer.io/' + date + '?symbols=' + currency + '&base=' + base

    return http.get(url).then(getData)
}

/**
 *
 * @param date
 * @param currency
 * @param base
 * @param amount
 */
export const convertFromDB = (date, currency, base, amount) => {
    return http.get('/currencies/convert', {params: {date, base, currency, amount}}).then(getData)
}

