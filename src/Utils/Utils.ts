export interface TimeType {
    date: number;
    type: "Second" | "Minute" | "Hour" | "Day" | "Month" | "Year" | "NotValid";
}
const getTime = (date: Date | string): TimeType => {
    const now = new Date();
    const nowTime = now.getTime();
    const dateTime = typeof date === "string" ? new Date(date).getTime() : date.getTime();

    const mainTime = nowTime - dateTime;
    const secondsTime = Math.floor(mainTime / 1000);
    const minutesTime = Math.floor(mainTime / 1000 / 60);
    const hourTime = Math.floor(mainTime / 1000 / 60 / 60);
    const dayTime = Math.floor(mainTime / 1000 / 60 / 60 / 24);
    const monthTime = Math.floor(mainTime / 1000 / 60 / 60 / 24 / 30);
    const yearTime = Math.floor(mainTime / 1000 / 60 / 60 / 24 / 30 / 12);

    return dateTime < nowTime && secondsTime > 0 && secondsTime <= 59
        ? { date: secondsTime, type: "Second" }
        : dateTime < nowTime && minutesTime > 0 && minutesTime <= 59
        ? { date: minutesTime, type: "Minute" }
        : dateTime < nowTime && hourTime > 0 && hourTime <= 23
        ? { date: hourTime, type: "Hour" }
        : dateTime < nowTime && dayTime > 0 && dayTime <= 31
        ? { date: dayTime, type: "Day" }
        : dateTime < nowTime && monthTime > 0 && monthTime <= 12
        ? { date: monthTime, type: "Month" }
        : dateTime < nowTime && yearTime > 0
        ? { date: yearTime, type: "Year" }
        : { date: 0, type: "NotValid" };
};

const messageLengthGenerator = (type: "Min" | "Max", name: string, length: number): string =>
    `${type === "Min" ? "حداقل" : type === "Max" ? "حداکثر" : null} ${length} کاکرتر برای ${name} ${
        type === "Min" ? "مورد نیاز است" : type === "Max" ? "مجاز میباشد" : null
    }`;
const messageUrlNotValid = (name: string): string => `لینک ${name} معتبر نمیباشد`;
const messageRequiredGenerator = (name: string) => `${name} اجباری میباشد`;
const messageSuccess = (name: string) => `${name} با موفقیت به اتمام رسید`;

const toLowerCaseAction = (value: string): string => value.toLocaleLowerCase();

const getItem = <T>({ main_id, array, key }: { main_id: string; array: T[] | undefined; key: keyof T }): T[] =>
    typeof array !== "undefined" ? array.filter((item) => item[key] === main_id) : ([] as T[]);

export {
    getTime,
    messageLengthGenerator,
    messageUrlNotValid,
    messageRequiredGenerator,
    messageSuccess,
    toLowerCaseAction,
    getItem,
};
