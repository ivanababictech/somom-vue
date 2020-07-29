import Bankers from '@/app/settings/global/bankers/bankers'

let parent = 'global'

export default [
    {
        path: parent + '/bankers',
        name: parent + '.bankers',
        component: Bankers
    },
]
