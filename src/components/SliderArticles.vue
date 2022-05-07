<template>
    <div class="article-slider">
        <v-container>
            <div class="header-slider">
                <h1 class="title">ПОЛЕЗНЫЕ СТАТЬИ</h1>
                <router-link to="/" class="link">
                    <span>Смотреть все</span>
                    <div class="image">
                        <img
                            :src="require('@/assets/img/png/arrow-link-white-small.png')"
                        >
                        <img
                            class="active"
                            :src="require('@/assets/img/png/arrow-link-purple-small.png')"
                        >
                    </div>
                </router-link>
            </div>
            <div class="articles">
                <div class="list">
                    <div class="track">
                        <div class="item" v-for="(article, index) in articles" :key="index">
                            <div class="image">
                                <router-link to="/">
                                    <img
                                        :src="article.image"
                                    >
                                </router-link>
                            </div>
                            <div class="text">
                                <router-link to="/">
                                    <div class="title">{{ article.title }}</div>
                                </router-link>
                                <router-link to="/">
                                    <div class="description">{{ article.description }}</div>
                                </router-link>
                            </div>
                            <router-link to="/" class="link">+ Читать подробнее</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "SliderArticles",

    data: () => ({
        articles: [
            {
                image: require('@/assets/img/png/article1.png'),
                title: "Почему бег важен в борьбе за идеальные формы?",
                description: "Рассчитайте ваш индивидуальный индекс массы тела,  позволяющий оценить степень соответствия массы и роста"
            },
            {
                image: require('@/assets/img/png/article2.png'),
                title: "Почему бег важен в борьбе за идеальные формы?",
                description: "Рассчитайте ваш индивидуальный индекс массы тела,  позволяющий оценить степень соответствия массы и роста"
            },
            {
                image: require('@/assets/img/png/article3.png'),
                title: "Почему бег важен в борьбе за идеальные формы?",
                description: "Рассчитайте ваш индивидуальный индекс массы тела,  позволяющий оценить степень соответствия массы и роста"
            },
        ]
    }),

    methods: {
        swipeStart() {

        },

        swipeAction() {

        },

        swipeEnd() {

        }
    },

    mounted() {
        let swipe = new Swipe();
        swipe.start();
    }
}


class Swipe {
    slider = document.querySelector(".article-slider .articles");
    sliderList = this.slider.querySelector(".list");
    sliderTrack = this.slider.querySelector(".track");
    slides = this.slider.querySelectorAll(".item");
    slideWidth = this.slides[0].offsetWidth;
    slideIndex = 0;
    posInit = 0;
    posX1 = 0;
    posX2 = 0;
    posY1 = 0;
    posY2 = 0;
    posFinal = 0;
    isSwipe = false;
    isScroll = false;
    allowSwipe = true;
    transition = true;
    nextTrf = 0;
    prevTrf = 0;
    swipeStartTime;
    swipeEndTime;
    lastTrf = (this.slides.length - 1) * this.slideWidth;
    posThreshold = this.slideWidth * 0.35;
    trfRegExp = /([-0-9.]+(?=px))/;
    funcStart = (event) => {
        this.swipeStart(event);
    }
    funcAction = (event) => {
        this.swipeAction(event);
    }
    funcEnd = (event) => {
        this.swipeEnd(event)
    }


    start() {
        this.sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
        this.sliderTrack.addEventListener('transitionend', () => this.allowSwipe = true);
        this.slider.addEventListener('touchstart', this.funcStart);
        this.slider.addEventListener('mousedown', this.funcStart);
    }

    getEvent(event) {
        return (event.type.search("touch") !== -1) ? event.touches[0] : event;
    }

    slide() {
        if (this.transition) {
            this.sliderTrack.style.transition = 'transform .5s';
        }
        this.slideWidth = this.slides[0].offsetWidth;
        let add = 0;
        if (document.documentElement.clientWidth <= 320) {
            if (this.slideIndex > 0 && this.slideIndex < this.slides.length - 1) {
                add = 13;
            } else if (this.slideIndex === this.slides.length - 1) {
                add = 26;
            }
        } else if (document.documentElement.clientWidth <= 400) {
            if (this.slideIndex > 0 && this.slideIndex < this.slides.length - 1) {
                add = 12;
            } else if (this.slideIndex === this.slides.length - 1) {
                add = 22;
            }
        } else if (document.documentElement.clientWidth <= 450) {
            if (this.slideIndex > 0 && this.slideIndex < this.slides.length - 1) {
                add = 10;
            } else if (this.slideIndex === this.slides.length - 1) {
                add = 20;
            }
        } else if (document.documentElement.clientWidth <= 500) {
            if (this.slideIndex > 0 && this.slideIndex < this.slides.length - 1) {
                add = 19;
            } else if (this.slideIndex === this.slides.length - 1) {
                add = 34;
            }
        } else if (document.documentElement.clientWidth <= 600) {
            if (this.slideIndex > 0 && this.slideIndex < this.slides.length - 1) {
                add = 17;
            } else if (this.slideIndex === this.slides.length - 1) {
                add = 32;
            }
        } else if (document.documentElement.clientWidth <= 700) {
            if (this.slideIndex > 0 && this.slideIndex < this.slides.length - 1) {
                add = 15;
            } else if (this.slideIndex === this.slides.length - 1) {
                add = 30;
            }
        }
        this.sliderTrack.style.transform = `translate3d(-${this.slideIndex * this.slideWidth + add}px, 0px, 0px)`;
    }

