<template>
    <div class="profile-base-content">
        <div class="avatar-container">
            <div class="avatar null">
                <img class="null" :src="require('@/assets/img/png/profile-avatar--null.png')">
            </div>
            <div class="change">
                <span>Изменить</span>
            </div>
        </div>
        <div class="profile-info">
            <div class="full-name"> {{ userData.fullname }} </div>
            <div class="status" v-if="this.userIsPro">Cтатус подписки: премиум (действителен до {{ proLastDatetime }})</div>
            <div class="status" v-else>Cтатус подписки: стандартный</div>
            <div class="profile-data">Почта: {{ userData.email }}</div>
            <div class="profile-data">Дата рождения: {{ birthday }}</div>
            <div class="profile-data">Регион проживания: {{ userData.region_name }}</div>
            <div class="program-data" v-if="this.programData">
                <div class="spacer-profile"></div>
                <div class="bmi">Индекс массы тела - {{ this.programData.bmi }}</div>
                <div class="profile-group-data">
                    <div class="profile-data">Вес (кг): {{ programData.weight }}</div>
                    <div class="profile-data height">Рост (см): {{ programData.height }}</div>
                </div>
                <div class="profile-data">Образ жизни: {{ nameLifestyle }}</div>
                <div class="profile-data">Уровень подготовки: {{ trainPrepare }}</div>
                <div class="profile-data">Цель программы: {{ aim }}</div>
            </div>
            <div class="spacer-profile"></div>
            <div class="explain personal-data">Если хотите изменить личный данные или поменять пароль, перейдите в пункт «Настройки».</div>
            <div class="explain program-parameters">В случае если хотите поменять параметры программы, перейдите в раздел спортивная программа и сбросьте её.</div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProfileBaseContent",

    components: {
    },

    data: () => ({
        avatar: ""
    }),

    computed: {
        ...mapGetters(["userData", "activeProgramStatus", "userIsAuthorized", "programData", "userIsPro"]),

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

        birthday() {
            if (this.userData) {
                let array = this.userData.birthday.split("-");
                return `${array[2]}.${array[1]}.${array[0]}`;
            }
            return "";
        },

        nameLifestyle() {
            if (this.programData.name_lifestyle) {
                return this.programData.name_lifestyle.toLowerCase();
            }
            return "";
        },

        trainPrepare() {
            if (this.programData.train_prepare === 1) {
                return "профессионал";
            }
            return "новичок";
        },

        aim() {
            if (this.programData.aim === 0) {
                return "поддержание веса"
            }
            if (this.programData.aim === 1) {
                return "сброс веса"
            }
            return "набор веса"
        }
    },



    methods: {
        ...mapActions(["showProgram"]),
    },

    mounted() {
        this.showProgram(this.userData);
    }
}
</script>

<style lang="scss">

#app {
    .profile-base-content {
        display: flex;
        align-items: flex-start;
        margin-left: 30px;
        flex: 1 1 auto;

        .avatar-container {

            .avatar {
                display: flex;
                align-items: center;
                width: 160px;
                height: 160px;
                border-radius: 80px;

                //#filepond--browser

                img.null {
                    width: 33px;
                    margin: auto;
                }
            }

            .change {
                display: flex;
                justify-content: center;
                margin-top: 10px;

                span {
                    display: inline-block;
                    cursor: pointer;
                    margin: auto;
                    font-family: 'Inter-Medium', sans-serif;
                    font-size: 14px;
                    line-height: 140%;
                    text-decoration-line: underline;
                }
            }
        }

        .profile-info {
            flex: 1 1 auto;
            margin-left: 30px;

            .full-name {
                font-family: 'Inter-SemiBold', sans-serif;
                font-size: 24px;
                line-height: 121%;

                @media (max-width: 1263px) {
                    font-size: 20px;
                }
            }

            .status {
                margin-top: 15px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 140%;

                @media (max-width: 1263px) {
                    font-size: 14px;
                }
            }

            .profile-data {
                margin-top: 10px;
                font-family: 'Inter-Medium', sans-serif;
                font-size: 18px;
                line-height: 140%;

                @media (max-width: 1263px) {
                    font-size: 14px;
                }
            }

            .spacer-profile {
                width: 100%;
                height: 1px;
                margin: 25px 0;
            }

            .bmi {
                font-family: 'Inter-SemiBold', sans-serif;
                font-size: 24px;
                line-height: 121%;

                @media (max-width: 1263px) {
                    font-size: 20px;
                }
            }

            .profile-group-data {
                display: flex;
                margin-top: 15px;

                .profile-data {
                    margin-top: 0;
                }

                .profile-data.height {
                    margin-left: 30px;
                }
            }

            .explain {
                margin-top: 15px;
                font-family: 'Inter-Regular', sans-serif;
                font-size: 18px;
                line-height: 140%;

                @media (max-width: 1263px) {
                    font-size: 14px;
                }
            }

            .explain.personal-data {
                width: 550px;

                @media (max-width: 1263px) {
                    width: 420px;
                }
            }

            .explain.program-parameters {
                width: 520px;

                @media (max-width: 1263px) {
                    width: 420px;
                }
            }
        }
    }
}

#app.dark {
    .profile-base-content {
        .avatar-container {
            .avatar.null {
                background: #1A1A27;
            }
        }

        .spacer-profile {
            border-top: 1px solid #B5B5B8;
        }

        .explain {
            color: #B5B5B8;
        }
    }
}

</style>