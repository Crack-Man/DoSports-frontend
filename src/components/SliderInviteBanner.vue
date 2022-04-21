<template>
    <div class="invite-slider">
        <banner :image="require('@/assets/img/png/banner-main.png')"/>
    </div>
</template>

<script>
import Banner from "@/components/Banner";

export default {
    name: "SliderInviteBanner",
    components: {
        'banner': Banner
    }
}
</script>

<style lang="scss">
#app {
    .invite-slider {
        padding: 160px 0 365px 0;
    }
}
</style>