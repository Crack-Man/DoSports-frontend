<template>
    <div class="title-page">{{ name }}</div>
</template>

<script>
export default {
    name: "Title",
    props: {
        name: String,
    }
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.css";

#app {
    .title-page {
        font-family: 'Oswald-Medium', sans-serif;
        font-size: 44px;
        line-height: 148%;
        margin: 50px 0 30px 0;

        @media (max-width: 1263px) {
            font-size: 38px;
        }

        @media (max-width: 945px) {
            font-size: 34px;
        }
    }
}

</style>