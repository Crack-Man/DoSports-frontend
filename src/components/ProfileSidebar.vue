<template>
    <div class="profile-sidebar">
        <router-link :class=" activePage === index.toString() ? 'active' : ''" v-for="(page, index) in menuPages" :key="index" :to="page.url">
            {{ page.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    name: "ProfileSidebar",

    props: ['activePage'],

    data: () => ({
        menuPages: [
            { name: "Основная информация", url: "/profile/base" },
            { name: "Подписки", url: "/profile/premium" },
            { name: "Настройки", url: "/profile/settings" },
        ],
    }),
}
</script>

<style lang="scss">
@import "../assets/scss/profile.scss";

</style>