import * as service from '../../../service';

export default {
    methods: {
        exportList(list, type, format)
        {
            if (this.$refs.table.itemsLength) {
                service.exportList(list, type, format, this.filters)
            }
        },
    },
}