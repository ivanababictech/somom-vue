import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    let data = localStorage.getItem('independenceQuestionnaires')
    return Promise.resolve(data)
}

export const create = (independenceQuestionnaires) => {
    let data = localStorage.setItem('independenceQuestionnaires', JSON.stringify(independenceQuestionnaires))
    Promise.resolve(data)
}