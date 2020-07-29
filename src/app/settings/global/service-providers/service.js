import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'

export const get = () => http.get('/settings/service-providers').then(getData)

export const find = (serviceProviderId) => http.get('/settings/service-providers/' + serviceProviderId).then(getData)

export const create = (serviceProvider) => http.post('/settings/service-providers/', serviceProvider).then(getData)

export const update = (serviceProvider) => http.post('/settings/service-providers/' + serviceProvider.id, serviceProvider).then(getData)

export const destroy = (serviceProvider) => http.delete('/settings/service-providers/' + serviceProvider.id).then(getData)

export const restore = (serviceProvider) => http.put(`settings/service-providers/${serviceProvider.id}/restore`).then(getData)

export const remove = (serviceProvider) => http.delete('/settings/service-providers/' + serviceProvider.id).then(getData)