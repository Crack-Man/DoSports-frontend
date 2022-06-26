<template>
    <div class="banner-vertical">
        <router-link :to="this.userIsAuthorized ? '/sport-program' : '/auth'">
            + Присоединиться
        </router-link>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "BannerVertical",

    computed: {
        ...mapGetters(['userIsAuthorized']),
    },
}
</script>

<style lang="scss">
#app {
    .banner-vertical {
        width: 255px;
        height: 380px;
        background: url("../assets/img/png/banner-vertical.png");


        @media (max-width: 960px) {
            display: none;
        }

        display: flex;
        align-items: center;
        justify-content: center;

        a {
            font-family: 'Inter-Medium', sans-serif !important;
            font-size: 14px !important;
            line-height: 115% !important;
        }
    }
}

#app.dark {
    .banner-vertical {
        a:hover {
            color: white !important;
        }
    }
}
</style>