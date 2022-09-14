<template>
    <div class="modal-card" style="width: 800px; margin: 0 auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Make steam profile public</p>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"/>
      </header>
      <section class="modal-card-body" style="color: white; padding: 0px 30px; font-family: 'open-sans';">
        <p style="margin-top: 25px; margin-bottom: 25px;">You need to have a public steam account to be eligible for invictus lords rewards. See video below to know how to make your profile public.

        </p>
        <center>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/nQqUtLvYtF4?start=25" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </center>
        <p style="margin-top: 25px; margin-bottom: 25px;">After setting it to public, wait for several minutes then visit this page again. Make sure to have both "My Profile" and "Game Details" as Public.</p>
        <center>
          <img  src="/img/steam-public.png" width="85%">
        </center>



      </section>
      <footer class="modal-card-foot">
        <b-button
          label="Okay"
          type="is-danger"
          @click="$emit('close')" />
      </footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
</style>