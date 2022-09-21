<template>
    <div class="eco-page">
        <div class="eco-wrapper">
            <EcosystemView/>
        </div>
    </div>
</template>

<script>
    import EcosystemView from '@/components/SVGs/EcosystemView.vue'
    export default {
        components: {
            EcosystemView
        }
    }
</script>

<style scoped>
    .eco-page {
        width: 100vw;
        /* height: 100vh; */
        background: black;
    }
    .eco-wrapper {
        padding-top: 12.5vh;
        width: 90%;
        margin: 0 auto;
        max-width: 1600px;
        margin-bottom: 10vh;
    }
</style>