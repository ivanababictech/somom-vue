import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const get = () => {
    return http.get('/companies/25').then(getData)
}