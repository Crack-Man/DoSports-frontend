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
                    ctx.dispatch("changeButtonStatus", false);
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
        },
    },

    getters: {
        time(state) {
            return state.totalTime > 9 ? state.totalTime : "0" + state.totalTime;
        },
    }
}