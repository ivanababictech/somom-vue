<template>
    <v-btn-toggle :value="value"
                  @change="changed"
                  :class="{'v-btn-toggle--selected': isActive}">
        <v-btn flat
               :value="true"
               :input-value="value === true ? true : null"
               active-class="primary"
               :class="{primary: value === true}"
               :style="addButtonsStyle(value, 'y')">
            <span>Y</span>
        </v-btn>
        <v-btn flat
               :value="false"
               :input-value="value === false ? true : null"
               active-class="primary"
               :class="{primary: value === false}"
               :style="addButtonsStyle(value, 'n')">
            <span>N</span>
        </v-btn>
    </v-btn-toggle>
</template>

<script>
    export default {
        computed: {
            isActive() {
                return this.value === false || this.value === true
            }
        },

        props: ['value'],

        methods: {
            changed($event) {
                if(this.value === $event) {
                    $event = null
                }
                this.$emit('input', $event)
            }
        },
    }
</script>