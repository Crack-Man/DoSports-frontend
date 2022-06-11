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
        programRations: [],
        programDishes: [],
        programFoodById: [],
        programFoodCats: [],
        diet: [],
        visibleBars: true,
        programTrainMods: [],
        programTrains: [],
        programTrainsToday: [],
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

        async showRations(ctx, id) {
            let calcParams = (ratio, grams) => {
                let value = ratio * grams / 100;
                return (+value.toFixed(1));
            }

            let round = (value, fix=1) => {
                return (+value.toFixed(fix));
            }

            await axios.get(`${url}/api/programs/get-users-rations/${id}`).then(async (resRations) => {
                let rations = Array.from(resRations.data);
                for (let i = 0; i < rations.length; i++) {
                    await axios.get(`${url}/api/programs/get-ration-foods/${rations[i].id}`).then(async (resFoods) => {
                        rations[i].foods = resFoods.data;
                        // свойства на прием пищи
                        rations[i].proteins = 0;
                        rations[i].fats = 0;
                        rations[i].carbohydrates = 0;
                        rations[i].calories = 0;
                        rations[i].fibers = 0;
                        rations[i].glycemic_index = 0;

                        for (let j = 0; j < rations[i].foods.length; j++) {
                            // относительные свойства, зависящие от граммовки
                            if (rations[i].foods[j].id_food) {
                                // если это обычный продукт
                                rations[i].foods[j].proteinsCalc = calcParams(rations[i].foods[j].proteins, rations[i].foods[j].amount);
                                rations[i].foods[j].fatsCalc = calcParams(rations[i].foods[j].fats, rations[i].foods[j].amount);
                                rations[i].foods[j].carbohydratesCalc = calcParams(rations[i].foods[j].carbohydrates, rations[i].foods[j].amount);
                                rations[i].foods[j].caloriesCalc = calcParams(rations[i].foods[j].calories, rations[i].foods[j].amount);
                                rations[i].foods[j].fibersCalc = calcParams(rations[i].foods[j].fibers, rations[i].foods[j].amount);
                            } else if (rations[i].foods[j].id_dish) {
                                // если это блюдо, необходимо сначала получить данные о входящих продуктах, а затем рассчитать относительные показатели
                                // чтобы вычислить относительные показатели по блюду, необходимы данные показателей на 100 г (как они высчитываются, показано в функции ShowDishes)
                                rations[i].foods[j].name = rations[i].foods[j].name_dish;
                                await axios.get(`${url}/api/programs/get-dish-foods/${rations[i].foods[j].id_dish}`).then(async (resFoods) => {
                                    let foods = Array.from(resFoods.data.foods);
                                    let sumAmount = 0,
                                        sumProteins = 0,
                                        sumFats = 0,
                                        sumCarbohydrates = 0,
                                        sumCalories = 0,
                                        sumFibers = 0,
                                        sumGI = 0;
                                    for (let k = 0; k < foods.length; k++) {
                                        foods[k].proteinsCalc = calcParams(foods[k].proteins, foods[k].amount);
                                        foods[k].fatsCalc = calcParams(foods[k].fats, foods[k].amount);
                                        foods[k].carbohydratesCalc = calcParams(foods[k].carbohydrates, foods[k].amount);
                                        foods[k].caloriesCalc = calcParams(foods[k].calories, foods[k].amount);
                                        foods[k].fibersCalc = calcParams(foods[k].fibers, foods[k].amount);

                                        sumProteins += foods[k].proteinsCalc;
                                        sumFats += foods[k].fatsCalc;
                                        sumCarbohydrates += foods[k].carbohydratesCalc;
                                        sumCalories += foods[k].caloriesCalc;
                                        sumFibers += foods[k].fibersCalc;
                                        sumGI += foods[k].glycemic_index;
                                        sumAmount += foods[k].amount;
                                    }
                                    rations[i].foods[j].proteinsPer100 = 0;
                                    rations[i].foods[j].fatsPer100 = 0;
                                    rations[i].foods[j].carbohydratesPer100 = 0;
                                    rations[i].foods[j].caloriesPer100 = 0;
                                    rations[i].foods[j].fibersPer100 = 0;

                                    for (let k = 0; k < foods.length; k++) {
                                        rations[i].foods[j].proteinsPer100 += (foods[k].proteinsCalc / sumProteins + foods[k].amount / sumAmount) / 2 * foods[k].proteins;
                                        rations[i].foods[j].fatsPer100 += (foods[k].fatsCalc / sumFats + foods[k].amount / sumAmount) / 2 * foods[k].fats;
                                        rations[i].foods[j].carbohydratesPer100 += (foods[k].carbohydratesCalc / sumCarbohydrates + foods[k].amount / sumAmount) / 2 * foods[k].carbohydrates;
                                        rations[i].foods[j].caloriesPer100 += (foods[k].caloriesCalc / sumCalories + foods[k].amount / sumAmount) / 2 * foods[k].calories;
                                        rations[i].foods[j].fibersPer100 += (foods[k].fibersCalc / sumFibers + foods[k].amount / sumAmount) / 2 * foods[k].fibers;
                                    }

                                    rations[i].foods[j].proteinsCalc = calcParams(rations[i].foods[j].proteinsPer100, rations[i].foods[j].amount);
                                    rations[i].foods[j].proteinsCalc = isNaN(rations[i].foods[j].proteinsCalc) ? 0 : rations[i].foods[j].proteinsCalc;

                                    rations[i].foods[j].fatsCalc = calcParams(rations[i].foods[j].fatsPer100, rations[i].foods[j].amount);
                                    rations[i].foods[j].fatsCalc = isNaN(rations[i].foods[j].fatsCalc) ? 0 : rations[i].foods[j].fatsCalc;

                                    rations[i].foods[j].carbohydratesCalc = calcParams(rations[i].foods[j].carbohydratesPer100, rations[i].foods[j].amount);
                                    rations[i].foods[j].carbohydratesCalc = isNaN(rations[i].foods[j].carbohydratesCalc) ? 0 : rations[i].foods[j].carbohydratesCalc;

                                    rations[i].foods[j].caloriesCalc = calcParams(rations[i].foods[j].caloriesPer100, rations[i].foods[j].amount);
                                    rations[i].foods[j].caloriesCalc = isNaN(rations[i].foods[j].caloriesCalc) ? 0 : rations[i].foods[j].caloriesCalc;

                                    rations[i].foods[j].fibersCalc = calcParams(rations[i].foods[j].fibersPer100, rations[i].foods[j].amount);
                                    rations[i].foods[j].fibersCalc = isNaN(rations[i].foods[j].fibersCalc) ? 0 : rations[i].foods[j].fibersCalc;

                                    rations[i].foods[j].glycemic_index = round(sumGI / foods.length, 0);
                                });
                            }

                            rations[i].proteins += rations[i].foods[j].proteinsCalc;
                            rations[i].fats += rations[i].foods[j].fatsCalc;
                            rations[i].carbohydrates += rations[i].foods[j].carbohydratesCalc;
                            rations[i].calories += rations[i].foods[j].caloriesCalc;
                            rations[i].fibers += rations[i].foods[j].fibersCalc;
                            rations[i].glycemic_index += rations[i].foods[j].glycemic_index;
                        }
                        rations[i].proteins = round(rations[i].proteins);
                        rations[i].fats = round(rations[i].fats);
                        rations[i].carbohydrates = round(rations[i].carbohydrates);
                        rations[i].calories = round(rations[i].calories);
                        rations[i].fibers = round(rations[i].fibers);
                        rations[i].glycemic_index = round(rations[i].glycemic_index / rations[i].foods.length, 0);
                    });
                }
                ctx.commit("updateRations", rations);
            });
        },

        async showDishes(ctx, id) {
            let calcParams = (ratio, grams) => {
                let value = ratio * grams / 100;
                return (+value.toFixed(1));
            }

            let round = (value, fix=1) => {
                return (+value.toFixed(fix));
            }

            await axios.get(`${url}/api/programs/get-users-dishes/${id}`).then(async (resDishes) => {
                let dishes = Array.from(resDishes.data.dishes);
                for (let i = 0; i < dishes.length; i++) {
                    await axios.get(`${url}/api/programs/get-dish-foods/${dishes[i].id}`).then(async (resFoods) => {
                        let foods = Array.from(resFoods.data.foods);
                        dishes[i].proteins = 0;
                        dishes[i].fats = 0;
                        dishes[i].carbohydrates = 0;
                        dishes[i].calories = 0;
                        dishes[i].fibers = 0;
                        dishes[i].glycemic_index = 0;
                        dishes[i].amount = 0

                        for (let j = 0; j < foods.length; j++) {
                            foods[j].proteinsCalc = calcParams(foods[j].proteins, foods[j].amount);
                            foods[j].fatsCalc = calcParams(foods[j].fats, foods[j].amount);
                            foods[j].carbohydratesCalc = calcParams(foods[j].carbohydrates, foods[j].amount);
                            foods[j].caloriesCalc = calcParams(foods[j].calories, foods[j].amount);
                            foods[j].fibersCalc = calcParams(foods[j].fibers, foods[j].amount);

                            dishes[i].proteins += foods[j].proteinsCalc;
                            dishes[i].fats += foods[j].fatsCalc;
                            dishes[i].carbohydrates += foods[j].carbohydratesCalc;
                            dishes[i].calories += foods[j].caloriesCalc;
                            dishes[i].fibers += foods[j].fibersCalc;
                            dishes[i].glycemic_index += foods[j].glycemic_index;
                            dishes[i].amount += foods[j].amount;
                        }
                        dishes[i].proteins = round(dishes[i].proteins);
                        dishes[i].fats = round(dishes[i].fats);
                        dishes[i].carbohydrates = round(dishes[i].carbohydrates);
                        dishes[i].calories = round(dishes[i].calories);
                        dishes[i].glycemic_index = round(dishes[i].glycemic_index / foods.length, 0);
                        dishes[i].fibers = round(dishes[i].fibers);

                        dishes[i].proteinsCalc = 0;
                        dishes[i].fatsCalc = 0;
                        dishes[i].carbohydratesCalc = 0;
                        dishes[i].caloriesCalc = 0;
                        dishes[i].fibersCalc = 0;
                        for (let j = 0; j < foods.length; j++) {
                            // формула блюда на 100 г: f = (k + d) / 2 * value_per_100, где k - величина вклада свойства продукта, d - величина вклада массы продукта
                            dishes[i].proteinsCalc += (foods[j].proteinsCalc / dishes[i].proteins + foods[j].amount / dishes[i].amount) / 2 * foods[j].proteins;
                            dishes[i].fatsCalc += (foods[j].fatsCalc / dishes[i].fats + foods[j].amount / dishes[i].amount) / 2 * foods[j].fats;
                            dishes[i].carbohydratesCalc += (foods[j].carbohydratesCalc / dishes[i].carbohydrates + foods[j].amount / dishes[i].amount) / 2 * foods[j].carbohydrates;
                            dishes[i].caloriesCalc += (foods[j].caloriesCalc / dishes[i].calories + foods[j].amount / dishes[i].amount) / 2 * foods[j].calories;
                            dishes[i].fibersCalc += (foods[j].fibersCalc / dishes[i].fibers + foods[j].amount / dishes[i].amount) / 2 * foods[j].fibers;
                        }

                        dishes[i].proteinsCalc = round(dishes[i].proteinsCalc);
                        dishes[i].proteinsCalc = isNaN(dishes[i].proteinsCalc) ? 0 : dishes[i].proteinsCalc;

                        dishes[i].fatsCalc = round(dishes[i].fatsCalc);
                        dishes[i].fatsCalc = isNaN(dishes[i].fatsCalc) ? 0 : dishes[i].fatsCalc;

                        dishes[i].carbohydratesCalc = round(dishes[i].carbohydratesCalc);
                        dishes[i].carbohydratesCalc = isNaN(dishes[i].carbohydratesCalc) ? 0 : dishes[i].carbohydratesCalc;

                        dishes[i].caloriesCalc = round(dishes[i].caloriesCalc);
                        dishes[i].caloriesCalc = isNaN(dishes[i].caloriesCalc) ? 0 : dishes[i].caloriesCalc;

                        dishes[i].fibersCalc = round(dishes[i].fibersCalc);
                        dishes[i].fibersCalc = isNaN(dishes[i].fibersCalc) ? 0 : dishes[i].fibersCalc;


                        dishes[i].foods = foods;
                    });
                }
                ctx.commit("updateDishes", dishes);
            });
        },

        async showProgramDiet(ctx, input) {
            let calcParams = (ratio, grams) => {
                let value = ratio * grams / 100;
                return (+value.toFixed(1));
            }

            let round = (value, fix=1) => {
                return (+value.toFixed(fix));
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
                diet.glycemic_index = 0;
                for (let i = 0; i < diet.length; i++) {
                    // на каждый прием пищи получить продукты
                    await axios.get(`${url}/api/programs/get-meal-foods/${diet[i].id}`).then(async (res) => {
                        diet[i].foods = res.data;
                        // свойства на прием пищи
                        diet[i].proteins = 0;
                        diet[i].fats = 0;
                        diet[i].carbohydrates = 0;
                        diet[i].calories = 0;
                        diet[i].fibers = 0;
                        diet[i].glycemic_index = 0;

                        for (let j = 0; j < diet[i].foods.length; j++) {
                            // относительные свойства, зависящие от граммовки
                            if (diet[i].foods[j].id_food) {
                                // если это обычный продукт
                                diet[i].foods[j].proteinsCalc = calcParams(diet[i].foods[j].proteins, diet[i].foods[j].amount);
                                diet[i].foods[j].fatsCalc = calcParams(diet[i].foods[j].fats, diet[i].foods[j].amount);
                                diet[i].foods[j].carbohydratesCalc = calcParams(diet[i].foods[j].carbohydrates, diet[i].foods[j].amount);
                                diet[i].foods[j].caloriesCalc = calcParams(diet[i].foods[j].calories, diet[i].foods[j].amount);
                                diet[i].foods[j].fibersCalc = calcParams(diet[i].foods[j].fibers, diet[i].foods[j].amount);
                            } else if (diet[i].foods[j].id_dish) {
                                // если это блюдо, необходимо сначала получить данные о входящих продуктах, а затем рассчитать относительные показатели
                                // чтобы вычислить относительные показатели по блюду, необходимы данные показателей на 100 г (как они высчитываются, показано в функции ShowDishes)
                                diet[i].foods[j].name = diet[i].foods[j].name_dish;
                                await axios.get(`${url}/api/programs/get-dish-foods/${diet[i].foods[j].id_dish}`).then(async (resFoods) => {
                                    let foods = Array.from(resFoods.data.foods);
                                    let sumAmount = 0,
                                        sumProteins = 0,
                                        sumFats = 0,
                                        sumCarbohydrates = 0,
                                        sumCalories = 0,
                                        sumGI = 0,
                                        sumFibers = 0;
                                    for (let k = 0; k < foods.length; k++) {
                                        foods[k].proteinsCalc = calcParams(foods[k].proteins, foods[k].amount);
                                        foods[k].fatsCalc = calcParams(foods[k].fats, foods[k].amount);
                                        foods[k].carbohydratesCalc = calcParams(foods[k].carbohydrates, foods[k].amount);
                                        foods[k].caloriesCalc = calcParams(foods[k].calories, foods[k].amount);
                                        foods[k].fibersCalc = calcParams(foods[k].fibers, foods[k].amount);

                                        sumProteins += foods[k].proteinsCalc;
                                        sumFats += foods[k].fatsCalc;
                                        sumCarbohydrates += foods[k].carbohydratesCalc;
                                        sumCalories += foods[k].caloriesCalc;
                                        sumFibers += foods[k].fibersCalc;
                                        sumGI += foods[k].glycemic_index;
                                        sumAmount += foods[k].amount;
                                    }
                                    diet[i].foods[j].proteinsPer100 = 0;
                                    diet[i].foods[j].fatsPer100 = 0;
                                    diet[i].foods[j].carbohydratesPer100 = 0;
                                    diet[i].foods[j].caloriesPer100 = 0;
                                    diet[i].foods[j].fibersPer100 = 0;

                                    for (let k = 0; k < foods.length; k++) {
                                        diet[i].foods[j].proteinsPer100 += (foods[k].proteinsCalc / sumProteins + foods[k].amount / sumAmount) / 2 * foods[k].proteins;
                                        diet[i].foods[j].fatsPer100 += (foods[k].fatsCalc / sumFats + foods[k].amount / sumAmount) / 2 * foods[k].fats;
                                        diet[i].foods[j].carbohydratesPer100 += (foods[k].carbohydratesCalc / sumCarbohydrates + foods[k].amount / sumAmount) / 2 * foods[k].carbohydrates;
                                        diet[i].foods[j].caloriesPer100 += (foods[k].caloriesCalc / sumCalories + foods[k].amount / sumAmount) / 2 * foods[k].calories;
                                        diet[i].foods[j].fibersPer100 += (foods[k].fibersCalc / sumFibers + foods[k].amount / sumAmount) / 2 * foods[k].fibers;
                                    }

                                    diet[i].foods[j].proteinsCalc = calcParams(diet[i].foods[j].proteinsPer100, diet[i].foods[j].amount);
                                    diet[i].foods[j].proteinsCalc = isNaN(diet[i].foods[j].proteinsCalc) ? 0 : diet[i].foods[j].proteinsCalc;

                                    diet[i].foods[j].fatsCalc = calcParams(diet[i].foods[j].fatsPer100, diet[i].foods[j].amount);
                                    diet[i].foods[j].fatsCalc = isNaN(diet[i].foods[j].fatsCalc) ? 0 : diet[i].foods[j].fatsCalc;

                                    diet[i].foods[j].carbohydratesCalc = calcParams(diet[i].foods[j].carbohydratesPer100, diet[i].foods[j].amount);
                                    diet[i].foods[j].carbohydratesCalc = isNaN(diet[i].foods[j].carbohydratesCalc) ? 0 : diet[i].foods[j].carbohydratesCalc;

                                    diet[i].foods[j].caloriesCalc = calcParams(diet[i].foods[j].caloriesPer100, diet[i].foods[j].amount);
                                    diet[i].foods[j].caloriesCalc = isNaN(diet[i].foods[j].caloriesCalc) ? 0 : diet[i].foods[j].caloriesCalc;

                                    diet[i].foods[j].fibersCalc = calcParams(diet[i].foods[j].fibersPer100, diet[i].foods[j].amount);
                                    diet[i].foods[j].fibersCalc = isNaN(diet[i].foods[j].fibersCalc) ? 0 : diet[i].foods[j].fibersCalc;

                                    diet[i].foods[j].glycemic_index = round(sumGI / foods.length, 0);
                                });
                            }

                            diet[i].proteins += diet[i].foods[j].proteinsCalc;
                            diet[i].fats += diet[i].foods[j].fatsCalc;
                            diet[i].carbohydrates += diet[i].foods[j].carbohydratesCalc;
                            diet[i].calories += diet[i].foods[j].caloriesCalc;
                            diet[i].fibers += diet[i].foods[j].fibersCalc;
                            diet[i].glycemic_index += diet[i].foods[j].glycemic_index;
                        }

                        diet[i].proteins = round(diet[i].proteins);
                        diet[i].fats = round(diet[i].fats);
                        diet[i].carbohydrates = round(diet[i].carbohydrates);
                        diet[i].calories = round(diet[i].calories);
                        diet[i].fibers = round(diet[i].fibers);
                        diet[i].glycemic_index = round(diet[i].glycemic_index / (diet[i].foods.length ? diet[i].foods.length : 1), 0);


                        diet.proteins += diet[i].proteins;
                        diet.fats += diet[i].fats;
                        diet.carbohydrates += diet[i].carbohydrates;
                        diet.calories += diet[i].calories;
                        diet.fibers += diet[i].fibers;
                        diet.glycemic_index += diet[i].glycemic_index;
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
        },

        async showTrainMods(ctx, program) {
            await axios.post(`${url}/api/programs/get-train-mods`, program).then((res) => {
                if (res.data.name === "Success") {
                    ctx.commit("updateTrainMods", res.data.mods);
                }
            });
        },

        async showTrains(ctx, program) {
            await axios.post(`${url}/api/programs/get-trains`, program).then((res) => {
                if (res.data.name === "Success") {
                    let trains = Array.from(res.data.trains);
                    for (let i = 0; i < trains.length; i++) {
                        trains[i].description = trains[i].description.split("\n");
                        for (let j = 0; j < trains[i].description.length; j++) {
                            trains[i].description[j] = trains[i].description[j].trim()
                        }
                        trains[i].description = trains[i].description.filter(value => !!value);
                    }
                    ctx.commit("updateTrains", trains);
                }
            });
        },

        async showTrainProgram(ctx, program) {
            await axios.post(`${url}/api/programs/get-train-program`, program).then((res) => {
                if (res.data.name === "Success") {
                    let trains = Array.from(res.data.trains);
                    for (let i = 0; i < trains.length; i++) {
                        trains[i].description = trains[i].description.split("\n");
                        for (let j = 0; j < trains[i].description.length; j++) {
                            trains[i].description[j] = trains[i].description[j].trim()
                        }
                        trains[i].description = trains[i].description.filter(value => !!value);
                    }
                    ctx.commit("updateTrainProgram", trains);
                }
            })
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

        updateRations(state, rations) {
            state.programRations = rations;
        },

        updateDishes(state, dishes) {
            state.programDishes = dishes;
        },

        updateProgramDiet(state, diet) {
            state.diet = diet;
        },

        updateBarsVisible(state, value) {
            state.visibleBars = value;
        },

        updateTrainMods(state, mods) {
            state.programTrainMods = mods;
        },

        updateTrains(state, trains) {
            state.programTrains = trains;
        },

        updateTrainProgram(state, trains) {
            state.programTrainsToday = trains;
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

        rations(state) {
            return state.programRations;
        },

        dishes(state) {
            return state.programDishes;
        },

        programDiet(state) {
            return state.diet;
        },

        barsVisible(state) {
            return state.visibleBars;
        },

        trainMods(state) {
            return state.programTrainMods;
        },

        trains(state) {
            return state.programTrains;
        },

        trainProgram(state) {
            return state.programTrainsToday;
        }
    }
}