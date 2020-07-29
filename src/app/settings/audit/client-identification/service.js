import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('clientIdentifications')
    return Promise.resolve(data)
}

export const create = (clientIdentifications) => {
    let data = localStorage.setItem('clientIdentifications', JSON.stringify(clientIdentifications))
    Promise.resolve(data)
}