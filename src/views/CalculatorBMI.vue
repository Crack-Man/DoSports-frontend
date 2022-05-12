<template>
    <div class="">
        <header-main/>
        <v-container>
            <title-page name="Калькулятор ИМТ"/>
            <form-calc-bmi/>
            <banner :image="require('@/assets/img/png/banner-join-2.png')"/>
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

    }),
}
</script>

<style lang="scss">
</style>