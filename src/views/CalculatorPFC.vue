<template>
    <div class="">
        <header-main/>
        <v-container>
            <title-page class="pfc" name="Калькулятор БЖУ"/>
            <div class="content-calculator-pfc">
                <form-calc-pfc/>
                <explanation :texts="explanation"/>
            </div>
            <banner :image="require('@/assets/img/png/banner-main.png')"/>
        </v-container>
        <footer-main/>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import FormCalcPFC from "@/components/FormCalcPFC";
import Explanation from "@/components/Explanation";
import Banner from "@/components/Banner";

export default {
    name: "CalculatorPFC",

    data: () => ({
        explanation: [{text: "Рассчитайте при помощи онлайн калькулятора суточный лимит калорий для потери, набора или поддержания веса. Введите данные в поля формы и получите развернутые рекомендации по составу пищи для эффективного достижения вашей цели."}]
    }),

    components: {
        "header-main": Header,
        "title-page": Title,
        "form-calc-pfc": FormCalcPFC,
        "explanation": Explanation,
        "banner": Banner,
        "footer-main": Footer
    }
}
</script>

<style lang="scss">
#app {
    .title-page.pfc {
        @media (max-width: 760px) {
            margin-bottom: 0;
        }
    }

    .content-calculator-pfc {
        display: flex;
        align-items: flex-start;

        @media (max-width: 760px) {
            flex-direction: column-reverse;
        }

        .container-explanation {
            @media (max-width: 760px) {
                margin-left: 0;
            }

            .explanation {
                margin-top: 15px;
            }
        }
    }

    .container-banner {
        margin-top: 150px;

        @media (max-width: 960px) {
            display: none;
        }
    }
}
</style>