<template>
    <v-app footer v-loading="fetching" class="white">
        <toolbar  v-if="isLogged"></toolbar>

        <v-content fixed>
            <v-container fluid>
                <notifications></notifications>
                <router-view></router-view>
            </v-container>
        </v-content>

        <app-footer></app-footer>
        <Snackbar/>
    </v-app>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import Navigation from './layout/Navigation';
    import Toolbar from './layout/Toolbar';
    import AppFooter from './layout/Footer';
    import Snackbar from './layout/Snackbar';
    import Notifications from './components/notifications'

    export default {
        name: 'app',
        computed: {
            ...mapState(['fetching']),
            ...mapGetters(['currentUser', 'isLogged']),
        },
        components: {
            Navigation,
            Toolbar,
            AppFooter,
            Snackbar,
            Notifications
        },
    }
</script>

<style>
    .pointer{
        cursor: pointer
    }

    .fill-width {
        width: 100%;
    }

    .upload-btn{
        padding: 9px;
    }
    .upload-btn-hover{
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        border-radius: 2px;
        font-weight: 500;
    }
    .custom-upload-button{
        margin: 5px 0px;
    }

    .v-datatable thead th{
        font-weight: bold !important;
        font-family: Roboto !important;
        color: #000 !important;
        font-size: 14px !important;
    }

    .custom-dialog .v-dialog__activator{
        height: 100% !important;
    }

    label {
        color: #111!important;
    }

    .application .theme--light.v-card, .theme--light .v-card, .application.theme--light{
        color: #000 !important;
    }

    .el-table th>.cell{
        color: #333 !important;
    }
    .v-table{
        color: #000 !important;
    }
    .v-datatable__expand-content tbody{
        background: #ececec !important;
    }
    .v-datatable tbody td{
        font-size: 14px !important;
    }

    .reduced-gaps-table th{
        padding: 0 4px !important;
    }
</style>