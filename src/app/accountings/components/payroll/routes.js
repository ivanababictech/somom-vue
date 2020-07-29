const Index = r => require.ensure([], () => r(require('./main.vue')), 'payroll-bundle')
const CompanyDetails = r => require.ensure([], () => r(require('./components/company-details/main.vue')), 'payroll-bundle')
const EmployeeList = r => require.ensure([], () => r(require('./components/employees/main.vue')), 'payroll-bundle')
const PayrollRun = r => require.ensure([], () => r(require('./components/payroll-run/main.vue')), 'payroll-bundle')
const Reporting = r => require.ensure([], () => r(require('./components/reporting/main.vue')), 'payroll-bundle')
const TerminationList = r => require.ensure([], () => r(require('./components/termination-list/main')), 'payroll-bundle')
const AddNewEmployee = r => require.ensure([], () => r(require('./components/employees/tables/add-new-employee')), 'payroll-bundle')
const EditEmployee = r => require.ensure([], () => r(require('./components/employees/tables/edit-employee')), 'payroll-bundle')


const FS3 = r => require.ensure([], () => r(require('./components/goverment_reporting/FS3')), 'payroll-bundle')
const FS4 = r => require.ensure([], () => r(require('./components/goverment_reporting/FS4')), 'payroll-bundle')
const FS5 = r => require.ensure([], () => r(require('./components/goverment_reporting/FS5')), 'payroll-bundle')
const FS7 = r => require.ensure([], () => r(require('./components/goverment_reporting/FS7')), 'payroll-bundle')

/* eslint-disable global-require */

const meta = {
    // requiresAuth: true
};

export let one = 1;

export default [
    {
        path: 'payroll',
        component: Index,
        children: [
            {
                path: '',
                name: 'AccountingPayroll',
            },
            {
                path: 'company-details',
                name: 'PayrollCompanyDetails',
                component: CompanyDetails
            },
            {
                path: 'employee-list',
                name: 'PayrollEmployeeList',
                component: EmployeeList
            },
            {
                path: 'payroll-run',
                name: 'PayrollPayrollRun',
                component: PayrollRun
            },
            {
                path: 'reporting',
                name: 'PayrollReporting',
                component: Reporting
            },
            {
                path: 'termination-list',
                name: 'PayrollTerminationList',
                component: TerminationList
            },
            {
                path: 'addnewemployee',
                name: 'AddNewEmployee',
                component: AddNewEmployee
            },
            {
                path: 'editemployee/:id',
                name: 'EditEmployee',
                component: EditEmployee
            }
        ],
        meta
    },
]
