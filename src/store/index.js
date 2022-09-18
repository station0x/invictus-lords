import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ethers } from 'ethers'
import prodCONSTANTS from '../../constants/dev.json'
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
        inventory: []
    },
    mutations: {
        sign(state, {signature, address}) {
            state.signature = signature
            state.address = address
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
        setAssetBalance(state, {assetSymbol, assetBalance}) {
            const inventory = [...state.inventory].filter(v => v.symbol !== assetSymbol)
            inventory.push({symbol: assetSymbol, balance: assetBalance})
            state.inventory = inventory
        },
    },
    actions: {
        async fetchProfile ({commit, dispatch, state}) {
            const res = await axios.get('/api/player/fetchPlayerProfile', {
                params:{
                    address: state.address
                }
            })
            commit('setProfile', res.data.playerDoc)
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
        // async startPolling({state, commit, dispatch}) {
        //     if(state.intervalId) {
        //         clearInterval(state.intervalId)
        //     }
        //     const intervalFunc = async function(){
        //         const res = await axios.get('/api/match/getActiveMatchId', {
        //             params:{
        //                 signature: state.signature
        //             }
        //         })
        //         if(res.data.matchId && state.matchId !== res.data.matchId) {
        //             dispatch("startRealm")
        //             dispatch("stopPolling")
        //         }
        //         commit('setActiveMatchId', res.data.matchId)   

        //         if(!res.data.matchId) {
        //             commit('load')
        //         }
        //     }
        //     const intervalId = setInterval(intervalFunc, 5000)
        //     commit('setIntervalId', intervalId)
        //     commit('setPicking', false)
        //     await intervalFunc()
        // },
        // stopPolling({state, commit}) {
        //     clearInterval(state.intervalId)
        //     commit('setIntervalId')
        //     commit('setActiveMatchId')
        // },
        // fetchInventory({state, commit}) {
        //     const provider = new ethers.providers.JsonRpcProvider(CONSTANTS.rpcUrl);
        //     Object.keys(CONSTANTS.economicPolicy.assets).forEach(async v => {
        //         if(CONSTANTS.economicPolicy.assets[v].type === "ore") {
        //             const oreContract = new ethers.Contract(CONSTANTS.economicPolicy.assets[v].address, ["function balanceOf(address) view returns (uint)"], provider);
        //             const oreBalance = Number(ethers.utils.formatEther(await oreContract.balanceOf(state.address)))
        //             const oreSymbol = v
        //             commit('setAssetBalance', { 
        //                 assetSymbol: oreSymbol,
        //                 assetBalance: oreBalance
        //             })
        //         }
        //     })
        // },
        // async startRealm({state, commit, dispatch}) {
        //     await realm.logIn(credentials);
        //     const mongodb = realm.currentUser.mongoClient("mongodb-atlas");
        //     const matches = mongodb.db(process.env.VUE_APP_DB_NAME).collection("matches");
        //     const intialMatchDoc = await matches.findOne({_id:Realm.BSON.ObjectId(state.matchId)})
        //     console.log(intialMatchDoc._id)
        //     commit("setMatchState", intialMatchDoc)
        //     commit("setPicking", intialMatchDoc.picking)
        //     commit('load')
        //     const watcher = matches.watch({ids:[Realm.BSON.ObjectId(state.matchId)]})
        //     for await (const change of watcher) {
        //         const { fullDocument: matchDoc } = change
        //         if(matchDoc.picking === state.picking) commit("setPicking", matchDoc.picking)
        //         if(matchDoc.winner === 0 || matchDoc.winner === 1 || !state.signature) {
        //             commit("setMatchState", matchDoc)
        //             break
        //         }
        //         if(axiosQueue.getQueueLength() === 0 && axiosQueue.getPendingLength() <= 1) {
        //             debouncedMatchState(matchDoc, commit)
        //         }
        //     }
        // },
        // enqueue(_, axiosPromise) {
        //     debouncedMatchState.clear()
        //     axiosQueue.add(() => {
        //         return axiosPromise()
        //     })
        // },
        // insertSpaceship({state, commit}, {spaceshipObj, to, playerIs}) {
        //     const board = {...state.matchState.state}
        //     board[to.y][to.x] = spaceshipObj
        //     commit('setBoard', board)
        //     commit('incrementInsertionsCount', playerIs)
            
        // },
        // removeSpaceship({state, commit}, {from, playerIs}) {
        //     const board = {...state.matchState.state}
        //     board[from.y][from.x] = {}
        //     commit('setBoard', board)
        //     commit('decrementInsertionsCount', playerIs)
        // },
        // async refreshWithdrawnRewards({state, commit}) {
        //     if(!state.profile || !state.profile.rewards) return;
        //     const provider = new ethers.providers.JsonRpcProvider(CONSTANTS.rpcUrl);
        //     const oreMinterContract = new ethers.Contract(CONSTANTS.economicPolicy.oreMinter, ["function oreUserWithdrawn(address,address) view returns (uint)"], provider);
        //     Object.keys(state.profile.rewards).forEach(async v => {
        //         const oreAddress = CONSTANTS.economicPolicy.assets[v].address
        //         const withdrawn = await oreMinterContract.oreUserWithdrawn(oreAddress, state.address)
        //         commit("setWithdrawnRewards", {...state.withdrawnRewards, [v]: Number(ethers.utils.formatEther(withdrawn))})
        //     })
        // }
    },
    plugins: [
        // function({state, dispatch}) {
        //     if(state.signature) {
        //         dispatch('startPolling')
        //     }
        // }  
    ],
    getters: {
        // rewards (state) {
        //     if(!state.profile || !state.profile.rewards || state.profile.banned === true) return {};
        //     if(Object.keys(state.profile.rewards).length !== Object.keys(state.withdrawnRewards).length) return {};
        //     return Object.keys(state.profile.rewards).reduce((acc, v) => {
        //         const withdrawn = state.withdrawnRewards[v] || 0
        //         const withdrawable = state.profile.rewards[v] - withdrawn
        //         if(withdrawable > 0) {
        //             acc[v] = withdrawable;
        //         }
        //         return acc
        //     }, {})
        // },
        // isAdmin: state => {
        //     return CONSTANTS.admins.includes(state.address)

        // },
        // innerWidth: state => {
        //     return state.innerWidth
        // },
        // isMobile: state => {
        //     return state.innerWidth > 769 ? false : true
        // },
        isMobile: state => {
            return state.innerWidth > 1024 ? false : true
        },
        // isPicking: state => {
        //     return state.picking
        // }
    }
})