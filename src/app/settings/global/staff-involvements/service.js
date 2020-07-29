import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('staff') || []
    return Promise.resolve(data)
}

export const create = (staff) => {
    let data = localStorage.setItem('staff', JSON.stringify(staff))
    Promise.resolve(data)
}