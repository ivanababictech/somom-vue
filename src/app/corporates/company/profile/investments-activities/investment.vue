<template>
    <sellers
            :sectionType="sectionType"
            :data="type"
            :sellers="type.items"
            :description="description"
            :incomeText="incomeText"
            :plansToSellText="plansToSellText"
            ownedText="Tick if the investment property is already owned by the company"
    ></sellers>
</template>

<script>
    import Sellers from './components/seller'

    export default {
        data() {
            return {
                description: 'Investment property description',
                incomeText: 'Will this investment property generate any income?',
                plansToSellText: 'Are there plans to sell this investment property?',
            }
        },

        props: ['type', 'sectionType'],

        components: {Sellers}
    }
</script>