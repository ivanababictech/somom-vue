<template>
    <main id="FS4" class="fs-form">
        <div ref="toPdf">
            <v-layout row wrap class="total_layout" style="width: 1240px; height:1753px " id="toPdf">
                <v-flex class="left-brand" style="width: 15.5%">
                    <img id="side_mark" src="../assets/fs4-left-side.jpg">
                </v-flex>
                <v-flex style="width: 84.5%" pt-2>
                    <v-layout row wrap class="pl45">
                        <v-flex xs3>
                            <h1 class="display-4 fs-text">FS4</h1>
                        </v-flex>
                        <v-flex xs9 class="text-xs-left pt-2">
                            <h4 class="display-1 fs-text">
                                Final Settlement System (FSS)<br>Payee Status Declaration
                            </h4>
                            <p class="display-5 fs-text">
                                (The Department’s Data Protection Policy and further instructions<br> are at the back of
                                this page)
                            </p>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="components-side" pr-5>
                        <v-flex xs6 pr-2 class="fs-four-left-side">
                            <fs-fourtitle
                                    class="ml45"
                                    page="1"
                                    firstParagraph="To be completed by the Payee<br>and given to the Payer"
                                    secondParagraph="Fill in Parts A and E and ONLY ONE of Parts B, C or D">
                            </fs-fourtitle>
                            <a1></a1>
                            <b1 class="mt-1"></b1>
                            <c1></c1>
                            <d1></d1>
                            <e1></e1>
                        </v-flex>
                        <v-flex xs6 pl-1 class="fs-four-right-side primary-bg-light">
                            <fs-fourtitle
                                    background="a7d3cd"
                                    class="ml-2"
                                    page="2"
                                    firstParagraph="To be completed by the Payee"
                                    secondParagraph="Fill in Parts A and E and ONLY ONE of <br/> Parts B, C or D">
                            </fs-fourtitle>
                            <a2></a2>
                            <b2 class="mt-1"></b2>
                            <c2></c2>
                            <d2 class="mt-1"></d2>
                            <e2></e2>
                        </v-flex>
                    </v-layout>
                </v-flex>

            </v-layout>
        </div>
    </main>
</template>

<script>
    import FsFourtitle from './components/FsFourtitle'
    import A1 from './FS4/a1'
    import A2 from './FS4/a2'
    import B1 from './FS4/b1'
    import B2 from './FS4/b2'
    import C1 from './FS4/c1'
    import C2 from './FS4/c2'
    import D1 from './FS4/d1'
    import D2 from './FS4/d2'
    import E1 from './FS4/e1'
    import E2 from './FS4/e2'
    import hasPrint from './mixins/hasPrint'

    export default {
        mixins: [hasPrint],
        name: 'FS4',
        components: {
            FsFourtitle,
            A1,
            A2,
            B1,
            B2,
            C1,
            C2,
            D1,
            D2,
            E1,
            E2
        }
    }
</script>

<style>
    @import '../../../../../../assets/css/forms.css';
</style>