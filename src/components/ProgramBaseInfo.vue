<template>
    <div>
        <v-container>
            <weeks v-show="barsVisible"/>
            <days v-show="barsVisible"/>
            <div class="program-base-container">
                <div class="side" v-show="barsVisible">
                    <sidebar/>
                    <div class="advertising" v-show="!this.userIsPro">
                        <div id="yandex_rtb_R-A-1707251-1"></div>
                    </div>
                </div>
                <program-base-content v-if="programPage === 0" :aim="aim"/>
                <program-meal v-if="programPage === 1"/>
                <program-trains v-if="programPage === 2"/>
                <program-rations v-if="programPage === 4"/>
                <program-dishes v-if="programPage === 5"/>
                <program-personal-foods v-if="programPage === 6"/>
            </div>
            <popup-education :visible="popupVisibleEducation" @close="popupVisibleEducation = false"/>
        </v-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProgramWeeks from "@/components/ProgramWeeks";
import ProgramDays from "@/components/ProgramDays";
import ProgramSidebar from "@/components/ProgramSidebar";
import ProgramBaseContent from "@/components/ProgramBaseContent";
import ProgramMeal from "./ProgramMeal";
import ProgramPersonalFoods from "@/components/ProgramPersonalFoods";
import ProgramRations from "@/components/ProgramRations";
import ProgramDishes from "@/components/ProgramDishes";
import PopupEducation from "@/components/PopupEducation";
import ProgramTrains from "@/components/ProgramTrains";

export default {
    name: "ProgramBaseInfo",

    components: {
        "weeks": ProgramWeeks,
        "days": ProgramDays,
        "sidebar": ProgramSidebar,
        "program-base-content": ProgramBaseContent,
        "program-meal": ProgramMeal,
        "program-rations": ProgramRations,
        "program-dishes": ProgramDishes,
        "program-personal-foods": ProgramPersonalFoods,
        "program-trains": ProgramTrains,
        "popup-education": PopupEducation,
    },

    data: () => ({
        popupVisibleEducation: false,
    }),

    computed: {
        ...mapGetters(["userData", "userIsPro", "currentDate", "schedule", "programData", "programDiet", "programPage", "barsVisible"]),

        aim() {
            if (!this.programData) return {};
            return {
                calories: this.programData.calories,
                proteins: this.programData.proteins,
                fats: this.programData.fats,
                carbohydrates: this.programData.carbohydrates,
                fibers: this.programData.fibers
            }
        },
    },

    watch: {
    },

    methods: {
        ...mapActions(["initSchedule", "closeProgram", "showProgram", "showProgramDiet", "changeBarsVisible"]),

        deleteProgram() {
            this.closeProgram(this.userData).then(() => {
                this.$router.push("/start-program");
            })
        },

        pushAdvertising() {
            if (!this.userIsPro) {
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.innerHTML =
                    "window.yaContextCb.push(() => {\n" +
                    "    Ya.Context.AdvManager.render({\n" +
                    "        renderTo: 'yandex_rtb_R-A-1707251-1',\n" +
                    "        blockId: 'R-A-1707251-1'\n" +
                    "    })\n" +
                    "})"
                let div = document.querySelector("#yandex_rtb_R-A-1707251-1");
                div.append(script);
            }
        }
    },

    mounted() {
        this.changeBarsVisible(true);
        this.showProgram(this.userData);
        this.pushAdvertising();
    }
}
</script>

<style lang="scss">
#app {
    .program-base-container {
        margin-top: 40px;
        display: flex;
        align-items: flex-start;

        .side {
            flex: 0 0 255px;

            .advertising {
                margin-top: 20px;
                max-height: 132px;
            }
        }
    }
}
</style>