export default {
    state: {
        value: false,
    },

    actions: {
        async checkDevice(ctx) {
            ctx.commit("updateStateIsPhone", /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
        }
    },

    mutations: {
        updateStateIsPhone(state, value) {
            state.value = value;
        }
    },

    getters: {
        isPhone(state) {
            return state.value;
        }
    }
}