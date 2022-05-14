<template>
    <div class="">
        <header-main/>
        <v-container>
            <title-page name="Полезные статьи"></title-page>
            <div class="article-container">
                <explanation :texts="explanation"/>
                <article-list/>
            </div>
        </v-container>
        <footer-main/>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleList from "@/components/ArticleList";
import Title from "@/components/Title";
import Explanation from "@/components/Explanation";

export default {
    name: "Articles",

    components: {
        "header-main": Header,
        "explanation": Explanation,
        "title-page": Title,
        "article-list": ArticleList,
        "footer-main": Footer
    },

    data: () => ({
        explanation: [{text: "В данном разделе сайта вы сможете найти различные полезные статьи на тему того, как питаться, тренироваться, быть здоровыми и сильными."}]
    })
}
</script>

<style lang="scss">
#app {
    .article-container {
        display: flex;

        .container-explanation {
            flex: 0 0 297px;
            margin-left: 0;
            margin-right: 50px;

            .explanation {
                margin-top: 0;
            }
        }
    }
}
</style>