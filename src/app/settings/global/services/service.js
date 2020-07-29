import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'

export const get = () => {
    return http.get('/settings/services').then(getData)
}

export const find = (serviceId) => http.get('/settings/services/' + serviceId).then(getData)

export const create = (service) => http.post('/settings/services/', service).then(getData)

export const update = (service) => http.put('/settings/services/' + service.id, service).then(getData)

export const destroy = (service) => http.delete('/settings/services/' + service.id).then(getData)

export const restore = (service) => http.put(`settings/services/${service.id}/restore`).then(getData)