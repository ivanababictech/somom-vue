import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

export const getQuestions = () => http.get('settings/due-diligence-questions')
    .then(getData);

export const find = (questionId) => http.get(`settings/due-diligence-questions/${questionId}`)
    .then(getData);

export const create = (question) => http.post('settings/due-diligence-questions/', question)
    .then(getData);

export const update = (question) => http.put(`settings/due-diligence-questions/${question.id}`, question)
    .then(getData);

export const removeQuestion = (questionId) => http.delete(`/settings/due-diligence-questions/${questionId}`)
    .then(getData);