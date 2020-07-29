import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

export const getOptions = () => http.get('/payroll/employees/options').then(getData);

export const getContractDurations = () => {
    return [
        '1 month',
        '3 months',
        '6 months',
        '9 months',
        '1 year',
        '2 years',
        '3 years',
        '4 years',
        '5 years',
    ]
};

export const getProbationPeriodsList = () => {
    return [
        '1 month',
        '3 months',
        '6 months',
        '9 months',
        '1 year',
    ]
};