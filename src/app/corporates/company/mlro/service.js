import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const getCompanyDetails = (companyId) => http.get('/corporates/get-details/' + companyId)
    .then(response => response.data)

export const getApprovalQuestions = () => http.get('/settings/approval-questions/active')
    .then(getData);