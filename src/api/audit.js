import { http } from '@/plugins/http/index'

export const fetchAuditSections = () => {
    return new Promise(resolve => {
        if (sessionStorage.audit_sections) {
            resolve(JSON.parse(sessionStorage.audit_sections))
        } else {
            http.get('audit-sections').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('audit_sections', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}