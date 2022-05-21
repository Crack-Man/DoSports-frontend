<template>
    <div class="program-sidebar">
        <div
            class="item"
            v-for="(page, index) in menu"
            :key="index"
        >
            <a @click="changePage(index)" :class="index === programPage ? 'active' : ''">{{ page.name }}</a>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

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

    computed: {
        ...mapGetters(["programPage"]),
    },

    methods: {
        ...mapActions(["setPage"]),

        changePage(id) {
            this.setPage(id);
        }
    },

    mounted() {
        this.changePage(0);
    }
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

            a.active {
                color: #9196FF !important;
            }
        }
    }
}

</style>