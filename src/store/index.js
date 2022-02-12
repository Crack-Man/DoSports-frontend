import Vue from "vue";
import Vuex from "vuex";
import region from "./modules/region";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        region, user
    }
})
