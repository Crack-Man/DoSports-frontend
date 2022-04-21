<template>
    <router-link to="/auth" class="button link">
        <div class="image">
            <img
                :src="require('@/assets/img/png/plus.png')"
            >
        </div>
        <span>Присоединиться</span>
    </router-link>
</template>

<script>
export default {
    name: "ButtonJoin"
}
</script>

<style lang="scss">
#app {
    .button.link {
        display: flex;
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
}

#app.dark {
    .button.link {
        background-color: #004bd7;
    }
}
</style>