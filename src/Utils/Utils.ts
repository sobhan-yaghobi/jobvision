export interface TimeType {
    date: number;
    type: "Second" | "Minute" | "Hour" | "Day" | "Month" | "Year" | "NotValid";
}
const getTime = (date: Date): TimeType => {
    const now = new Date();
    const nowTime = now.getTime();
    const dateTime = date.getTime();

    const mainTime = nowTime - dateTime;
    const secondsTime = Math.floor(mainTime / 1000);
    const minutesTime = Math.floor(mainTime / 1000 / 60);
    const hourTime = Math.floor(mainTime / 1000 / 60 / 60);
    const dayTime = Math.floor(mainTime / 1000 / 60 / 60 / 24);
    const monthTime = Math.floor(mainTime / 1000 / 60 / 60 / 24 / 30);
    const yearTime = Math.floor(mainTime / 1000 / 60 / 60 / 24 / 30 / 12);

    if (dateTime < nowTime && secondsTime > 0 && secondsTime <= 59) {
        return { date: secondsTime, type: "Second" };
    } else if (dateTime < nowTime && minutesTime > 0 && minutesTime <= 59) {
        return { date: minutesTime, type: "Minute" };
    } else if (dateTime < nowTime && hourTime > 0 && hourTime <= 23) {
        return { date: hourTime, type: "Hour" };
    } else if (dateTime < nowTime && dayTime > 0 && dateTime <= 31) {
        return { date: dayTime, type: "Day" };
    } else if (dateTime < nowTime && monthTime > 0 && monthTime <= 12) {
        return { date: monthTime, type: "Month" };
    } else if (dateTime < nowTime && yearTime > 0) {
        return { date: yearTime, type: "Year" };
    } else {
        return { date: 0, type: "NotValid" };
    }
};

export { getTime };
