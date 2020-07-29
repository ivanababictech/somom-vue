import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('sections') || []
    return Promise.resolve(data)
}

export const create = (sections) => {
    let data = localStorage.setItem('sections', JSON.stringify(sections))
    Promise.resolve(data)
}