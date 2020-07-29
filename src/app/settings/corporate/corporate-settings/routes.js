const CorporateSettings = r => require.ensure([], () => r(require('./main')), 'corporate-settings-bundle')
const CorporateSettingsCreate = r => require.ensure([], () => r(require('./components/createSettings')), 'corporate-settings-bundle')
const CorporateSettingsEdit = r => require.ensure([], () => r(require('./components/editSettings')), 'corporate-settings-bundle')
const CorporateSettingsItems = r => require.ensure([], () => r(require('./components/settingsItems')), 'corporate-settings-bundle')
const CorporateSettingsItemCreate = r => require.ensure([], () => r(require('./components/settingsItemCreate')), 'corporate-settings-bundle')
const CorporateSettingsItemEdit = r => require.ensure([], () => r(require('./components/settingsItemEdit')), 'corporate-settings-bundle')

let parent = 'corporate'

export default [
    {
        path: parent + '/corporate-settings',
        name: parent + '.corporate-settings',
        component: CorporateSettings,
    },
    {
        path: parent + '/corporate-settings/create',
        name: parent + '.corporate-settings.create',
        component: CorporateSettingsCreate,
    },
    {
        path: parent + '/corporate-settings/:corporateSettingsId/edit',
        name: parent + '.corporate-settings.edit',
        component: CorporateSettingsEdit,
    },
    {
        path: parent + '/corporate-settings/:corporateSettingsId/items',
        name: parent + '.corporate-settings.items',
        component: CorporateSettingsItems,
    },
    {
        path: parent + '/corporate-settings/:corporateSettingsId/items/create',
        name: parent + '.corporate-settings.items.create',
        component: CorporateSettingsItemCreate,
    },
    {
        path: parent + '/corporate-settings/:corporateSettingsId/items/edit/:corporateSettingsItemId',
        name: parent + '.corporate-settings.items.edit',
        component: CorporateSettingsItemEdit,
    },
]
