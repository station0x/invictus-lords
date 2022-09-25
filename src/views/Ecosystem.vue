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
    .body {
        background: #090B0E !important;
    }
    .eco-page {
        width: 100vw;
        /* height: 100vh; */
        /* height: 100vh; */
        background: #090B0E;
    }
    .eco-wrapper {
        padding-top: 70px;
        width: 90%;
        margin: 0 auto;
        max-width: 1500px;
        margin-bottom: 100px;
    }
</style>