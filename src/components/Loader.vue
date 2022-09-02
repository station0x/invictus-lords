<template>
    <div class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <center class="loader-wrapper">
                    <div class="elementToFadeInAndOut loader-text">loading</div>
                    <center style="display: inline-block">
                        <b-button class="loader-fake-btn" :loading="true" ></b-button>
                    </center>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    computed: {
        routeDestination() {
            return this.$route.name
        }
    },
    methods: {
        getRandomQoute() {
            return this.randSentences[Math.floor(Math.random()*this.randSentences.length)] + this.routeDestination + '”.'
        }
    }
}
</script>

<style scoped>
.loader-wrapper {
    transition: 400ms ease-in-out;
}
.loader-text {
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 100;
    font-size: 25px;
    color: rgba(250,250,250, 0.6);
}
.elementToFadeInAndOut {
    background: black;
    -webkit-animation: fadeinout 1.5s linear forwards;
    animation: fadeinout 1.5s linear forwards;
    animation-iteration-count: infinite;
}
</style>
