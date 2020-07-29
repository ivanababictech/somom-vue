import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => http.get('/settings/bankers').then(getData)

export const create = (banker) => http.post('settings/bankers', banker).then(getData)

export const update = (banker) => http.put('settings/bankers/' + banker.banker_id, banker).then(getData)

export const destroy = (banker) => http.delete('settings/bankers/' + banker.banker_id).then(getData)

export const restore = (banker) => http.put(`settings/bankers/${banker.banker_id}/restore`).then(getData)