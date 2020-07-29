import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('Reviews')
    return Promise.resolve(data)
}

export const create = (Reviews) => {
    let data = localStorage.setItem('Reviews', JSON.stringify(Reviews))
    Promise.resolve(data)
}