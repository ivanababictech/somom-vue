<template>
    <section class="tax">

        <v-navigation-drawer right app width="150">
            <v-list dense class="pt-0">
                <v-list-tile @click="generatePDF">
                    <v-list-tile-content>
                        <v-list-tile-title>Generate PDF</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                        v-for="(page, i) in pages"
                        :key="i"
                        @click="changeSection(i)"
                        :class="isActiveSection(i) &&'blue'"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ page.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-flex xs10 offset-xs1>
            <page1 id="page1" v-if="isActive(1)"></page1>
            <page2 id="page2" v-if="isActive(2)"></page2>
            <page3 id="page3" v-if="isActive(3)"></page3>
            <page4 id="page4" v-if="isActive(4)"></page4>
            <page6 id="page5" v-if="isActive(5)"></page6>
            <page7 id="page6" v-if="isActive(6)"></page7>
            <page8 id="page7" v-if="isActive(7)"></page8>
            <page9 id="page8" v-if="isActive(8)"></page9>
            <page10 id="page9" v-if="isActive(9)"></page10>
            <page11 id="page10" v-if="isActive(10)"></page11>
            <page12 id="page11" v-if="isActive(11)"></page12>
            <page13 id="page12" v-if="isActive(12)"></page13>
            <page14 id="page13" v-if="isActive(13)"></page14>
            <page15 id="page14" v-if="isActive(14)"></page15>
            <page16 id="page15" v-if="isActive(15)"></page16>
            <page17 id="page16" v-if="isActive(16)"></page17>
            <page18 id="page17" v-if="isActive(17)"></page18>
            <page19 id="page18" v-if="isActive(18)"></page19>
            <page20 id="page19" v-if="isActive(19)"></page20>
            <page21 id="page20" v-if="isActive(20)"></page21>
            <page22 id="page21" v-if="isActive(21)"></page22>
            <page23 id="page22" v-if="isActive(22)"></page23>
            <page24 id="page23" v-if="isActive(23)"></page24>
            <page25 id="page24" v-if="isActive(24)"></page25>
            <page26 id="page25" v-if="isActive(25)"></page26>
            <page27 id="page26" v-if="isActive(26)"></page27>
            <page28 id="page27" v-if="isActive(27)"></page28>
            <page29 id="page28" v-if="isActive(28)"></page29>
            <page30 id="page29" v-if="isActive(29)"></page30>
            <page31 id="page30" v-if="isActive(30)"></page31>
            <page32 id="page31" v-if="isActive(31)"></page32>
            <page33 id="page32" v-if="isActive(32)"></page33>
            <page34 id="page33" v-if="isActive(33)"></page34>
            <page35 id="page34" v-if="isActive(34)"></page35>
            <page36 id="page35" v-if="isActive(35)"></page36>
            <page37 id="page36" v-if="isActive(36)"></page37>
            <page38 id="page37" v-if="isActive(37)"></page38>
            <page39 id="page38" v-if="isActive(38)"></page39>
            <page40 id="page39" v-if="isActive(39)"></page40>
            <page41 id="page40" v-if="isActive(40)"></page41>
            <page42 id="page41" v-if="isActive(41)"></page42>
            <page43 id="page42" v-if="isActive(42)"></page43>
            <page44 id="page43" v-if="isActive(43)"></page44>
            <page45 id="page44" v-if="isActive(44)"></page45>
        </v-flex>
    </section>
</template>

