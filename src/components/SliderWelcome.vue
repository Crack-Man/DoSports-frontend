<template>
    <div class="welcome-slider">
        <div class="welcome-image">
            <main-header screen="mobile"/>
            <v-container class="content">
                <h1>ТВОЙ ПУТЬ К ЗДОРОВОМУ</h1>
                <h1>ТЕЛУ С DO SPORTS</h1>
                <h1 class="triple">ТВОЙ ПУТЬ</h1>
                <h1 class="triple">К ЗДОРОВОМУ</h1>
                <h1 class="triple">ТЕЛУ С DO SPORTS</h1>
                <div class="description">
                    Онлайн-органайзер для контроля питания и режима тренировок
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
import Header from "@/components/Header";
import ButtonJoin from "@/components/ButtonJoin";

export default {
    name: 'Main',

    components: {
        'button-join': ButtonJoin,
        'main-header': Header,
    },

    data: () => ({
        pages: [
            {
                name: 'Калькулятор\nИМТ',
                url: '/calc-bmi'
            },
            {
                name: 'Калькулятор\nБЖУ',
                url: '/calc-pfc'
            },
            {
                name: 'Статьи',
                url: '/articles'
            },
        ],
    }),

    methods: {
    },

    mounted() {
        document.querySelector(".header").classList.add("main-page");
        // alert(`${window.innerWidth}x${window.innerHeight}`);
    }
}
</script>

<style lang="scss">
@import "../assets/scss/fonts.css";
@import "../assets/scss/forms";

