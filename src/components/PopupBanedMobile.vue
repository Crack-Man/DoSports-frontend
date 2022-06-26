<template>
    <div class="">
        <v-overlay class="overlay--baned-mobile">
            <v-dialog
                v-model="permanent"
                persistent
                hide-overlay
                content-class="popup--baned-mobile"
                dark
            >
                <v-card>
                    <v-card-text>
                        <div class="popup-title">Слишком маленький размер экрана</div>
                        <div class="popup-text">
                            Данную страницу можно просматривать только с компьютера. Пожалуйста, увеличьте размер окна или смените устройство.
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            class="button"
                            @click="closePopup"
                        >Понятно</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-overlay>
    </div>
</template>

<script>
export default {
    name: "PopupBanedLowScreen",

    data: () => ({
        permanent: true
    }),

    methods: {
        closePopup() {
            document.querySelector(".overlay--baned-low-screen").style.display = "none";
            document.querySelector(".popup--baned-low-screen").style.display = "none";
            document.querySelector(".overlay--baned-mobile").style.display = "none";
            document.querySelector(".popup--baned-mobile").style.display = "none";
        }
    }
}
</script>

<style lang="scss">

#app.dark {
    .popup--baned-mobile {
        .popup-text {
            margin-top: 25px;
            font-size: 16px;
        }
    }
}

#app.dark {
    .popup--baned-mobile {
        div {
            color: white;
        }
    }
}
</style>