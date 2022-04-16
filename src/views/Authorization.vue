<template>
    <v-container class="">
        <title-page name="Авторизация"></title-page>
        <form-auth></form-auth>
    </v-container>
</template>

<script>
import FormAuthorization from '@/components/FormAuthorization.vue'
import Title from "@/components/Title";
export default {
    name: "Authorization",
    components: {
        'form-auth': FormAuthorization,
        'title-page': Title
    }
}
</script>

<style scoped>

</style>