import uuidGenerator from "../../Utils/UuidGenerator";
import {
    FiltreTypes,
    TYPE_OF_COOPERTION_CONTRACTUAL_TIME,
    TYPE_OF_COOPERTION_FULL_TIME,
    TYPE_OF_COOPERTION_PART_TIME,
} from "../JobsFilter/JobsFilter.type";

interface jobDutiesListType {
    title: string;
    item: { itemTitle?: string; itemDesc: string } | { itemTitle?: string; itemDesc: string }[];
}

export interface AdvertisingType {
    id: string;
    title: string;
    company: {
        name: string;
        location: string;
        logo: string;
        score: {
            companyScore: number;
            popularityScore: number;
            experienceOfJobSeekersScore: number;
            responsivenessScore: number;
        };
        website: string;
        desc: string;
        CompanySlogan: string;
        Benefits: string[];
        establishedyear: number;
        OrganizationEmploy: number;
        ownership?: "Government" | "Private";
        typeOfActivity?: string;
        industry?: string;
    };
    jobInfo: {
        rightsPrice: [number, number] | number;
        workTime: string;
        typeOfCooperation?:
            | TYPE_OF_COOPERTION_FULL_TIME
            | TYPE_OF_COOPERTION_CONTRACTUAL_TIME
            | TYPE_OF_COOPERTION_PART_TIME;
        businessTrips?: string;
        benefitsAndFacilities?: string;
        keyIndicators?: string[];
        jobDuties: {
            desc: string;
            lists: jobDutiesListType[];
        };
        employmentConditions: {
            yearsOld: [number, number];
            gender: "Male" | "Female" | "NotImportant";
            Softwares: string[];
            education?: string[] | string;
        };
    };
    status: {
        isImportant: boolean;
        cvPending: boolean;
        responsibleEmployer: boolean;
        acceptTrainees: boolean;
        acceptTelecommuting: boolean;
    };
    type: FiltreTypes[];
    CreateAt: Date;
}
export interface AdvertisingBoxMainProps {
    data: AdvertisingType;
    isActive?: boolean;
    IsResponsive?: boolean;
}
type AdvertisingBoxTypesProps = { type: "HideSendCv"; clickHandler: Function } | { type: "ShowSendCv" };

export type AdvertisingBoxProps = AdvertisingBoxMainProps & AdvertisingBoxTypesProps;

