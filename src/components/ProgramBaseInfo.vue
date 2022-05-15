<template>
    <div>
        <v-container>
            <weeks/>
            <days/>
            <div class="program-base-container">
                <sidebar/>
                <program-base-content/>
            </div>
<!--            <p>{{ this.programData }}</p>-->
<!--            <v-btn color="primary" @click="deleteProgram">Удалить программу</v-btn>-->
        </v-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProgramWeeks from "@/components/ProgramWeeks";
import ProgramDays from "@/components/ProgramDays";
import ProgramSidebar from "@/components/ProgramSidebar";
import ProgramBaseContent from "@/components/ProgramBaseContent";

export default {
    name: "ProgramBaseInfo",

    components: {
        "weeks": ProgramWeeks,
        "days": ProgramDays,
        "sidebar": ProgramSidebar,
        "program-base-content": ProgramBaseContent
    },

    computed: {
        ...mapGetters(["userData", "programData"]),
    },

    methods: {
        ...mapActions(["closeProgram", "showProgram"]),

        deleteProgram() {
            this.closeProgram(this.userData).then(() => {
                this.$router.push("/start-program");
            })
        }
    },

    mounted() {
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