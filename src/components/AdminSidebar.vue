<template>
    <div class="admin-sidebar">
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
            { name: "Пользователи", url: "/admin/users" },
            { name: "Прайс-лист", url: "/admin/price-list" },
        ],
    }),
}
</script>

<style lang="scss">
@import "../assets/scss/profile.scss";

#app {
    .admin-sidebar {
        flex: 0 0 255px;
        border-radius: 4px;
        padding: 25px;

        a {
            margin-top: 5px;
            display: block;
            font-family: 'Inter-Medium', sans-serif;
            font-size: 18px;
            line-height: 180%;
        }

        a:first-child {
            margin-top: 0;
        }
    }
}

#app.dark {
    .admin-sidebar {
        background: #1A1A27;
        a {
            color: #B5B5B8 !important;
        }

        a.active {
            color: #9196FF !important;
        }

        a:hover {
            color: #B5B5B8 !important;
        }

        a.active:hover {
            color: #9196FF !important;
        }
    }
}

</style>