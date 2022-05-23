import axios from "axios";
import url from "../../services/url";

export default {
    state: {
        lifestyles: [],
        weightCategories: [],
        statusCreateProgram: "",
        statusActiveProgram: "",
        program: {},
        scheduleProgram: {},
        currentDateProgram: {week: 1, day: 1},
        page: 0,
        programFoods: [],
        programFoodCats: [],
        diet: [],
    },

    actions: {
        async initSchedule(ctx) {
            let weeks = {}
            for (let i = 0; i < 3; i++) {
                let days = {};
                ctx.state.week = i;
                for (let j = 0; j < 7; j++) {
                    let date = new Date(ctx.state.program.date_start);
                    date.setDate(date.getDate() + i * 7 + j);
                    days[`${j + 1}`] = {
                        id: j + 1,
                        date: date,
                        weekDay: date.getDay(),
                        eaten: {
                            calories: 0,
                            proteins: 0,
                            fats: 0,
                            carbohydrates: 0,
                            fibers: 0
                        }
                    }

                }
                weeks[`${i + 1}`] = {
                    id: i + 1,
                    days: days
                }
            }
            ctx.commit("updateSchedule", weeks);
        },

        async setCurrentWeek(ctx, week) {
            ctx.commit("updateCurrentWeek", week);
        },

        async setCurrentDay(ctx, day) {
            ctx.commit("updateCurrentDay", day);
        },

        async showFoodCategories(ctx) {
            await axios.get(`${url}/api/programs/get-food-categories`).then((res) => {
                ctx.commit(`updateFoodCategories`, res.data);
            });
        },

        async showLifestyleList(ctx) {
            await axios.get(`${url}/api/programs/get-lifestyles`).then((res) => {
                ctx.commit(`updateLifestyleList`, res.data);
            });
        },

        async showWeightCategoryList(ctx) {
            await axios.get(`${url}/api/programs/get-weight-categories`).then((res) => {
                ctx.commit(`updateWeightCategoryList`, res.data);
            })
        },

        async createProgram(ctx, program) {
            await axios.post(`${url}/api/programs/create-program`, program).then((res) => {
                ctx.commit(`updateCreateProgramStatus`, res.data.name);
            })
        },

        async checkActiveProgram(ctx, id) {
            await axios.get(`${url}/api/programs/user-has-active-program/${id}`).then((res) => {
                if (res.data.name === "Success") {
                    ctx.commit(`updateActiveProgramStatus`, res.data.text);
                }
            })
        },

        async closeProgram(ctx, user) {
            await axios.post(`${url}/api/programs/deactivate-program`, user);
        },

        async showProgram(ctx, user) {
            await axios.post(`${url}/api/programs/get-program`, user).then((res) => {
                if (res.data.name === "Success") {
                    ctx.commit("updateProgramData", res.data.program);
                    ctx.dispatch("initSchedule");
                }
            });
        },

        setPage(ctx, id) {
            ctx.commit("updatePage", id);
        },

        async showFoods(ctx) {
            await axios.get(`${url}/api/programs/get-foods`).then((res) => {
                ctx.commit(`updateFoods`, res.data);
            });
        },

        async showProgramDiet(ctx, input) {
            // получить все приемы пищи
            await axios.post(`${url}/api/programs/get-program-diet`, input).then(async (res) => {
                let diet = Array.from(res.data);
                // на каждый прием пищи получить продукты
                for (let i = 0; i < diet.length; i++) {
                    await axios.get(`${url}/api/programs/get-meal-foods/${diet[i].id}`).then((res) => {
                        diet[i].foods = res.data;
                    });
                }
                ctx.commit(`updateProgramDiet`, diet);
            });
        }
    },

    mutations: {
        updateSchedule(state, schedule) {
            state.scheduleProgram = schedule;
        },

        updateCurrentWeek(state, week) {
            state.currentDateProgram.week = week;
        },

        updateCurrentDay(state, day) {
            state.currentDateProgram.day = day;
        },

        updateFoodCategories(state, programFoodCats) {
            state.programFoodCats = programFoodCats;
        },

        updateLifestyleList(state, lifestyles) {
            state.lifestyles = lifestyles;
        },

        updateWeightCategoryList(state, weightCategories) {
            state.weightCategories = weightCategories;
        },

        updateCreateProgramStatus(state, value) {
            state.statusCreateProgram = value;
        },

        updateActiveProgramStatus(state, value) {
            state.statusActiveProgram = value;
        },

        updateProgramData(state, program) {
            state.program = program;
        },

        updatePage(state, id) {
            state.page = id;
        },

        updateFoods(state, foods) {
            state.programFoods = foods;
        },

        updateProgramDiet(state, diet) {
            state.diet = diet;
        },
    },

    getters: {
        schedule(state) {
            return state.scheduleProgram;
        },

        currentDate(state) {
            return state.currentDateProgram;
        },

        foodCategories(state) {
            return state.programFoodCats;
        },

        lifestyleList(state) {
            return state.lifestyles;
        },

        weightCategoryList(state) {
            return state.weightCategories;
        },

        createProgramStatus(state) {
            return state.statusCreateProgram;
        },

        activeProgramStatus(state) {
            return state.statusActiveProgram;
        },

        programData(state) {
            return state.program;
        },

        programPage(state) {
            return state.page;
        },

        foods(state) {
            return state.programFoods;
        },

        programDiet(state) {
            return state.diet;
        }
    }
}