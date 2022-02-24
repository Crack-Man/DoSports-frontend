<template>
    <div>
        <v-form>
            <v-text-field
                label="Рост (см)"
                type="number"
            >
            </v-text-field>
            <v-text-field
                label="Вес (кг)"
                type="number"
            >
            </v-text-field>
            <v-select
                :items="items"
                label="Образ жизни"
            ></v-select>
            <p>Уровень подготовленности к тренировкам</p>
            <v-radio-group>
                <v-radio
                    label="Новичок (Вы - начинающий. Вы не знаете, какое количество тренировок в неделю вам необходимо. Система посчитает это за вас)"
                ></v-radio>
                <v-radio
                    label="Профессионал (Вы знаете, сколько тренировок вам необходимо в неделю. Система предоставит возможность создавать любое их количество)"
                ></v-radio>
            </v-radio-group>
            <p>Цель программы</p>
            <v-radio-group>
                <v-radio
                    label="Поддержание веса"
                ></v-radio>
                <v-radio
                    label="Сброс веса"
                ></v-radio>
                <v-radio
                    label="Набор веса"
                ></v-radio>
            </v-radio-group>
            <v-checkbox
                label="Я прочитал и согласен с условиями пользовательского соглашения"
            ></v-checkbox>
            <v-btn
                color="primary"

            >Отправить</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "TestForm",
    data: () => ({
        items: ["1", "2", "3"]
    })
}
</script>

<style scoped>

</style>