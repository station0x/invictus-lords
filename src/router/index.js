import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import CONSTANTS from '../../constants'

// const Admin = () => import('@/views/Admin.vue')
// const Link = () => import('@/views/Link.vue')
// const Lobby = () => import('@/views/Lobby.vue')
const Home = () => import('@/views/Home.vue')
const RegisterPlayer = () => import('@/views/RegisterPlayer.vue')
const NotFound = () => import('@/views/NotFound.vue')
const PlayerProfile = () => import('@/views/PlayerProfile.vue')
const Leaderboard = () => import('@/views/Leaderboard.vue')
const Ecosystem = () => import('@/views/Ecosystem.vue')
const Minting = () => import('@/views/Minting.vue')
const EliteJoin = () => import ('@/views/EliteJoin.vue')

// const Login = () => import('@/views/Login')
// const RedeemAccessKey = () => import('@/views/RedeemAccessKey')

// const Dashboard = () => import('@/views/admin/Dashboard.vue')


Vue.use(VueRouter)

const TITLE = ' | Invictus Lords'

const routes = [
  { path: '/', redirect: { name: 'Home' }},
  { path: '*', redirect: { name: 'Home' }},
  { path: '/home/:registered?', component: Home, name: 'Home', meta: { title: 'Home' } },
  { path: '/not-found', component: NotFound, name: 'Not Found', meta: { title: 'Page Not Found' } },
  { path: '/new-lord/:isMetamask/:user?', component: RegisterPlayer, name: 'Register', meta: { title: 'New Lord' }, props: true },
  { path: '/lord/:playerAddress/:game', component: PlayerProfile, name: 'Lord Profile', meta: { title: 'Lord Profile' }, props: true },
  { path: '/leaderboard', component: Leaderboard, name: 'Leaderboard', meta: { title: 'Leaderboard' } },
  { path: '/minting', component: Minting, name: 'Minting', meta: { title: 'Minting' } },
  { path: '/ecosystem', component: Ecosystem, name: 'Ecosystem', meta: { title: 'Ecosystem' } },
  { path: '/invitations/:project', component: EliteJoin, name: 'Invitations', meta: { title: 'Invited by ' } },

//   { path: '/login/:redirect?:key?', component: Login, name: 'Login', meta: { title: 'Login' } },

//   { path: '/home', component: Home, name: 'Home', meta: { requiresLogin: true, title: 'Home' } },
//   { path: '/lobby', component: Lobby, name: 'Lobby', meta: { requiresLogin: true, title: 'Lobby' } },
//   { path: '/play/:link', component: Link, name: 'Join Game with Link', meta: { title: 'Join Game' } },
//   { path: '/admin', component: Admin, name: 'Admin' },
//   { path: '/redeem-your-access-key', component: RedeemAccessKey, name: 'Redeem Access Key', meta: { requiresLogin: true, title: 'Redeem Access Key' } },
//   { path: '/not-found', component: NotFound, name: 'Not Found', props: true, meta: { title: 'Page Not Found' } },
//   // Admin
//   { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAdmin: true, title: 'Admin Dashboard' } },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // if(to.matched.some(record => record.meta.requiresLogin) && !store.state.address) next({ name: 'Login' })
  if(to.name != 'Register' && (store.state.candidateSignature || store.state.airdropCandidate)) {
    // clear candidate data from state and localstorage 
    store.dispatch('unregisterCandidate')
    store.dispatch('unregisterAirdropCandidate')
    next()
  }
  // else if(to.name == 'Lobby' && (!store.state.profile || store.state.profile.banned)) next({ name: 'Home' })
  else next()
})

router.afterEach((to, from, next) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    if(to.name === 'Invitations') {
      document.title = to.meta.title + to.params.project + TITLE;
    } else {
      document.title = to.meta.title + TITLE;
    }
  })
})

export default router