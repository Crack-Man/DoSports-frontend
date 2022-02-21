import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        msgReg: "",
        progress: false,
        logins: [],
        emails: []
    },

    actions: {
        async showLoginList(ctx) {
            const res = await axios.get(`${url}/api/users/get-logins`);
            ctx.commit(`updateLoginList`, res.data);
        },

        async showEmailList(ctx) {
            const res = await axios.get(`${url}/api/users/get-emails`);
            ctx.commit(`updateEmailList`, res.data);
        },

        async createUser(ctx, newUser) {
            ctx.commit("updateRegProgress", true);
            axios.post(`${url}/api/users/add-user`, newUser).then((res) => {
                ctx.commit(`updateMsgAfterReg`, res.data.text);
                ctx.commit("updateRegProgress", false);
            });
        },

        async setRegProgress(ctx, value) {
            ctx.commit(`updateRegProgress`, value);
        }
    },

    mutations: {
        updateLoginList(state, list) {
            state.logins = list;
        },

        updateEmailList(state, list) {
            state.emails = list;
        },

        updateMsgAfterReg(state, msg) {
            state.msgReg = msg;
            state.progress = false;
        },

        updateRegProgress(state, value) {
            state.progress = value;
        },
    },

    getters: {
        loginList(state) {
            return state.logins;
        },

        emailList(state) {
            return state.emails;
        },

        msgAfterReg(state) {
            return state.msgReg;
        },

        regProgress(state) {
            return state.progress;
        }
    }
}