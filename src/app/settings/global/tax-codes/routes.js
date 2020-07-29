const TaxCodes = r => require.ensure([], () => r(require('./main')), 'tax-codes-bundle')


const parent = 'global'

export default [
    {
        path: parent + '/tax-codes',
        name: parent + '.tax-codes',
        component: TaxCodes,
    }
]
