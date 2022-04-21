<template>
    <div class="">
        <form-reg-vk/>
        <footer-main/>
    </div>
</template>

<script>
import FormRegistrationVk from "../components/FormRegistrationVk";
import Footer from "@/components/Footer";

export default {
    name: "RegistrationVk",
    components: {
        'form-reg-vk': FormRegistrationVk,
        "footer-main": Footer,
    }
}
</script>

<style scoped>

</style>