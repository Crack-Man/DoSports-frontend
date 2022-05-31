<template>
    <div>
        <v-container>
            <weeks v-show="barsVisible"/>
            <days v-show="barsVisible"/>
            <div class="program-base-container">
                <sidebar v-show="barsVisible"/>
                <program-base-content v-if="programPage === 0" :aim="aim"/>
                <program-meal v-if="programPage === 1"/>
                <program-rations v-if="programPage === 4"/>
                <program-dishes v-if="programPage === 5"/>
                <program-personal-foods v-if="programPage === 6"/>
            </div>
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
    },

    data: () => ({
    }),

    computed: {
        ...mapGetters(["userData", "currentDate", "schedule", "programData", "programDiet", "programPage", "barsVisible"]),

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
    },

    mounted() {
        this.changeBarsVisible(true);
        this.showProgram(this.userData);
    }
}
</script>

<style lang="scss">
#app {
    .program-base-container {
        margin-top: 40px;
        display: flex;
        align-items: flex-start;
    }
}
</style>