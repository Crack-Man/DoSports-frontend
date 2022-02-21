export default {
    state: {
        NAButton: true
    },

    actions: {
        changeButtonStatus(ctx, value) {
            ctx.commit("buttonStatus", value);
        }
    },

    mutations: {
        buttonStatus(state, value) {
            state.NAButton = value;
        }
    },

    getters: {
        nonActiveButton(state) {
            return state.NAButton;
        }
    }
}