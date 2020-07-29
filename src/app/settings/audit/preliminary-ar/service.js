import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('PreliminaryArs')
    return Promise.resolve(data)
}

export const create = (PreliminaryArs) => {
    let data = localStorage.setItem('PreliminaryArs', JSON.stringify(PreliminaryArs))
    Promise.resolve(data)
}