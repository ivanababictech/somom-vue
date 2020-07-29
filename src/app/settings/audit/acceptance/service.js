import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('acceptances')
    return Promise.resolve(data)
}

export const create = (acceptances) => {
    let data = localStorage.setItem('acceptances', JSON.stringify(acceptances))
    Promise.resolve(data)
}