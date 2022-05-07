<template>
    <v-container class="container-banner">
        <div class="banner">
            <div class="title">ВСТУПАЙ В НАШ КЛУБ</div>
            <button-join/>
        </div>
    </v-container>
</template>

<script>
import ButtonJoin from "@/components/ButtonJoin";

export default {
    name: "Banner",
    props: ['image'],

    components: {
        'button-join': ButtonJoin
    },

    methods: {
        setBackground() {
            let banner = document.querySelector(".banner");
            banner.style.background = `url(${this.image})`;
        }
    },

    mounted() {
        this.setBackground();
    }
}
</script>

<style lang="scss">
#app {
    .banner {
        width: 100%;
        height: 250px;
        padding: 65px;
        background-size: 100% 100% !important;

        .title {
            font-family: 'Oswald-Bold', sans-serif !important;
            font-size: 44px !important;
            line-height: 120% !important;
            letter-spacing: 0.02em !important;
        }

        .button.link {
            margin-top: 25px !important;
        }
    }
}
</style>