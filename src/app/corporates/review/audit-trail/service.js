// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'
import {apiUrl} from "@/config";

/**
 * Get logs for section type
 *
 * @param type
 * @returns {*}
 */
export const get = (type) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/logs/' + type).then(getData)
}

/**
 * Get logs for particular item
 *
 * @param type
 * @param uuid
 * @returns {*}
 */
export const getByUuid = (type, uuid) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/logs/' + type + '/' + uuid).then(getData)
}
