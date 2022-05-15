<template>
    <div class="weeks">
        <div class="item">Неделя 1</div>
        <div class="spacer-week"></div>
        <div class="item">Неделя 2</div>
        <div class="spacer-week"></div>
        <div class="item">Неделя 3</div>
    </div>
</template>

<script>
export default {
    name: "ProgramWeeks"
}
</script>

<style lang="scss">
#app {
    .weeks {
        margin-top: 50px;
        width: 100%;
        height: 80px;
        border-radius: 4px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .spacer-week {
            flex: 0 0 1px;
            width: 1px;
            height: 50px;
        }

        .item {
            cursor: pointer;
            font-family: 'Inter-Medium', sans-serif;
            font-size: 24px;
            line-height: 180%;
        }

        .item:first-child {
            margin-left: 131px;
        }

        .item:last-child {
            margin-right: 131px;
        }
    }
}

#app.dark {
    .weeks {
        background: #1A1A27;

        .spacer-week {
            border-left: 1px solid #B5B5B8;
        }

        .item {
            color: #B5B5B8;
        }

        .item:hover {
            color: #9196FF;
        }
    }
}

</style>