<template>
    <div class="foods-sidebar">
        <template v-for="link in links">
            <template>
                <div v-if="link.active && link.visible" :class="link.class" @click="setPage(link.id)" :key="link.id">
                    <span :class="link.id === page ? 'active' : ''">{{ link.name }}</span>
                </div>
                <div v-else-if="link.visible" :class="link.classUnactive" :key="link.id">
                    <span :class="link.id === page ? 'active' : ''">{{ link.name }}</span>
                    <div class="speech-area" v-if="link.speech">
                        <img :src="require('@/assets/img/svg/ask--grey.svg')"/>
                        <div class="speech">{{ link.speech }}</div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: "PopupFoodsSidebar",

    props: ['page', 'personalFoods', 'rations', 'dishes', 'type'],

    data: () => ({
    }),

    computed: {
        ...mapGetters(["userIsPro"]),

        links() {
            return [
                {
                    id: 0,
                    name: "+ Добавить продукт",
                    class: "link link-food",
                    active: true,
                    visible: true
                },
                {
                    id: 2,
                    name: "+ Добавить свой продукт",
                    class: "link link-self-food",
                    classUnactive: "link link-self-food unactive" + (!this.userIsPro ? " without-pro" : ""),
                    speech: this.userIsPro ? "У вас еще нет своих продуктов. Создайте свой продукт в пункте меню “Свои продукты”." : "Доступно только премиум-пользователям",
                    active: this.userIsPro && this.personalFoods.length,
                    visible: true
                },
                {
                    id: 1,
                    name: "+ Добавить блюдо",
                    class: "link link-dish",
                    classUnactive: "link link-dish unactive" + (!this.userIsPro ? " without-pro" : ""),
                    speech: this.userIsPro ? "У вас еще нет блюд. Создайте свое блюдо в пункте меню “Блюда”." : "Доступно только премиум-пользователям",
                    active: this.userIsPro && this.dishes.length,
                    visible: this.type !== 'dish' && this.type !== 'createDish'
                },
                {
                    id: 3,
                    name: "+ Добавить рацион",
                    class: "link link-ration",
                    classUnactive: "link link-ration unactive" + (!this.userIsPro ? " without-pro" : ""),
                    speech: this.userIsPro ? "У вас еще нет рационов. Создайте рацион при добавлении продуктов в прием пищи." : "Доступно только премиум-пользователям",
                    active: this.userIsPro && this.rations.length,
                    visible: this.type !== 'ration' && this.type !== 'dish' && this.type !== 'createDish'
                },
            ]
        }
    },

    methods: {
        setPage(id) {
            this.$emit("changePage", id);
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss">

#app {
    .foods-sidebar {
        margin-left: 20px;
        margin-top: 30px;

        .link {
            margin-top: 20px;
            display: flex;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 18px;
            line-height: 22px;
            cursor: pointer;

            .speech-area {
                position: relative;
                margin-left: 5px;
            }

            img {
                position: relative;
                cursor: pointer;
                width: 9px;
                bottom: 10px;
            }

            img:hover ~ .speech {
                display: block;
            }
        }

        .link.unactive:hover .speech {
            display: block;
        }

        .link.unactive {
            cursor: pointer;
        }

        .link:first-child {
            margin-top: 0;
        }

        .speech {
            display: none;
            position: absolute;

            font-family: 'Inter-Medium', sans-serif;
            font-size: 12px;
            line-height: 145%;
            text-align: center;
            border-radius: 2px;
            padding: 7px 11px;
            top: -70px;
        }

        .speech:before {
            content: '';
            position: absolute;
            transform: rotate(-135deg);
            bottom: -9px;
            left: calc(50% - 9px);
        }

        .link-dish {
            .speech {
                width: 238px;
                left: calc(-238px / 2 + 3px);
                //right: -51px;
            }
        }

        .link-self-food {
            .speech {
                width: 238px;
                top: -87px;
                left: calc(-238px / 1.5 + 4px);
                //right: -75px;
            }

            .speech:before {
                transform: rotate(90deg);
                bottom: -13px;
                left: calc(50% + 20px);
            }
        }

        .link-ration {
            .speech {
                width: 238px;
                top: -87px;
                left: calc(-238px / 2 + 3px);
                //right: -58px;
            }
        }

        .without-pro {
            .speech {
                left: calc(-173px / 2 + 3px);
                width: 173px;
            }
        }

        .link-self-food.without-pro {
            .speech {
                top: -70px;
                left: calc(-238px / 2 - 4px);
            }
        }

        .link-ration.without-pro {
            .speech {
                top: -70px;
            }
        }
    }
}

#app.dark {
    .foods-sidebar {
        .link {
            color: white;

            span.active {
                color: #9196FF;
            }
        }

        .speech {
            color: white;
            background: #262635;
        }

        .speech:before {
            border: 10px solid;
            border-color: #262635 transparent transparent #262635;
        }

        .unactive {
            color: #4C4C5B;
        }
    }
}

</style>