#app {
    .header.main-page {
        @media (max-width: 700px) {
            display: none;
        }

        @media (max-width: 850px) and (max-height: 450px) {
            display: none;
        }
    }

    .welcome-slider {
        width: 100%;
        height: calc(100vh - 80px);
        position: relative;

        @media (max-width: 1035px) and (max-height: 1300px) {
            height: 690px;
        }


        .header {
            display: none;
            background-color: rgba(0, 0, 0, 0);


            @media (max-width: 700px) {
                display: block;
                width: 100vw;
            }

            @media (max-width: 850px) and (max-height: 450px) {
                display: block;
                width: 100vw;
            }

            .link-main {
                img.pc {
                    @media (max-width: 850px) and (max-height: 450px) {
                        display: none;
                    }
                }

                img.mobile.main-page {
                    display: block !important;
                }
            }

            img.mobile.active {
                display: none;
            }
        }

        .header.active {
            .link-main {
                img.mobile.main-page {
                    display: none !important;
                }
            }
        }
        
        @media (max-width: 1024px) and (min-height: 951px) {
            height: 690px;
        }

        @media (max-width: 960px) and (max-height: 950px) {
            height: 500px;
        }

        @media (min-height: 1300px) {
            height: 690px;
        }

        @media (max-width: 900px) {
            height: 500px;
        }

        @media (max-width: 700px) {
            height: 100vh;
        }

        @media (max-height: 500px) {
            height: 100vh;
        }

        @media (max-width: 850px) and (max-height: 450px) {
            height: 100vh;
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

            @media (max-width: 1035px) and (max-height: 1300px) {
                height: 500px;
                background-position: 70%;
            }

            @media (max-width: 1035px) and (max-height: 950px) {
                height: 100%;
                background-position: 80%;
            }

            @media (max-width: 2048px) and (max-height: 720px) {
                height: 100%;
            }

            @media (max-width: 960px) and (max-height: 950px) {
                height: 100%;
            }

            @media (max-width: 850px) {
                background-position: 80%;
            }

            @media (min-height: 1300px) {
                height: 500px;
            }

            @media (max-width: 700px) {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                background: url("../assets/img/png/welcome-image-mobile.png");
                background-repeat: no-repeat;
                background-size: auto 120%;
                background-position-x: 75%;
                background-position-y: 100%;

                height: 100%;
            }

            @media (max-width: 700px) and (max-height: 1100px) {
                background-position-x: 80%;
            }

            @media (max-width: 700px) and (max-height: 900px) {
                background-position-x: 95%;
            }

            @media (max-width: 700px) and (max-height: 550px) {
                background-size: cover;
            }

            @media (max-width: 700px) and (max-height: 450px) {
                background: url("../assets/img/png/welcome-image-mobile2.png");
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: 40% 100%;
            }

            @media (max-width: 700px) and (max-height: 380px) {
                background-size: auto 110%;
                background-position: 40% 100%;
            }

            @media (max-width: 700px) and (max-height: 340px) {
                background-size: auto 117%;
                background-position: 40% 100%;
            }

            @media (max-width: 650px) and (max-height: 1100px) {
                background-position-x: 75%;
            }

            @media (max-width: 650px) and (max-height: 1000px) {
                background-position-x: 80%;
            }

            @media (max-width: 650px) and (max-height: 850px) {
                background-position-x: 85%;
            }

            @media (max-width: 650px) and (max-height: 750px) {
                background-position-x: 90%;
            }

            @media (max-width: 650px) and (max-height: 450px) {
                background-size: auto 100%;
                background-position: 40% 100%;
            }

            @media (max-width: 650px) and (max-height: 370px) {
                background: url("../assets/img/png/welcome-image-mobile3.png");
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: 80% -50%;
            }

            @media (max-width: 600px) and (max-height: 1200px){
                background-position-x: 70%;
            }

            @media (max-width: 600px) and (max-height: 1000px){
                background-position-x: 75%;
            }

            @media (max-width: 600px) and (max-height: 900px){
                background-position-x: 80%;
            }

            @media (max-width: 600px) and (max-height: 800px){
                background-position-x: 85%;
            }

            @media (max-width: 600px) and (max-height: 700px){
                background-position-x: 90%;
            }

            @media (max-width: 600px) and (max-height: 450px) {
                background-position: 60% 100%;
            }

            @media (max-width: 600px) and (max-height: 370px) {
                background-position: 80% 100%;
            }

            @media (max-width: 480px) {
                background-position: 80% 100%;
            }

            @media (max-width: 400px) {
                background-position: 75% 100%;
            }

            @media (max-width: 850px) and (max-height: 450px) {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                background: url("../assets/img/png/welcome-image-mobile3.png");
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: 75% 100%;

                height: 100%;
            }

            @media (min-width: 750px) and (max-width: 850px) and (max-height: 400px) {
                background-size: auto 140%;
                background-position: 100% 50%;
            }

            .content {

                @media (max-width: 700px) {
                    margin-bottom: 55px;
                }

                @media (max-width: 700px) and (max-height: 450px) {
                    margin-bottom: 25px;
                }

                @media (max-width: 480px) {
                    margin-bottom: 30px;
                }

                @media (max-width: 850px) and (max-height: 450px) {
                    margin-bottom: 55px;
                }

                h1 {
                    font-family: "Oswald-Bold", sans-serif;
                    font-size: 56px;
                    line-height: 120%;
                    white-space: pre-wrap;

                    @media (max-width: 850px) {
                        font-size: 50px;
                    }

                    @media (max-width: 750px) {
                        font-size: 45px;
                    }

                    @media (max-width: 700px) {
                        display: none;
                    }

                    @media (max-width: 700px) and (max-height: 450px) {
                        display: block;
                        font-size: 38px;
                    }

                    @media (max-width: 600px) and (max-height: 450px) {
                        font-size: 32px;
                    }

                    @media (max-width: 500px) and (max-height: 370px) {
                        font-size: 30px;
                    }

                    @media (max-width: 480px) {
                        font-size: 26px;
                    }

                    @media (min-width: 750px) and (max-width: 850px) and (max-height: 400px) {
                        font-size: 40px;
                    }

                    @media (min-width: 750px) and (max-width: 850px) and (max-height: 320px) {
                        font-size: 36px;
                    }
                }

                h1.triple {
                    display: none;

                    @media (max-width: 700px) {
                        font-size: 56px;
                        display: block;
                    }

                    @media (max-width: 500px) and (max-height: 1200px) {
                        font-size: 52px;
                    }

                    @media (max-width: 700px) and (max-height: 450px) {
                        display: none;
                    }

                    @media (max-width: 480px) {
                        font-size: 38px;
                    }

                    @media (max-width: 380px) {
                        font-size: 36px;
                    }

                    @media (max-width: 345px) {
                        font-size: 34px;
                    }

                    @media (max-width: 330px) {
                        font-size: 32px;
                    }
                }

                .description {
                    margin-top: 15px;
                    font-family: "Inter-Regular", sans-serif;
                    font-size: 24px;
                    width: 480px;
                    line-height: 140%;

                    @media (max-width: 750px) {
                        font-size: 20px;
                        width: 400px;
                    }

                    @media (max-width: 700px) {
                        font-size: 24px;
                        width: 400px;
                    }

                    @media (max-width: 700px) and (max-height: 450px) {
                        font-size: 18px;
                        width: 350px;
                    }

                    @media (max-width: 700px) and (max-height: 350px) {
                        margin-top: 10px;
                    }

                    @media (max-width: 500px) and (max-height: 370px) {
                        width: 350px;
                        font-size: 18px;
                    }

                    @media (max-width: 480px) {
                        width: 100%;
                        font-size: 18px;
                        margin-top: 15px;
                    }

                    @media (min-width: 750px) and (max-width: 850px) and (max-height: 400px) {
                        margin-top: 10px;
                        width: 350px;
                        font-size: 18px;
                    }
                }

                .button.link {
                    @media (max-width: 700px) {
                        width: 100%;
                        justify-content: center;
                        margin-top: 25px;

                        .image {
                            margin-right: 15px;

                            @media (min-width: 750px) and (max-width: 850px) and (max-height: 400px) {
                                margin-right: 10px;
                            }
                        }
                    }

                    @media (max-width: 700px) and (max-height: 350px) {
                        margin-top: 20px;
                    }

                    @media (max-width: 480px) {
                        margin-top: 25px;
                    }

                    @media (min-width: 750px) and (max-width: 850px) and (max-height: 400px) {
                        width: 200px;
                        margin-top: 10px;
                    }

                    span {
                        @media (min-width: 750px) and (max-width: 850px) and (max-height: 400px) {
                            font-size: 16px;
                        }
                    }
                }
            }
        }

        .calc-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            height: 25%;

            @media (max-width: 1600px) and (max-height: 1200px) {
                height: 25%;
            }

            @media (max-width: 1275px) and (max-height: 1200px) {
                height: 25%;
            }

            @media (max-width: 1185px) and (max-height: 1300px) {
                height: 190px;
            }

            @media (max-width: 1035px) and (max-height: 950px) {
                display: none;
            }

            @media (max-width: 2048px) and (max-height: 720px) {
                display: none;
            }

            @media (max-width: 960px) {
                height: 190px;
            }

            @media (min-height: 1300px) {
                display: grid;
                height: 194px;
            }

            @media (max-width: 900px) {
                display: none;
            }

            @media (max-width: 700px) {
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