import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

/**
 * Get employees
 */
export const getEmployees = () => http.get('/payroll/employees').then(getData);