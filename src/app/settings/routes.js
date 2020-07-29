import { routes as global } from './global'
import { routes as corporate } from './corporate'
import { routes as audit } from './audit'
import { routes as payroll } from './payroll'
import { routes as accounting } from './accounting'
import SettingsMenu from '@/app/settings/main'

export default [
    {
        path: '/settings',
        component: {
            template: '<router-view></router-view>'
        },
        children: [
            {
                path: '',
                name: 'Settings',
                component: SettingsMenu
            },
            ...global,
            ...corporate,
            ...audit,
            ...payroll,
            ...accounting,
        ],
    },
]
