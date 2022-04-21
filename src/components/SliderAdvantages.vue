<template>
    <v-container>
        <div class="advantages-slider">
            <h1>Наши преимущества</h1>
            <div class="advantage-list">
                <div class="item" v-for="(item, index) in items" :key="index">
                    <div class="image">
                        <img
                            :src="require('@/assets/img/png/arrow-advantage.png')"
                        >
                    </div>
                    <div class="text">
                        <div class="title">{{ item.title }}</div>
                        <div class="description">{{ item.description }}</div>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "AdvantagesSlider",

    data: () => ({
        items: [
            {
                title: "Доступная цена",
                description: "Наш сервис бесплатный, а платные функции лишь дополнение, и они не мешают взаимодействию с сайтом."
            },
            {
                title: "Удобная платформа",
                description: "Теперь нет необходимости нанимать себе тренера, ведь вся необходимая информация содержится у нас на сайте."
            },
            {
                title: "Персональный подход",
                description: "Рассчитайте индивидуальный индекс массы тела, позволяющий оценить степень соответствия массы."
            },
        ]
    })
}
</script>

<style lang="scss">
@import "../assets/main.css";

#app {
    .advantages-slider {
        h1 {
            margin-top: 165px;
            font-family: "Oswald-Medium", sans-serif;
            font-weight: 500;
            font-size: 44px;
            line-height: 148%;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }

        .advantage-list {
            display: flex;
            margin: 50px -15px 150px -10px;

            .item {
                display: flex;
                margin: 0 10px;

                img {
                    margin-right: 25px;
                    margin-top: 2px;
                }

                .text {
                    .title {
                        font-family: 'Oswald-Regular', sans-serif !important;
                        font-weight: 400;
                        font-size: 32px !important;
                        line-height: 115% !important;
                    }

                    .description {
                        margin-top: 20px;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 18px;
                        line-height: 145%;
                        white-space: pre-wrap;
                    }
                }
            }
        }
    }
}

</style>