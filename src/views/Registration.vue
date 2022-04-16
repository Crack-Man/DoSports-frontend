<template>
    <div class="">
        <v-container v-if="!userIsAuthorized">
            <title-page name="Регистрация"></title-page>
            <div class="page-content">
                <form-reg/>
                <explanation :text="this.explanation"/>
            </div>
        </v-container>
        <v-container v-else>
            <error-405></error-405>
        </v-container>
    </div>
</template>

<script>
import FormRegistration from '../components/FormRegistration.vue';
import Title from "@/components/Title";
import Explanation from "@/components/Explanation";
import Error405 from "@/components/Error405";
import {mapGetters} from "vuex";

export default {
    name: "Registration",
    components: {
        'form-reg': FormRegistration,
        'title-page': Title,
        'explanation': Explanation,
        "error-405": Error405
    },

    data: () => ({
        explanation: "На указанную в форме почту придёт сообщение \n" +
            "с подтверждением регистрации.\n" +
            "\n" +
            "В случае если этого не произошло, \n" +
            "попробуйте зайти в папку \"спам\"."
    }),

    computed: {
        ...mapGetters(['userIsAuthorized']),
    },
}
</script>

<style lang="scss">
#app {
    .page-content {
        display: flex;
        align-items: flex-start;
    }

    .explanation {
        margin-top: 25px;
    }
}
</style>