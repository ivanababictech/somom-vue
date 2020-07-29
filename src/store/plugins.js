import { vuex as app } from '../app'
//import createLogger from "@/plugins/logger";
//const debug = process.env.NODE_ENV !== 'production'

// create a new object and preserv original keys
export default [
    ...app.plugins,
    //debug ? createLogger() : null
]
