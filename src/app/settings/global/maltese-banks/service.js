import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => http.get('/settings/maltese-banks')
    .then(getData);

export const create = (bank) => http.post('/settings/maltese-banks', bank)
    .then(getData);

export const update = (bank) => http.put(`/settings/maltese-banks/${bank.id}`, bank)
    .then(getData);

export const destroy = (bank) => http.delete(`/settings/maltese-banks/${bank.id}`)
    .then(getData);

export const restore = (bankId) => http.post(`/settings/maltese-banks/${bankId}/restore`)
    .then(getData);