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
        score?: {
            companyScore: number;
            popularityScore: number;
            experienceOfJobSeekersScore: number;
            responsivenessScore: number;
        };
        website: string;
        desc: string;
        CompanySlogan: string;
        Benefits?: string[];
        establishedyear: number;
        OrganizationEmploy: number;
        ownership?: "Government" | "Private";
        typeOfActivity?: string;
        industry?: string;
    };
    jobInfo: {
        rightsPrice: [number, number] | number | "NOT_SET_PRICE";
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
    };
    adTags?: string[];
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
            },
            type: ["IS_EMPLOYMENT_OF_THE_DISABLED", "MILITARY_ORDER", "INTERSHIP"],
            adTags: [
                "front developer",
                "react js",
                "react",
                "توسعه دهنده ری اکت",
                "برنامه نویسی سایت",
                "برنامه نویس فرانت اند",
            ],
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
            },
            adTags: [
                "front developer",
                "react js",
                "react",
                "توسعه دهنده ری اکت",
                "برنامه نویسی سایت",
                "برنامه نویس فرانت اند",
            ],
            type: ["TELECOMMUTING"],
            CreateAt: new Date(2022, 7, 4, 22, 30, 0, 0),
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "کارآموز طراحی سایت",
            company: {
                name: "وایت وال",
                location: "تهران ، سعادت آباد",
                logo: "/images/company-whiteVal.webp",
                score: {
                    companyScore: 4.3,
                    popularityScore: 3.5,
                    experienceOfJobSeekersScore: 5.0,
                    responsivenessScore: 4.1,
                },
                CompanySlogan: "",
                website: "drdr.ir",
                desc: "سامانه مدیریت و نوبت دهی دکتردکتر تمامی نیازهای پزشکان و بیماران مانند نوبت دهی اینترنتی پزشکان، پرونده سلامت الکترونیک، خروجی لیست بیمه و به طورکلی تمامی نیازهای بیماران و پزشکان را برآورده می کند، تا روند بهبود بیماران راحت تر و دقیق تر از گذشته پیش برود.",
                establishedyear: 1396,
                OrganizationEmploy: 200,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی و خارجی",
                industry:
                    "اینترنت / تجارت الکترونیک / خدمات آنلاین /خدمات درمانی و سلامتی / تکنولوژی و نوآوری / سرمایه گذاری خطرپذیر / شتاب دهنده",
            },
            jobInfo: {
                rightsPrice: "NOT_SET_PRICE",
                workTime: "همه روزه",
                typeOfCooperation: "TYPE_OF_COOPERTION_FULL_TIME",
                // businessTrips: "",
                // benefitsAndFacilities: "",
                keyIndicators: ["وردپرس - مقدماتی"],
                jobDuties: {
                    desc: "شرکت وب تینوس به منظور پرورش طراح سایت اقدام به جذب نیروی کارآموز طراحی سایت وردپرس به صورت دورکاری می نماید. با آموزش های طولانی و پیچیده، عمر خود را تلف نکنید. روزی 1 ساعت به مدت یک ماه برای حرفه ای شدن کافیست. تا کسب مهارت بالا کنار شما خواهیم بود.",
                    lists: [
                        {
                            title: "آشنایی با هاست و دامنه",
                            item: [
                                {
                                    itemDesc:
                                        "اولین سرفصل از دوره کارآموزی آنلاین طراحی سایت مربوط به کارهای اولیه از جمله آشنایی با انواع هاست و دامنه می باشد. در ابتدای این دوره به آشنایی با هاست و دامنه می پردازیم و سایت هایی را برای خرید هاست و دامنه معرفی می کنیم و نحوه نصب هاست و تنظیمات مربوط به هاست و دامنه را به طور کامل آموزش می دهیم. نصب وردپرس بر روی لوکال هاست و انتقال آن به سرور را به طور کامل یاد میگیریم و در ادامه به آموزش کار با پنل مدیریت وردپرس می پردازیم و تمام آیتم های داخل پنل مدیریت وردپرس را با هم بررسی می کنیم.",
                                },
                            ],
                        },
                        {
                            title: "طراحی سایت با استفاده از قالب های آماده",
                            item: [
                                {
                                    itemDesc:
                                        "سرفصل بعدی مربوط به طراحی سایت با استفاده از قالب های آماده می باشد. در این مبحث به منابع قالب های آماده می پردازیم وب سایت هایی را برای خرید قالب های آماده معرفی می کنیم و در ادامه به روش شناسایی و خرید قالب های مناسب و با کیفیت می پردازیم. و در نهایت نحوه فعال سازی و این ایجاد دمو قالب آماده را آموزش می دهیم و به بررسی منو های ایجاد شده در قالب آماده می پردازیم.",
                                },
                            ],
                        },
                        {
                            title: "طراحی سایت با استفاده از روش کدنویسی",
                            item: [
                                {
                                    itemDesc:
                                        "برای این کار ما از هسته وردپرس استفاده می کنیم و قالب های آماده را کنار می گذاریم و خودمان با استفاده از متد های وردپرس و php سایت را طراحی میکنیم. برای طراحی سایت با استفاده از روش کدنویسی دو مرحله را باید طی کنیم. مرحله اول ساخت سایت استاتیک است. در این مرحله با استفاده از html css jQuery JavaScript، فرانت اند سایت را ایجاد می کنیم. سایت های استاتیک در سال های گذشته مرسوم بوده و در حال حاضر کارایی ندارند در واقع سایت استاتیک را فقط برنامه نویسان می توانستند ویرایش کنند حتی برای کارهای کوچک مثل تغییر شماره تلفن یا آدرس یا تغییر تصویر لوگو. تبدیل سایت استاتیک به داینامیک در این مرحله ما سایت را داینامیک می کنیم و تمام مواردی که در سایت استاتیک وجود داشت و کار بر نمی توانست آنها را ویرایش بکند را داینامیک می کنیم به این منظور که کاربر به راحتی بتواند محتوا را تغییر دهد بدون آنکه دانش برنامه نویسی داشته باشد.",
                                },
                            ],
                        },
                        {
                            title: "ورود به بازار کار و کسب درآمد",
                            item: [
                                {
                                    itemDesc:
                                        "آخرین مبحث مربوط به ورود به بازار کار و کسب درآمد می باشد بعد از آنکه به طراحی وب سایت تسلط کافی پیدا کردید باید بتوانید قالب های حرفه ای کدنویسی کنید یا با قالب های آماده وب سایت را طراحی کنید. اما موضوع مهم این است که پروژه ها را چگونه بیابیم و برای چه شرکت هایی کار بکنیم و یا در چه وبسایت هایی مشغول به کسب درآمد شویم. در کل بازار طراحی وب سایت به دو بخش ریالی و دلاری تقسیم می شود با توجه به تحریم هایی که وجود دارد درآمد دلاری سخت تر بوده و نیاز به تلاش بیشتری می باشد. در این مبحث به بررسی چند شرکت و وب سایت برای درآمدهای ریالی و دلاری می پردازیم و نحوه کسب درآمد در آنها را به طور کامل توضیح می دهیم.",
                                },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [15, 30],
                    gender: "NotImportant",
                    Softwares: ["Wordpress | مقدماتی"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: false,
                isImportant: false,
                responsibleEmployer: false,
            },
            type: ["TELECOMMUTING", "BENEFITS_AND_FACILITIES_PARKING"],
            CreateAt: new Date(2023, 9, 8, 14, 36),
            // Date(year,month,day,hours,minutes,seconds)
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "توسعه دهنده فرانت",
            company: {
                name: "دکتر دکتر",
                location: "تهران ، آرژانتین",
                logo: "/images/company-Doc-Doc.webp",

                website: "whitewhale.website",
                desc: "شرکت وایت وال یکی از محبوب ترین و موفق ترین شرکت های طراحی سایت در ایران می باشد که از سال 1388 شروع به فعالیت نموده است. زیبایی ، خلاقیت و ظرافت از ویژگی های بارز سایت های طراحی شده توسط تیم وایت وال می باشد . شرکت وب تینوس با بهرمندی از تیم متخصص و با تجربه خود آینده ای روشن در حوزه طراحی سایت فراسوی خود می بیند.",
                CompanySlogan: "دیجی کالا خرید و فروش آنلاین",
                establishedyear: 1398,
                OrganizationEmploy: 50,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی",
                industry: "اینترنت / تجارت الکترونیک / خدمات آنلاین",
            },
            jobInfo: {
                rightsPrice: [20, 25],
                workTime: "شنبه تا چهارشنبه- 9 الی 18",
                typeOfCooperation: "TYPE_OF_COOPERTION_FULL_TIME",
                // businessTrips: ,
                benefitsAndFacilities: "امریه‌ی سربازی -بیمه درمان تکمیلی -بسته ها و هدایای مناسبتی",
                keyIndicators: [
                    "3 سال سابقه کار در گروه شغلی مشابه",
                    "Html & CSS - متوسط",
                    "JavaScript - متوسط",
                    "React - متوسط",
                    "Next.js - پیشرفته",
                ],
                jobDuties: {
                    desc: "ما در تیم فنی «دکتردکتر» به دنبال همکاری جوان، خلاق و مسئولیت پذیر در نقش « برنامه نویس فرانت اند» در شهر تهران هستیم تا در کنار هم با به کارگیری توانایی هامون، علاوه بر رشد و توسعه فردی، در مسیر رشد دکتردکتر هم سهیم باشیم.",
                    lists: [
                        {
                            title: "مهارت و تجربه تخصصی مورد نیاز:",
                            item: [
                                { itemDesc: "تسلط  به React و Next" },
                                { itemDesc: "تسلط  به Redux و React Hooks" },
                                { itemDesc: "تسلط به HTML ،CSS ،Javascript  و عملکرد مرورگرهای مختلف" },
                                { itemDesc: "توانایی کار با CSS و ترجیحا SCSS به صورت Pure " },
                                {
                                    itemDesc:
                                        "توانائی کار با ابزارهای اتوماسیون از جمله Webpack, Rollup ، PostCSS و دیگر ابزارهای مرتبط با توسعه اپلیکیشن فرانت اند",
                                },
                                { itemDesc: "آشنایی با مفاهیم پایه سئو" },
                                { itemDesc: "تسلط به Git" },
                                { itemDesc: "تسلط به طراحی ریسپانسیو و و پشتیبانی از مرورگرهای مختلف" },
                                { itemDesc: "آشنائی با PWA" },
                                { itemDesc: "تسلط نسبی به زبان انگلیسی " },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [20, 40],
                    gender: "NotImportant",
                    Softwares: ["JavaScript | متوسط]", "html & css | متوسط", "React | متوسط", "Next.js | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: true,
                isImportant: false,
                responsibleEmployer: false,
            },
            type: ["MILITARY_ORDER", "INTERSHIP", "BENEFITS_AND_FACILITIES_REWARD"],
            CreateAt: new Date(2023, 9, 8, 15, 36),
            // Date(year,month,day,hours,minutes,seconds)
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "توسعه دهنده فرانت",
            company: {
                name: "توسعه فناوری سوشیانت",
                location: "تهران، سعادت آباد",
                logo: "/images/company-soshiant.webp",

                website: "whitewhale.website",
                desc: "شرکت وایت وال یکی از محبوب ترین و موفق ترین شرکت های طراحی سایت در ایران می باشد که از سال 1388 شروع به فعالیت نموده است. زیبایی ، خلاقیت و ظرافت از ویژگی های بارز سایت های طراحی شده توسط تیم وایت وال می باشد . شرکت وب تینوس با بهرمندی از تیم متخصص و با تجربه خود آینده ای روشن در حوزه طراحی سایت فراسوی خود می بیند.",
                CompanySlogan: "دیجی کالا خرید و فروش آنلاین",
                establishedyear: 1398,
                OrganizationEmploy: 50,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی",
                industry: "اینترنت / تجارت الکترونیک / خدمات آنلاین",
            },
            jobInfo: {
                rightsPrice: [50, 65],
                workTime: "نیمه وقت",
                typeOfCooperation: "TYPE_OF_COOPERTION_FULL_TIME",
                // businessTrips: ,
                benefitsAndFacilities: "امریه‌ی سربازی -بیمه درمان تکمیلی -بسته ها و هدایای مناسبتی",
                keyIndicators: [
                    "3 سال سابقه کار در گروه شغلی مشابه",
                    "Html & CSS - متوسط",
                    "JavaScript - متوسط",
                    "React - متوسط",
                    "Next.js - پیشرفته",
                ],
                jobDuties: {
                    desc: "ما در تیم فنی «دکتردکتر» به دنبال همکاری جوان، خلاق و مسئولیت پذیر در نقش « برنامه نویس فرانت اند» در شهر تهران هستیم تا در کنار هم با به کارگیری توانایی هامون، علاوه بر رشد و توسعه فردی، در مسیر رشد دکتردکتر هم سهیم باشیم.",
                    lists: [
                        {
                            title: "مهارت و تجربه تخصصی مورد نیاز:",
                            item: [
                                { itemDesc: "تسلط  به React و Next" },
                                { itemDesc: "تسلط  به Redux و React Hooks" },
                                { itemDesc: "تسلط به HTML ،CSS ،Javascript  و عملکرد مرورگرهای مختلف" },
                                { itemDesc: "توانایی کار با CSS و ترجیحا SCSS به صورت Pure " },
                                {
                                    itemDesc:
                                        "توانائی کار با ابزارهای اتوماسیون از جمله Webpack, Rollup ، PostCSS و دیگر ابزارهای مرتبط با توسعه اپلیکیشن فرانت اند",
                                },
                                { itemDesc: "آشنایی با مفاهیم پایه سئو" },
                                { itemDesc: "تسلط به Git" },
                                { itemDesc: "تسلط به طراحی ریسپانسیو و و پشتیبانی از مرورگرهای مختلف" },
                                { itemDesc: "آشنائی با PWA" },
                                { itemDesc: "تسلط نسبی به زبان انگلیسی " },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [18, 40],
                    gender: "NotImportant",
                    Softwares: ["JavaScript | متوسط]", "html & css | متوسط", "React | متوسط", "Next.js | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: true,
                isImportant: true,
                responsibleEmployer: false,
            },
            type: ["TELECOMMUTING", "TYPE_OF_COOPERTION_FULL_TIME"],
            CreateAt: new Date(2023, 9, 8, 15, 49),
            // Date(year,month,day,hours,minutes,seconds)
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "توسعه دهنده فرانت",
            company: {
                name: "شیپور",
                location: "تهران، سعادت آباد",
                logo: "/images/company-Sheypoor.webp",

                website: "whitewhale.website",
                desc: "شرکت وایت وال یکی از محبوب ترین و موفق ترین شرکت های طراحی سایت در ایران می باشد که از سال 1388 شروع به فعالیت نموده است. زیبایی ، خلاقیت و ظرافت از ویژگی های بارز سایت های طراحی شده توسط تیم وایت وال می باشد . شرکت وب تینوس با بهرمندی از تیم متخصص و با تجربه خود آینده ای روشن در حوزه طراحی سایت فراسوی خود می بیند.",
                CompanySlogan: "دیجی کالا خرید و فروش آنلاین",
                establishedyear: 1398,
                OrganizationEmploy: 50,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی",
                industry: "اینترنت / تجارت الکترونیک / خدمات آنلاین",
            },
            jobInfo: {
                rightsPrice: [4, 12],
                workTime: "نیمه وقت",
                typeOfCooperation: "TYPE_OF_COOPERTION_PART_TIME",
                // businessTrips: ,
                benefitsAndFacilities: "امریه‌ی سربازی -بیمه درمان تکمیلی -بسته ها و هدایای مناسبتی",
                keyIndicators: [
                    "3 سال سابقه کار در گروه شغلی مشابه",
                    "Html & CSS - متوسط",
                    "JavaScript - متوسط",
                    "React - متوسط",
                    "Next.js - پیشرفته",
                ],
                jobDuties: {
                    desc: "ما در تیم فنی «دکتردکتر» به دنبال همکاری جوان، خلاق و مسئولیت پذیر در نقش « برنامه نویس فرانت اند» در شهر تهران هستیم تا در کنار هم با به کارگیری توانایی هامون، علاوه بر رشد و توسعه فردی، در مسیر رشد دکتردکتر هم سهیم باشیم.",
                    lists: [
                        {
                            title: "مهارت و تجربه تخصصی مورد نیاز:",
                            item: [
                                { itemDesc: "تسلط  به React و Next" },
                                { itemDesc: "تسلط  به Redux و React Hooks" },
                                { itemDesc: "تسلط به HTML ،CSS ،Javascript  و عملکرد مرورگرهای مختلف" },
                                { itemDesc: "توانایی کار با CSS و ترجیحا SCSS به صورت Pure " },
                                {
                                    itemDesc:
                                        "توانائی کار با ابزارهای اتوماسیون از جمله Webpack, Rollup ، PostCSS و دیگر ابزارهای مرتبط با توسعه اپلیکیشن فرانت اند",
                                },
                                { itemDesc: "آشنایی با مفاهیم پایه سئو" },
                                { itemDesc: "تسلط به Git" },
                                { itemDesc: "تسلط به طراحی ریسپانسیو و و پشتیبانی از مرورگرهای مختلف" },
                                { itemDesc: "آشنائی با PWA" },
                                { itemDesc: "تسلط نسبی به زبان انگلیسی " },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [18, 40],
                    gender: "NotImportant",
                    Softwares: ["JavaScript | متوسط]", "html & css | متوسط", "React | متوسط", "Next.js | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: true,
                isImportant: false,
                responsibleEmployer: false,
            },
            type: ["TYPE_OF_COOPERTION_PART_TIME"],
            CreateAt: new Date(2023, 9, 8, 15, 49),
            // Date(year,month,day,hours,minutes,seconds)
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "برنامه نویس Front-End",
            company: {
                name: "آکادمی آموزشی املاک امید ابراهیمی",
                location: "تهران، شهرک شرق",
                logo: "/images/company-amlak.webp",

                website: "whitewhale.website",
                desc: "شرکت وایت وال یکی از محبوب ترین و موفق ترین شرکت های طراحی سایت در ایران می باشد که از سال 1388 شروع به فعالیت نموده است. زیبایی ، خلاقیت و ظرافت از ویژگی های بارز سایت های طراحی شده توسط تیم وایت وال می باشد . شرکت وب تینوس با بهرمندی از تیم متخصص و با تجربه خود آینده ای روشن در حوزه طراحی سایت فراسوی خود می بیند.",
                CompanySlogan: "دیجی کالا خرید و فروش آنلاین",
                establishedyear: 1398,
                OrganizationEmploy: 50,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی",
                industry: "اینترنت / تجارت الکترونیک / خدمات آنلاین",
            },
            jobInfo: {
                rightsPrice: [15, 20],
                workTime: "نیمه وقت",
                typeOfCooperation: "TYPE_OF_COOPERTION_PART_TIME",
                // businessTrips: ,
                benefitsAndFacilities: "امریه‌ی سربازی -بیمه درمان تکمیلی -بسته ها و هدایای مناسبتی",
                keyIndicators: [
                    "3 سال سابقه کار در گروه شغلی مشابه",
                    "Html & CSS - متوسط",
                    "JavaScript - متوسط",
                    "React - متوسط",
                    "Next.js - پیشرفته",
                ],
                jobDuties: {
                    desc: "ما در تیم فنی «دکتردکتر» به دنبال همکاری جوان، خلاق و مسئولیت پذیر در نقش « برنامه نویس فرانت اند» در شهر تهران هستیم تا در کنار هم با به کارگیری توانایی هامون، علاوه بر رشد و توسعه فردی، در مسیر رشد دکتردکتر هم سهیم باشیم.",
                    lists: [
                        {
                            title: "مهارت و تجربه تخصصی مورد نیاز:",
                            item: [
                                { itemDesc: "تسلط  به React و Next" },
                                { itemDesc: "تسلط  به Redux و React Hooks" },
                                { itemDesc: "تسلط به HTML ،CSS ،Javascript  و عملکرد مرورگرهای مختلف" },
                                { itemDesc: "توانایی کار با CSS و ترجیحا SCSS به صورت Pure " },
                                {
                                    itemDesc:
                                        "توانائی کار با ابزارهای اتوماسیون از جمله Webpack, Rollup ، PostCSS و دیگر ابزارهای مرتبط با توسعه اپلیکیشن فرانت اند",
                                },
                                { itemDesc: "آشنایی با مفاهیم پایه سئو" },
                                { itemDesc: "تسلط به Git" },
                                { itemDesc: "تسلط به طراحی ریسپانسیو و و پشتیبانی از مرورگرهای مختلف" },
                                { itemDesc: "آشنائی با PWA" },
                                { itemDesc: "تسلط نسبی به زبان انگلیسی " },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [18, 40],
                    gender: "NotImportant",
                    Softwares: ["JavaScript | متوسط]", "html & css | متوسط", "React | متوسط", "Next.js | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: true,
                isImportant: false,
                responsibleEmployer: false,
            },
            type: ["TYPE_OF_COOPERTION_PART_TIME", "BENEFITS_AND_FACILITIES_REWARD"],
            CreateAt: new Date(2023, 9, 8, 15, 50),
            // Date(year,month,day,hours,minutes,seconds)
        },
    },
    {
        data: {
            id: uuidGenerator(),
            title: "Front End Developer",
            company: {
                name: "Snapp Group",
                location: "تهران، شهرک غرب",
                logo: "/images/company-snapp-group.webp",

                website: "whitewhale.website",
                desc: "شرکت وایت وال یکی از محبوب ترین و موفق ترین شرکت های طراحی سایت در ایران می باشد که از سال 1388 شروع به فعالیت نموده است. زیبایی ، خلاقیت و ظرافت از ویژگی های بارز سایت های طراحی شده توسط تیم وایت وال می باشد . شرکت وب تینوس با بهرمندی از تیم متخصص و با تجربه خود آینده ای روشن در حوزه طراحی سایت فراسوی خود می بیند.",
                CompanySlogan: "دیجی کالا خرید و فروش آنلاین",
                establishedyear: 1398,
                OrganizationEmploy: 50,
                ownership: "Private",
                typeOfActivity: "شرکت ایرانی دارای مشتریان داخلی",
                industry: "اینترنت / تجارت الکترونیک / خدمات آنلاین",
            },
            jobInfo: {
                rightsPrice: "NOT_SET_PRICE",
                workTime: "تمام وقت",
                typeOfCooperation: "TYPE_OF_COOPERTION_FULL_TIME",
                // businessTrips: ,
                benefitsAndFacilities: "امریه‌ی سربازی -بیمه درمان تکمیلی -بسته ها و هدایای مناسبتی",
                keyIndicators: [
                    "3 سال سابقه کار در گروه شغلی مشابه",
                    "Html & CSS - متوسط",
                    "JavaScript - متوسط",
                    "React - متوسط",
                    "Next.js - پیشرفته",
                ],
                jobDuties: {
                    desc: "ما در تیم فنی «دکتردکتر» به دنبال همکاری جوان، خلاق و مسئولیت پذیر در نقش « برنامه نویس فرانت اند» در شهر تهران هستیم تا در کنار هم با به کارگیری توانایی هامون، علاوه بر رشد و توسعه فردی، در مسیر رشد دکتردکتر هم سهیم باشیم.",
                    lists: [
                        {
                            title: "مهارت و تجربه تخصصی مورد نیاز:",
                            item: [
                                { itemDesc: "تسلط  به React و Next" },
                                { itemDesc: "تسلط  به Redux و React Hooks" },
                                { itemDesc: "تسلط به HTML ،CSS ،Javascript  و عملکرد مرورگرهای مختلف" },
                                { itemDesc: "توانایی کار با CSS و ترجیحا SCSS به صورت Pure " },
                                {
                                    itemDesc:
                                        "توانائی کار با ابزارهای اتوماسیون از جمله Webpack, Rollup ، PostCSS و دیگر ابزارهای مرتبط با توسعه اپلیکیشن فرانت اند",
                                },
                                { itemDesc: "آشنایی با مفاهیم پایه سئو" },
                                { itemDesc: "تسلط به Git" },
                                { itemDesc: "تسلط به طراحی ریسپانسیو و و پشتیبانی از مرورگرهای مختلف" },
                                { itemDesc: "آشنائی با PWA" },
                                { itemDesc: "تسلط نسبی به زبان انگلیسی " },
                            ],
                        },
                    ],
                },
                employmentConditions: {
                    yearsOld: [18, 40],
                    gender: "NotImportant",
                    Softwares: ["JavaScript | متوسط]", "html & css | متوسط", "React | متوسط", "Next.js | پیشرفته"],
                    // education: [""] | ""
                },
            },
            status: {
                cvPending: true,
                isImportant: true,
                responsibleEmployer: true,
            },
            type: ["TYPE_OF_COOPERTION_FULL_TIME", "SENIORITY_LEVEL_EXPERT"],
            CreateAt: new Date(2023, 9, 8, 16, 0),
            // Date(year,month,day,hours,minutes,seconds)
        },
    },
];

export { AdvertisingArray };
