import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        regionList: []
    },

    actions: {
        async showRegions(ctx) {
            await axios.get(`${url}/api/regions/get-regions`).then((res) => {
                ctx.commit(`updateRegions`, res.data);
            });
        }
    },

    mutations: {
        updateRegions(state, regionList) {
            state.regionList = regionList;
        }
    },

    getters: {
        allRegions(state) {
            return state.regionList;
        }
    }
}