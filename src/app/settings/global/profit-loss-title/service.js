import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('titles') || []
    return Promise.resolve(data)
}

export const create = (titles) => {
    let data = localStorage.setItem('titles', JSON.stringify(titles))
    Promise.resolve(data)
}