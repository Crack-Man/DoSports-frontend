export default {
    state: {
        timer: null,
        totalTime: null,
    },

    actions: {
        startTimer(ctx, seconds) {
            ctx.commit("initTotalTime", seconds);
            ctx.state.timer = setInterval(() => {
                if (ctx.state.totalTime >= 1) {
                    ctx.commit("decreaseTotalTime");
                } else {
                    ctx.commit("initTotalTime", 0);
                    ctx.commit("endTimer");
                }
            }, 1000)
        },
    },

    mutations: {
        initTotalTime(state, seconds) {
            state.totalTime = seconds;
        },

        decreaseTotalTime(state) {
            state.totalTime--;
        },

        endTimer(state) {
            clearInterval(state.timer);
            state.timer = null;
            state.NAButton = false;
        },
    },

    getters: {
        time(state) {
            return state.totalTime;
        },
    }
}