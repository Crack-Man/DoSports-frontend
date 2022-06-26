<template>
    <div class="">
        <header-main/>
        <v-container class="banned-low-screen" v-if="!isPhone">
            <form-auth></form-auth>
        </v-container>
        <popup-baned-mobile v-else/>
        <popup-baned-low-screen/>
        <footer-main/>
    </div>
</template>

<script>
import FormAuthorization from '@/components/FormAuthorization.vue'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PopupBanedLowScreen from "@/components/PopupBanedLowScreen";
import PopupBanedMobile from "@/components/PopupBanedMobile";
import {mapGetters} from "vuex";
export default {
    name: "Authorization",
    components: {
        "header-main": Header,
        'form-auth': FormAuthorization,
        "footer-main": Footer,
        "popup-baned-low-screen": PopupBanedLowScreen,
        "popup-baned-mobile": PopupBanedMobile,
    },

    computed: {
        ...mapGetters(["isPhone"]),
    }
}
</script>

<style scoped>

</style>