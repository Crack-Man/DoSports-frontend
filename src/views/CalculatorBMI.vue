<template>
    <div class="">
        <header-main/>
        <v-container>
            <title-page name="Калькулятор ИМТ"/>
            <form-calc-bmi/>

            <div v-if="!userIsPro && advertising > 0.5" class="advertising bmi">
                <div id="yandex_rtb_R-A-1707251-1"></div>
            </div>
            <banner v-else :image="require('@/assets/img/png/banner-join-2.png')"/>
        </v-container>
        <footer-main/>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Title from "@/components/Title";
import FormCalcBMI from "@/components/FormCalcBMI";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import {mapGetters} from "vuex";

export default {
    name: "CalculatorBMI",

    components: {
        "header-main": Header,
        "title-page": Title,
        "form-calc-bmi": FormCalcBMI,
        "banner": Banner,
        "footer-main": Footer
    },

    data: () => ({
        advertising: 1,
    }),

    computed: {
        ...mapGetters(["userIsPro"]),
    },

    methods: {
        getRandomArbitrary() {
            return Math.random();
        },

        pushAdvertising() {
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
            this.advertising = this.getRandomArbitrary();
        }
    },

    mounted() {
        this.pushAdvertising();
    }
}
</script>

<style lang="scss">
#app {
    .advertising.bmi {
        margin-top: 150px;
        max-height: 250px;
    }
}
</style>