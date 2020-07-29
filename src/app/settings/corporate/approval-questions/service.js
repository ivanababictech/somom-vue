import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

export const get = () => http.get('/settings/approval-questions')
    .then(getData);

export const create = (question) => http.post('/settings/approval-questions', question)
    .then(getData);

export const update = (question) => http.put(`/settings/approval-questions/${question.id}`, question)
    .then(getData);

export const destroy = (question) => http.delete(`/settings/approval-questions/${question.id}`)
    .then(getData);

export const restore = (questionId) => http.post(`/settings/approval-questions/${questionId}/restore`)
    .then(getData);