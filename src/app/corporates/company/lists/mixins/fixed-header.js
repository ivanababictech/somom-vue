import fixedHeader from '../fixed-header';

export default {
    components: {fixedHeader},

    methods: {
        setFixedHeader() {
            const tableOffset = document.querySelector('div#main-table > div.v-table__overflow > table').offsetTop;
            const $fixedHeader = document.getElementById('header-fixed');

            window.addEventListener('scroll', function (e) {
                const offset = window.pageYOffset;
                if (offset - 120 >= tableOffset && $fixedHeader.offsetWidth <= 0 && $fixedHeader.offsetHeight <= 0)
                    $fixedHeader.style.display = 'block';
                else if (offset - 120 < tableOffset)
                    $fixedHeader.style.display = 'none';
            })
        }
    }
}