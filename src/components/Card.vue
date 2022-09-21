<template>
    <div class="card-wrapper">
        <div class="card-image">
            <img :src="img" class="card-image img"/>
        </div>
        <div class="card-body">
            <h1 class="card-header">{{title}}</h1>
            <p class="card-text">{{body}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ['title', 'img', 'body']
    }
</script>

<style>
    .card-wrapper {
        height:480px;
        width: 320px;
        /* background: red; */
        border-radius: 5px;
        border: 2px solid #1E1E1E;
        display: inline-block;
        /* float: left; */
        margin: 20px;
    }
    .card-image .img {
        width: 100%;
        border-radius: 0 !important;
    }
    .card-body {
        padding: 30px;
        white-space: pre-line;
    }
    .card-header {
        color: #FF111F;
        text-decoration: underline;
        font-size: 18px;
        line-height: 130.8%;
    }
    .card-text {
        color: white;
        text-align: left;
        margin-top: 10px;
        font-family: 'Inter';
        color: #696969;
        line-height: 20px;
        font-size: 17px;
    }
</style>