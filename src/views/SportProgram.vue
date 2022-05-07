<template>
    <div>
        <div class="progress-main" v-if="this.progress">
        </div>
        <div v-else>
            <header-main/>
            <error-405 v-if="!userData"></error-405>
            <div v-else>
                <program-base-info></program-base-info>
            </div>
            <footer-main/>
        </div>
    </div>
</template>

<script>
import ProgramBaseInfo from "../components/ProgramBaseInfo";
import Error405 from "@/components/Error405";
import {mapActions, mapGetters} from "vuex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
    name: "SportProgram",

    components: {
        "header-main": Header,
        "program-base-info": ProgramBaseInfo,
        "error-405": Error405,
        "footer-main": Footer,
    },

    data: () => ({
        progress: true
    }),

    computed: {
        ...mapGetters(["userData", "activeProgramStatus", "userIsAuthorized"]),
    },

    methods: {
        ...mapActions(["checkActiveProgram"]),
    },

    mounted() {
        if (this.userIsAuthorized) {
            this.checkActiveProgram(this.userData.id).then(() =>{
                if (!this.activeProgramStatus) {
                    this.$router.push("/start-program");
                } else {
                    this.progress = false;
                }
            })
        } else {
            this.progress = false;
        }
    }
}
</script>

<style scoped>

</style>