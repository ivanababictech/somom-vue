<template>
    <v-container fluid grid-list-md>
        <div class="headline">{{ letter }}. Decleration</div>
        <v-layout row wrap>
            <v-flex xs12 md-12 v-for="(paragraph, index) in paragraphs" :key="index">
                <p>
                    ({{ toRoman(index + 1)}}) {{ paragraph.text}}
                </p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: [
            'letter',
            'paragraphs'
        ],

        methods: {
            upToTen(num, one, five, ten) {
                let value = '';
                switch(num) {
                    case 0: return value;
                    case 9: return `${one}${ten}`;
                    case 4: return `${one}${five}`;
                }

                if (num >= 5) value = five, num -=5;
                while (num -- > 0) value += one;
                return value;
            },

            toRoman(arabic) {
                let roman = '';
                roman += this.upToTen(Math.floor(arabic / 1000), 'M', '', ''), arabic %= 1000;
                roman += this.upToTen(Math.floor(arabic / 100), 'C', 'D', 'M'), arabic %= 100;
                roman += this.upToTen(Math.floor(arabic / 10), 'X', 'L', 'C'), arabic %= 10;
                roman += this.upToTen(arabic, 'I', 'V', 'X');

                return roman;
            }
        }
    }
</script>