// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import { routes as auth } from './auth'
import { routes as profile } from './profile'
import { routes as dashboard } from './dashboard'
import { routes as companies } from './companies'
import { routes as users } from './users'
import { routes as corporates } from './corporates'
import { routes as accountings } from './accountings'
import { routes as audit } from './audit'
import { routes as settings } from './settings'
import { routes as pages } from './pages'

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
// Thus a new array is created, containing all objects that match the routes.
// ...dashboard must be the last one because of the catchall instruction
export default [
    ...dashboard,
    ...auth,
    ...corporates,
    ...accountings,
    ...audit,
    ...settings,
    ...profile,
    ...companies,
    ...users,
    ...pages
]