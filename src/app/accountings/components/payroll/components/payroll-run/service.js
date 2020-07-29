import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

/**
 * Get company employee list
 */
export const getCompanyEmployeeList = (params) => http.get('/payroll/payrollrun', params).then(getData);

// fake
export const getMonthList = () => {
    return [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

export const getYearList = () => {
    return [
        "2016", "2017", "2018"
    ]
};

export const getActiveEmployees = () => {
    return [
        {
            value: false,
            code: '001',
            name: 'Frank Lonzo',
            hours: '173.33',
            basicSalary: 2000,
            commissions: 100,
            carCash: 100,
            gross: 2100, // summary
            perDiem: '',
            other: 100,
            ssc: 50,
            tax: 450,
            maternity: 5,
            netSalary: 1550,
            // startDate: '10/15/2017',
            // taxRate: 'Single',
            status: 'active'
        }
    ]
};