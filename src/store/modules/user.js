import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        loginIsUnique: false,
        emailIsUnique: false,
        msgReg: "",
        progress: false
    },

    actions: {
        async askLoginIsUnique(ctx, login) {
            const res = await axios.get(`${url}/api/users/login-is-unique/${login}`);
            ctx.commit(`updateLoginIsUnique`, res.data);
            return this.loginIsUnique();
        },

        async askEmailIsUnique(ctx, email) {
            const res = await axios.get(`${url}/api/users/email-is-unique/${email}`);
            ctx.commit(`updateEmailIsUnique`, res.data);
            return this.emailIsUnique();
        },

        async createUser(ctx, newUser) {
            axios.post(`${url}/api/users/add-user`, newUser).then((res) => {
                ctx.commit(`updateMsgAfterReg`, res.data);
            });
        },

        async setProgressReg(ctx, value) {
            ctx.commit(`updateProgressReg`, value);
        }
    },

    mutations: {
        updateLoginIsUnique(state, isUnique) {
            state.loginIsUnique = isUnique;
        },

        updateEmailIsUnique(state, isUnique) {
            state.emailIsUnique = isUnique;
        },

        updateMsgAfterReg(state, msg) {
            state.msgReg = msg;
            state.progress = false;
        },

        updateProgressReg(state, value) {
            state.progress = value;
        },
    },

    getters: {
        loginIsUnique(state) {
            return state.loginIsUnique;
        },

        emailIsUnique(state) {
            return state.emailIsUnique;
        },

        msgAfterReg(state) {
            return state.msgReg;
        },

        progressReg(state) {
            return state.progress;
        }
    }
}