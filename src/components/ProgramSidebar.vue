<template>
    <div class="program-sidebar">
        <div
            class="item"
            v-for="(page, index) in menu"
            :key="index"
        >
            <a @click="changePage(index)" v-if="page.visible" :class="index === programPage ? 'active' : ''">{{ page.name }}</a>
            <div v-else class="unactive">
                <span>{{ page.name }}</span>
                <div class="speech-area">
                    <img :src="require('@/assets/img/svg/ask--grey.svg')"/>
                    <div class="speech-wrapper">
                        <div class="speech">
                            Доступно только <router-link to='/profile/premium'>премиум</router-link>-пользователям
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProgramSidebar",

    data: () => ({
    }),

    computed: {
        ...mapGetters(["programPage", "userIsPro"]),


        menu() {
            return [
                {name: "Основная информация", visible: true},
                {name: "Приемы пищи", visible: true},
                {name: "Тренировки", visible: true},
                {name: "Дневники", visible: true},
                {name: "Рационы", visible: this.userIsPro},
                {name: "Блюда", visible: this.userIsPro},
                {name: "Свои продукты", visible: this.userIsPro},
            ]
        }
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
        border-radius: 4px;
        padding: 25px;

        .item {
            a, .unactive span {
                cursor: pointer;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 180%;
            }

            .unactive {
                display: flex;

                .speech-area {
                    position: relative;
                    margin-left: 5px;

                    .speech-wrapper {
                        display: none;
                        top: -100vh;
                        width: 171px;
                        height: 65px;
                        position: absolute;
                        left: calc(100% - 91px);
                    }

                    .speech {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 171px;

                        font-family: 'Inter-Medium', sans-serif;
                        font-size: 12px;
                        line-height: 145%;
                        text-align: center;
                        border-radius: 2px;
                        padding: 7px 11px;

                        a {
                            font-family: 'Inter-Medium', sans-serif;
                            font-size: 12px;
                            line-height: 145%;
                            text-decoration: underline !important;
                        }
                    }

                    .speech:before {
                        content: '';
                        position: absolute;
                        transform: rotate(-135deg);
                        bottom: -9px;
                        left: calc(50% - 9px);
                    }

                    img {
                        position: relative;
                        cursor: pointer;
                        bottom: 7px;
                    }

                    img:hover ~ .speech-wrapper {

                        top: -62px;
                        display: block;
                    }
                }
            }

            .unactive:hover {
                .speech-wrapper {
                    top: -62px;
                    display: block;
                }
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

            .unactive {
                span {
                    color: #4C4C5B;
                }

                .speech {
                    color: white;
                    background: #262635;

                    a {
                        color: white !important;
                    }
                }

                .speech:before {
                    border: 10px solid;
                    border-color: #262635 transparent transparent #262635;
                }
            }
        }
    }
}

</style>