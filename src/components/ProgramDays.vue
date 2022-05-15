<template>
    <div class="days">
        <div class="item">День 1</div>
        <div class="spacer-days"></div>
        <div class="item">День 2</div>
        <div class="spacer-days"></div>
        <div class="item">День 3</div>
        <div class="spacer-days"></div>
        <div class="item">День 4</div>
        <div class="spacer-days"></div>
        <div class="item">День 5</div>
        <div class="spacer-days"></div>
        <div class="item">День 6</div>
        <div class="spacer-days"></div>
        <div class="item">День 7</div>
    </div>
</template>

<script>
export default {
    name: "ProgramDays"
}
</script>

<style lang="scss">
#app {
    .days {
        margin-top: 25px;
        width: 100%;
        height: 50px;
        border-radius: 4px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .spacer-days {
            flex: 0 0 1px;
            width: 1px;
            height: 25px;
        }

        .item {
            cursor: pointer;
            font-family: 'Inter-Medium', sans-serif;
            font-size: 16px;
            line-height: 180%;
        }

        .item:first-child {
            margin-left: 52px;
        }

        .item:last-child {
            margin-right: 52px;
        }
    }
}

#app.dark {
    .days {
        background: #1A1A27;

        .spacer-days {
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