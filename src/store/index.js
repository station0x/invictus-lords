import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signature: window.localStorage.getItem('signature'),
        address: window.localStorage.getItem('address'),
        steamUser: undefined,
        gravatar: null,
        profile: undefined,
        intervalId: undefined,
        matchId: undefined,
        matchState: undefined,
        picking: false,
        loaded: false,
        registered: false,
        innerWidth: window.innerWidth,
        inventory: [],
        withdrawnRewards:{}
    },
    mutations: {
        setSteamUser(state, user) {
            state.user = user
        },
        sign(state, {signature, address}) {
            state.signature = signature
            state.address = address
        },
        setIntervalId(state, intervalId) {
            state.intervalId = intervalId
        },
        setActiveMatchId(state, matchId) {
            state.matchId = matchId
            if(!matchId) state.matchState = undefined
        },
        setMatchState(state, matchDoc) {
            console.log(matchDoc)
            matchDoc._id =  matchDoc._id.toString()
            matchDoc.playerIs = state.address === matchDoc.player0 ? 0 : 1
            matchDoc.state = matchDoc.board
            delete matchDoc.board
            state.matchState = matchDoc
        },
        setBoard(state, board) {
            const matchState = {...state.matchState}
            matchState.state = board;
            state.matchState = matchState;
        },
        incrementInsertionsCount(state, playerNum) {
            const matchState = {...state.matchState}
            if(playerNum === 0) matchState.player0PickingInsertions = matchState.player0PickingInsertions + 1
            else matchState.player1PickingInsertions = matchState.player1PickingInsertions + 1
            state.matchState = matchState;
        },
        decrementInsertionsCount(state, playerNum) {
            const matchState = {...state.matchState}
            if(playerNum === 0) matchState.player0PickingInsertions = matchState.player0PickingInsertions - 1
            else matchState.player1PickingInsertions = matchState.player1PickingInsertions - 1
            state.matchState = matchState;
        },
        endTurn(state) {
            const matchState = {...state.matchState}
            matchState.playerTurn = matchState.playerTurn === 0 ? 1 : 0;
            matchState['fuel' + matchState.playerTurn] = Math.min(matchState['fuel' + matchState.playerTurn] + CONSTANTS.fuelPerTurn, CONSTANTS.maxFuel)
            matchState.lastTurnTimestamp = undefined
            state.matchState = matchState;
        },
        setMyFuel(state, newFuel) {
            const matchState = {...state.matchState}
            if(matchState.playerIs === 0) {
                matchState.fuel0 = newFuel
            } else if(matchState.playerIs === 1) {
                matchState.fuel1 = newFuel
            }
            state.matchState = matchState;
        },
        setGravatar(state, gravatarLink) {
            state.gravatar = gravatarLink
        },
        setProfile(state, profile) {
            state.profile = profile
        },
        setWinner (state, playerNumber) {
            const matchState = {...state.matchState}
            matchState.winner = playerNumber;
            state.matchState = matchState;
        },
        setPicking(state, boolVal) {
            state.picking = boolVal
        },
        load (state) {
            state.loaded = true
        },
        sendMessage(state, msg) {
            const matchState = {...state.matchState}
            matchState.chat.push({msg, index: matchState.logsIndex + 1, playerNo: matchState.playerIs, timestamp: Date.now()})
            state.matchState = matchState
            debouncedMatchState.clear()
        },
        registerAddress(state, bool) {
            if(bool) state.registered = true
            else state.registered = false
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
        }
    },
    actions: {
        // async fetchProfile ({commit, dispatch, state}) {
        //     const res = await axios.get('/api/player/fetchPlayerProfile', {
        //         params:{
        //             address: state.address
        //         }
        //     })
        //     commit('setProfile', res.data.playerDoc)
        //     dispatch('fetchInventory')
        // },
        connect({commit, dispatch}, {signature, address}) {
            commit('sign', {signature, address})
            window.localStorage.setItem('signature', signature)
            window.localStorage.setItem('address', address)
            // dispatch('startPolling')
        },
        disconnect({commit, dispatch}) {
            commit('sign', {})
            window.localStorage.removeItem('signature')
            window.localStorage.removeItem('address')
            // dispatch('stopPolling')
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
        // isPicking: state => {
        //     return state.picking
        // }
    }
})