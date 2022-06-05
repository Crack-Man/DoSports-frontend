<template>
    <v-card-text class="card-education">
        <div class="page">{{ content.page }}</div>
        <div class="popup-title">{{ content.title }}</div>
        <div class="text">
            {{ content.text }}
        </div>
        <carousel class="carousel" :dots="true" :items="1">
            <template slot="prev">
                <img class="prev" :src="require('@/assets/img/png/arrow-left.png')">
            </template>
            <div class="item" v-for="(img, page) in content.img" :key="page">
                <div class="image">
                    <img :src="img.src">
                    <div class="description">
                        {{ img.alt }}
                    </div>
                </div>
            </div>
            <template slot="next">
                <img class="next" :src="require('@/assets/img/png/arrow-right.png')">
            </template>
        </carousel>
        <v-btn
            class="button"
            color="primary"
        >
            Продолжить
        </v-btn>
    </v-card-text>
</template>

<script>
import carousel from 'vue-owl-carousel';

export default {
    name: "PopupEducationContent",

    components: {
        carousel
    },

    props: ['content'],
}
</script>

<style lang="scss">

#app {
    .card-education {
        .page {
            font-family: 'Inter-Regular', sans-serif;
            font-size: 16px;
            line-height: 135%;
        }

        .popup-title {
            margin-top: 10px;
        }

        .text {
            margin-top: 25px;
            font-family: 'Inter-Regular', sans-serif;
            font-size: 16px;
            line-height: 135%;
        }

        .carousel {
            position: relative;
            margin-top: 30px;

            .item {
                .image {
                    filter: drop-shadow(0px 4px 50px rgba(0, 0, 0, 0.5));
                }

                .description {
                    margin-top: 15px;
                    font-family: 'Inter-Regular', sans-serif;
                    font-size: 14px;
                    line-height: 135%;
                    text-align: center;
                }
            }

            img.prev, img.next {
                cursor: pointer;
                width: 10px;
                position: absolute;
                top: calc(134px + 5px)
            }

            img.prev {
                left: -17px;
            }

            img.next {
                right: -17px;
            }
            
            span {
                display: block !important;
            }

            .owl-dots.disabled {
                display: block !important;

                .owl-dot {
                    span {
                        width: 8px !important;
                        height: 8px !important;
                    }
                }
            }
        }

        .button {
            margin-top: 20px;
            width: 100%;
            height: 50px;
        }
    }
}

#app.dark {
    .card-education {
        .page {
            color: #B5B5B8;
        }

        .text {
            color: white;
        }

        .carousel {
            .item {
                .text {
                    color: white;
                }
            }

            .owl-dots.disabled {
                .owl-dot {
                    span {
                        background: #9196FF;
                    }
                }
            }
        }
    }
}

</style>