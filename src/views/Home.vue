<template>
  <div>
    <div class="landing-one">
      <div class="center-wrapper">
        <img class="center" src="/img/logo-large.png" style="user-select: none;"/>
          <h1 class="one-text" style="font-size: 28px">Play everyday games</h1>
          <h1 class="one-text" style="font-size: 52px">And earn <span style="color: #FF111F">$VON</span></h1>
          <h1 class="one-text" style="margin-top: 10px; font-family: 'Evogria';font-size: 23; color: #FAFF00;">Earn rewards by playing</h1>
          <img
            class="center"
            src="/img/csgo-small.png"
            width="100px"
          >
          <b-button style="transform: scale(0.8)" v-if="!this.$store.state.address" @click="auth" :loading="steamLoader" class="center steam-btn">
            <img class="steam-logo" src="/img/steam-logo.svg"/>
            Sign up with Steam
          </b-button>
      </div>
    </div>
    <div class="landing-two" style="height: 70vh">
      <div class="svg-wrapper" style="transform: scale(1.15)">
        <Synthesis style="margin-top: 80px"/>
      </div>
    </div>
    <div class="landing-two" style="height: 100vh">
      <div class="svg-wrapper" style="transform: scale(0.75);">
        <Building/>
      </div>
    </div>
    <div class="landing-two" style="height: 50vh">
      <div class="svg-wrapper" style="transform: scale(0.9)">
        <svg viewBox="0 0 1240 465" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Group 80">
          <text id="Subheading" fill="#F20009" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="16" letter-spacing="0em"><tspan x="528.102" y="18.7578">BY Players, for Players&#10;</tspan></text>
          <text id="Heading" fill="white" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="38" letter-spacing="-0.02em"><tspan x="359.158" y="74.0498">Built right from thebegining</tspan></text>
          <text id="Supporting text" fill="#696969" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="20" letter-spacing="0em"><tspan x="290.164" y="114.273">Fair, decentralized and controlled economy for you, governed by you.</tspan></text>
          <g id="Group 69">
          <text id="Text" fill="white" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="22" letter-spacing="0em"><tspan x="78.1436" y="271.751">Controlled inflation </tspan></text>
          <text id="Supporting text_2" fill="#696969" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="16" letter-spacing="0em"><tspan x="35.1016" y="305.277">Unlike the majority of current P2E games. </tspan><tspan x="24.5078" y="327.277">VON token inflation is controlled and is fixed </tspan><tspan x="20.125" y="349.277">to 100K daily and is halving each 6 months (6 </tspan><tspan x="25.4062" y="371.277">seasons). No insiders allocations. The token </tspan><tspan x="47.2969" y="393.277">belongs to the players only. No hyper-</tspan><tspan x="138.258" y="415.277">inflation lords.</tspan></text>
          <path id="Icon" d="M186 214.459V204.459M192 214.459V198.459M198 214.459V208.459" stroke="#F20009" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <g id="Group 68">
          <text id="Text_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="22" letter-spacing="0em"><tspan x="557.599" y="271.751">DAO in mind</tspan></text>
          <g id="Supporting text_3">
          <text fill="#696969" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="16" letter-spacing="0em"><tspan x="467.18" y="305.277">Invictus Lords is a movement to liberate </tspan><tspan x="456.789" y="327.277">players from </tspan><tspan x="625.555" y="327.277">by giving them back </tspan><tspan x="476.594" y="349.277">their fair share of value. Its built to be </tspan><tspan x="456.414" y="371.277">completely decentralized and governed by </tspan><tspan x="456.812" y="393.277">players themselves. System is designed to </tspan><tspan x="457.477" y="415.277">generate profits that go to a decentralized </tspan><tspan x="448.883" y="437.277">treasury that DAO can allocate from, in order </tspan><tspan x="480.148" y="459.277">to maintain and govern the platform. </tspan></text>
          <text fill="#F20009" xml:space="preserve" style="white-space: pre; cursor: pointer" font-family="Inter" font-size="16" letter-spacing="0em"><tspan x="555.164" y="327.277" @click="openWiki()">playbour </tspan></text>
          </g>
          <path id="Vector" d="M627.811 207.598C627.906 207.598 628 207.526 628 207.419L628 206.487C628 206.398 627.943 206.344 627.868 206.326C627.377 206.219 625.755 205.825 624.717 205.592C624.245 203.406 622.302 201.758 619.924 201.579V200.039H622.094C622.264 200.039 622.396 199.913 622.396 199.752V198.301C622.396 198.14 622.264 198.014 622.094 198.014L619.887 198.014V197.835C619.887 197.62 619.698 197.459 619.49 197.459C619.283 197.459 619.094 197.638 619.094 197.835V201.579C616.717 201.758 614.755 203.406 614.302 205.592C613.245 205.825 611.623 206.201 611.132 206.308C611.057 206.326 611 206.398 611 206.487V207.419C611 207.509 611.075 207.598 611.189 207.598H612.377L612.377 213.115H611.189C611.094 213.115 611 213.187 611 213.295V214.262C611 214.369 611.094 214.459 611.189 214.459H627.792C627.905 214.459 628 214.369 628 214.262V213.295C628 213.187 627.905 213.098 627.792 213.098H626.622V207.598L627.811 207.598ZM620.396 207.598H621.698V213.115H620.396V207.598ZM618.585 213.115H617.283V207.598H618.585V213.115ZM614.17 207.598H615.472V213.115H614.17V207.598ZM624.811 213.115H623.509V207.598H624.811V213.115Z" fill="#F20009"/>
          </g>
          <g id="Group 67">
          <text id="Text_3" fill="white" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="22" letter-spacing="0em"><tspan x="948.463" y="271.751">Ethereum secured</tspan></text>
          <text id="Supporting text_4" fill="#696969" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="16" letter-spacing="0em"><tspan x="903.422" y="305.277">Invictus Lords is built on Ethereum. No </tspan><tspan x="923.977" y="327.277">shitchains, unsecure networks or </tspan><tspan x="935.555" y="349.277">permissioned chains. Bringing </tspan><tspan x="892.086" y="371.277">decentralization to traditional gamers. No </tspan><tspan x="879.859" y="393.277">single authority controlling your hard-earned </tspan><tspan x="986.805" y="415.277">assets anymore.</tspan></text>
          <g id="Group">
          <path id="Vector_2" d="M1048.11 196.554L1053.82 206.031L1048.11 209.407V196.554Z" stroke="#F20009" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="Vector_3" d="M1047.25 209.32L1041.69 206.031L1047.25 196.798V203.135V209.32Z" stroke="#F20009" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="Vector_4" d="M1048.17 211.81L1052.74 209.109L1048.17 215.551V211.81Z" stroke="#F20009" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="Vector_5" d="M1042.77 209.109L1047.25 211.76V215.433L1042.77 209.109Z" stroke="#F20009" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="Vector_6" d="M1048.25 203.912L1053.43 206.263L1048.25 209.32V203.912Z" stroke="#F20009" stroke-linecap="round" stroke-linejoin="round"/>
          <path id="Vector_7" d="M1047.25 203.912V209.32L1042.08 206.263L1047.25 203.912Z" stroke="#F20009" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="landing-two" style="height: 100vh">
      <div class="svg-wrapper" style="transform: scale(1.05);">
        <NFTSection style="margin-top: 140px"/>
      </div>
    </div>
    
    <div class="landing-two scrollable-cards">
      <div style="margin-top: -200px;">
        <center>
          <h1 style="color: white; font-size: 25px">HOW TO</h1>
          <h1 style="color: red; font-size: 32px; margin-top: -8px; margin-bottom: 30px;">JOIN THE MOVE</h1>
        </center>
        <div class="svg-wrapper" style="transform: scale(.9);">
          <ul v-dragscroll class="cards">
            <li class="card-item" v-for="(card, index) in cards">
              <Card :title="card.title" :body="card.body" :img="`/img/cards/${index+1}.png`"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="landing-two" style="height: 35vh">
        <div class="svg-wrapper" style="transform: scale(.9);">
          <svg viewBox="0 0 1164 194" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 84">
            <rect id="Rectangle 54" width="1164" height="194" rx="6" fill="#0A0A0A"/>
            <g id="Ecosystem and tokenomics" filter="url(#filter0_d_334_2)">
            <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="32" font-style="italic" letter-spacing="0em"><tspan x="237.719" y="91.0156"> and </tspan><tspan x="70" y="130.016">tokenomics</tspan></text>
            <text fill="#FF111F" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="32" font-style="italic" letter-spacing="0em"><tspan x="70" y="91.0156">Ecosystem</tspan></text>
            </g>
            <text id="Invictus Lords is on a mission to liberate gamers from gaming industry exploitation through tokenization of effort and decentralization of assets. Join the movement." fill="#696969" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="16" letter-spacing="0em"><tspan x="397" y="71.3182">Invictus Lords is on a mission to liberate gamers </tspan><tspan x="397" y="92.3182">from gaming industry exploitation through </tspan><tspan x="397" y="113.318">tokenization of effort and decentralization of </tspan><tspan x="397" y="134.318">assets. Join the movement.</tspan></text>
            <g id="signup-with-steam">
            <g id="Rectangle 1">
            <rect x="860" y="69" width="238" height="56" rx="12" fill="#FF111F"/>
            <rect x="860" y="69" width="238" height="56" rx="12" fill="url(#paint0_radial_334_2)" fill-opacity="0.2"/>
            </g>
            <g id="Group 2">
            <text id="ReAD MORE" fill="white" xml:space="preserve" style="white-space: pre" font-family="Evogria" font-size="16" letter-spacing="0em"><tspan x="938" y="103.758">Know More</tspan></text>
            </g>
            </g>
            </g>
            <defs>
            <filter id="filter0_d_334_2" x="67.3125" y="64.5625" width="242.328" height="73.4375" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_334_2"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_334_2" result="shape"/>
            </filter>
            <radialGradient id="paint0_radial_334_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(979 97) rotate(90) scale(28 119)">
            <stop stop-color="#E4761B"/>
            <stop offset="1" stop-color="#00D7D5" stop-opacity="0"/>
            </radialGradient>
            </defs>
            </svg>
        </div>
      </div>
      <div class="footer">
        <div class="footer-ele">
          <Footer/>
        </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Synthesis from '@/components/SVGs/Synthesis.vue'
  import Building from '@/components/SVGs/Building.vue'
  import NFTSection from '@/components/SVGs/NFTSection.vue'
  import Card from '@/components/Card.vue'
  import Footer from  '@/components/SVGs/Footer.vue'
  import { dragscroll } from 'vue-dragscroll' // single component using directive
  export default {
    name: "app",
    data() {
        return {
            steamLoader: false,
            data: "",
            user: {},
            cards: [
              { title: 'Create new account', body: 'A first step to start play, enjoy & earn is to sign up with your steam account, and connecting your metamask wallet.'},
              { title: 'Pick your favourite games', body: 'After signing up, the next step is  to pick as many as you want of your favoured games available on the platform.  '},
              { title: 'Tracking your progress', body: 'The system estimates your score according to your competence, performance & winning rates for each game.'},
              { title: 'Climb the ranks', body: 'Prove yourself and compete with others, attain your rank in leaderboard. the higher your rating is, the more you gain.'},
              { title: 'Earn your rewards', body: 'You will get rewarded daily depending of your attained rank in the leaderboard of your linked games.'}
            ]
        };
    },
    methods: {
        async auth() {
            this.steamLoader = true;
            const res = await axios.get("/api/auth/steam/getRedirect", {})
                .then(res => window.open(res.data.redirectUrl, "_self"))
                .finally(this.steamLoader = true);
            return res;
        },
        openWiki() {
          window.open('https://en.wikipedia.org/wiki/Playbour', '_blank')
        }
    },
    components: { 
      Synthesis,
      Building,
      NFTSection,
      Card,
      Footer
    },
    directives: {
      dragscroll
    }
}
</script>

