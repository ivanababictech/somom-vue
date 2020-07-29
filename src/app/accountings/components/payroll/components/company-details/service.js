import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

/**
 * Get preTax month allowances
 */
export const getPreTaxAllowances = () => http.get('/payroll/companydetails/pretaxallowances').then(getData);
/**
 * Create preTax month allowances
 */
export const createPreTaxAllowance = (allowance) => http.post('/payroll/companydetails/pretaxallowances', allowance);
/**
 * Edit preTax month allowances
 */
export const editPreTaxAllowance = (allowance) => http.put(`/payroll/companydetails/pretaxallowances/${allowance.id}`, allowance);

/**
 * Get postTax month allowances
 */
export const getPostTaxAllowances = () => http.get('/payroll/companydetails/posttaxallowances').then(getData);
/**
 * Create postTax month allowances
 */
export const createPostTaxAllowance = (allowance) => http.post('/payroll/companydetails/posttaxallowances', allowance).then(getData);
/**
 * Edit postTax month allowances
 */
export const editPostTaxAllowance = (allowance) => http.put(`/payroll/companydetails/posttaxallowances/${allowance.id}`, allowance);

/**
 * Get departments
 */
export const getDepartments = () => http.get('/payroll/companydetails/departments').then(getData);
/**
 * Create departments
 */
export const createDepartment = (department) => http.post('/payroll/companydetails/departments', department).then(getData);
/**
 * Edit departments
 */
export const editDepartment = (department) => http.put(`/payroll/companydetails/departments/${department.id}`, department);

