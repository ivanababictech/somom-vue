import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'

export const get = () => {
    return http.get('/settings/activities').then(getData)
}

export const find = (activityId) => http.get('/settings/activities/' + activityId).then(getData)

export const create = (activity) => http.post('/settings/activities/', activity).then(getData)

export const update = (activity) => http.put('/settings/activities/' + activity.id, activity).then(getData)

export const destroy = (activity) => http.delete('/settings/activities/' + activity.id).then(getData)

export const restore = (activity) => http.put(`settings/activities/${activity.id}/restore`).then(getData)