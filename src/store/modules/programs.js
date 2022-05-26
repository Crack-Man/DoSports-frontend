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
        programPersonalFoods: [],
        programFoodById: [],
        programFoodCats: [],
        diet: [],
        visibleBars: true,
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

        async showPersonalFoods(ctx, idAuthor) {
            await axios.get(`${url}/api/programs/get-personal-foods/${idAuthor}`).then((res) => {
                ctx.commit(`updatePersonalFoods`, res.data);
            });
        },

        async showFoodById(ctx, id) {
            await axios.get(`${url}/api/programs/get-food-by-id/${id}`).then((res) => {
                if (res.data.name === "Success") {
                    ctx.commit(`updateFoodById`, res.data.food);
                }
            });
        },

        async showProgramDiet(ctx, input) {
            let calcParams = (ratio, grams) => {
                let value = ratio * grams / 100;
                return (+value.toFixed(1));
            }

            let round = (value) => {
                return (+value.toFixed(1));
            }
            // получить все приемы пищи
            await axios.post(`${url}/api/programs/get-program-diet`, input).then(async (res) => {
                let diet = Array.from(res.data);

                // свойства на весь день
                diet.proteins = 0;
                diet.fats = 0;
                diet.carbohydrates = 0;
                diet.calories = 0;
                diet.fibers = 0;
                for (let i = 0; i < diet.length; i++) {
                    // на каждый прием пищи получить продукты
                    await axios.get(`${url}/api/programs/get-meal-foods/${diet[i].id}`).then((res) => {
                        diet[i].foods = res.data;
                        // свойства на прием пищи
                        diet[i].proteins = 0;
                        diet[i].fats = 0;
                        diet[i].carbohydrates = 0;
                        diet[i].calories = 0;
                        diet[i].fibers = 0;

                        for (let j = 0; j < diet[i].foods.length; j++) {
                            // относительные свойства, зависящие от граммовки
                            diet[i].foods[j].proteinsCalc = calcParams(diet[i].foods[j].proteins, diet[i].foods[j].amount);
                            diet[i].foods[j].fatsCalc = calcParams(diet[i].foods[j].fats, diet[i].foods[j].amount);
                            diet[i].foods[j].carbohydratesCalc = calcParams(diet[i].foods[j].carbohydrates, diet[i].foods[j].amount);
                            diet[i].foods[j].caloriesCalc = calcParams(diet[i].foods[j].calories, diet[i].foods[j].amount);
                            diet[i].foods[j].fibersCalc = calcParams(diet[i].foods[j].fibers, diet[i].foods[j].amount);

                            diet[i].proteins += diet[i].foods[j].proteinsCalc;
                            diet[i].fats += diet[i].foods[j].fatsCalc;
                            diet[i].carbohydrates += diet[i].foods[j].carbohydratesCalc;
                            diet[i].calories += diet[i].foods[j].caloriesCalc;
                            diet[i].fibers += diet[i].foods[j].fibersCalc;
                        }

                        diet[i].proteins = round(diet[i].proteins);
                        diet[i].fats = round(diet[i].fats);
                        diet[i].carbohydrates = round(diet[i].carbohydrates);
                        diet[i].calories = round(diet[i].calories);
                        diet[i].fibers = round(diet[i].fibers);

                        diet.proteins += diet[i].proteins;
                        diet.fats += diet[i].fats;
                        diet.carbohydrates += diet[i].carbohydrates;
                        diet.calories += diet[i].calories;
                        diet.fibers += diet[i].fibers;
                    });
                    diet.proteins = round(diet.proteins);
                    diet.fats = round(diet.fats);
                    diet.carbohydrates = round(diet.carbohydrates);
                    diet.calories = round(diet.calories);
                    diet.fibers = round(diet.fibers);
                }
                ctx.commit(`updateProgramDiet`, diet);
            });
        },

        changeBarsVisible(ctx, value) {
            ctx.commit("updateBarsVisible", value);
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

        updatePersonalFoods(state, foods) {
            state.programPersonalFoods = foods;
        },

        updateFoodById(state, food) {
            state.programFoodById = food;
        },

        updateProgramDiet(state, diet) {
            state.diet = diet;
        },

        updateBarsVisible(state, value) {
            state.visibleBars = value;
        }
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

        personalFoods(state) {
            return state.programPersonalFoods;
        },

        foodById(state) {
            return state.programFoodById;
        },

        programDiet(state) {
            return state.diet;
        },

        barsVisible(state) {
            return state.visibleBars;
        }
    }
}