import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('areas')
    return Promise.resolve(data)
}

export const create = (areas) => {
    let data = localStorage.setItem('areas', JSON.stringify(areas))
    Promise.resolve(data)
}