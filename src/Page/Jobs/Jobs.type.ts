import { AdvertisingType } from "../../Components/AdvertisingBox/AdvertisingBox.type";
import uuidGenerator from "../../Utils/UuidGenerator";

export interface MainItemBoxInfoType {
    id: string;
    title: string;
    type: InfoTypes;
}

export interface mainJobInfoType {
    isShow: boolean;
    mainInfo: AdvertisingType | undefined;
}

export interface BoxsOrderType {
    id: string;
    title: string;
    order: "RELATED" | "NEW" | "HIGHEST_SALARY";
}

export interface AboutJob {
    id: string;
    title: string;
    item: { id: string; itemTitle?: string; itemDesc: string } | { id: string; itemTitle?: string; itemDesc: string }[];
}

export interface BoxInfoCardProps {
    mainInfoJob: AdvertisingType;
    mainItemInfo: MainItemBoxInfoType;
    setMainItemInfo: React.Dispatch<MainItemBoxInfoType>;
}

type InfoTypes = "INFO_JOB" | "ABOUT_COMPANY" | "RELATED_ADS" | "RESUME_RECRRDS";
export interface BoxInfoProps {
    type: InfoTypes;
    info: AdvertisingType;
}

const mainItemsBoxInfos: MainItemBoxInfoType[] = [
    { id: uuidGenerator(), title: "درباره شغل", type: "INFO_JOB" },
    { id: uuidGenerator(), title: "درباره شرکت", type: "ABOUT_COMPANY" },
    { id: uuidGenerator(), title: "سایر آگهی های این شرکت", type: "RELATED_ADS" },
    { id: uuidGenerator(), title: "سوابق ارسال رزومه", type: "RESUME_RECRRDS" },
];

const boxOrderArray: BoxsOrderType[] = [
    { id: uuidGenerator(), title: "مرتبط ترین ها", order: "RELATED" },
    { id: uuidGenerator(), title: "جدید ترین ها", order: "NEW" },
    { id: uuidGenerator(), title: "بیشترین حقوق", order: "HIGHEST_SALARY" },
];

const aboutJobArray: AboutJob[] = [
    {
        id: uuidGenerator(),
        title: "شرایط  کاراموزی",
        item: [
            { id: uuidGenerator(), itemTitle: "طول دوره", itemDesc: "3 ماه(پاره وقت و تمام وقت)" },
            { id: uuidGenerator(), itemTitle: "محل شرکت", itemDesc: "محدوده دانشگاه شریف" },
            { id: uuidGenerator(), itemDesc: "احتیاج به پیش‌نیاز و سابقه کاری نیست" },
        ],
    },
    {
        id: uuidGenerator(),
        title: "آموزش ها",
        item: [
            { id: uuidGenerator(), itemDesc: "فروش و بازاریابی" },
            { id: uuidGenerator(), itemDesc: "برنامه نویسی(وب و هوش)" },
        ],
    },
    {
        id: uuidGenerator(),
        title: "حوزه فعالیت شرکت",
        item: [
            { id: uuidGenerator(), itemDesc: "انجام پروژه های نرم‌افزاری/ اپلیکیشن تحت وب و موبایل" },
            { id: uuidGenerator(), itemDesc: "برگزاری و فروش دوره های آموزش برنامه‌نویسی و هوش مصنوعی" },
        ],
    },
    {
        id: uuidGenerator(),
        title: "شرایط کاری",
        item: [
            { id: uuidGenerator(), itemDesc: "اموزش برنامه نویسی" },
            { id: uuidGenerator(), itemDesc: "همکاری در بخش فروش" },
            { id: uuidGenerator(), itemDesc: "همکاری در بخش آموزش و پشتیبانی دوره ها" },
        ],
    },
    {
        id: uuidGenerator(),
        title: "مهارت هایی که در طول دوره فرا خواهید گرفت",
        item: [
            { id: uuidGenerator(), itemDesc: "برنامه نویسی وب" },
            { id: uuidGenerator(), itemDesc: "مهارت های فروش و بازاریابی" },
            { id: uuidGenerator(), itemDesc: "کسب درآمد از برنامه نویسی" },
        ],
    },
    {
        id: uuidGenerator(),
        title: "قابلیت های لازم",
        item: [
            { id: uuidGenerator(), itemDesc: "علاقه به یادگیری" },
            { id: uuidGenerator(), itemDesc: "روحیه کار تیمی" },
            { id: uuidGenerator(), itemDesc: "تمرکز بر روی فعالیت های کاری" },
            { id: uuidGenerator(), itemDesc: "نظم و انضباط" },
            { id: uuidGenerator(), itemDesc: "انرژی بالا و روابط اجتماعی خوب" },
            { id: uuidGenerator(), itemDesc: "عدم اشتغال به کار" },
        ],
    },
];

export { boxOrderArray, aboutJobArray, mainItemsBoxInfos };
