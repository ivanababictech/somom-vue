<template>
    <sellers
            :sectionType="sectionType"
            :data="type"
            :sellers="type.items"
            :description="description"
            :incomeText="incomeText"
            :plansToSellText="plansToSellText"
            ownedText="Tick if the intellectual property is already owned by the company"
    ></sellers>
</template>

<script>
    import Sellers from './components/seller'

    export default {
        data() {
            return {
                description: 'Description of Intellectual',
                incomeText: 'Will this intellectual property generate any income?',
                plansToSellText: 'Are there plans to sell this intellectual property?',
            }
        },

        props: ['type', 'sectionType'],

        components: {Sellers}
    }
</script>