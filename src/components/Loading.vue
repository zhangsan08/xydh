<template>
    <div class="navLoader">
        <div class="face">
            <div class="circle"></div>
        </div>
        <div class="face">
            <div class="circle"></div>
        </div>
    </div>
</template>

<style scoped>
    .navLoader {
        margin: 0 auto;
        width: 17em;
        height: 17em;
        font-size: 10px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /*
    .navLoader .face {
        position: absolute;
        border-radius: 50%;
        border-style: solid;
        animation: animate 3s linear infinite;
    } */

    .navLoader .face:nth-child(1) {
        width: 100%;
        height: 100%;
        color: gold;
        border-color: currentColor transparent transparent currentColor;
        border-width: 0.2em 0.2em 0em 0em;
        --deg: -45deg;
        position: absolute;
        border-radius: 50%;
        border-style: solid;
        animation: rotate-clockwise 3s linear infinite;
    }

    .navLoader .face:nth-child(2) {
        width: 70%;
        height: 70%;
        color: lime;
        border-color: currentColor currentColor transparent transparent;
        border-width: 0.2em 0em 0em 0.2em;
        --deg: -135deg;
        position: absolute;
        border-radius: 50%;
        border-style: solid;
        animation: rotate-counterclockwise 3s linear infinite;
    }

    .navLoader .face .circle {
        position: absolute;
        width: 50%;
        height: 0.1em;
        top: 50%;
        left: 50%;
        background-color: transparent;
        transform: rotate(var(--deg));
        transform-origin: left;
    }

    .navLoader .face .circle::before {
        position: absolute;
        top: -0.5em;
        right: -0.5em;
        content: '';
        width: 1em;
        height: 1em;
        background-color: currentColor;
        border-radius: 50%;
        box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em, 0 0 0 0.5em rgba(255, 255, 0, 0.1);
    }

    /* 正时针旋转动画 */
    @keyframes rotate-clockwise {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* 逆时针旋转动画 */
    @keyframes rotate-counterclockwise {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
</style>
