<template>
    <div class="">
        <header-main/>
        <div v-if="!userIsAuthorized">
            <v-container class="banned-low-screen" v-if="!isPhone">
                <title-page name="Регистрация"></title-page>
                <div class="page-content">
                    <form-reg/>
                    <explanation :texts="this.explanation"/>
                </div>
            </v-container>
            <popup-baned-mobile v-else/>
            <popup-baned-low-screen/>
            <footer-main/>
        </div>
        <v-container v-else>
            <error-405></error-405>
        </v-container>
    </div>
</template>

<script>
import FormRegistration from '../components/FormRegistration.vue';
import Title from "@/components/Title";
import Explanation from "@/components/Explanation";
import Error405 from "@/components/Error405";
import {mapGetters} from "vuex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PopupBanedLowScreen from "@/components/PopupBanedLowScreen";
import PopupBanedMobile from "@/components/PopupBanedMobile";

export default {
    name: "Registration",
    components: {
        "header-main": Header,
        'form-reg': FormRegistration,
        'title-page': Title,
        'explanation': Explanation,
        "error-405": Error405,
        "footer-main": Footer,
        "popup-baned-low-screen": PopupBanedLowScreen,
        "popup-baned-mobile": PopupBanedMobile,
    },

    data: () => ({
        explanation: [{
            text:
                "На указанную в форме почту придёт сообщение \n" +
                "с подтверждением регистрации.\n" +
                "\n" +
                "В случае если этого не произошло, \n" +
                "попробуйте зайти в папку \"спам\"."
        }]
    }),

    computed: {
        ...mapGetters(['userIsAuthorized', "isPhone"]),
    },
}
</script>

<style lang="scss">
#app {
    .page-content {
        display: flex;
        align-items: flex-start;
    }

    .explanation {
        margin-top: 25px;
    }
}
</style>