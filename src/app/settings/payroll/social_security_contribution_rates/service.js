import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

//------------- Income Tax Categories ---------------
/**
 * Get income tax categories
 */
export const getSocialSecurityContributionRates = (year) => http.get(`/payroll/settings/socialsecuritycontributionrates/${year}`).then(getData);

export const saveSocialSecurityContributionRate = (category) => http.put(`/payroll/settings/socialsecuritycontributionrates/${category.id}`, category).then(getData);

export const updateYear = (request) => http.post(`/payroll/settings/socialsecuritycontributionrates/updateyear/`, request).then(getData);