<template>
    <sellers
            :sectionType="sectionType"
            :data="type"
            :sellers="type.items"
            :description="description"
            :incomeText="incomeText"
            :plansToSellText="plansToSellText"
            ownedText="Tick if the tangible asset is already owned by the company"
    ></sellers>
</template>

<script>
    import Sellers from './components/seller'

    export default {
        data() {
            return {
                description: 'Description of tangible asset',
                incomeText: 'Will this asset generate any income?',
                plansToSellText: 'Are there plans to sell this asset?',
            }
        },

        props: ['type', 'sectionType'],

        components: {Sellers}
    }
</script>