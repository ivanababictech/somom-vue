export default {
    data() {
        return {
            borrowings: [
                'Shareholder loan',
                'Related party loan',
                'Third party loans',
                'Bank borrowing',
                'Bond issue',
                'Director loan',
                'Other borrowings'
            ],
            defaultStructure: {
                sourceOfBorrowings: '',
                details: '',
                currency: 'EUR',
                amount: 0,
                location: []
            }
        }
    }
}