<style scoped>
.landing-one {
  width: 100vw;
  height: 95vh;
  background-image: url('/img/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.landing-two {
  background-color: black;
  width: 100vw;
}
.svg-wrapper {
  /* position: absolute;
  top: 100px;
  left: 50%; */
  margin: 0 auto;
  text-align: center;
  /* transform: scale(1.2); */
  width: 100%;
  max-width: 1400px;
  min-width: 500px;
}
.one-text {
  font-family: 'Evogria Italic';
  font-style: normal;
  font-weight: 400;
  line-height: 49px;
  text-align: center;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 50%; */
}
.center-wrapper {
  /* width: 700px;
  margin: 0 auto;
  align-items: center;
  padding-top: 190px; */
  /* position: absolute; */
  /* top: calc(50% - 13vh);
  left: 50%;
  transform: translate(-50%, -25%); */
  top: 25vh;
  transform: scale(1.16);
}
.steam-btn {
  font-family: 'Evogria';
  background: radial-gradient(50% 50% at 50% 50%, rgba(86, 255, 254, 0.2) 0%, rgba(0, 215, 213, 0) 100%), #151B1F;
  border-radius: 5px;
  color: white;
  height: 60px;
  /* width: 250px; */
  border: none;
  padding-left: 85px;
  padding-right: 40px;
  margin-top: 30px;
  transition: all ease-out 500ms;
}
.steam-btn:hover {
  background: white;
  color: black;
}
.steam-btn:focus {
  color: white;
}
.steam-btn:hover .steam-logo {
  filter: invert(1);
}
.steam-logo {
  position: absolute; 
  width: 33px; margin-bottom: -5px; 
  margin-left: -43px; 
  margin-top: -4px
}                                                                                                         
.why {
  font-family: 'Evogria' !important;
  margin: 0 auto;
  width: 75%;
  position: absolute;
  top: calc(50% - 12.5vh);
  left: 50%;
  transform: translate(-50%, -25%);
}

.cards {
  display: inline;
}

.card-item {
  display: inline;
  /* float: left; */
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100vw;
  left: 0;
  padding: 0px;
  
  background: #010102;
}
.footer-ele {
  max-width: 1600px;
  /* min-width: 1200px; */
  margin: 0 auto;
}
@media only screen and (max-width: 1700px) {
  /* .center-wrapper {
    transform: scale(1.15);
  } */
  .cards {
    margin-top: 30px;
    list-style-type:none;
    white-space:nowrap;
    overflow-x: hidden;
    cursor: grab;
    width: 120vw;
    left: -15vw;
    padding-right: 300px;
    padding-left: 300px;
    position: absolute;
  }
  .card-item {
    display: inline;
  }
  .scrollable-cards {
    height: 55vh !important;
  }
}


</style>
