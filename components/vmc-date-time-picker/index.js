import moment from 'moment';

Component({
    properties: {
        headerText: String,
        disabled: {
            type: Boolean,
            value: false
        },
        dateTimeRange: {
            type: Array,
            value: []
        },
        value: {
            type: String,
            value: ''
        }
    },
    timer: null,
    data: {
        range: [],
        rangeKey: '',
        rangeValue: []
    },
    lifetimes: {
        attached: function () {
            this.init();
        },
        moved: function () {
        },
        detached: function () {
        },
    },
    methods: {
        /**
         * 取消选择事件
         * @param e
         */
        bindCancel: function (e) {
            this.makeRange(this.data.value);
        },
        /**
         * 确定选择事件
         * @param e
         */
        bindChange: function (e) {
            this.triggerEvent('change', {
                value: this.rangeValueToString(this.data.rangeValue)
            });
        },
        /**
         * 列变化事件
         * @param e
         */
        bindColumnChange: function (e) {
            clearTimeout(this.timer);
            let value = [...this.data.rangeValue];
            for (let i = 0; i < value.length; i++) {
                if (i === e.detail.column) {
                    value[i] = e.detail.value;
                } else if (i > e.detail.column) {
                    value[i] = 0;
                }
            }
            this.timer = setTimeout(() => {
                this.makeRange(this.rangeValueToString(value));
            }, 100);
        },
        /**
         * 初始化
         */
        init() {
            this.makeRange(this.data.value);
        },
        /**
         * 生成范围列表
         * @param {string} dateString 当前日期
         */
        makeRange: function (dateString) {
            // 当前年份
            let currentYear = moment().year();

            // 选中日期
            let defaultDateTime = moment()
                .set('hour', 0)
                .set('minute', 0)
                .set('second', 0);
            let valueDateTime = defaultDateTime;
            if (dateString) {
                valueDateTime = moment(dateString);
                valueDateTime = valueDateTime.isValid() ? valueDateTime : defaultDateTime;
            }

            // 定义范围
            let years = this.makeList(currentYear - 100, currentYear + 100, '年', 4);
            let months = this.makeList(1, 12, '月', 2);
            let days = this.makeList(1, this.getMonthDays(valueDateTime), '日', 2);
            let hours = this.makeList(0, 23, '时', 2);
            let minutes = this.makeList(0, 59, '分', 2);
            let seconds = this.makeList(0, 59, '秒', 2);

            // 如果指定日期范围
            if (Array.isArray(this.data.dateTimeRange) && this.data.dateTimeRange.length === 2) {
                let minDateTime = moment(this.data.dateTimeRange[0]);
                let maxDateTime = moment(this.data.dateTimeRange[1]);

                if (minDateTime.isValid() && maxDateTime.isValid()) {

                    let min = moment.min(minDateTime, maxDateTime);
                    let max = moment.max(minDateTime, maxDateTime);

                    valueDateTime = moment.max(moment(valueDateTime), moment(min));
                    valueDateTime = moment.min(valueDateTime, moment(max));

                    console.log(valueDateTime);

                    years = this.makeList(min.year(), max.year(), '年', 4);
                    months = this.makeMonthList(min, max, valueDateTime);
                    days = this.makeDayList(min, max, valueDateTime);
                    hours = this.makeHourList(min, max, valueDateTime);
                    minutes = this.makeMinuteList(min, max, valueDateTime);
                    seconds = this.makeSecondList(min, max, valueDateTime);
                }
            }

            // 渲染
            this.setData({
                range: [
                    years,
                    months,
                    days,
                    hours,
                    minutes,
                    seconds
                ]
            }, () => {
                this.setRangeValue(valueDateTime);
            });
        },
        /**
         * 获取范围内月份数组
         * @param {Moment} min - 最小日期
         * @param {Moment} max - 最大日期
         * @param {Moment} value - 选中日期
         * @return {*[]}
         */
        makeMonthList: function (min, max, value) {
            let months = this.makeList(1, 12, '月', 2);
            if (min.year() === max.year()) {
                months = [];
                for (let i = min.month() + 1; i <= (max.month() + 1); i++) {
                    months.push((i + '').padStart(2, '0') + '月');
                }
            } else {
                if (value.year() === min.year()) {
                    months = [];
                    for (let i = min.month() + 1; i <= 12; i++) {
                        months.push((i + '').padStart(2, '0') + '月');
                    }
                } else if (value.year() === max.year()) {
                    months = [];
                    for (let i = 1; i <= (max.month() + 1); i++) {
                        months.push((i + '').padStart(2, '0') + '月');
                    }
                }
            }
            return months;
        },
        /**
         * 获取范围内日数组
         * @param {Moment} min - 最小日期
         * @param {Moment} max - 最大日期
         * @param {Moment} value - 选中日期
         * @return {*[]}
         */
        makeDayList: function (min, max, value) {
            // 选中月份的天数
            let daysLen = this.getMonthDays(value);

            let days = this.makeList(1, daysLen, '日', 2);

            if (min.year() === max.year() && min.month() === max.month()) {
                days = [];
                for (let i = min.date(); i <= max.date(); i++) {
                    days.push((i + '').padStart(2, '0') + '日');
                }
            } else {
                if (value.year() === min.year() && value.month() === min.month()) {
                    days = [];
                    for (let i = min.date(); i <= daysLen; i++) {
                        days.push((i + '').padStart(2, '0') + '日');
                    }
                } else if (value.year() === max.year() && value.month() === max.month()) {
                    days = [];
                    for (let i = 1; i <= max.date(); i++) {
                        days.push((i + '').padStart(2, '0') + '日');
                    }
                }
            }

            return days;
        },
        /**
         * 获取范围内小时数组
         * @param {Moment} min - 最小日期
         * @param {Moment} max - 最大日期
         * @param {Moment} value - 选中日期
         * @return {*[]}
         */
        makeHourList: function (min, max, value) {
            let hours = this.makeList(0, 23, '时', 2);

            if (min.year() === max.year() && min.month() === max.month() && min.date() === max.date()) {
                hours = [];
                for (let i = min.hour(); i <= max.hour(); i++) {
                    hours.push((i + '').padStart(2, '0') + '时');
                }
            } else {
                if (value.year() === min.year() && value.month() === min.month() && value.date() === min.date()) {
                    hours = [];
                    for (let i = min.hour(); i <= 23; i++) {
                        hours.push((i + '').padStart(2, '0') + '时');
                    }
                } else if (value.year() === max.year() && value.month() === max.month() && value.date() === max.date()) {
                    hours = [];
                    for (let i = 0; i <= max.hour(); i++) {
                        hours.push((i + '').padStart(2, '0') + '时');
                    }
                }
            }

            return hours;
        },
        /**
         * 获取范围内分钟数组
         * @param {Moment} min - 最小日期
         * @param {Moment} max - 最大日期
         * @param {Moment} value - 选中日期
         * @return {*[]}
         */
        makeMinuteList: function (min, max, value) {
            let minutes = this.makeList(0, 59, '分', 2);

            if (min.year() === max.year() && min.month() === max.month() && min.date() === max.date() && min.hour() === max.hour()) {
                minutes = [];
                for (let i = min.minute(); i <= max.minute(); i++) {
                    minutes.push((i + '').padStart(2, '0') + '分');
                }
            } else {
                if (value.year() === min.year() && value.month() === min.month() && value.date() === min.date() && value.hour() === min.hour()) {
                    minutes = [];
                    for (let i = min.minute(); i <= 59; i++) {
                        minutes.push((i + '').padStart(2, '0') + '分');
                    }
                } else if (value.year() === max.year() && value.month() === max.month() && value.date() === max.date() && value.hour() === max.hour()) {
                    minutes = [];
                    for (let i = 0; i <= max.minute(); i++) {
                        minutes.push((i + '').padStart(2, '0') + '分');
                    }
                }
            }

            return minutes;
        },
        /**
         * 获取范围内秒钟数组
         * @param {Moment} min - 最小日期
         * @param {Moment} max - 最大日期
         * @param {Moment} value - 选中日期
         * @return {*[]}
         */
        makeSecondList: function (min, max, value) {
            let seconds = this.makeList(0, 59, '秒', 2);

            if (min.year() === max.year() && min.month() === max.month() && min.date() === max.date() && min.hour() === max.hour() && min.minute() === max.minute()) {
                seconds = [];
                for (let i = min.second(); i <= max.second(); i++) {
                    seconds.push((i + '').padStart(2, '0') + '秒');
                }
            } else {
                if (value.year() === min.year() && value.month() === min.month() && value.date() === min.date() && value.hour() === min.hour() && value.minute() === min.minute()) {
                    seconds = [];
                    for (let i = min.second(); i <= 59; i++) {
                        seconds.push((i + '').padStart(2, '0') + '秒');
                    }
                } else if (value.year() === max.year() && value.month() === max.month() && value.date() === max.date() && value.hour() === max.hour() && value.minute() === max.minute()) {
                    seconds = [];
                    for (let i = 0; i <= max.second(); i++) {
                        seconds.push((i + '').padStart(2, '0') + '秒');
                    }
                }
            }

            return seconds;
        },
        /**
         * 生成范围数组
         * @param {number} start - 最小值
         * @param {number} end - 最大值
         * @param {string} suffix - 后缀
         * @param {number} length - 数字补全长度
         * @return {[]}
         */
        makeList: function (start, end, suffix = '', length = 2) {
            let arr = [];
            for (let i = start; i <= end; i++) {
                arr.push((i + '').padStart(length, '0') + suffix);
            }
            return arr;
        },
        /**
         * 设置RangeValue
         * @param {Moment} date - 日期moment对象
         */
        setRangeValue: function (date) {
            this.setData({
                rangeValue: [
                    this.data.range[0].findIndex(d => d === (date.year() + '').padStart(4, '0') + '年'),
                    this.data.range[1].findIndex(d => d === ((date.month() + 1) + '').padStart(2, '0') + '月'),
                    this.data.range[2].findIndex(d => d === (date.date() + '').padStart(2, '0') + '日'),
                    this.data.range[3].findIndex(d => d === (date.hour() + '').padStart(2, '0') + '时'),
                    this.data.range[4].findIndex(d => d === (date.minute() + '').padStart(2, '0') + '分'),
                    this.data.range[5].findIndex(d => d === (date.second() + '').padStart(2, '0') + '秒')
                ]
            });
        },
        /**
         * RangeValue转日期字符串
         * @param {array<number>} rangeValue - RangeValue
         * @return {string}
         */
        rangeValueToString: function (rangeValue) {
            return this.data.range[0][rangeValue[0]].replace('年', '') + '-'
                + this.data.range[1][rangeValue[1]].replace('月', '') + '-'
                + this.data.range[2][rangeValue[2]].replace('日', '') + ' '
                + this.data.range[3][rangeValue[3]].replace('时', '') + ':'
                + this.data.range[4][rangeValue[4]].replace('分', '') + ':'
                + this.data.range[5][rangeValue[5]].replace('秒', '');
        },
        /**
         * 获取指定日期所在月份天数
         * @param {Moment} date 日期moment对象
         * @return {number}
         */
        getMonthDays: function (date) {
            return moment(date)
                .set('date', 1)
                .set('hour', 0)
                .set('minute', 0)
                .set('second', 0)
                .add(1, 'months')
                .subtract(1, 'days')
                .date();
        }
    }
});