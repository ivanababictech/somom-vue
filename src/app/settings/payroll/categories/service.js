import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

export const read = (route) => http.get('/payroll/settings/categories/' + route).then(getData);
export const create = (route, item) => http.post('/payroll/settings/categories/' + route, item).then(getData);
export const update = (route, item) => http.put(`/payroll/settings/categories/${route}/${item.id}`, item).then(getData);
export const destroy = (route, item) => http.delete(`/payroll/settings/categories/${route}/${item.id}`, item).then(getData);


export const readFake = (route) => {
    let items = JSON.parse(localStorage.getItem(route)) || []
    return Promise.resolve(items)
}

export const createFake = (route, item) => {
    let items = JSON.parse(localStorage.getItem(route)) || []
    item.id = items.length + 1
    items.push(item)
    localStorage.setItem(route, JSON.stringify(items))
    return Promise.resolve(item)
}

export const updateFake = (route, item) => {
    let items = JSON.parse(localStorage.getItem(route)) || []
    let index = items.findIndex(el => el.id === item.id)
    items[index] = item
    localStorage.setItem(route, JSON.stringify(items))
    return Promise.resolve(item)
}

export const destroyFake = (route, item) => {
    let items = JSON.parse(localStorage.getItem(route)) || []
    let index = items.findIndex(el => el.id === item.id)
    items.splice(index, 1)
    localStorage.setItem(route, JSON.stringify(items))
    return Promise.resolve(item)
}