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
                :myRank="myRank"
            />
        </div>
    </div>
</template>

<script>
    import ProfileBox from '@/components/SVGs/ProfileBox.vue'
    import Loader from '@/components/Loader.vue'
    import SteamPublicGuide from '@/components/SteamPublicGuide.vue'
    import { ethers } from 'ethers'
    import axios from 'axios'

    export default {
        data() {
            return {
                fetchingProfileLoader: true,
                playerInfo: undefined,
                playerGameProfile: undefined,
                isSeasonData: true,
                isFetching: false,
                rankings: undefined
            }
        },
        methods: {
            SteamPublicGuideModal() {
                this.$buefy.modal.open({
                    parent: this,
                    component: SteamPublicGuide,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
            },
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
                    if(err.response.status === 451) {
                        this.$buefy.dialog.alert({
                            title: 'Error',
                            message: `${err.response.data.msg}`,
                            type: 'is-danger',
                            hasIcon: true,
                            icon: 'times-circle',
                            iconPack: 'fa',
                            ariaRole: 'alertdialog',
                            ariaModal: true,
                            confirmText: 'How?',
                            canCancel: ['escape', 'outside'],
                            onConfirm: () => this.$buefy.modal.open({
                                parent: this,
                                component: SteamPublicGuide,
                                canCancel: ['escape', 'button'],
                                trapFocus: true
                            })
                        })
                    }
                    if(!err.response.data.success) this.$router.push('/')
                }
            },
            async fetchRank(address) {
                try {
                    const res = await axios.get('/api/games/fetchLeaderboard', {
                        params:{
                            game: this.$route.params.game
                        }
                    })
                    this.rankings = res.data.leaderboard
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
            },
            myRank() {
            let rank = '--'
                if(this.rankings){          
                    this.rankings.map((player, index) => {
                        if(player.address === this.playerInfo.address) {
                            rank = (index + 1)
                        }
                    })
                }
                return rank
            }
        },
        components: {
            ProfileBox,
            Loader,
            SteamPublicGuide
        },
        async created() {
            if(ethers.utils.isAddress(this.$route.params.playerAddress)) {
                await this.fetchProfile(this.$route.params.playerAddress)
                await this.fetchRank(this.$route.params.playerAddress)
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
    .media-content {
        color: white;
        font-family: 'Inter', sans-serif
    }
    p.modal-card-title {
        color: red;
    }
    /* .profile-box {
        width: 80%;
    } */
</style>