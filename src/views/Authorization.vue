<template>
    <div class="">
        <header-main/>
        <v-container>
            <form-auth></form-auth>
        </v-container>
        <footer-main/>
    </div>
</template>

<script>
import FormAuthorization from '@/components/FormAuthorization.vue'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
    name: "Authorization",
    components: {
        "header-main": Header,
        'form-auth': FormAuthorization,
        "footer-main": Footer,
    }
}
</script>

<style scoped>

</style>