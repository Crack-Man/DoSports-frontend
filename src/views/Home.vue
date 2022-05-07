<template>
    <div class="">
        <header-main/>
        <welcome-slider/>
        <advantages-slider/>
        <gid-slider/>
        <invite-slider/>
        <download-slider/>
        <articles-slider/>

        <footer-main/>
    </div>
</template>

<script>
import SliderWelcome from '@/components/SliderWelcome'
import SliderAdvantages from "@/components/SliderAdvantages";
import SliderGid from "@/components/SliderGid";
import SliderInviteBanner from "@/components/SliderInviteBanner";
import SliderDownloadApp from "@/components/SliderDownloadApp";
import SliderArticles from "@/components/SliderArticles";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
    name: 'Home',

    components: {
        "header-main": Header,
        "welcome-slider": SliderWelcome,

        "advantages-slider": SliderAdvantages,
        "gid-slider": SliderGid,
        'invite-slider': SliderInviteBanner,
        'download-slider': SliderDownloadApp,
        'articles-slider': SliderArticles,

        "footer-main": Footer,
    },
}
</script>
