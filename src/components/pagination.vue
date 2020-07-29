<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center" v-if="pagination.total > pagination.per_page">
            <li class="page-item" v-if="pagination.current_page > 1">
                <a href="#" class="page-link" aria-label="Previous"
                   @click.prevent="changePage(pagination.current_page - 1)">
                    <span aria-hidden="true">Previous</span>
                </a>
            </li>
            <li class="page-item" v-for="page in pagesNumber"
                v-bind:class="[ page == isActived ? 'active' : '']">
                <a href="#" class="page-link"
                   @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                <a href="#" class="page-link" aria-label="Next"
                   @click.prevent="changePage(pagination.current_page + 1)">
                    <span aria-hidden="true">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                offset: 4,// left and right padding from the pagination <span>,just change it to see effects
                items: []
            }
        },
        props: ['pagination'],

        computed: {
            isActived() {
                return this.pagination.current_page;
            },
            pagesNumber() {
                if (!this.pagination.to) {
                    return [];
                }
                var from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                var to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                var pagesArray = [];
                while (from <= to) {
                    pagesArray.push(from);
                    from++;
                }
                return pagesArray;
            }
        },
        methods: {
            changePage(page) {
                this.pagination.current_page = page;
                this.$emit('change-page', page);
            },
        },
    }
</script>