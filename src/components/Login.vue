<template>
    <div class="greetings">
      <h1 class="green">Hello</h1>
      <button @click="auth">Login with steam</button>
      <h3>
        You’ve successfully created a project with
        <a target="_blank" href="https://vitejs.dev/">{{data}}</a> +
        <a target="_blank" href="https://v2.vuejs.org/">Vue 2</a>.
      </h3>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    export default {
      data() {
        return {
          data: '',
          user: {}
        }
      },
      methods: {
        async auth() {
          const res = await axios.get('/api/auth/steam/getRedirect', {})
          .then( res => 
            window.open(res.data.redirectUrl, "_self")
          )
          return res
        }
      }
    }
  </script>
  
  <style scoped>
  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
  }
  
  h3 {
    font-size: 1.2rem;
  }
  
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
  
  @media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
      display: block;
      text-align: left;
    }
  }
  </style>
  