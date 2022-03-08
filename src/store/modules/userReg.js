import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        msgReg: "",
        progress: false,
        logins: [{login: ""}],
        emails: [{email: ""}],
        status: "",
        vkUser: {}
    },

    actions: {
        async showLoginList(ctx) {
            const res = await axios.get(`${url}/api/users/get-logins`);
            ctx.commit("updateLoginList", res.data);
        },

        async showEmailList(ctx) {
            const res = await axios.get(`${url}/api/users/get-emails`);
            ctx.commit("updateEmailList", res.data);
        },

        async createUser(ctx, newUser) {
            ctx.commit("updateRegProgress", true);
            await axios.post(`${url}/api/users/add-user`, newUser).then((res) => {
                if (res.data.name === "Success") {
                    ctx.dispatch("startTimer", 60);
                }
                ctx.commit("updateStatusAfterReg", res.data.name);
                ctx.commit("updateMsgAfterReg", res.data.text);
                ctx.commit("updateRegProgress", false);
            });
        },

        async createUserVk(ctx, newUser) {
            ctx.commit("updateRegProgress", true);
            await axios.post(`${url}/api/vk-auth/add-user`, newUser).then((res) => {
                ctx.commit("updateRegProgress", false);
                if (res.data.name === "Success") {
                    ctx.commit("authSuccess", res.data.token);
                }
            });
        },

        async setRegProgress(ctx, value) {
            ctx.commit("updateRegProgress", value);
        },

        async initStatusAfterReg(ctx) {
            ctx.commit("updateStatusAfterReg", "");
        },

        async resendActivateCode(ctx, email) {
            let user = {
                email: email
            }
            await axios.post(`${url}/api/users/activate/resend-code`, user);
        },

        async checkUserVk(ctx) {
            await axios.get(`${url}/api/vk-auth/user`).then((res) => {
                ctx.commit("updateUserVkData", res.data);
            })
        },

        async checkUserVkInDb(ctx, id) {
            let user = {id: id};
            await axios.post(`${url}/api/vk-auth/user-in-db`, user).then((res) => {
                if (res.data.name === "Success") {
                    if (res.data.match) {
                        ctx.commit("authSuccess", res.data.token);
                    }
                }
            })
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

        updateStatusAfterReg(state, value) {
            state.status = value;
        },

        updateUserVkData(state, user) {
            state.vkUser = user;
        }
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
        },

        statusAfterReg(state) {
            return state.status
        },

        userVkData(state) {
            return state.vkUser;
        }
    }
}