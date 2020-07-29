import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('assessments')
    return Promise.resolve(data)
}

export const create = (assessments) => {
    let data = localStorage.setItem('assessments', JSON.stringify(assessments))
    Promise.resolve(data)
}