    swipeStart(event) {
        if (document.documentElement.clientWidth > 700) {
            return
        }
        let evt = this.getEvent(event);

        if (this.allowSwipe) {

            this.swipeStartTime = Date.now();

            this.transition = true;

            this.nextTrf = (this.slideIndex + 1) * -this.slideWidth;
            this.prevTrf = (this.slideIndex - 1) * -this.slideWidth;

            this.posInit = this.posX1 = evt.clientX;
            this.posY1 = evt.clientY;

            this.sliderTrack.style.transition = '';

            document.addEventListener('touchmove', this.funcAction);
            document.addEventListener('mousemove', this.funcAction);
            document.addEventListener('touchend', this.funcEnd);
            document.addEventListener('mouseup', this.funcEnd);
        }
    }

    swipeAction(event) {
        let evt = this.getEvent(event),
            style = this.sliderTrack.style.transform,
            transform = +style.match(this.trfRegExp)[0];

        this.posX2 = this.posX1 - evt.clientX;
        this.posX1 = evt.clientX;

        this.posY2 = this.posY1 - evt.clientY;
        this.posY1 = evt.clientY;

        if (!this.isSwipe && !this.isScroll) {
            let posY = Math.abs(this.posY2);
            if (posY > 7 || this.posX2 === 0) {
                this.isScroll = true;
                this.allowSwipe = false;
            } else if (posY < 7) {
                this.isSwipe = true;
            }
        }

        if (this.isSwipe) {
            if (this.slideIndex === 0) {
                if (this.posInit < this.posX1) {
                    this.setTransform(transform, 0);
                    return;
                } else {
                    this.allowSwipe = true;
                }
            }

            // запрет ухода вправо на последнем слайде
            if (this.slideIndex === this.slides.length - 1) {
                if (this.posInit > this.posX1) {
                    this.setTransform(transform, this.lastTrf);
                    return;
                } else {
                    this.allowSwipe = true;
                }
            }

            if (this.posInit > this.posX1 && transform < this.nextTrf || this.posInit < this.posX1 && transform > this.prevTrf) {
                this.reachEdge();
                return;
            }
        }

        this.sliderTrack.style.transform = `translate3d(${transform - this.posX2}px, 0px, 0px)`;
    }

    swipeEnd() {
        this.posFinal = this.posInit - this.posX1;

        this.isScroll = false;
        this.isSwipe = false;

        document.removeEventListener('touchmove', this.funcAction);
        document.removeEventListener('mousemove', this.funcAction);
        document.removeEventListener('touchend', this.funcEnd);
        document.removeEventListener('mouseup', this.funcEnd);

        if (this.allowSwipe) {
            this.swipeEndTime = Date.now();
            if (Math.abs(this.posFinal) > this.posThreshold || this.swipeEndTime - this.swipeStartTime < 300) {
                if (this.posInit < this.posX1) {
                    this.slideIndex--;
                } else if (this.posInit > this.posX1) {
                    this.slideIndex++;
                }
            }

            if (this.posInit !== this.posX1) {
                this.allowSwipe = false;
                this.slide();
            } else {
                this.allowSwipe = true;
            }

        } else {
            this.allowSwipe = true;
        }
    }

    setTransform(transform, compareTransform) {
        if (transform >= compareTransform) {
            if (transform > compareTransform) {
                this.sliderTrack.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
            }
        }
        this.allowSwipe = false;
    }

    reachEdge() {
        this.transition = false;
        this.swipeEnd();
        this.allowSwipe = true;
    }
}
</script>

