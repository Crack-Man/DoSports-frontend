import Vue from "vue";
import Vuex from "vuex";
import region from "./modules/region";
import userReg from "./modules/userReg";
import userAuth from "./modules/userAuth";
import timer from "./modules/timer";
import activeStatusButton from "./modules/activeStatusButton"
import programs from "./modules/programs"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        region, userReg, userAuth, timer, activeStatusButton, programs
    }
})
