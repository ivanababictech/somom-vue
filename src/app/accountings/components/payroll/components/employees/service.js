import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
/**
 * Create employee
 */
export const createEmployee = (employee) => http.post('/payroll/employees', employee).then(getData);

/**
 * Get edit employee
 */
export const getEmployee = (id) => http.get(`/payroll/employees/getEmployee/${id}`).then(getData);

/**
 * Edit employee
 */
export const editEmployee = (employee) => http.put(`/payroll/employees/edit/${employee.id}`, employee);

/**
 * Get employees
 */
export const getEmployees = () => http.get('/payroll/employees').then(getData);

/**
 * Edit employee
 */
// export const editEmployee = (employee) => http.put(`/payroll/employees/${employee.id}`, employee).then(getData);

/**
 * Terminate employee
 */
export const terminateEmployee = (employee) => http.put(`/payroll/employees/terminate/${employee.employee.id}`, employee).then(getData);

/**
 * Activate employee
 */
export const activateEmployee = (employee) => http.put(`/payroll/employees/activate/${employee.id}`, employee).then(getData);