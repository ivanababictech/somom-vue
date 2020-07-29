const CompanyProfile = r => require.ensure([], () => r(require('./main')), 'corporate-company-profile-bundle');

let parent = 'corporate';

export default [
    {
        path: `${parent}/company-profile`,
        name: `${parent}.company-profile`,
        component: CompanyProfile,
    },
]
