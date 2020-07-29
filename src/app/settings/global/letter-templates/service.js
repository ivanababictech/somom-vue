import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'

export const get = () => http.get('/settings/letter-templates').then(getData)

export const find = (letterTemplateId) => http.get('/settings/letter-templates/' + letterTemplateId).then(getData)

export const create = (letterTemplate) => http.post('/settings/letter-templates/', letterTemplate).then(getData)

export const update = (letterTemplate) => http.put('/settings/letter-templates/' + letterTemplate.id, letterTemplate).then(getData)

export const destroy = (letterTemplate) => http.delete('/settings/letter-templates/' + letterTemplate.id).then(getData)

export const restore = (letterTemplate) => http.put(`settings/letter-templates/${letterTemplate.id}/restore`).then(getData)

export const remove = (letterTemplate) => http.delete('/settings/letter-templates/' + letterTemplate.id).then(getData)