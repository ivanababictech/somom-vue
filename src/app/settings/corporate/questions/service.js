// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'

// get questions
export const get = () => {
    return http.get('/settings/questions').then(getData)
}

// get question
export const find = (questionId) => http.get('/settings/questions/' + questionId).then(getData)

/**
 * Create the question
 *
 * @param question
 * @returns {Promise<T>}
 */
export const create = (question) => http.post('/settings/questions/', question).then(getData)

/**
 * Update the question
 *
 * @param question
 * @returns {Promise<void>}
 */
export const update = (question) => http.put('/settings/questions/' + question.id, question).then(getData)

/**
 * Delete the document type
 *
 * @param question
 */
export const remove = (question) => http.delete('/settings/questions/' + question.id).then(getData)

