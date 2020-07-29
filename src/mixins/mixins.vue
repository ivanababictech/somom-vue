<script>
    export default {
        methods: {
            resetObject(object, original, ...excepts) {
                for (let prop in object) {
                    if(original.hasOwnProperty(prop) && excepts.indexOf(prop) === -1) {
                        object[prop] = original[prop];
                    } else if(excepts.indexOf(prop) === -1) {
                        delete object[prop];
                    }
                }
            }
        },
    }
</script>