<template>
    <div>
        <header-main/>
        <v-container v-if="userIsAdmin">
            <div class="admin-container">
                <admin-sidebar active-page="0"/>
                <div class="admin-content">
                    <title-page name="Пользователи"/>
                    <admin-user-list/>
                </div>
            </div>
        </v-container>
        <error-405 v-else/>
        <footer-main/>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Error405 from "@/components/Error405";
import Footer from "@/components/Footer";
import {mapGetters} from "vuex";
import Title from "@/components/Title";
import AdminSidebar from "@/components/AdminSidebar";
import AdminUserList from "@/components/AdminUserList";

export default {
    name: "AdminUsers",

    components: {
        "header-main": Header,
        "admin-sidebar": AdminSidebar,
        "admin-user-list": AdminUserList,
        "title-page": Title,
        "error-405": Error405,
        "footer-main": Footer,
    },

    computed: {
        ...mapGetters(["userIsAdmin"]),
    }
}
</script>

<style lang="scss">
#app {
    .admin-container {
        margin-top: 50px;
        display: flex;
        align-items: flex-start;

        .title-page {
            margin-top: 0;
            font-family: 'Inter-SemiBold', sans-serif;
            font-size: 32px;
            line-height: 122%;
        }

        .admin-content {
            margin-left: 30px;
            flex: 1 1 auto;
        }
    }
}

</style>