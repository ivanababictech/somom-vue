import {getData} from "@/utils/get";
import vm from "@/main";
import {http} from "@/plugins/http";

/**
 * Get analytical review
 *
 * @returns {*}
 */
export const get = () => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/profile/analytical-review')
        .then(getData)
}