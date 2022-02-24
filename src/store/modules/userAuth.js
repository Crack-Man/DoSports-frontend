import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        tokenAccess: localStorage.getItem("user-token-access") || "",
        tokenRefresh: localStorage.getItem("user-token-refresh") || "",
        status: "",
        msgAuth: "",
        auth: false,
        admin: false,
        user: null,
        msgRestore: "",
        restorePassData: {name: "", text: ""},
        restorePassStep: 1,
        restorePassProgress: false,
    },

    actions: {
        async authRequest(ctx, user) {
            ctx.commit("updateRestoreProgress", true);
            await axios.post(`${url}/api/users/auth`, user).then((res) => {
                if (!res.data.message) {
                    ctx.commit("authSuccess", res.data.token);
                } else {
                    ctx.commit("updateMessage", res.data.message);
                }
                ctx.commit("updateRestoreProgress", false)
            }).catch((err) => {
                ctx.commit("authError", err.data);
                ctx.commit("updateRestoreProgress", false)
            });
        },

        async checkAuth(ctx) {
            if (ctx.state.tokenAccess) {
                axios.post("https://www.dosports.ru/api/users/verify-token-access", {access: ctx.state.tokenAccess}).then((res) => {
                    if (res.data.name === "Success") {
                        ctx.commit("authSuccess", null);
                        ctx.commit("updateUserData", res.data.user);
                        ctx.dispatch("checkAdmin");
                    } else {
                        ctx.dispatch("checkTokenRefresh");
                    }
                }).catch((err) => {
                    ctx.commit("authError", err.data);
                });
            } else {
                ctx.dispatch("checkTokenRefresh");
            }
        },

        async checkTokenRefresh(ctx) {
            if (ctx.state.tokenRefresh) {
                axios.post("https://www.dosports.ru/api/users/verify-token-refresh", {refresh: ctx.state.tokenRefresh}).then((res) => {
                    if (res.data.name === "Success") {
                        let token = {access: res.data.token.access, refresh: res.data.token.refresh};
                        ctx.commit("authSuccess", token);
                        ctx.commit("updateUserData", res.data.user);
                        ctx.dispatch("checkAdmin");
                    } else {
                        ctx.dispatch("unauthorized");
                    }
                }).catch((err) => {
                    ctx.commit("authError", err.data);
                });
            } else {
                ctx.dispatch("unauthorized");
            }
        },

        async unauthorized(ctx) {
            ctx.commit("setUnauthorized");
            ctx.commit("updateAdminStatus", false);
        },

        async checkAdmin(ctx) {
            if (ctx.state.auth) {
                if (ctx.state.user["admin"]) {
                    ctx.commit("updateAdminStatus", true);
                } else {
                    ctx.commit("updateAdminStatus", false);
                }
            }
        },

        async sendRestoreCode(ctx, user) {
            axios.post("https://www.dosports.ru/api/users/restore-password/send-code", user).then((res) => {
                if (res.data.name === "Success") {
                    ctx.commit("increaseRestoreStep");
                    ctx.commit("updateRestoreMessage", res.data.text);
                    ctx.dispatch("startTimer", 60);
                }
                ctx.commit("updateRestoreData", res.data);
                ctx.dispatch("setRestoreProgress", false);
            });
        },

        async resendRestoreCode(ctx, user) {
            await axios.post("https://www.dosports.ru/api/users/restore-password/resend-code", user);
        },

        async changeRestoreDataName(ctx, name) {
            ctx.commit("updateRestoreDataName", name);
        },

        async closePopupRestore(ctx) {
            ctx.commit("initRestoreStep");
        },

        async compareCode(ctx, user) {
            axios.post("https://www.dosports.ru/api/users/restore-password/compare-code", user).then((res) => {
                if (res.data.name === "Success") {
                    if (res.data.match) {
                        ctx.commit("increaseRestoreStep");
                    } else {
                        res.data.text = "Неверный код";
                    }
                }
                ctx.commit("updateRestoreData", res.data);
                ctx.dispatch("setRestoreProgress", false);
            });
        },

        async setRestoreProgress(ctx, value) {
            ctx.commit("updateRestoreProgress", value);
        },

        async changePassword(ctx, user) {
            axios.post("https://www.dosports.ru/api/users/restore-password/change-password", user).then((res) => {
                if (res.data.name === "Success") {
                    ctx.commit("increaseRestoreStep");
                    ctx.commit("updateRestoreData", res.data);
                    ctx.dispatch("setRestoreProgress", false);
                }
            })
        }
    },

    mutations: {
        authSuccess(state, token) {
            state.status = "Success";
            state.auth = true;
            if (token) {
                state.tokenAccess = token.access;
                state.tokenRefresh = token.refresh;
                localStorage.setItem("user-token-access", token.access);
                localStorage.setItem("user-token-refresh", token.refresh);
            }
            state.msgAuth = "";
        },

        authError(state, message) {
            state.status = "Error";
            state.msgAuth = message;
            localStorage.removeItem("user-token-access")
            localStorage.removeItem("user-token-refresh")
        },

        setUnauthorized(state) {
            state.status = "Unauthorized";
            state.auth = false;
            state.user = null;
            localStorage.removeItem("user-token-access")
            localStorage.removeItem("user-token-refresh")
        },

        updateMessage(state, message) {
            state.msgAuth = message;
        },

        updateUserData(state, user) {
            state.user = user;
        },


        updateAdminStatus(state, value) {
            state.admin = value;
        },

        updateRestoreData(state, value) {
            state.restorePassData = value;
        },

        updateRestoreDataName(state, name) {
            state.restorePassData.name = name;
        },

        updateRestoreMessage(state, value) {
            state.msgRestore = value;
        },

        increaseRestoreStep(state) {
            state.restorePassStep++;
        },

        initRestoreStep(state) {
            state.restorePassStep = 1;
        },

        updateRestoreProgress(state, value) {
            state.restorePassProgress = value;
        }
    },

    getters: {
        authStatus(state) {
            return state.status;
        },

        message(state) {
            return state.msgAuth;
        },

        userIsAuthorized(state) {
            return state.auth;
        },

        userIsAdmin(state) {
            return state.admin;
        },

        userData(state) {
            return state.user;
        },

        restoreMessage(state) {
            return state.msgRestore;
        },

        restoreData(state) {
            return state.restorePassData;
        },

        restoreStep(state) {
            return state.restorePassStep;
        },

        restoreProgress(state) {
            return state.restorePassProgress;
        }
    }
}