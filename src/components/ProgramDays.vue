<template>
    <div class="days" v-if="this.schedule['1']">
        <div
            class="item"
            v-for="item in schedule['1']['days']"
            :key="item.id"
        >
            <span :class="currentDate.day === item.id ? 'active' : ''" @click="setDay(item.id)">День {{ item.id }}</span>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramDays",

    computed: {
        ...mapGetters(["schedule", "currentDate"]),
    },

    methods: {
        ...mapActions(["setCurrentDay"]),

        nowDay() {
            if (Object.keys(this.schedule).length) {
                let startDate = this.schedule['1'].days['1'].date.getTime();
                let nowDate = new Date().getTime();
                let oneDay = 1000 * 60 * 60 * 24;
                let difference = Math.floor((nowDate - startDate) / oneDay);
                difference = difference < 21 ? difference % 7 : 6;
                this.setCurrentDay(difference + 1);
            }
        },

        setDay(day) {
            this.setCurrentDay(day);
        }
    },

    watch: {
        schedule() {
            this.nowDay();
        }
    },

    mounted() {
        this.nowDay();
    }
}
</script>

<style lang="scss">
#app {
    .days {
        margin-top: 25px;
        width: 100%;
        height: 50px;
        border-radius: 2px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
            display: flex;
            justify-content: center;
            flex: 1 0 auto;
            align-items: center;
            height: 25px;

            span {
                cursor: pointer;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 16px;
                line-height: 180%;

                @media (max-width: 1263px) {
                    font-size: 14px;
                }
            }
        }
    }
}

#app.dark {
    .days {
        background: #1A1A27;

        .item {
            span {
                color: #B5B5B8;
            }
        }

        .item:not(:last-child):not(:only-child) {
            border-right: 1px solid #B5B5B8;
        }

        .item {
            span.active {
                color: #9196FF;
            }
        }
    }
}

</style>