import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from "@/main";

/**
 * Create new corporate
 *
 * @returns {*}
 */
export const create = (company) => {
    const {corporate_id} = vm.$route.params

    return http.post(`/corporates/${corporate_id}/accounts`, company)
        .then(response => {
            vm.$store.dispatch('corporate/addOrUpdateAccounts', response.data.data)

            return getData(response)
        })
}