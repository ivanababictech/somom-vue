<script>
    export default {
        data() {
            return {
                rules: {
                    required: (value) => !!value || 'This field is required.',
                    email: (value) => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                    maxNumberOfShares: (value, max) => {
                        value = parseInt(value || 0)
                        max = parseInt(max || 0)

                        max += value


                        if(value < 0) {
                            value = 0
                            return 'Incorrect value'
                        }

                        if(max >= value) {
                            value = max
                            return true
                        }

                        return 'Max number of shares is ' + max
                    },
                    maxFloat: (value, max) => {
                        value = parseFloat(value || 0)
                        max = parseFloat(max || 0)

                        if(value < 0) {
                            value = 0
                            return 'Incorrect value'
                        }

                        if(max >= value) {
                            value = max
                            return true
                        }

                        return 'Max number is ' + max
                    }
                }
            }
        }
    }
</script>