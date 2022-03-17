<template>
    <div>
        <p>{{ this.programData }}</p>
        <v-btn color="primary" @click="deleteProgram">Удалить программу</v-btn>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramBaseInfo",

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

<style scoped>

</style>