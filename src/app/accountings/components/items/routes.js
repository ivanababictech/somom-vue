const AccountingItems = r => require.ensure([], () => r(require('./main')), 'accounting-items-bundle')
const AccountingProducts = r => require.ensure([], () => r(require('./components/products')), 'accounting-items-bundle')
const AccountingServices = r => require.ensure([], () => r(require('./components/services')), 'accounting-items-bundle')
const AccountingInventories = r => require.ensure([], () => r(require('./components/inventories')), 'accounting-items-bundle')
const AccountingAssetRegistrar = r => require.ensure([], () => r(require('./components/asset-registrar')), 'accounting-items-bundle')

export default [
    {
        path: 'items',
        name: 'AccountingItems',
        component: AccountingItems,
        children: [
            {
                path: 'products',
                name: 'AccountingProducts',
                component: AccountingProducts
            },
            {
                path: 'services',
                name: 'AccountingServices',
                component: AccountingServices
            },
            {
                path: 'inventories',
                name: 'AccountingInventories',
                component: AccountingInventories
            },
            {
                path: 'asset-registrar',
                name: 'AccountingAssetRegistrar',
                component: AccountingAssetRegistrar
            },
        ]
    },
]
