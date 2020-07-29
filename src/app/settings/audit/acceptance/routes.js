import Acceptance from './main'

let parent = 'global'

export default [
    {
        path: parent + '/acceptance',
        name: parent + '.acceptance',
        component: Acceptance
    },
]
