import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
import vm from "@/main";

const STATE_ENTRIES = 'filtered_keywords';

/**
 * @returns {*}
 */
export const get = () => http.get('settings/corporate-questions').then(getData);

/**
 * @param questionId
 * @returns {*}
 */
export const find = (questionId) => http.get(`settings/corporate-questions/${questionId}`).then(getData);

/**
 * @param question
 * @returns {*}
 */
export const create = (question) => http.post('settings/corporate-questions/', question)
    .then((response) => {
        vm.$store.dispatch('corporate/addOrUpdateCorporateQuestion', response.data.data)

        return getData(response)
    });

/**
 * @param question
 * @returns {*}
 */
export const update = (question) => http.put(`settings/corporate-questions/${question.id}`, question)
    .then((response) => {
        vm.$store.dispatch('corporate/addOrUpdateCorporateQuestion', response.data.data)

        return getData(response)
    });

/**
 * @param questionId
 * @returns {*}
 */
export const destroy = (questionId) => http.delete(`/settings/corporate-questions/${questionId}`)
    .then((response) => {
        vm.$store.commit('corporate/removeCorporateQuestion', response.data.data)

        return getData(response)
    });