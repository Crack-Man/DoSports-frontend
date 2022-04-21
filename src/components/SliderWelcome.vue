<template>
    <div class="welcome-slider">
        <div class="welcome-image">
            <v-container class="content">
                <h1>ТВОЙ ПУТЬ К ЗДОРОВОМУ</h1>
                <h1>ТЕЛУ С DO SPORTS</h1>
                <div class="description">
                    Получи индивидуальный план тренировок совершенно бесплатно
                </div>
                <button-join/>
            </v-container>
        </div>
        <div class="calc-links">
            <router-link
                v-for="(page, index) in pages"
                :key="index" :to="page.url"
            >
                <span>{{ page.name }}</span>
                <img
                    class="arrow"
                    :src="require('@/assets/img/png/arrow-link-grey.png')"
                />
                <img
                    class="arrow-hover"
                    :src="require('@/assets/img/png/arrow-link-white.png')"
                />
            </router-link>
        </div>
    </div>
</template>

<script>
import ButtonJoin from "@/components/ButtonJoin";

export default {
    name: 'Main',

    components: {
        'button-join': ButtonJoin,
    },

    data: () => ({
        pages: [
            {
                name: 'Калькулятор\nИМТ',
                url: '/'
            },
            {
                name: 'Атлас\nтела',
                url: '/'
            },
            {
                name: 'Калькулятор\nБЖУ',
                url: '/'
            },
        ],
    }),

    methods: {

    },

    mounted() {
    }
}
</script>

<style lang="scss">
@import "../assets/main.css";
@import "../assets/forms.scss";

#app {
    .welcome-slider {
        width: 100%;
        height: calc(100vh - 80px);
        position: relative;

        @media (min-height: 1300px) {
            height: 600px;
        }

        @media (max-width: 960px) {
            height: calc(100vh - 48px);
        }

        .welcome-image {
            background: url("../assets/img/png/welcome-image.png");
            background-repeat: no-repeat;
            display: flex;
            align-items: center;

            background-position: right;
            background-size: cover;

            height: 75%;
            position: relative;

            @media (min-height: 1300px) {
                height: 100%;
            }

            @media (max-width: 1600px) and (max-height: 1200px) {
                height: 75%;
            }

            @media (max-width: 1500px) and (max-height: 1200px) {
                background-position-x: 80%;
            }

            @media (max-width: 1275px) and (max-height: 1200px) {
                height: 70%;
            }

            @media (max-width: 1275px) and (max-height: 1100px) {
                height: 75%;
            }

            @media (max-width: 1185px) and (max-height: 1200px) {
                height: 65%;
            }

            @media (max-width: 1085px) and (max-height: 1200px) {
                background-position-x: 77%;
            }

            @media (max-width: 1035px) and (max-height: 1200px) {
                height: 50%;
            }

            @media (max-width: 1035px) and (max-height: 950px) {
                height: 100%;
            }

            @media (max-width: 2048px) and (max-height: 750px) {
                height: 100%;
            }

            @media (max-width: 960px) {
                height: 100%;
            }

            .content {

                h1 {
                    font-family: "Oswald-Bold", sans-serif;
                    font-size: 56px;
                    line-height: 120%;
                    white-space: pre-wrap;
                }

                .description {
                    margin-top: 15px;
                    font-family: "Inter-Regular", sans-serif;
                    font-size: 24px;
                    width: 520px;
                    line-height: 140%;
                }
            }
        }

        .calc-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            height: 25%;

            @media (min-height: 1300px) {
                display: none;
            }

            @media (max-width: 1600px) and (max-height: 1200px) {
                height: 25%;
            }

            @media (max-width: 1275px) and (max-height: 1200px) {
                height: 30%;
            }

            @media (max-width: 1185px) and (max-height: 1200px) {
                height: 190px;
            }

            @media (max-width: 1035px) and (max-height: 950px) {
                display: none;
            }

            @media (max-width: 2048px) and (max-height: 750px) {
                display: none;
            }

            @media (max-width: 960px) {
                display: none;
            }

            a {
                position: relative;
                padding: 30px;
                font-size: 24px;
                white-space: pre-wrap;
                font-family: 'Inter-Medium', sans-serif;
                line-height: 130%;

                .arrow {
                    position: absolute;
                    right: 30px;
                    bottom: 30px;
                }

                .arrow-hover {
                    display: none;
                    position: absolute;
                    right: 30px;
                    bottom: 30px;
                }
            }

            a:hover > .arrow {
                display: none;
            }

            a:hover > .arrow-hover {
                display: block;
            }
        }
    }
}

#app.dark {
    .welcome-slider {
        .calc-links {
            a {
                border-bottom: 1px solid #333333;
                border-right: 1px solid #333333;
                color: #B5B5B8;
            }

            a:last-child {
                border-right: none;
            }

            a:hover {
                background-color: #004BD7;
                color: white;
            }
        }
    }
}
</style>