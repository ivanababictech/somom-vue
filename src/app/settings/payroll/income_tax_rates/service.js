import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

//------------- Income Tax Categories ---------------
/**
 * Get income tax categories
 */
export const getIncomeTaxRates = (year) => http.get(`/payroll/settings/incometaxrates/${year}`).then(getData);

export const saveIncomeTaxRate = (category) => http.put(`/payroll/settings/incometaxrates/${category.id}`, category).then(getData);

export const updateYear = (request) => http.post(`/payroll/settings/incometaxrates/updateyear/`, request).then(getData);