<template>
    <div class="weeks">
        <div
            class="item"
            v-for="item in schedule"
            :key="item.id"
        >
            <span :class="currentDate.week === item.id ? 'active' : ''" @click="setWeek(item.id)">Неделя {{ item.id }}</span>
            <div v-if="item.id < 3" class="spacer-week"></div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramWeeks",

    data: () => ({
    }),

    computed: {
        ...mapGetters(["schedule", "currentDate"]),
    },

    methods: {
        ...mapActions(["setCurrentWeek"]),

        nowWeek() {
            if (Object.keys(this.schedule).length) {
                let startDate = this.schedule['1'].days['1'].date.getTime();
                let nowDate = new Date().getTime();
                let oneDay = 1000 * 60 * 60 * 24;
                let difference = Math.round((nowDate - startDate) / oneDay);
                if (difference < 7) {
                    this.setCurrentWeek(1);
                } else if (difference < 14) {
                    this.setCurrentWeek(2);
                } else {
                    this.setCurrentWeek(3);
                }
            }
        },

        setWeek(week) {
            this.setCurrentWeek(week);
        }
    },

    watch: {
        schedule() {
            this.nowWeek();
        }
    },

    mounted() {
        this.nowWeek();
    }
}
</script>

<style lang="scss">
#app {
    .weeks {
        margin-top: 50px;
        width: 100%;
        height: 80px;
        border-radius: 4px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .spacer-week {
            flex: 0 0 1px;
            width: 1px;
            height: 50px;
        }

        .item {
            display: flex;
            justify-content: space-between;
            flex: 1 0 auto;
            align-items: center;
            margin-left: 131px;

            span {
                cursor: pointer;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 24px;
                line-height: 180%;
            }
        }
    }
}

#app.dark {
    .weeks {
        background: #1A1A27;

        .spacer-week {
            border-left: 1px solid #B5B5B8;
        }

        .item {
            color: #B5B5B8;
        }

        .item {
            span.active {
                color: #9196FF;
            }
        }
    }
}

</style>