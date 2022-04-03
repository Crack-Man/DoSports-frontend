<template>
    <div class="">
        <welcome-slider/>
        <v-container>
            <advantages-slider/>
        </v-container>
    </div>
</template>

<script>
import WelcomeSlider from '@/components/WelcomeSlider'
import AdvantagesSlider from "@/components/AdvantagesSlider";

export default {
    name: 'Home',

    components: {
        "welcome-slider": WelcomeSlider,
        "advantages-slider": AdvantagesSlider,
    },
}
</script>
