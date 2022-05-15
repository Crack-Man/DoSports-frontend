<template>
    <div class="program-sidebar">
        <div
            class="item"
            v-for="(page, index) in menu"
            :key="index"
        >
            <router-link :to="page.url">{{ page.name }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProgramSidebar",

    data: () => ({
        menu: [
            {name: "Основная информация", url: "/"},
            {name: "Приемы пищи", url: "/"},
            {name: "Тренировки", url: "/"},
            {name: "Дневники", url: "/"},
            {name: "Рационы", url: "/"},
            {name: "Блюда", url: "/"},
            {name: "Свои продукты", url: "/"},
        ]
    }),
}
</script>

<style lang="scss">
#app {
    .program-sidebar {
        flex: 0 0 255px;
        border-radius: 4px;
        padding: 25px;

        .item {
            a {
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 180%;
            }
        }

        .item:not(:first-child):not(:only-child) {
            margin-top: 5px;
        }
    }
}

#app.dark {
    .program-sidebar {
        background: #1A1A27;

        .item {
            a {
                color: #B5B5B8 !important;
            }

            a:hover {
                color: #9196FF !important;
            }
        }
    }
}

</style>