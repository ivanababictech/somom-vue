import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from "@/main";

/**
 * Get company applicants
 *
 * @returns {*}
 */
export const getApplicants = (companyId) => {
    return http.get('/companies/' + companyId+ '/applicants').then(getData)
}

/**
 * Get reports
 *
 * @returns {*}
 */
export const getReports = (checkId) => {

    return http.get('/onfido/checks/' + checkId + '/reports').then(getData)
}

/**
 * Get documents
 *
 * @returns {*}
 */
export const getDocuments = (applicantId) => {
    return http.get('/onfido/applicants/' + applicantId + '/documents').then(getData)
}

/**
 * Get documents
 *
 * @returns {*}
 */
export const downloadDocument = (applicantId, documentId) => {
    return http.get('/onfido/applicants/' + applicantId + '/documents/' + documentId + '/download', {
        responseType: 'blob',
    })
        .then(response => {
            vm.$store.dispatch('downloadFile', response)

            return getData(response)
        })
}

/**
 * Get photos
 *
 * @param applicantId
 * @returns {*}
 */
export const getPhotos = (applicantId) => {
    return http.get('/onfido/applicants/' + applicantId + '/photos').then(getData)
}

/**
 * Download photo
 *
 * @param applicantId
 * @param photoId
 * @returns {*}
 */
export const downloadPhoto = (applicantId, photoId) => {
    return http.get('/onfido/applicants/' + applicantId + '/photos/' + photoId + '/download', {
        responseType: 'blob',
    })
        .then(response => {
            vm.$store.dispatch('downloadFile', response)

            return getData(response)
        })
}