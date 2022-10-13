import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ethers } from 'ethers'
import prodCONSTANTS from '../../constants/prod.json'
import devCONSTANTS from '../../constants/dev.json'
const CONSTANTS = import.meta.env.VITE_APP_ENV === "prod" ? prodCONSTANTS : devCONSTANTS

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signature: window.localStorage.getItem('signature'),
        address: window.localStorage.getItem('address'),
        profile: undefined,
        intervalId: undefined,
        loaded: false,
        innerWidth: window.innerWidth,
        inventory: [],
        withdrawnRewards:{},
        candidateSignature: window.localStorage.getItem('candidateSignature'),
        candidateUsername: window.localStorage.getItem('candidateUsername'),
        candidateUseSteamData: window.localStorage.getItem('candidateUseSteamData'),
        inventory: [],
        scrollY: 0,
        clicked: 0,
        isPlayer: undefined
    },
    mutations: {
        sign(state, {signature, address}) {
            state.signature = signature
            state.address = address
        },
        isPlayer(state, isPlayer) {
            state.isPlayer = isPlayer
        },
        clicked(state, n) {
            if(n === 0) state.clicked = n
            else state.clicked += 1
            
        },
        setIntervalId(state, intervalId) {
            state.intervalId = intervalId
        },
        setProfile(state, profile) {
            state.profile = profile
        },
        load (state) {
            state.loaded = true
        },
        registerAddress(state, bool) {
            if(bool) state.registered = true
            else state.registered = false
        },
        setCandidate(state, {signature, username, useSteamData}) {
            state.candidateSignature = signature
            state.candidateUsername = username
            state.candidateUseSteamData = useSteamData
        },
        changeWindowWidth(state, width) {
            state.innerWidth = width
        },
        setAssetBalance(state, {assetSymbol, assetBalance}) {
            const inventory = [...state.inventory].filter(v => v.symbol !== assetSymbol)
            inventory.push({symbol: assetSymbol, balance: assetBalance})
            state.inventory = inventory
        },
        setWithdrawnRewards(state, withdrawnRewards) {
            state.withdrawnRewards = withdrawnRewards
        },
        setScrollY(state, scrollVal) {
            state.scrollY = scrollVal
        }
    },
    actions: {
        async fetchProfile ({commit, dispatch, state}) {
            const res = await axios.get('/api/player/fetchPlayerProfile', {
                params:{
                    address: state.address
                }
            })
            commit('setProfile', res.data.playerDoc)
            commit('isPlayer', true)
            // dispatch('fetchInventory')
        },
        connect({commit, dispatch}, {signature, address}) {
            commit('sign', {signature, address})
            window.localStorage.setItem('signature', signature)
            window.localStorage.setItem('address', address)
            // dispatch('startPolling')
        },
        registerCandidate({commit, dispatch}, {signature, username, useSteamData}) {
            commit('setCandidate', {signature, username, useSteamData})
            window.localStorage.setItem('candidateSignature', signature)
            window.localStorage.setItem('candidateUsername', username)
            window.localStorage.setItem('candidateUseSteamData', useSteamData)
        },
        unregisterCandidate({commit, dispatch}) {
            commit('setCandidate', {})
            window.localStorage.removeItem('candidateSignature')
            window.localStorage.removeItem('candidateUsername')
            window.localStorage.removeItem('candidateUseSteamData')
        },
        disconnect({commit, dispatch}) {
            commit('sign', {})
            commit('setProfile', {})
            window.localStorage.removeItem('signature')
            window.localStorage.removeItem('address')
            // dispatch('stopPolling')
        },
        fetchInventory({state, commit}) {
            const provider = new ethers.providers.JsonRpcProvider(CONSTANTS.chainInfo.rpcUrl)
            Object.keys(CONSTANTS.economicPolicy.assets).forEach(async v => {
                if(CONSTANTS.economicPolicy.assets[v].type === "erc20") {
                    const Contract = new ethers.Contract(CONSTANTS.economicPolicy.assets[v].address, ["function balanceOf(address) view returns (uint)"], provider);
                    const Balance = Number(ethers.utils.formatEther(await Contract.balanceOf(state.address)))
                    const Symbol = v
                    commit('setAssetBalance', { 
                        assetSymbol: Symbol,
                        assetBalance: Balance
                    })
                }
            })
        },
    },
    getters: {
        isMobile: state => {
            return state.innerWidth > 1024 ? false : true
        }
    }
})