import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'


export const get = () => http.get('settings/type-of-shares').then(getData);

export const create = (item) => http.post('settings/type-of-shares', item).then(getData);

export const update = (item) => http.put(`/settings/type-of-shares/${item.id}`, item).then(getData);

export const destroy = (item) => http.delete(`/settings/type-of-shares/${item.id}`).then(getData);

export const restore = (itemId) => http.post(`/settings/type-of-shares/${itemId}/restore`).then(getData);