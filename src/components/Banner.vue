<template>
    <v-container class="container-banner">
        <div :class="type !== 'premium' ? 'banner' : 'banner premium'">
            <div v-if="type !== 'premium'" class="title">ВСТУПАЙ В НАШ КЛУБ</div>
            <div v-else class="title premium">ПОЧУВСТВУЙ ВСЕ ПЛЮСЫ <span>PREMIUM</span> ПОДПИСКИ</div>
            <button-join :type="this.type === 'premium' ? 'premium' : ''"/>
        </div>
    </v-container>
</template>

<script>
import ButtonJoin from "@/components/ButtonJoin";

export default {
    name: "Banner",
    props: ['type', 'image'],

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

        .title.premium {
            width: 531px;
        }

        .button.link {
            margin-top: 25px !important;
        }
    }

    .banner.premium {
        padding-top: 36px;
        padding-bottom: 36px;
    }
}

#app.dark {
    .banner {
        .title.premium {
            span {
                color: #9196FF;
            }
        }
    }
}
</style>