const AdvertisingArray: AdvertisingBoxMainProps[] = [
    {
        data: {
            id: uuidGenerator(),
            title: "Front End Developer (React.js)",
            company: {
                name: "آریان کد",
                location: "تهران ، سعادت آباد",
                logo: "/images/reactCompony.webp",
                score: {
                    companyScore: 4.8,
                    popularityScore: 3.0,
                    experienceOfJobSeekersScore: 5.0,
                    responsivenessScore: 4.5,
                },
                website: "aryancode.ir",
                desc: "شرکت دانش بنیان فعال در زمینه طراحی و ساخت برنامه نویسی اختصاصی وب اپلیکیشن طراحی وبسایت          فروشگاهی،شرکتی،شخصی و..",
                CompanySlogan: "شرکت برنامه نویسی خصوصی آرین",
                Benefits: ["پاداش", "وام", "بیمه درمان تکمیلی", "پارکینگ", "ناهار", "پزشک سازمانی"],
                establishedyear: 1400,
                OrganizationEmploy: 10,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی و خارجی",
                industry: "فناوری اطلاعات / نرم افزار و سخت افزار",
            },
            jobInfo: {
                rightsPrice: [12, 25],
                workTime: "شنبه تا پنجشنبه 7 الی 15",
                typeOfCooperation: "TYPE_OF_COOPERTION_CONTRACTUAL_TIME",
                // businessTrips: "",
                benefitsAndFacilities: "پورسانت",
                keyIndicators: ["2 سال سابقه کار در گروه شغلی مشابه", "React - پیشرفته", "ترجیحا ساکن اصفهان"],
                jobDuties: {
                    desc: "پروژه برنامه نویسی اختصاصی وب اپلیکیشن برای برند بسیار معروف می باشد. نیاز به فرانت کار ماهر جهت ادامه ی پروژه. تسویه 15 روزه",
                    lists: [
                        {
                            title: "شرایط  کاراموزی",
                            item: [
                                { itemTitle: "طول دوره", itemDesc: "3 ماه(پاره وقت و تمام وقت)" },
                                { itemTitle: "محل شرکت", itemDesc: "محدوده دانشگاه شریف" },
                                { itemDesc: "احتیاج به پیش‌ نیاز و سابقه کاری نیست" },
                            ],
                        },
                        {
                            title: "آموزش ها",
                            item: [{ itemDesc: "فروش و بازاریابی" }, { itemDesc: "برنامه نویسی(وب و هوش)" }],
                        },
                        {
                            title: "حوزه فعالیت شرکت",
                            item: [
                                {
                                    itemDesc: "انجام پروژه های نرم‌افزاری/ اپلیکیشن تحت وب و موبایل",
                                },
                                {
                                    itemDesc: "برگزاری و فروش دوره های آموزش برنامه‌نویسی و هوش مصنوعی",
                                },
                            ],
                        },
                        {
                            title: "شرایط کاری",
                            item: [
                                { itemDesc: "اموزش برنامه نویسی" },
                                { itemDesc: "همکاری در بخش فروش" },
                                { itemDesc: "همکاری در بخش آموزش و پشتیبانی دوره ها" },
                            ],
                        },
                        {
                            title: "مهارت هایی که در طول دوره فرا خواهید گرفت",
                            item: [
                                { itemDesc: "برنامه نویسی وب" },
                                { itemDesc: "مهارت های فروش و بازاریابی" },
                                { itemDesc: "کسب درآمد از برنامه نویسی" },
                            ],
                        },
                        {
                            title: "قابلیت های لازم",
                            item: [
                                { itemDesc: "علاقه به یادگیری" },
                                { itemDesc: "روحیه کار تیمی" },
                                { itemDesc: "تمرکز بر روی فعالیت های کاری" },
                                { itemDesc: "نظم و انضباط" },
                                { itemDesc: "انرژی بالا و روابط اجتماعی خوب" },
                                { itemDesc: "عدم اشتغال به کار" },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [18, 23],
                    gender: "Male",
                    Softwares: ["React | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: true,
                isImportant: true,
                responsibleEmployer: true,
                acceptTrainees: true,
                acceptTelecommuting: true,
            },
            type: ["IS_EMPLOYMENT_OF_THE_DISABLED", "MILITARY_ORDER", "RIGHTS_AMONG_12_20_MILLION"],
            CreateAt: new Date(2023, 9, 4, 22, 30, 0, 0),
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "اعطای نمایندگی توزیع سفارشات دیجی کالا",
            company: {
                name: "دیجی اکسپرس",
                location: "بندرعباس",
                logo: "/images/digiKala.webp",
                score: {
                    companyScore: 3.8,
                    popularityScore: 4.0,
                    experienceOfJobSeekersScore: 3.0,
                    responsivenessScore: 4.9,
                },
                website: "digiexpress.ir",
                desc: "خدمات این شرکت شامل دریافت و تحویل اقلام فروشندگان به مشتریان در یک بازه زمانی از قبل تعیین شده و همچنین دریافت و تحویل کالای سوپرمارکتی در زمان کوتاه است.",
                CompanySlogan: "دیجی کالا خرید و فروش آنلاین",
                Benefits: ["پاداش"],
                establishedyear: 1400,
                OrganizationEmploy: 1000,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی و خارجی",
                industry:
                    "اینترنت / تجارت الکترونیک / خدمات آنلاین خرده فروشی / مرکز خرید / فروشگاه حمل و نقل / ترابری",
            },
            jobInfo: {
                rightsPrice: 60,
                workTime: "قراردادی",
                typeOfCooperation: "TYPE_OF_COOPERTION_CONTRACTUAL_TIME",
                // businessTrips: "",
                benefitsAndFacilities: "پورسانت",
                keyIndicators: ["2 سال سابقه کار در گروه شغلی مشابه", "React - پیشرفته", "ترجیحا ساکن اصفهان"],
                jobDuties: {
                    desc: "پروژه برنامه نویسی اختصاصی وب اپلیکیشن برای برند بسیار معروف می باشد. نیاز به فرانت کار ماهر جهت ادامه ی پروژه. تسویه 15 روزه",
                    lists: [
                        {
                            title: "شرایط  کاراموزی",
                            item: [
                                { itemTitle: "طول دوره", itemDesc: "3 ماه(پاره وقت و تمام وقت)" },
                                { itemTitle: "محل شرکت", itemDesc: "محدوده دانشگاه شریف" },
                                { itemDesc: "احتیاج به پیش‌ نیاز و سابقه کاری نیست" },
                            ],
                        },
                        {
                            title: "آموزش ها",
                            item: [{ itemDesc: "فروش و بازاریابی" }, { itemDesc: "برنامه نویسی(وب و هوش)" }],
                        },
                        {
                            title: "حوزه فعالیت شرکت",
                            item: [
                                {
                                    itemDesc: "انجام پروژه های نرم‌افزاری/ اپلیکیشن تحت وب و موبایل",
                                },
                                {
                                    itemDesc: "برگزاری و فروش دوره های آموزش برنامه‌نویسی و هوش مصنوعی",
                                },
                            ],
                        },
                        {
                            title: "شرایط کاری",
                            item: [
                                { itemDesc: "اموزش برنامه نویسی" },
                                { itemDesc: "همکاری در بخش فروش" },
                                { itemDesc: "همکاری در بخش آموزش و پشتیبانی دوره ها" },
                            ],
                        },
                        {
                            title: "مهارت هایی که در طول دوره فرا خواهید گرفت",
                            item: [
                                { itemDesc: "برنامه نویسی وب" },
                                { itemDesc: "مهارت های فروش و بازاریابی" },
                                { itemDesc: "کسب درآمد از برنامه نویسی" },
                            ],
                        },
                        {
                            title: "قابلیت های لازم",
                            item: [
                                { itemDesc: "علاقه به یادگیری" },
                                { itemDesc: "روحیه کار تیمی" },
                                { itemDesc: "تمرکز بر روی فعالیت های کاری" },
                                { itemDesc: "نظم و انضباط" },
                                { itemDesc: "انرژی بالا و روابط اجتماعی خوب" },
                                { itemDesc: "عدم اشتغال به کار" },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [18, 23],
                    gender: "Male",
                    Softwares: ["React | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: false,
                isImportant: true,
                responsibleEmployer: true,
                acceptTrainees: true,
                acceptTelecommuting: false,
            },
            type: ["RIGHTS_OVER_60_MILLION", "MILITARY_ORDER"],
            CreateAt: new Date(2022, 7, 4, 22, 30, 0, 0),
        },
    },
];

export { AdvertisingArray };
