<template>
    <v-dialog
        v-model="visible"
        persistent
        content-class="popup-education--content"
        dark
    >
        <v-card>
            <v-btn
                icon
                dark
                class="close"
                @click="closePopup"
            >
                <img
                    :src="require('../assets/img/png/close.png')"
                />
            </v-btn>
            <popup-education-content :content="content"/>
        </v-card>
    </v-dialog>
</template>

<script>
import PopupEducationContent from "@/components/PopupEducationContent";

export default {
    name: "PopupEducation",

    components: {
        PopupEducationContent
    },

    props: ['visible'],

    data: () => ({
        popupVisible: false,
        idPage: 0,
        contentList: [
            {
                id: 0,
                page: "01/08",
                title: "Основная информация на день",
                text: "На этой странице вы узнаете, какое количество белков, жиров, углеводов, клетчатки и калорий вам необходимо употреблять за день.",
                img: [
                    {
                        src: require('@/assets/img/png/screen-education-foods--2-1.png'),
                        alt: "Пункт меню «Спортивная программа», в котором находится составленная программа на 3 недели"
                    }
                ],
            }
        ]
    }),

    computed: {
        content() {
            return this.contentList.find(obj => obj.id === this.idPage);
        }
    },

    methods: {
        closePopup() {
            this.$emit("close");
        }
    }
}
</script>

<style lang="scss">
#app {
    .popup-education--content {
        width: 473px;
    }
}
</style>