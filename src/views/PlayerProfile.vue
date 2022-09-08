<template>
    <div>
        <Loader v-if="fetchingProfileLoader"/>
        <div v-else class="profile-wrapper">
            <ProfileBox 
                :playerInfo="playerInfo"
                :playerGameProfile="playerGameData"
                :lastFetched="playerGameProfile.lastFetched"
                @setSeasonData="setSeasonDataFromChild"
                @refresh="refetch"
                :isFetching="isFetching"
            />
        </div>
    </div>
</template>

<script>
    import ProfileBox from '@/components/SVGs/ProfileBox.vue'
    import Loader from '@/components/Loader.vue'
    import { ethers } from 'ethers'
    import axios from 'axios'
    export default {
        data() {
            return {
                fetchingProfileLoader: true,
                playerInfo: undefined,
                playerGameProfile: undefined,
                isSeasonData: true,
                isFetching: false
            }
        },
        methods: {
            async fetchProfile(address) {
                try {
                    const res = await axios.get('/api/games/fetchGameProfile', {
                        params:{
                            address,
                            game: this.$route.params.game
                        }
                    })
                    this.playerGameProfile = res.data.playerGameDoc
                    this.playerInfo = res.data.playerDoc
                } catch(err) {
                    if(!err.response.data.success) this.$router.push('/')
                }
            },
            async fetchRank(address) {
                try {
                    const res = await axios.get('/api/games/fetchLeaderboard', {
                        params:{
                            address,
                            game: this.$route.params.game
                        }
                    })
                    console.log(res)
                } catch(err) {
                    if(!err.response.data.success) this.$router.push('/')
                }
            },
            async refetch() {
                this.isFetching = true
                await this.fetchProfile(this.$route.params.playerAddress)
                this.isFetching = false
            },
            setSeasonDataFromChild (isSeasonData) {
                this.isSeasonData = isSeasonData
            }
        },
        computed: {
            playerGameData() {
                if(this.fetchingProfileLoader) return undefined
                else return this.isSeasonData ? this.playerGameProfile.gameInfo : this.playerGameProfile.gameInfoLifetime
            }
        },
        components: {
            ProfileBox,
            Loader
        },
        async created() {
            if(ethers.utils.isAddress(this.$route.params.playerAddress)) {
                await this.fetchProfile(this.$route.params.playerAddress)
                // await this.fetchRank(this.$route.params.playerAddress)
                this.fetchingProfileLoader = false
            } else {
                this.$router.push({ name: 'Home' })
            }
        }
    }
</script>

<style>
    .profile-wrapper {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translate(-50%, 0vh);
        text-align: center;
        width: 1200px;
        max-width: 1400px;
        min-width: 1100px;
    }
    /* .profile-box {
        width: 80%;
    } */
</style>