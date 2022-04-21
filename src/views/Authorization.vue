<template>
    <div class="">
        <v-container>
            <form-auth></form-auth>
        </v-container>
        <footer-main/>
    </div>
</template>

<script>
import FormAuthorization from '@/components/FormAuthorization.vue'
import Footer from "@/components/Footer";
export default {
    name: "Authorization",
    components: {
        'form-auth': FormAuthorization,
        "footer-main": Footer,
    }
}
</script>

<style scoped>

</style>