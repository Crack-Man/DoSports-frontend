import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        lifestyles: []
    },

    actions: {
        async showLifestyleList(ctx) {
            await axios.get(`${url}/api/programs/get-lifestyles`).then((res) => {
                ctx.commit(`updateLifestyleList`, res.data);
            });
        }
    },

    mutations: {
        updateLifestyleList(state, lifestyles) {
            state.lifestyles = lifestyles;
        }
    },

    getters: {
        lifestyleList(state) {
            return state.lifestyles;
        }
    }
}