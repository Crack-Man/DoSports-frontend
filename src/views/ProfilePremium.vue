<template>
    <div class="">
        <div class="progress premium" v-if="this.progress || this.progressUser">
            <v-progress-circular
                v-if="timerCount === 0"
                size="50"
                class="icon"
                indeterminate
                color="#004BD7"
            ></v-progress-circular>
        </div>
        <div v-else>
            <header-main/>
            <error-405 v-if="!userIsAuthorized"></error-405>
            <v-container v-else>
                <banner class="profile-banner" type="premium" :image="require('@/assets/img/png/banner-join-2.png')"/>
                <div class="profile-container">
                    <profile-sidebar active-page="1"/>
                    <div class="profile-content">
                        <title-page class="premium" name="Подписка"/>
                        <div class="status" v-if="this.userIsPro">Cтатус подписки: премиум (действителен до
                            {{ proLastDatetime }})
                        </div>
                        <div class="status" v-else>Cтатус подписки: стандартный</div>
                        <div class="text">
                            Ниже вы можете купить необходимое для вас количество дней Premium подписки на DO SPORTS.
                            Оплата происходит разово, по истечении купленного количества дней необходимо повторно
                            оплатить подписку.
                        </div>
                        <div class="pricelist">
                            <div class="item" v-for="(item, index) in pricelist" :key="item.id">
                                <div class="period">
                                    DO SPORTS ({{ item.name }})
                                </div>
                                <div class="cost">
                                    {{ item.cost }} руб.
                                </div>
                                <v-btn
                                    class="button"
                                    color="primary"
                                    @click="getPayLink(index, item.days, item.cost)"
                                    :loading="item.progress"
                                >
                                    Купить
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
            <footer-main/>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Error405 from "@/components/Error405";
import Banner from "@/components/Banner";
import ProfileSidebar from "@/components/ProfileSidebar";
import Footer from "@/components/Footer";
import Title from "@/components/Title";

import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import url from "../services/url";

export default {
    name: "ProfilePremium",

    components: {
        "header-main": Header,
        "error-405": Error405,
        "banner": Banner,
        "profile-sidebar": ProfileSidebar,
        "title-page": Title,
        "footer-main": Footer,
    },

    data: () => ({
        progress: true,
        progressUser: true,
        pricelist:
            {
                id: 0,
                name: "",
                cost: 0,
                days: 0,
                progress: false,
            },
        daysQuery: 0,
        timerCount: 3,
    }),

    computed: {
        ...mapGetters(["userIsAuthorized", "userData", "userIsPro"]),

        proLastDatetime() {
            if (this.userIsAuthorized) {
                if (this.userData.pro_last_datetime !== null) {
                    let date = new Date(this.userData.pro_last_datetime);
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();
                    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
                }
                return "";
            }
            return "";
        },
    },

    methods: {
        ...mapActions(["checkPro"]),

        async getPricelist() {
            await axios.get(`${url}/api/payment/get-pricelist`).then((res) => {
                this.pricelist = Array.from(res.data);
                for (let i = 0; i < this.pricelist.length; i++) {
                    this.pricelist[i].progress = false;
                }
                this.progress = false;
            })
            // let payData = {
            //     client_email: "crack-man228@ya.ru",
            //     id: 50,
            //     sum: 13,
            //     orderid: 15,
            // }
            // await axios.post(`${url}/api/payment/add-premium`, payData).then((res) => {
            //     console.log(res.data)
            // })
        },

        async getPayLink(id, days, cost) {
            // this.pricelist[id].progress = true; - не срабатывает реактивность (почему - хороший вопрос), поэтому альтернатива:
            this.$set(this.pricelist, id, {
                id: this.pricelist[id].id,
                name: this.pricelist[id].name,
                cost: this.pricelist[id].cost,
                days: this.pricelist[id].days,
                progress: true,
            });


            let payData = {
                days: days,
                cost: cost,
                user: this.userData
            }
            await axios.post(`${url}/api/payment/get-pay-link`, payData).then((res) => {
                if (res.data.name === "Success") {
                    // а здесь реактивность работает...
                    this.pricelist[id].progress = false;
                    window.open(res.data.link, "_blank");
                }
            })
        },
    },

    mounted() {
        setInterval(() => {
            if (this.timerCount > 0) this.timerCount--;
        }, 1000);
        if (this.userIsAuthorized) {
            this.checkPro(this.userData.id).then(() => {
                this.progressUser = false
            })
            this.getPricelist();
        }
    }
}
</script>

<style lang="scss">
#app {
    .progress.premium {
        left: 0;
        top: 0;
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: white;

        .icon {
            position: absolute;
            left: calc(50% - 50px / 2);
            bottom: calc(50% - 50px / 2);
        }
    }

    .profile-container {
        flex: 1 0 auto;

        .profile-content {
            flex: 1 0 auto;
            margin-left: 30px;

            .title-page.premium {
                margin-top: 0;
                margin-bottom: 20px;

                font-family: 'Inter-SemiBold', sans-serif;
                font-size: 32px;
                line-height: 122%;
            }

            .status {
                padding-bottom: 25px;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 18px;
                line-height: 122%;
                letter-spacing: 0.03em;
            }

            .text {
                max-width: 780px;
                margin-top: 25px;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 18px;
                line-height: 145%;
                letter-spacing: 0.02em;
            }

            .pricelist {
                margin-top: 30px;
                border-radius: 4px;
                padding: 0 30px;

                .item {
                    padding: 30px 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .period {
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 18px;
                        line-height: 122%;
                    }

                    .cost {
                        font-family: 'Inter-Regular', sans-serif;
                        font-size: 18px;
                        line-height: 122%;
                    }

                    .button {
                        margin: 0;

                        width: 204px;
                        height: 50px;
                    }
                }
            }
        }
    }
}

#app.dark {
    .progress.premium {
        background-color: #090914;
    }

    .profile-container {
        .profile-content {
            .status {
                border-bottom: 1px solid rgba(181, 181, 184, 0.5);;
            }

            .pricelist {
                background: #1A1A27;

                .item {
                    border-bottom: 1px solid rgba(181, 181, 184, 0.5);
                }

                .item:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>