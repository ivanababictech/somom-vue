const Reviews = r => require.ensure([], () => r(require('./main')), 'corporate-reviews-bundle');

let parent = 'corporate';

export default [
    {
        path: `${parent}/reviews`,
        name: `${parent}.reviews`,
        component: Reviews,
    },
]
