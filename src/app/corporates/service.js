import {http} from '@/plugins/http/index'
import {getData} from '@/utils/get'
import qs from 'qs'
import vm from "@/main";
import * as TYPES from "@/app/corporates/vuex/mutations-types";

export const SECTION_PRINCIPAL_ACTIVITY_DETAILS = 'Principal activity details';
export const SECTION_BANK = 'Banks';
export const SECTION_SOURCE_OF_FUNDS = 'Source of funds';
export const SECTION_BORROWING_ACTIVITIES = 'Borrowing activities';
export const SECTION_LENDING_ACTIVITIES = 'Lending activities';
export const SECTION_PAYROLL = 'Payroll';
export const SECTION_REVENUE = 'Revenue';
export const SECTION_COST_OF_SALES = 'Cost of sales';
export const SECTION_SELLING_DISTRIBUTION = 'Selling & distribution';
export const SECTION_ADMINISTRATIVE_EXPENSES = 'Administrative expenses';
export const SECTION_SHARES_IN_COMPANIES = 'Shares in companies';
export const SECTION_FINANCIAL_ASSETS = 'Financial assets';
export const SECTION_INVESTMENT_PROPERTY = 'Investment property';
export const SECTION_INTELLECTUAL_PROPERTY = 'Intellectual property';
export const SECTION_TANGIBLE_ASSETS = 'Tangible assets';
export const SECTION_CRYPTOCURRENCY = 'Cryptocurrency';
export const SECTION_IMMATERIAL = 'Immaterial';
export const SECTION_SUSPENSE = 'Suspense';
export const COMMENT_SECTIONS = [
    {
        label: 'Questionnaire',
        value: 'questionnaire'
    },
    {
        label: 'Source of wealth',
        value: 'wealth_sources',
    },
//                    {
//                        label: 'Bank reference details',
//                        value: 'bank-reference-details'
//                    },
//                    {
//                        label: 'Professional reference details',
//                        value: 'professional-reference-details'
//                    }
];

/**
 * Get corporates
 *
 * @returns {*}
 */
export const get = () => {
    return http.get('/corporates').then(getData)
}

/**
 * Get corporates
 *
 * @returns {*}
 */
export const show = () => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id).then(getData)
}

/**
 * Get corporates
 *
 * @returns {*}
 */
export const update = (corporate) => {
    const {corporate_id} = vm.$route.params

    return http.put('/corporates/' + corporate_id, corporate).then(response => {
        vm.$store.commit('corporate/update', response.data.data);
        return getData(response)
    })
}

/**
 * Update borrowing activities
 *
 * @returns {*}
 */
export const updateBorrowingActivities = (items) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/profile/borrowing-activities', {items}).then(response => {
        vm.$store.commit('corporate/update', response.data.data);
        return getData(response)
    })
}

/**
 * Create new corporate
 *
 * @returns {*}
 */
export const create = (company) => {
    return http.post('/corporates', company).then(getData)
}

export const archiveCorporate = (corporateId) => http.delete(`/corporates/${corporateId}`)
    .then(getData);

export const restore = (corporateId) => http.post(`/corporates/${corporateId}/restore`)
    .then(getData);


export const getTypeShares = () => http.get('settings/type-of-shares/active').then(getData);

export const uploadDocument = (formData) => {
    return http.post('/files', formData).then(response => {
        vm.$store.dispatch('setMessage', {type: 'success', message: 'Document has been uploaded successfully!'});
        return getData(response);
    });
};

export const registerCompany = (corporateId) => http.put(`/corporates/${corporateId}/register`)
    .then(getData);

export const exportList = (list, type, format, search = {}) => {

    let link = type ? `/corporates/lists/${list}/${type}/export` : `/corporates/lists/${list}/export`;
    return http.get(link, {
        responseType: 'blob',
        params: {
            format,
            filters: search
        },
        paramsSerializer(params)
        {
            return qs.stringify(params)
        }
    }).then(response => {
        vm.$store.dispatch('downloadFile', response);

        return getData(response)
    })
};

export const getComments = (person_id, filters) => {
    const {corporate_id} = vm.$route.params;

    return http.get(`/corporates/${corporate_id}/comments`, {
        params: {
            section_person_id: person_id,
            filters
        },
        paramsSerializer(params)
        {
            return qs.stringify(params)
        }
    }).then(response => getData(response));
};

export const getCommentsCounters = () => {
    const {corporate_id} = vm.$route.params;

    return http.get(`/corporates/${corporate_id}/comments/counters`).then(response => {
        vm.$store.commit('corporate/setCounters', getData(response).data);
    });
};

export const createComment = (payload) => {
    const {corporate_id} = vm.$route.params;

    return http.post(`/corporates/${corporate_id}/comments`, payload)
        .then(getData);
};

export const resolveComment = (id) => {
    const {corporate_id} = vm.$route.params;

    return http.patch(`/corporates/${corporate_id}/comments/${id}`)
        .then(getData);
};

export const editComment = (id, comment) => {
    const {corporate_id} = vm.$route.params;

    return http.put(`/corporates/${corporate_id}/comments/${id}`, {comment})
        .then(getData);
};

/**
 * Upload files for corporate
 *
 * @param formData
 * @returns {*}
 */
export const uploadFiles = (formData) => {
    const {corporate_id} = vm.$route.params;

    return http.post('corporates/' + corporate_id + '/files', formData)
        .then(getData);
};

/**
 * Upload files for corporate
 *
 * @returns {*}
 * @param id
 */
export const getFiles = (id) => {
    const {corporate_id} = vm.$route.params;

    return http.get('corporates/' + corporate_id + '/files', {params: {id}})
        .then(getData);
};