<style lang="scss">
#app {
    .article-slider {
        overflow: hidden;
        padding-top: 155px;

        @media (max-width: 700px) {
            padding-top: 70px;
        }

        @media (max-width: 600px) {
            margin-top: -100px;
        }

        @media (max-width: 450px) {
            margin-top: -150px;
        }

        .header-slider {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h1.title {
                font-family: 'Oswald-SemiBold', sans-serif !important;
                font-size: 44px !important;
                line-height: 130% !important;
                letter-spacing: 0.02em !important;

                @media (max-width: 1263px) {
                    font-size: 38px !important;
                }

                @media (max-width: 945px) {
                    font-size: 34px !important;
                }

                @media (max-width: 580px) {
                    font-size: 32px !important;
                }
            }

            .link {
                display: flex;
                align-items: center;

                @media (max-width: 1263px) {
                    display: none;
                }

                span {
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 18px;
                    line-height: 22px;

                    @media (max-width: 1263px) {
                        font-size: 16px;
                    }
                }

                .image {
                    margin-left: 10px;

                    img.active {
                        display: none;
                    }
                }
            }
        }

        .articles {
            margin-top: 60px;

            @media (max-width: 1263px) {
                margin-top: 40px;
            }

            @media (max-width: 450px) {
                margin-top: 25px;
            }


            @media (max-width: 700px) {
                /* Чтобы во время перетаскивания слайда ничего не выделить внутри него */
                user-select: none;
                /* Чтобы запретить скролл страницы, если мы начали двигать слайдер по оси X */
                touch-action: pan-y;
            }

            .track {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap: 30px;

                @media (max-width: 960px) {
                    grid-template-columns: repeat(2, 1fr);
                }

                @media (max-width: 700px) {
                    grid-template-columns: repeat(3, 95%);
                }

                @media (max-width: 450px) {
                    grid-column-gap: 20px;
                }

                .item:last-child {
                    @media (max-width: 960px) {
                        display: none;
                    }

                    @media (max-width: 700px) {
                        display: block;
                    }
                }

                .image {
                    width: 100%;
                    height: 197px;

                    @media (max-width: 1263px) {
                        height: 160px;
                    }

                    @media (max-width: 960px) {
                        height: 220px;
                    }

                    @media (max-width: 850px) {
                        height: 200px;
                    }

                    @media (max-width: 750px) {
                        height: 160px;
                    }

                    @media (max-width: 700px) {
                        height: 350px;
                    }

                    @media (max-width: 600px) {
                        height: 300px;
                    }

                    @media (max-width: 550px) {
                        height: 250px;
                    }

                    @media (max-width: 450px) {
                        height: 185px;
                    }

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;

                        // чтобы они не перетаскивались мышью
                        pointer-events: none;
                    }
                }

                .text {
                    padding-top: 20px;
                    margin-top: 25px;

                    @media (max-width: 450px) {
                        margin-top: 20px;
                    }

                    .title {
                        font-family: 'Inter-SemiBold', sans-serif !important;
                        font-size: 24px !important;
                        line-height: 125% !important;

                        @media (max-width: 1263px) {
                            font-size: 20px !important;
                        }

                        @media (max-width: 960px) {
                            font-size: 24px !important;
                        }

                        @media (max-width: 850px) {
                            font-size: 20px !important;
                        }

                        @media (max-width: 700px) {
                            font-size: 24px !important;
                        }

                        @media (max-width: 450px) {
                            font-size: 20px !important;
                        }
                    }

                    .description {
                        margin-top: 10px;
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 18px;
                        line-height: 145%;
                        letter-spacing: 0.02em;

                        @media (max-width: 1263px) {
                            font-size: 16px !important;
                        }

                        @media (max-width: 960px) {
                            font-size: 18px !important;
                        }

                        @media (max-width: 850px) {
                            font-size: 16px !important;
                        }

                        @media (max-width: 700px) {
                            font-size: 18px !important;
                        }

                        @media (max-width: 450px) {
                            font-size: 16px !important;
                        }
                    }
                }

                .link {
                    display: block;
                    margin-top: 15px;
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 18px;
                    line-height: 145%;
                    letter-spacing: 0.02em;

                    @media (max-width: 1263px) {
                        font-size: 16px;
                    }

                    @media (max-width: 960px) {
                        font-size: 18px !important;
                    }

                    @media (max-width: 450px) {
                        font-size: 16px !important;
                    }
                }
            }
        }


    }
}

#app.dark {
    .article-slider {
        .header-slider {
            .link:hover {
                span {
                    color: #9196FF !important;
                }

                img {
                    display: none;
                }

                img.active {
                    display: block;
                    position: relative;
                    top: 1px;
                }
            }
        }

        .articles {
            .text {
                border-top: 2px solid #B5B5B8;

                .description {
                    color: rgba(255, 255, 255, 0.85);
                }
            }

            .link:hover {
                color: #9196FF !important;
            }
        }
    }
}

</style>