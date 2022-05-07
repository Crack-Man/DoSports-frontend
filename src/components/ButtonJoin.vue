<template>
    <router-link :to="this.userIsAuthorized ? '/sport-program' : '/auth'" class="button link">
        <div class="image">
            <img
                :src="require('@/assets/img/png/plus.png')"
            >
        </div>
        <span>Присоединиться</span>
    </router-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "ButtonJoin",

    computed: {
        ...mapGetters(['userIsAuthorized']),
    },
}
</script>

<style lang="scss">
#app {
    .button.link {
        display: flex;
        position: relative;
        align-items: center;
        width: 221px;
        height: 50px;
        margin-top: 34px;
        padding: 15px;
        border-radius: 4px;

        .image {
            height: 30px;
            margin-right: 10px;

            img {
                max-width: 100%;
            }
        }

        span {
            font-family: "Inter-Medium", sans-serif;
            font-size: 18px;
        }
    }



    .button.link::before {
        background-color: currentColor;
        border-radius: inherit;
        bottom: 0;
        color: inherit;
        content: "";
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    }

    .button.link:hover::before {
        opacity: 0.08;
    }
}

#app.dark {
    .button.link {
        background-color: #004bd7;
    }
}
</style>