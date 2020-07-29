<template>
    <div>
        <v-btn color="primary">TIMER</v-btn>
        <v-btn color="error" @click="stopTimer">
            <vue-countdown :time="assignment.time * 60 * 1000" :auto-start="autoStartTimer" ref="timer"
                           @countdownprogress="onCountdownProgress">
                <template slot-scope="props">
                    {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}
                </template>
            </vue-countdown>
        </v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                timerIsRunning: false,
                autoStartTimer: true
            }
        },

        props: ['assignment'],

        mounted() {
            var self = this

            this.$bus.$on('stop-timer', function () {
                self.stopTimer()
            })
        },

        methods: {
            /**
             * Start timer
             */
            startTimer() {
                this.$refs.timer.start()
                this.timerIsRunning = true
            },

            /**
             * Stop timer
             */
            stopTimer() {
                if(this.$refs.timer) {
                    this.$refs.timer.stop()
                }

                this.timerIsRunning = false
            },

            /**
             * Update assignment spent time
             *
             * @param data
             */
            onCountdownProgress(data) {
                this.assignment.timer = data.hours + ':' + data.minutes + ':' + data.seconds
            },
        },
    }
</script>

<style scoped>

</style>