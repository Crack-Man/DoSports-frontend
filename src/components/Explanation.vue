<template>
    <div class="container-explanation">
        <div :class="item.class ? 'explanation ' + item.class : 'explanation'" v-for="(item, index) in texts" :key="index">
            <div class="border"></div>
            <div class="text">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Explanation",
    props: ["texts"],
}
</script>

<style lang="scss">
#app {
    .container-explanation {
        margin-left: 30px;
        flex: 0 1 auto;

        .explanation {
            .border {
                border-radius: 4px;
            }

            display: flex;

            .text {
                margin-left: 15px;

                font-family: "Inter-Regular", sans-serif;
                font-size: 18px;
                line-height: 140%;
                white-space: pre-line;

                @media (max-width: 700px) {
                    margin-left: 10px;
                }
            }
        }
    }
}

#app.dark {
    .explanation {
        .border {
            border-left: 2px solid #9196FF;
        }
    }
}
</style>