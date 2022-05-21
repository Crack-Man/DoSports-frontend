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
                    <profile-sidebar active-page="0"/>
                    <profile-base-content/>
                </div>
            </v-container>
            <footer-main/>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Error405 from "@/components/Error405";
import Footer from "@/components/Footer";
import {mapGetters} from "vuex";
import Banner from "@/components/Banner";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileBaseContent from "@/components/ProfileBaseContent";

export default {
    name: "ProfileBase",

    components: {
        "header-main": Header,
        "error-405": Error405,
        "banner": Banner,
        "profile-sidebar": ProfileSidebar,
        "profile-base-content": ProfileBaseContent,
        "footer-main": Footer,
    },

    data: () => ({
        progress: true
    }),

    computed: {
        ...mapGetters(["userIsAuthorized"]),
    },

    mounted() {
        if (this.userIsAuthorized) {
            this.progress = false;
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/profile.scss";

</style>