export const Auth = r => require.ensure([], () => r(require('../components/auth')), 'auth-bundle')
export const Verification = r => require.ensure([], () => r(require('../components/verification')), 'auth-bundle')
export const ResetPassword = r => require.ensure([], () => r(require('../components/passwords/reset')), 'auth-bundle')

export default [{
    name: 'auth',
    path: '/',
    component: Auth,
    meta: { requiresAuth: false },
}, {
    name: 'auth.verification',
    path: '/auth/verification/:token',
    component: Verification,
    meta: { requiresAuth: false },
}, {
    name: 'password.reset',
    path: '/password/reset/:token',
    component: ResetPassword,
    meta: { requiresAuth: false },
}]
