<template>
    <div class="">
        <div class="progress-main" v-if="this.progress">
        </div>
        <div v-else>
            <header-main/>
            <error-405 v-if="!userIsAuthorized"></error-405>
            <v-container v-else>
                <banner class="profile-banner" type="premium" :image="require('@/assets/img/png/banner-join-2.png')"/>
                <div class="profile-container">
                    <profile-sidebar active-page="1"/>
                    <div class="graphs">
                        <div class="stat-menu">
                            <div class="item" v-for="(stat, index) in menu" :key="index">
                                <span @click="selectedStat = index"
                                      :class="selectedStat === index ? 'active' : ''">{{ stat.name }}</span>
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 0">
                            <div class="name">
                                Вес (кг)
                            </div>
                            <chart :chart-data="datasets.weight" v-if="datasets.weight.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 1">
                            <div class="name">
                                Обхват груди (см)
                            </div>
                            <chart :chart-data="datasets.bust" v-if="datasets.bust.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 2">
                            <div class="name">
                                Обхват талии (см)
                            </div>
                            <chart :chart-data="datasets.waist" v-if="datasets.waist.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 3">
                            <div class="name">
                                Обхват бедер (см)
                            </div>
                            <chart :chart-data="datasets.hip" v-if="datasets.hip.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 4">
                            <div class="name">
                                Обхват бицепса (см)
                            </div>
                            <chart :chart-data="datasets.bicep" v-if="datasets.bicep.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 5">
                            <div class="name">
                                Обхват голени (см)
                            </div>
                            <chart :chart-data="datasets.shin" v-if="datasets.shin.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
                            </div>
                        </div>
                        <div class="stat-area" v-if="selectedStat === 6">
                            <div class="name">
                                Обхват шеи (см)
                            </div>
                            <chart :chart-data="datasets.neck" v-if="datasets.neck.labels.length >= 3"/>
                            <div class="empty" v-else>
                                {{ textEmpty }}
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
import {mapGetters} from "vuex";
import Chart from "@/components/Chart";
import axios from "axios";
import url from "../services/url";

export default {
    name: "ProfileSettings",

    components: {
        "header-main": Header,
        "error-405": Error405,
        "banner": Banner,
        "profile-sidebar": ProfileSidebar,
        "chart": Chart,
        "footer-main": Footer,
    },

    data: () => ({
        progress: true,

        diary: [],

        menu: [
            {name: "Вес"},
            {name: "Грудь"},
            {name: "Талия"},
            {name: "Бедра"},
            {name: "Бицепс"},
            {name: "Голень"},
            {name: "Шея"},
        ],

        selectedStat: 0,

        textEmpty: "Для вывода графика необходимо заполнить дневник в спортивной программе как минимум на три дня."
    }),

    computed: {
        ...mapGetters(["userIsAuthorized", "userData"]),

        datasets() {
            let obj = {
                weight: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Вес (кг)',
                            data: []
                        }
                    ]
                },
                bust: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Обхват груди (см)',
                            data: []
                        }
                    ]
                },
                hip: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Обхват бедер (см)',
                            data: []
                        }
                    ]
                },
                waist: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Обхват талии (см)',
                            data: []
                        }
                    ]
                },
                bicep: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Обхват бицепса (см)',
                            data: []
                        }
                    ]
                },
                shin: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Обхват голени (см)',
                            data: []
                        }
                    ]
                },
                neck: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Обхват шеи (см)',
                            data: []
                        }
                    ]
                }
            };
            if (this.diary.length) {
                for (let key in obj) {
                    obj[key].datasets[0].backgroundColor = '#9196FF';
                    obj[key].datasets[0].borderColor = '#9196FF';
                }
                for (let i = 0; i < this.diary.length; i++) {
                    obj.weight.datasets[0].data.push(this.diary[i].weight);
                    obj.weight.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));

                    if (this.diary[i].bust) {
                        obj.bust.datasets[0].data.push(this.diary[i].bust);
                        obj.bust.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));
                    }
                    if (this.diary[i].hip) {
                        obj.hip.datasets[0].data.push(this.diary[i].hip);
                        obj.hip.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));
                    }
                    if (this.diary[i].waist) {
                        obj.waist.datasets[0].data.push(this.diary[i].waist);
                        obj.waist.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));
                    }
                    if (this.diary[i].bicep) {
                        obj.bicep.datasets[0].data.push(this.diary[i].bicep);
                        obj.bicep.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));
                    }
                    if (this.diary[i].shin) {
                        obj.shin.datasets[0].data.push(this.diary[i].shin);
                        obj.shin.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));
                    }
                    if (this.diary[i].neck) {
                        obj.neck.datasets[0].data.push(this.diary[i].neck);
                        obj.neck.labels.push(this.formatDate(this.diary[i].date.split("T")[0]));
                    }
                }
            }
            return obj;
        },
    },

    methods: {
        async getDiary() {
            this.progress = true;
            await axios.post(`${url}/api/programs/get-user-diary`, this.userData).then((res) => {
                if (res.data.name === "Success") {
                    this.diary = res.data.diary;
                }
                this.progress = false;
            })
        },

        formatDate(date) {
            if (!date) return null;

            // eslint-disable-next-line no-unused-vars
            const [year, month, day] = date.split('-');
            return `${day}.${month}`;
        },
    },

    mounted() {
        if (this.userIsAuthorized) {
            this.getDiary()
        }
    }
}
</script>

<style lang="scss">

#app {
    .graphs {
        margin-left: 30px;
        flex: 1 1 auto;

        .stat-menu {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            border-radius: 2px;

            .item {
                flex: 1 0 auto;
                height: 25px;
                display: flex;
                justify-content: center;

                span {
                    position: relative;
                    bottom: 2px;
                    cursor: pointer;
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 16px;
                    line-height: 180%;
                }
            }
        }

        .stat-area {
            margin-top: 25px;

            .name {
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 180%;
            }

            .empty {
                margin-top: 10px;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 14px;
                line-height: 145%;
            }
        }
    }
}

#app.dark {
    .graphs {
        .stat-menu {
            background: #1A1A27;

            .item {
                border-left: 1px solid #B5B5B8;;

                span {
                    color: #B5B5B8;
                }

                span.active {
                    color: #9196FF;
                }
            }

            .item:first-child {
                border-left: none;
            }
        }
    }
}

</style>