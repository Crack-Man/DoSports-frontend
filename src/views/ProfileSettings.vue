<template>
    <div class="">
        <div class="progress-main" v-if="this.progress">
        </div>
        <div v-else>
            <header-main/>
            <error-405 v-if="!userIsAuthorized"></error-405>
            <v-container class="banned-low-screen" v-else-if="!isPhone">
                <banner class="profile-banner" type="premium" :image="require('@/assets/img/png/banner-join-2.png')"/>
                <div class="profile-container">
                    <profile-sidebar active-page="3"/>
                    <div class="forms">
                        <form-personal-data/>
                        <form-change-password/>
                    </div>
                </div>
            </v-container>
            <popup-baned-mobile v-else/>
            <popup-baned-low-screen/>
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
import FormPersonalData from "@/components/FormPersonalData";
import FormChangePassword from "@/components/FormChangePassword";
import PopupBanedLowScreen from "@/components/PopupBanedLowScreen";
import PopupBanedMobile from "@/components/PopupBanedMobile";

export default {
    name: "ProfileSettings",

    components: {
        "header-main": Header,
        "error-405": Error405,
        "banner": Banner,
        "profile-sidebar": ProfileSidebar,
        "form-personal-data": FormPersonalData,
        "form-change-password": FormChangePassword,
        "footer-main": Footer,
        "popup-baned-low-screen": PopupBanedLowScreen,
        "popup-baned-mobile": PopupBanedMobile,
    },

    data: () => ({
        progress: true
    }),

    computed: {
        ...mapGetters(["userIsAuthorized", "isPhone"]),
    },

    mounted() {
        if (this.userIsAuthorized) {
            this.progress = false;
        }
    }
}
</script>

<style lang="scss">

#app {
    .forms {
        margin-left: 30px;
    }
}

</style>