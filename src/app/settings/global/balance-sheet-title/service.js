import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('sheets') || []
    return Promise.resolve(data)
}

export const create = (sheet) => {
    let data = localStorage.setItem('sheets', JSON.stringify(sheet))
    Promise.resolve(data)
}