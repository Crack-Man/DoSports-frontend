<template>
    <div>
        <test-form></test-form>
        <footer-main/>
    </div>
</template>

<script>
import TestForm from "@/components/TestForm";
import Footer from "@/components/Footer";

export default {
    name: "StartProgram",
    components: {
        "test-form": TestForm,
        "footer-main": Footer,
    }
}
</script>

<style scoped>

</style>