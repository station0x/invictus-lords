<template>
    <div class="leaderboard-wrapper">
        <div class="loader-wrapper" v-if="!data">
            <Loader/>
        </div>
        <div v-else class="leaderboard">
            <h1 class="page-title">Leaderboard</h1>
            <b-table @click="openProfile($event.address)" v-if="data" :data="data" :selected="selected" hoverable style="margin: 0 auto; margin-top: -40px;">
                <b-table-column cell-class="hoverable-cell" field="rank" label="Rank" width="50px" numeric v-slot="props">
                    {{ '# ' + Number.parseInt(props.index + 1) }}
                </b-table-column>

                <b-table-column cell-class="hoverable-cell" field="player" label="Player" v-slot="props">
                    {{ props.row.player }}
                </b-table-column>

                <b-table-column cell-class="hoverable-cell" width="100px" field="rating" label="rating" v-slot="props">
                    {{ props.row.rating }}
                </b-table-column>
                <b-table-column cell-class="hoverable-cell" width="170px" field="score" label="score" v-slot="props">
                    {{ props.row.gameInfo.score.value }}
                </b-table-column>
                <b-table-column cell-class="hoverable-cell" width="160px" field="matchesPlayed" label="Matches Played" v-slot="props">
                    {{ props.row.gameInfo.matchesPlayed.value }}
                </b-table-column>
                <b-table-column cell-class="hoverable-cell" width="100px" field="kd" label="K/D %" v-slot="props">
                    {{ props.row.gameInfo.kd.value.toLocaleString() + ' %' }}
                </b-table-column>
            </b-table>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import axios from 'axios'
export default {
    data() {
        return {
            data: undefined,
            selected: undefined,
            playerInfo: undefined
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
            let routeData = this.$router.resolve({ name: 'Lord Profile', params: { playerAddress: address, game: 'csgo' } })
            window.open(routeData.href, '_self')
        },
    },
    async created() {
        this.fetchLeaderboard()
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