<template>
    <div class="explanation">
        <div class="border"></div>
        <div class="text">
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Explanation",
    props: ["text"],
}
</script>

<style lang="scss">
#app {
    .explanation {
        .border {
            border-radius: 4px;
        }

        display: flex;
        flex: 0 0 auto;
        margin-left: 30px;

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

#app.dark {
    .explanation {
        .border {
            border-left: 2px solid #9196FF;
        }
    }
}
</style>