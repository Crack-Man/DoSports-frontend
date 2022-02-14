import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        regions: []
    },

    actions: {
        async showRegionList(ctx) {
            await axios.get(`${url}/api/regions/get-regions`).then((res) => {
                ctx.commit(`updateRegionList`, res.data);
            });
        }
    },

    mutations: {
        updateRegionList(state, regions) {
            state.regions = regions;
        }
    },

    getters: {
        regionList(state) {
            return state.regions;
        }
    }
}