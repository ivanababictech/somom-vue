<template>
    <menu-template :items="items" :title="title"></menu-template>
</template>
<script>
    import MenuTemplate from '../menu-template'

    export default {
        data: () => ({
            title: 'Corporate settings',
            items: [
                { title: 'Documents types', description: 'View/edit documents types for loading passport/id card', link: 'corporate.document-types'},
                { title: 'Risk Assessments', description: 'View/edit risk assessments', link: 'corporate.corporate-settings'},
                { title: 'Source of wealth documents', description: 'View/edit source of wealth documents', link: 'corporate.source-of-wealth-documents'},
                { title: 'Approval questions', description: 'View/edit approval questions settings', link: 'corporate.approval-questions'},
                { title: 'Company profile ', description: '', link: 'corporate.company-profile'},
                { title: 'Reviews ', description: 'Approval/disapproval reasons, Keywords filter', link: 'corporate.reviews'},
                { title: 'Due Diligence', description: '', link: 'corporate.due-diligence'}
            ]
        }),

        components: { MenuTemplate }
    }
</script>