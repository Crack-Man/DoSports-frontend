<template>
    <div class="foods-sidebar">
        <div :class="link.class" v-for="link in links" :key="link.id">
            {{ link.name }}
            <template v-if="link.speech">
                <img :src="require('@/assets/img/svg/ask--grey.svg')"/>
                <div class="speech">{{ link.speech }}</div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupFoodsSidebar",

    data: () => ({
        links: [
            {id: 0, name: "+ Добавить блюдо", class: "link-dish unactive", speech: "У вас еще нет блюд. Создайте свое блюдо в пункте меню “Блюда”."},
            {id: 1, name: "+ Добавить свой продукт", class: "link-self-food unactive", speech: "У вас еще нет своих продуктов. Создайте свой продукт в пункте меню “Свои продукты”."},
            {id: 2, name: "+ Добавить рацион", class: "link-ration unactive", speech: "У вас еще нет рационов. Создайте рацион при добавлении продуктов в прием пищи."},
        ]
    }),
}
</script>

<style lang="scss">

#app {
    .foods-sidebar {
        margin-left: 20px;
        margin-top: 30px;

        .link-dish, .link-self-food, .link-ration {
            position: relative;
            font-family: 'Inter-Medium', sans-serif;
            font-size: 18px;
            line-height: 22px;
            cursor: pointer;

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

        .link-self-food, .link-ration {
            margin-top: 20px;
        }

        .link-dish {
            .speech {
                width: 238px;
                right: -51px;
            }
        }

        .link-self-food {
            .speech {
                width: 238px;
                top: -87px;
                right: -75px;
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
                right: -58px;
            }
        }
    }
}

#app.dark {
    .foods-sidebar {
        .link-dish, .link-self-food, .link-ration {
            color: white;
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