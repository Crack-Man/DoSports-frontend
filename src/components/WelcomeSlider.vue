<template>
    <div class="welcome-slider">
        <div class="welcome-image">
            <v-container class="content">
                <h1>ТВОЙ ПУТЬ К ЗДОРОВОМУ</h1>
                <h1>ТЕЛУ С DO SPORTS</h1>
                <div class="description">
                    Получи индивидуальный план тренировок совершенно бесплатно.
                </div>
                <router-link to="/" class="link">
                    <span>Присоединиться</span>
                </router-link>
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
export default {
    name: 'Main',

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
        sizeWelcomeSlider() {
            let width = document.documentElement.clientWidth;
            let height = document.documentElement.clientHeight;
            let image = document.getElementsByClassName("welcome-image")[0];
            image.style.height = '74%';
            if (height <= 800) {
                if (width <= 1300) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 50)}%`;
                } else if (width <= 1780) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 30)}%`;
                } else if (width <= 1920 && height <= 800) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 25)}%`;
                } else if (width <= 1920) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 20)}%`;
                } else {
                    image.style.height = `${74 - Math.floor((1920 - width) / 25)}%`;
                }

            } else if (height <= 880) {
                if (width <= 1300) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 35)}%`;
                } else if (width <= 1780) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 30)}%`;
                } else if (width <= 1920 && height <= 800) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 25)}%`;
                } else if (width <= 1920) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 20)}%`;
                } else {
                    image.style.height = `${74 - Math.floor((1920 - width) / 25)}%`;
                }

            } else if (height <= 960) {
                if (width <= 1300) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 30)}%`;
                } else if (width <= 1780) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 25)}%`;
                } else if (width <= 1920) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 15)}%`;
                } else {
                    image.style.height = `${74 - Math.floor((1920 - width) / 20)}%`;
                }
            }

            else {
                if (width <= 1300) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 25)}%`;
                } else if (width <= 1780) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 20)}%`;
                } else if (width <= 1920) {
                    image.style.height = `${74 - Math.floor((1920 - width) / 10)}%`;
                } else {
                    image.style.height = `${74 - Math.floor((1920 - width) / 35)}%`;
                }
            }
            let links = document.getElementsByClassName("calc-links")[0];
            links.style.height = `calc(100% - ${image.style.height})`;

            // Плохие размеры: width == 1680 && height == 1050; width == 1600 && height == 1200; width == 1600 && height == 1024; width == 1400 && height == 1050; width == 1440 && height == 900; width == 1280 && height == 1024; width == 1024 && height == 768
            // Сомнительные размеры: width == 1600 && height == 900
            // let links = document.getElementsByClassName("calc-links")[0];
            // if (
            //     width == 1920 && height == 1200 || width == 1920 && height == 1080 ||
            //     width == 1600 && height == 900 || width == 1280 && height == 768 ||
            //     width == 1280 && height == 720 || width == 1200 && height == 600 ||
            //     width == 1024 && height == 600 || width == 1440 && height == 900
            // ) {
            //     links.style.height = `calc(100% - ${image.style.height})`;
            // } else {
            //     links.style.height = '190px';
            // }
        }
    },

    mounted() {
        this.sizeWelcomeSlider()
        window.onresize = () => {
            this.sizeWelcomeSlider()
        }
    }
}
</script>

<style lang="scss">
@import "../assets/main.css";

#app {
    .welcome-slider {
        width: 100%;
        height: calc(100vh - 80px);
        position: relative;

        .welcome-image {
            background: url("../assets/img/png/welcome-image.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 74%;
            padding: 130px 0;

            .content {

                h1 {
                    font-family: "Oswald-Bold", serif;
                    font-size: 56px;
                    line-height: 120%;
                    white-space: pre-wrap;
                }

                .description {
                    margin-top: 15px;
                    font-family: "Inter-Regular", serif;
                    font-size: 24px;
                    width: 520px;
                    line-height: 140%;
                }

                .link {
                    display: flex;
                    width: 221px;
                    margin-top: 34px;
                    padding: 15px;

                    span {
                        font-family: "Inter-Medium", serif;
                        font-size: 18px;
                    }
                }
            }
        }

        .calc-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            height: 190px;

            a {
                position: relative;
                padding: 30px;
                font-size: 24px;
                white-space: pre-wrap;

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
        .welcome-image {
            .content {
                .link {
                    background-color: #004bd7;
                }
            }
        }

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