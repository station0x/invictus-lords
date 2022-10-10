<template>
    <div class="w-full h-full">
        <Loader v-if="!data"/>
        <div v-else class="h-16 top-12 absolute w-screen py-4 border-b border-invictus-gray-700"></div>
        <div v-if="data" class="container -top-4 relative flex items-center py-4 mx-auto sm:px-10">

            <div class="w-full" >
                <!-- breadcrumb -->
                <nav class="flex flex-grow mb-2 mt-1 pt-[2px] z-40 w-full" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-base font-medium text-invictus-gray-700 hover:text-invictus-gray-900 dark:text-invictus-gray-300 dark:hover:text-white">
                            Leaderboard
                        </a>
                        </li>
                        <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-invictus-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <svg  class="w-5 h-5 ml-3" fill="currentColor" width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.37535 0.277771H6.8785C7.22859 0.383292 7.56514 0.529469 7.87017 0.695103C7.96811 1.0121 8.13925 1.34943 7.99123 1.67378C7.86513 1.7633 7.69403 1.80006 7.54206 1.85498C7.56009 1.97997 7.58651 2.10407 7.61188 2.22821C7.89889 2.2096 8.17751 2.15166 8.45947 2.10969C8.49833 1.98085 8.50786 1.84071 8.61424 1.7313C8.63731 1.81866 8.65589 1.90686 8.67052 1.99554C8.82139 2.06298 8.96772 2.15856 9.15514 2.14343C10.3371 2.14431 11.5196 2.14086 12.7009 2.14387C12.831 2.13609 12.8929 2.24205 12.9823 2.29654C12.9852 2.10367 12.984 1.91076 12.9953 1.71789C13.0302 1.71876 13.1 1.71962 13.1349 1.72005C13.1422 1.88957 13.1186 2.06343 13.1799 2.22865C13.2458 2.24033 13.3133 2.24378 13.3814 2.25024C13.3848 2.31644 13.3876 2.38261 13.3926 2.44921C13.7557 2.4574 14.1226 2.47601 14.4829 2.42843C14.7249 2.40034 14.9703 2.41936 15.2145 2.4198C15.2185 2.48597 15.2264 2.55169 15.2415 2.61741C14.9399 2.6343 14.6348 2.64987 14.3348 2.61135C13.8542 2.56641 13.3741 2.64465 12.894 2.62391C12.8777 2.67406 12.8625 2.72426 12.8473 2.77441C12.3857 2.7783 11.9242 2.77225 11.4633 2.77397C11.3102 2.77096 11.1419 2.79648 11.0451 2.89551C10.9095 3.02567 10.7451 3.13681 10.6146 3.27002C10.5724 3.51437 10.6967 3.75134 10.7682 3.98574C10.6596 4.01603 10.5504 4.04456 10.4435 4.0757C10.3337 4.33995 10.377 4.67815 10.0624 4.86324C9.88852 4.96355 9.73485 5.08853 9.53619 5.15991C9.39151 5.21007 9.2362 5.15775 9.09097 5.1413C8.54896 5.07818 8.09985 4.82215 7.61583 4.64569C7.58426 4.74648 7.54881 4.84595 7.51335 4.94585C7.66027 5.01892 7.84995 5.08119 7.89834 5.22479C7.97265 5.43496 7.91072 5.65552 7.90004 5.86958C7.87696 6.06594 7.86962 6.26355 7.84545 6.45991C7.82178 6.65062 7.67825 6.81452 7.53083 6.96286C7.39294 6.9369 7.25785 6.90621 7.12161 6.87852C6.97474 7.12071 7.09689 7.42171 7.3389 7.60207C7.96811 8.12792 8.3092 8.80477 8.62887 9.46428C8.6835 9.6035 8.86978 9.68612 8.90129 9.83273C8.95418 9.98841 9.02904 10.1445 9.01161 10.308C8.98739 10.5948 8.96038 10.8815 8.92267 11.1673C8.8968 11.3771 8.79547 11.5864 8.85515 11.7983C8.8996 11.9709 8.92716 12.1534 8.84501 12.3224C8.73414 12.5348 8.73524 12.767 8.73359 12.9923C8.73864 13.1407 8.74933 13.3037 8.88327 13.4213C9.04203 13.5714 9.19679 13.7271 9.38647 13.8551C9.62114 13.9732 9.9442 13.974 10.1373 14.1449C10.1981 14.2383 10.1547 14.3473 10.153 14.4472C9.54348 14.5181 8.90579 14.5233 8.31369 14.3771C7.97939 14.2937 7.61073 14.4368 7.29106 14.2958C7.30849 14.0022 7.40078 13.7154 7.53587 13.4412C7.5916 13.2367 7.53083 13.0248 7.52518 12.8176C7.52124 12.6386 7.40138 12.4803 7.35524 12.3082C7.22294 11.9389 7.18524 11.5544 7.16271 11.1729C7.13345 10.9857 7.34 10.8443 7.34844 10.6613C7.39179 10.4991 7.35973 10.3327 7.22914 10.1986C7.00231 10.1934 6.69672 10.2393 6.56952 10.052C6.30384 9.75012 6.04549 9.44393 5.78041 9.14209C5.68812 9.01188 5.46638 9.04262 5.31442 8.98552C5.17878 8.88951 5.11121 8.75373 5.02681 8.63131C4.97727 8.77146 4.90975 8.91202 4.77466 9.01794C4.56191 9.18229 4.48535 9.41063 4.37503 9.61907C4.29738 9.76958 4.22756 9.92397 4.19944 10.0849C4.16963 10.2064 4.16284 10.3487 4.021 10.4282C3.81275 10.5493 3.73849 10.7534 3.54827 10.8867C3.40644 10.9905 3.31974 11.1318 3.27304 11.2759C3.25781 11.4061 3.3068 11.5379 3.26401 11.6664C3.1869 11.9017 3.01805 12.1093 2.89425 12.3302C2.80645 12.4855 2.76085 12.6528 2.66462 12.8055C2.60044 12.9123 2.43609 12.9469 2.34605 13.0365C2.08491 13.3816 2.00161 13.7976 2.09505 14.189C2.16991 14.3443 2.22449 14.5068 2.17835 14.6738C2.01794 14.6906 1.85863 14.711 1.69767 14.7222H1.20011C1.07067 14.7015 0.937275 14.6859 0.819115 14.6392C0.730735 14.4268 0.745368 14.1942 0.824708 13.9814C0.94122 13.6614 1.04704 13.3392 1.15227 13.0174C1.22318 12.8596 1.05493 12.7182 1.07012 12.5603C1.05324 12.3276 1.24066 12.1356 1.3763 11.9415C1.5035 11.7689 1.45845 11.5609 1.54685 11.3788C1.74666 10.9835 2.12431 10.6618 2.34944 10.276C2.41866 10.119 2.3438 9.9521 2.35728 9.79036C2.37416 9.48374 2.45297 9.18101 2.52164 8.87912C2.54471 8.7628 2.5937 8.63998 2.53517 8.52539C2.4727 8.38873 2.4288 8.2434 2.45357 8.09767C2.47944 7.96358 2.37531 7.83041 2.44059 7.69937C2.47494 7.58822 2.60779 7.52551 2.71416 7.4563C2.73329 6.99961 2.51714 6.55071 2.60779 6.09535C2.71131 5.99673 2.87791 5.96126 3.02254 5.91155C2.81039 5.8778 2.5982 5.84366 2.38715 5.80775C2.37871 5.6235 2.41132 5.44102 2.46141 5.2611C2.53912 4.98044 2.49632 4.69023 2.5543 4.40784C2.56329 4.33606 2.66517 4.31182 2.74567 4.30926C2.93814 4.29842 3.13231 4.29152 3.32144 4.25649C3.26515 3.89967 3.21841 3.53555 3.32313 3.1805C3.42441 2.76145 3.66867 2.33675 4.12628 2.07727C4.44145 1.91381 4.89676 1.81736 5.22602 2.01239C5.25304 1.99814 5.30707 1.97002 5.33409 1.95618C5.14272 1.55961 5.18497 1.10119 5.48886 0.743973C5.68532 0.500492 6.02976 0.362102 6.37535 0.277771ZM9.46582 3.00621C9.44894 3.11001 9.40729 3.21292 9.2767 3.26267C9.44894 3.25401 9.62339 3.25445 9.79338 3.22592C9.78944 3.14981 9.78604 3.07409 9.78215 2.99798C9.67577 2.99975 9.5705 3.00231 9.46582 3.00621ZM9.109 3.29943C9.09437 3.31411 9.0645 3.34268 9.04987 3.35737C9.07689 3.49792 9.21367 3.61295 9.30486 3.73493C9.43766 3.59133 9.5722 3.44776 9.69885 3.30071C9.50238 3.29381 9.30487 3.28386 9.109 3.29943Z" fill="#9CA3AF"/>
                            </svg>
                            <span class="ml-1 text-base font-medium text-invictus-gray-500 md:ml-2 dark:text-invictus-gray-300">CS:GO</span> 
                            <svg class="w-6 h-6 ml-2 text-invictus-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        </div>
                        </li>
                        <li aria-current="page">
                        <!-- <div data-tooltip-target="tooltip-right" data-tooltip-placement="right" class="flex items-center">
                            <svg :class="isDropdownOpen ? 'rotate-90' : ''" class="w-6 h-6 text-invictus-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span @click="toggleDropdown" class="ml-1 mr-2 cursor-pointer text-base font-medium text-invictus-gray-500 md:ml-2 dark:text-invictus-gray-300">{{ daily ? 'Daily' : 'Season 1' }}</span>
                        </div> -->
                        <div class="inline-flex rounded-md shadow-sm" role="group">
                            
                            <button @click="isDailyMode(false)" type="button" :class="daily ? 'dark:text-invictus-gray-300 dark:bg-invictus-gray-700' : 'dark:text-white bg-invictus-gray-600'" class="py-2 px-4 text-xs font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-invictus-gray-700 dark:border-invictus-gray-600 dark:hover:text-white dark:hover:bg-invictus-gray-600">
                                Season 1
                            </button>
                            <button @click="isDailyMode(true)" type="button" :class="daily ? 'text-white bg-invictus-gray-600' : 'dark:text-invictus-gray-300 dark:bg-invictus-gray-700'" class="py-2 px-4 text-xs font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-invictus-gray-700 dark:border-invictus-gray-600  dark:hover:text-white dark:hover:bg-invictus-gray-600">
                                Daily
                            </button>
                        </div>
                        <!-- <div id="tooltip-right" role="tooltip" class="inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700">
                                Tooltip on right
                                <div class="tooltip-arrow rotate-90" data-popper-arrow></div>
                            </div> -->
                        </li>
                    </ol>
                </nav>
                <!-- Dropdown menu -->
                <!-- <div :class="isDropdownOpen ? '' : 'hidden'" class="relative -top-[5px] left-[235px] w-[120px] z-10 border border-invictus-gray-600 bg-white rounded divide-y divide-invictus-gray-100 shadow dark:bg-invictus-gray-700 dark:divide-invictus-gray-600">
                    <div class="flex text-sm text-invictus-gray-900 dark:text-white">
                    <ul class="w-full text-center text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li>
                        <a @click="isDailyMode(false)" class="cursor-pointer block py-2 px-4 hover:bg-invictus-gray-100 dark:hover:bg-invictus-gray-600 dark:hover:text-white"> Season 1</a>
                    </li>
                    </ul>
                    </div>
                    <div class="flex text-sm text-invictus-gray-900 dark:text-white">
                    <ul class="w-full text-center text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li >
                        <a @click="isDailyMode(true)" class="cursor-pointer block py-2 px-4 hover:bg-invictus-gray-100 dark:hover:bg-invictus-gray-600 dark:hover:text-white">Daily</a>
                    </li>
                    </ul>
                    </div>
                </div> -->
                <!-- card -->
                <div class="flex items-center space-x-4 py-4 mt-3 mb-3">
                    <h1 class="text-4xl text-white font-bold"> {{ daily ? 'Daily' : 'Season 1' }} </h1>
                    <!-- <div class="-mt-2 mb-7">
                        <label for="small-toggle" class="inline-flex relative items-center mb-5 cursor-pointer" >
                            <input type="checkbox" @change="changeToggleVal" id="small-toggle" class="sr-only peer" :checked="useSteamData">
                            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-invictus-red-300 dark:peer-focus:ring-invictus-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-invictus-red-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Use steam profile name</span>
                        </label>
                    </div> -->
                </div>

                <div class="flex w-full bg-red space-x-4">
                    <div class="w-1/3 rounded-lg p-5 bg-invictus-gray-700">
                        <p class="text-sm text-invictus-gray-300">Ends in</p>
                        <p class="mt-2 text-2xl text-white font-normal"> -- </p>
                    </div>
                    <div class="w-1/3 rounded-lg p-5 bg-invictus-gray-700">
                        <p class="text-sm text-invictus-gray-300">Number of Players</p>
                        <p class="mt-2 text-2xl text-white font-normal">{{ data.length }} Lords</p>
                    </div>
                    <div class="w-1/3 rounded-lg p-5 bg-invictus-gray-700">
                        <p class="text-sm text-invictus-gray-300">Rewards Minted</p>
                        <p class="mt-2 text-2xl text-white font-normal"> {{minted}} $VON</p>
                    </div>
                </div>

                <div class="mt-4 overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-invictus-gray-500 dark:text-invictus-gray-400 border-l border-r border-invictus-gray-700 dark:border-invictus-gray-700">
                        <thead class="text-xs text-invictus-gray-700 uppercase bg-invictus-gray-50 dark:bg-invictus-gray-700 dark:text-invictus-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Rank
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Player
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Rating
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    HS %
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Win Rate %
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    K/D
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Total Matches
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(player, index) in sortedPlayers" @click="openProfile(player.address)" class="cursor-pointer bg-white border-b dark:bg-invictus-gray-900 dark:border-invictus-gray-700 hover:bg-invictus-gray-50 dark:hover:bg-invictus-gray-700">
                                <th scope="row" class="py-4 px-6 font-medium text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ '# ' + Number.parseInt(index + 1) }}
                                </th>
                                <th scope="row" class="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="w-10 h-10 rounded-full" :src="player.avatar" alt="Jese image">
                                    <div class="pl-3">
                                        <div class="text-base font-semibold">{{ player.player }}</div>
                                        <div class="font-normal text-gray-500">{{ player.address }}</div>
                                    </div>
                                </th>
                                <td class="py-4 px-6 font-medium text-center text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ daily ? (player.rating ? player.rating.toLocaleString() : 0) : (player.seasonalRating ? player.seasonalRating.toLocaleString() : 0) }}
                                </td>
                                <td class="py-4 px-6 font-medium text-center text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ daily ? (player.dailyGameInfo.headshotPct.value.toFixed(2) + ' %') : (player.gameInfo.headshotPct.value.toFixed(2) + ' %') }}
                                </td>
                                <td class="py-4 px-6 font-medium text-center text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ daily ? (player.dailyGameInfo.wlPercentage.value.toFixed(2) + ' %') : (player.gameInfo.wlPercentage.value.toFixed(2) + ' %') }}
                                </td>
                                <td class="py-4 px-6 font-medium text-center text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ daily ? (player.dailyGameInfo.kd.value.toFixed(2)) : (player.gameInfo.kd.value.toFixed(2)) }}
                                </td>
                                <td class="py-4 px-6 font-medium text-center text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ daily ? (player.dailyGameInfo.matchesPlayed.value) : (player.gameInfo.matchesPlayed.value) }}
                                </td>
                                <td class="py-4 px-6 font-medium text-center text-invictus-gray-900 whitespace-nowrap dark:text-white">
                                    {{ daily ? (player.dailyGameInfo.score.value) : (player.gameInfo.score.value) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <ProfileBox 
                    :playerInfo="playerInfo"
                    :playerGameProfile="playerGameData"
                    :lastFetched="playerGameProfile.lastFetched"
                    @setSeasonData="setSeasonDataFromChild"
                    @refresh="refetch"
                    :isFetching="isFetching"
                    :myRank="myRank"
                /> -->
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import axios from 'axios'
import { ethers } from 'ethers'
import dev from '../../constants/dev.json'
import prod from '../../constants/prod.json'
import arraySort from 'array-sort'
const CONSTANTS = import.meta.env.VITE_APP_ENV === "prod" ? prod : dev
export default {
    data() {
        return {
            data: undefined,
            selected: undefined,
            playerInfo: undefined,
            minted: 0,
            daily: 0,
            isDropdownOpen: false,
        }
    },
    components: {
        Loader
    },
    methods: {
        async fetchLeaderboard () {
            try {
                const res = await axios.get('/api/games/fetchLeaderboard', {
                    params: {
                        game: 'csgo'
                    }
                })
                this.data = res.data.leaderboard
            } catch {
                this.fetchLeaderboard()
            }
            if(this.$store.state.address) {
                const playerId = this.data.find(o => o.address === this.$store.state.address)
                const playerIndex = this.data.indexOf(playerId)
                this.selected = this.data[playerIndex]
            }
        },
        openProfile(address) {
            let routeData = this.$router.push({ name: 'Lord Profile', params: { playerAddress: address, game: 'csgo' } })
            window.open(routeData.href, '_self')
        },
        async rewardsMinted() {
            const provider = new ethers.providers.JsonRpcProvider(CONSTANTS.chainInfo.rpcUrl)
            const Contract = new ethers.Contract(CONSTANTS.economicPolicy.assets.VON.address, ["function totalSupply() view returns (uint)"], provider);
            this.minted = (Number(ethers.utils.formatEther(await Contract.totalSupply()))).toLocaleString()
        },
        // toggleDropdown() {
        //     if(this.isDropdownOpen) {
        //         this.isDropdownOpen = false
        //     } else {
        //         this.isDropdownOpen = true
        //         this.$store.commit("clicked", 0)
        //     }
        // },
        isDailyMode(bool) {
            this.daily = bool
            // this.toggleDropdown()
        }
    },
    computed: {
        // nromalizedPlayersData() {
        //     return this.data
        // },
        sortedPlayers() {
            if(this.daily) return arraySort([...this.data], 'rating', {reverse: true})
            else return arraySort([...this.data], 'seasonalRating', {reverse: true})
        }
        // gameInfo() {
        //     if(this.daily) return this.data.dailyGameInfo
        //     else return this.data.gamInfo
        // }
    },
    async created() {
        this.fetchLeaderboard()
        this.rewardsMinted()
    } ,
    watch: {
        // clicks() {
        //     if(this.isDropdownOpen && this.$store.state.clicked === 2) this.isDropdownOpen = false
        // }
    }
}
</script>

<style>
.leaderboard-wrapper {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0vh);
    text-align: center;
    width: 90%;
    max-width: 1300px;
    min-width: 1100px;
}
.page-title {
    padding: 25px !important;
    color: white !important;
    border-bottom: 2px solid rgba(255,255,255,.1);
    font-size: 23px;
}
.leaderboard {
    background: black;
    margin-top: 190px;
}
table.table {
    background-color: black;
    color: white;
    max-width: 1300px;
    margin: 0 auto;
    margin-top: 40px;
}
table.table * {
    color: white !important;
}
.hoverable-cell {
    cursor: pointer;
}
.table tr.is-selected {
    background: #141414 !important;
    color: white !important;
}
.table td:not([align]), table th:not([align]) {
    text-align: left;
}
.table tr {
    /* height: 65px; */
    padding: 20px 0px;
}
</style>