<template>
    <div>
        <header-main/>
        <test-form></test-form>
        <footer-main/>
    </div>
</template>

<script>
import TestForm from "@/components/TestForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
    name: "StartProgram",
    components: {
        "header-main": Header,
        "test-form": TestForm,
        "footer-main": Footer,
    }
}
</script>

<style scoped>

</style>