<script>
    import html2canvas from 'html2canvas'
    import jsPDF from 'jspdf'
    import page1 from './pages/page1'
    import page2 from './pages/page2'
    import page3 from './pages/page3'
    import page4 from './pages/page4'
    import page5 from './pages/page5'
    import page6 from './pages/page6'
    import page7 from './pages/page7'
    import page8 from './pages/page8'
    import page9 from './pages/page9'
    import page10 from './pages/page10'
    import page11 from './pages/page11'
    import page12 from './pages/page12'
    import page13 from './pages/page13'
    import page14 from './pages/page14'
    import page15 from './pages/page15'
    import page16 from './pages/page16'
    import page17 from './pages/page17'
    import page18 from './pages/page18'
    import page19 from './pages/page19'
    import page20 from './pages/page20'
    import page21 from './pages/page21'
    import page22 from './pages/page22'
    import page23 from './pages/page23'
    import page24 from './pages/page24'
    import page25 from './pages/page25'
    import page26 from './pages/page26'
    import page27 from './pages/page27'
    import page28 from './pages/page28'
    import page29 from './pages/page29'
    import page30 from './pages/page30'
    import page31 from './pages/page31'
    import page32 from './pages/page32'
    import page33 from './pages/page33'
    import page34 from './pages/page34'
    import page35 from './pages/page35'
    import page36 from './pages/page36'
    import page37 from './pages/page37'
    import page38 from './pages/page38'
    import page39 from './pages/page39'
    import page40 from './pages/page40'
    import page41 from './pages/page41'
    import page42 from './pages/page42'
    import page43 from './pages/page43'
    import page44 from './pages/page44'
    import page45 from './pages/page45'


    export default {
        components: {
            page1,
            page2,
            page3,
            page4,
            page5,
            page6,
            page7,
            page8,
            page9,
            page10,
            page11,
            page12,
            page13,
            page14,
            page15,
            page16,
            page17,
            page18,
            page19,
            page20,
            page21,
            page22,
            page23,
            page24,
            page25,
            page26,
            page27,
            page28,
            page29,
            page30,
            page31,
            page32,
            page33,
            page34,
            page35,
            page36,
            page37,
            page38,
            page39,
            page40,
            page41,
            page42,
            page43,
            page44,
            page45,
        },
        data: () => ({
                activePage: 1,
                pages: [
                    {
                        name: 'Index',
                        active: true,
                        children: [
                            {
                                page: 1,
                                active: true
                            },
                            {
                                page: 2,
                                active: true
                            }
                        ]
                    },
                    {
                        name: 'Page 1',
                        active: false,
                        children: [
                            {
                                page: 3,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'Page 2',
                        active: false,
                        children: [
                            {
                                page: 4,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'Page 3',
                        children: [
                            {
                                page: 5,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'Page 4',
                        active: false,
                        children: [
                            {
                                page: 6,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'Page 5',
                        active: false,
                        children: [
                            {
                                page: 7,
                                active: false
                            },
                            {
                                page: 8,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'Page 6',
                        active: false,
                        children: [
                            {
                                page: 9,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'Page 7',
                        active: false,
                        children: [
                            {
                                page: 10,
                                active: false
                            },
                            {
                                page: 11,
                                active: false
                            },
                        ]
                    },
                    {
                        name: 'Page 8',
                        active: false,
                        children: [
                            {
                                page: 12,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'B_Sheet',
                        active: false,
                        children: [
                            {
                                page: 13,
                                active: false
                            },
                            {
                                page: 14,
                                active: false
                            },
                            {
                                page: 15,
                                active: false
                            },
                            {
                                page: 16,
                                active: false
                            },
                            {
                                page: 17,
                                active: false
                            },
                        ]
                    },
                    {
                        name: 'Income',
                        active: false,
                        children: [
                            {
                                page: 18,
                                active: false
                            },
                            {
                                page: 19,
                                active: false
                            },
                            {
                                page: 20,
                                active: false
                            },
                            {
                                page: 21,
                                active: false
                            },
                            {
                                page: 22,
                                active: false
                            },
                            {
                                page: 23,
                                active: false
                            },
                        ]
                    },
                    {
                        name: 'TRA5',
                        active: false,
                        children: [
                            {
                                page: 24,
                                active: false
                            },
                            {
                                page: 25,
                                active: false
                            },
                            {
                                page: 26,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA8',
                        active: false,
                        children: [
                            {
                                page: 27,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA9',
                        active: false,
                        children: [
                            {
                                page: 28,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA10',
                        active: false,
                        children: [
                            {
                                page: 29,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA11',
                        active: false,
                        children: [
                            {
                                page: 30,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA12',
                        active: false,
                        children: [
                            {
                                page: 31,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA13',
                        active: false,
                        children: [
                            {
                                page: 32,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA14',
                        active: false,
                        children: [
                            {
                                page: 33,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA31',
                        active: false,
                        children: [
                            {
                                page: 34,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA35',
                        active: false,
                        children: [
                            {
                                page: 35,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA61_FTA',
                        active: false,
                        children: [
                            {
                                page: 36,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA62_IPA',
                        active: false,
                        children: [
                            {
                                page: 37,
                                active: false
                            },
                            {
                                page: 38,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA62A_IPA',
                        active: false,
                        children: [
                            {
                                page: 39,
                                active: false
                            }
                        ]
                    },
                    {
                        name: 'TRA63_MTA_FIA',
                        active: false,
                        children: [
                            {
                                page: 40,
                                active: false
                            },
                            {
                                page: 41,
                                active: false
                            },
                        ]
                    },
                    {
                        name: 'TRA82',
                        active: false,
                        children: [
                            {
                                page: 42,
                                active: false
                            },
                            {
                                page: 43,
                                active: false
                            },
                        ]
                    },
                    {
                        name: 'TRA83',
                        active: false,
                        children: [
                            {
                                page: 44,
                                active: false
                            }
                        ]
                    },
                ]
            }
        ),
        methods: {
            changeSection(index) {
                this.pages.map(page => page.active = false)
                let section = this.pages[index]
                if (section) {
                    section.active = true
                    this.pages.forEach(sec => {
                        sec.children.forEach(page => page.active = false)
                    })
                    section.children.forEach(page => page.active = true)
                }
            },
            isActive(index) {
                let pages = []
                this.pages.forEach(section => {
                    section.children.forEach(page => pages.push(page))
                })
                let page = pages.find(page => page.page === index)
                return page && page.active
            },
            isActiveSection(index) {
                let section = this.pages[index]
                return section && section.active
            },
            async generatePDF() {
                let pdf = new jsPDF();
                let pages = []
                this.pages.forEach(section => {
                    section.children.forEach(page => {
                        pages.push(page)
                    })
                })
                for (let i = 1; i <= pages.length; i++) {
                    let index = pages[i - 1].page
                    await this.changePage(pages[i - 1])
                    let canvas = await this.canvasPage(index)
                    this.printPage(canvas, pdf, index - 1)
                }
                pdf.save("tax_return.pdf");
            },
            changePage (p) {
                this.pages.forEach(section => section.children.map(page => page.active = false))
                p.active = true
            },
            canvasPage(i) {
                let string = 'page' + i
                let page = document.getElementById(string)
                let canvas = html2canvas(page)
                return canvas
            },
            printPage(canvas, pdf, addPage = false) {
                if (addPage) pdf.addPage()
                document.body.appendChild(canvas)
                canvas.getContext('2d');
                let imgData = canvas.toDataURL("image/jpeg", 1.0);
                pdf.addImage(imgData, 'JPEG', 5, 5, 200, 280);
                document.body.removeChild(canvas)
            }
        }
    }
</script>

<style>
    .mini-input input {
        height: 24px !important;
    }

    .mini-input .input-group__input {
        min-height: 24px !important;
    }

    .tax .v-text-field > .v-input__control > .v-input__slot:before,
    .tax .v-text-field > .v-input__control > .v-input__slot:after {
        display: none !important;
    }

    .page {
        /*border: 1px solid !important;*/
        /*border-color: black !important;*/
    }

    .tax span {
        font-family: 'Lato', sans-serif !important;
        font-size: 12px !important;
    }
</style>