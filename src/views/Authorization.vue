<template>
    <div class="">
        <form-auth></form-auth>
    </div>
</template>

<script>
import FormAuthorization from '@/components/FormAuthorization.vue'

export default {
    name: "Authorization",
    components: {
        'form-auth': FormAuthorization,
    }
}
</script>

<style scoped>

</style>