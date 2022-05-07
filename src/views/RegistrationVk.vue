<template>
    <div class="">
        <header-main/>
        <form-reg-vk/>
        <footer-main/>
    </div>
</template>

<script>
import FormRegistrationVk from "../components/FormRegistrationVk";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
    name: "RegistrationVk",
    components: {
        "header-main": Header,
        'form-reg-vk': FormRegistrationVk,
        "footer-main": Footer,
    }
}
</script>

<style scoped>

</style>