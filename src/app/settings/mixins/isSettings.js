import {mapGetters, mapActions} from 'vuex'
import settingsDialog from '../components/dialog.vue'
import settingsTable from '../components/table.vue'

export default{
    components: {
        settingsDialog,
        settingsTable
    },
    data: () => ({
        search: '',
        dialog: {
            visible: false,
            type: 'Add',
        },
        items: [],
    }),
    mounted() {
        this.fetchItems()
    },
    methods: {
        toggleDialog(item) {
            let keys = Object.keys(item)
            if (item[keys[0]]) {
                this.dialog.type = 'Edit';
                this.item = JSON.parse(JSON.stringify(item));
            } else {
                this.dialog.type = 'Add';
                this.resetItem(this.item)
            }
            this.dialog.visible = true;
        },
        resetItem(item) {
            for (let property in item) {
                if (property == 0) {
                    break
                }

                if(typeof property === 'object') {
                    this.resetItem(property)
                }
                item[property] = null
            }
        },

        add() {
            this.service.create(this.item)
                .then(({data}) => {
                    this.items.push(data);
                    this.dialog.visible = false;
                });
        },

        update () {
            this.service.update(this.item)
                .then(() => {
                    this.fetchItems();
                    this.dialog.visible = false;
                });
        },

        destroy (item) {
            this.service.destroy(item)
                .then(() => {
                    this.fetchItems();
                })
        },

        restoreLS (item) {
            this.service.restore(item.id)
                .then(() => {
                    this.fetchItems();
                })
        },
        closeDialog () {
            this.resetItem(this.item)
            this.dialog.visible = false;
        },
        fetchItems () {
            this.service.get()
                .then(response => {
                    this.items = response.data
                })
        },

        restore(item) {
            this.service.restore(item)
                .then(() => {
                    this.closeDialog()
                    item.deleted_at = null;
                });
        },
    }
}