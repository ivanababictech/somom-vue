import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('checklists')
    return Promise.resolve(data)
}

export const create = (checklists) => {
    let data = localStorage.setItem('checklists', JSON.stringify(checklists))
    Promise.resolve(data)
}