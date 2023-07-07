// 时间组件
<template>
    <div class="timeContainer">
        <div class="bg">
            <img :src="weekImg" alt="" />
        </div>
        <div class="time">
            {{ currentTime }}
        </div>
        <div class="calendar">
            <div class="day">
                {{ currentDay }}
            </div>
            <div class="month">
                {{ currentMonth }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Time',
    data() {
        return {
            weekImg: '',
            currentTime: '',
            currentDay: '',
            currentMonth: '',
        };
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
        this.getWeekImg();
        this.getCurrentDate()
        this.getMonthName()
    },
    methods: {
        updateTime() {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, '0'); // 将小时数转化为字符串并补全前导零
            const minutes = String(date.getMinutes()).padStart(2, '0'); // 将分钟数转化为字符串并补全前导零
            this.currentTime = `${hours}:${minutes}`;
        },
        getWeekImg() {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const currentDate = new Date();
            const currentDay = days[currentDate.getDay()];
            const currentWeek = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);
            this.weekImg = require(`@/assets/weekSvg/${currentWeek}.svg`)
        },
        getCurrentDate() {
            const date = new Date();
            const day = date.getDate();
            this.currentDay = day;
        },
        getMonthName() {
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];
            const currentDate = new Date();
            const currentMonthIndex = currentDate.getMonth();
            this.currentMonth =
                    months[currentMonthIndex].charAt(0).toUpperCase() + months[currentMonthIndex].slice(1);
        },
    },
};
</script>
<style scoped lang="less">
    .timeContainer {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #fff;
        font-weight: 100;
        width: 238px;
        .bg {
            position: absolute;
            width: 80%;
            height: 100%;
            opacity: 0.4;
            left: 50%;
            transform: translateX(-50%);
            top: 63px;
            img{
                width: 100%;
                height: 100%;
            }
        }

        .time {
            font-size: 44px;
        }
        .calendar {
            display: flex;
            justify-content: center;
            .day {
                margin-right: 20px;
            }
            .month {
                letter-spacing: 2px;
            }
        }
    }
</style>
