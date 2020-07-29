import * as allocationTypeService from '@/app/corporates/service'

/**
 * @param accounts
 * @returns {*}
 */
export const accounts = ({ accounts }) => accounts;

/**
 * @param currencies
 * @returns {*}
 */
export const currencies = ({currencies}) => currencies;

/**
 * @param countries
 * @returns {*}
 */
export const countries = ({countries}) => countries;

/**
 * @param vat_rates
 * @returns {*}
 */
export const vatRates = ({vat_rates}) => vat_rates;

/**
 * @param corporateSections
 * @returns {*}
 */
export const corporateSections = ({corporateSections}) => corporateSections;

/**
 * @param corporateSections
 * @returns {*}
 */
export const corporateTypes = ({corporateTypes}) => corporateTypes;

/**
 * @param bank_request_reasons
 * @returns {*}
 */
export const bankRequestReasons = ({bank_request_reasons}) => bank_request_reasons;

/**
 * @param bank_request_reasons
 * @returns {*}
 */
export const filteredKeywords = ({filtered_keywords}) => filtered_keywords;

/**
 * @param corporateTypes
 * @returns {*}
 */
export const corporateRevenueTypes = ({corporateTypes}) => {
    return corporateTypes.filter(corporateType => corporateType.section === allocationTypeService.SECTION_REVENUE);
}

/**
 * @param corporateTypes
 * @returns {*}
 */
export const corporateSellingDistributionTypes = ({corporateTypes}) => {
    return corporateTypes.filter(corporateType => corporateType.section === allocationTypeService.SECTION_SELLING_DISTRIBUTION);
}
/**
 * @param corporateTypes
 * @returns {*}
 */
export const corporateAdministrativeExpensesTypes = ({corporateTypes}) => {
    return corporateTypes.filter(corporateType => corporateType.section === allocationTypeService.SECTION_ADMINISTRATIVE_EXPENSES);
}

/**
 * @param corporate_payment_methods
 * @returns {*}
 */
export const corporate_payment_methods = ({corporate_payment_methods}) => corporate_payment_methods;

/**
 * @param corporate_payment_methods
 * @returns {*}
 */
export const corporate_default_payment_method = ({corporate_payment_methods}) => {
    return corporate_payment_methods.find(corporate_payment_method => corporate_payment_method.is_default)
}

/**
 * @param company_activities
 * @returns {*}
 */
export const company_activities = ({company_activities}) => company_activities;

/**
 * @param vat_rates
 * @returns {function(*): *}
 */
export const vatRateById = ({vat_rates}) => (id) => {
    return vat_rates.find(vat_rate => vat_rate.id == id)
}

/**
 * @param vat_codes
 * @returns {Function}
 */
export const vatRateByCode = ({vat_codes}) => (code) => {
    const vatCode = vat_codes.find(vat_code => vat_code.code == code)

    if(vatCode) {
        return vatCode.vat
    }
    return null
}

/**
 * @param vat_codes
 * @returns {Function}
 */
export const vatWordingByCode = ({vat_codes}) => (code) => {
    const vatCode = vat_codes.find(vat_code => vat_code.code == code);

    if(vatCode) {
        return vatCode.wording
    }

    return null
}

/**
 * @returns {function(*): *}
 */
export const currencySymbol = () => (currency) => {
    let symbol
    switch (currency) {
        case 'EUR':
            symbol = '€'
            break
        case 'USD':
            symbol = '$'
            break
        case 'GBP':
            symbol = '£'
            break
        default:
            symbol = currency
    }
    return symbol
}
