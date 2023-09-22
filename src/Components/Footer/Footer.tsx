import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion";
import uuidGenerator from "../../Utils/UuidGenerator";
import LogoWhite from "/Svg/Logo/WhiteColorLogo.svg";

interface faqType {
    id: string;
    title: string;
    answer: string;
}

const faqItems: faqType[] = [
    {
        id: uuidGenerator(),
        title: "سایت استخدامی جاب ویژن، چه مزیتی نسبت به دیگر سایت‌های کاریابی و استخدامی دارد؟",
        answer: "وبسایت جاب ویژن با بیش از 26 هزار آگهی استخدام فعال و استفاده از هوش مصنوعی برای پیشنهاد مرتبط‌ترین آگهی‌ها به کارجویان، فرایند کاریابی را بسیار آسان‌تر کرده است.",
    },
    {
        id: uuidGenerator(),
        title: "آیا ساخت و ارسال رزومه در جاب ویژن برای من هزینه‌ای دارد؟",
        answer: "خیر، کارجویان می‌توانند بدون پرداخت هیچ هزینه‌ای در سایت کاریابی جاب ویژن رزومه بسازند و برای آگهی‌های استخدام ارسال کنند.",
    },
    {
        id: uuidGenerator(),
        title: "چگونه می‌توانم آگهی‌های استخدام مشاغل مرتبط با خودم را پیدا کنم؟",
        answer: "شما می‌توانید به راحتی با استفاده از نوار جستجوی بالای سایت و انتخاب فیلترهای مختلف، آگهی‌های استخدامی حوزه مرتبط با خودتان را پیدا کنید.",
    },
    {
        id: uuidGenerator(),
        title: "چگونه می‌توانم از جدیدترین آگهی‌های استخدام مطلع شوم؟",
        answer: "شما می‌توانید با فعالسازی گزینه ایمیل اطلاع رسانی و عضویت در بات تلگرامی جاب ویژن، از جدیدترین آگهی‌های استخدام و کاریابی حوزه شغلی خود مطلع شوید.",
    },
    {
        id: uuidGenerator(),
        title: "آیا آگهی‌های استخدام شهرستان‌ها نیز در سایت جاب ویژن منتشر می‌شوند؟",
        answer: "بله؛ تمامی شهرها و شهرستان‌های استان‌های مختلف ایران در سایت جاب ویژن وجود دارند و شما می‌توانید با استفاده از فیلتر «شهر» در نوار جستجوی بالای سایت، هرکدام از آن‌ها را انتخاب کنید.",
    },
    {
        id: uuidGenerator(),
        title: "آیا محدودیتی در ارسال رزومه برای آگهی‌های استخدامی در سایت جاب ویژن وجود دارد؟",
        answer: "خیر؛ شما می‌توانید رزومه خودتان را به صورت کاملا رایگان برای تعداد نامحدودی از آگهی‌های استخدام ارسال کنید.",
    },
];

interface MoreItemType {
    id: string;
    title: string;
    desc: string[] | string;
}

const MoreItems: MoreItemType[] = [
    {
        id: uuidGenerator(),
        title: "مراحل و نحوه‌ی استفاده از امکانات جاب ویژن",
        desc: "در ادامه، به طور مختصر مراحل و نحوه استفاده از امکاناتی را که سایت کاریابی و استخدامی جاب ویژن در اختیار شما قرار می‌دهد بررسی می‌کنیم.",
    },
    {
        id: uuidGenerator(),
        title: "ثبت‌نام در سایت جاب ویژن",
        desc: "برای ارسال رزومه از طریق سایت استخدامی جاب ویژن، ابتدا باید در سایت ثبت نام کنید. برای این کار روی دکمه‌ی ورود/عضویت کلیک کنید. در این جا، کافی است برای ثبت نام، ایمیل خود را وارد کرده و برای حساب کاربری‌تان یک رمز عبور انتخاب نمایید. علاوه بر آن، امکان ثبت‌نام با گوگل و لینکدین نیز به شما داده شده است.",
    },
    {
        id: uuidGenerator(),
        title: "ساخت رزومه در سایت جاب ویژن",
        desc: "بعد از ثبت‌نام در سایت، به‌راحتی می‌توانید با رزومه‌ساز آنلاین جاب ویژن، یک رزومه‌ی‌ حرفه‌ای و جذاب بسازید. سرویس ساخت رزومه جاب ویژن، این امکان را به شما می‌دهد که هم‌زمان رزومه فارسی و انگلیسی خود را تکمیل کنید. ساختار استاندارد، طراحی جذاب، یکدست بودن رزومه همه‌ کارجویان و امکان ساخت رایگان از جمله مهم‌ترین امکاناتی است که در این مرحله در اختیار شما قرار داده شده است.",
    },
    {
        id: uuidGenerator(),
        title: "ارسال رزومه از طریق سایت کاریابی و استخدام جاب ویژن",
        desc: [
            "در این مرحله می‌توانید با چند کلیک، رزومه خود را برای فرصت‌های شغلی مناسب خودتان در بانک مشاغل جاب ویژن ارسال کنید. برای پیدا کردن این آگهی‌ها به عنوان مثال آگهی های استخدام تهران یا شهرستان، می‌توانید به صفحه فرصت‌های شغلی و یا صفحه فرصت‌های شغلی پیشنهادی مراجعه کرده و آگهی‌های استخدام جدید را مشاهده کنید.",

            "همچنین در این صفحه برای کمک به جستجویی دقیق‌تر و پیدا کردن آگهی استخدام مورد نظرتان، فیلترهای مختلفی قرار داده شده است. برای مثال، با استفاده از فیلتر شهر، می‌توانید آگهی‌های استخدام امروز تهران، فرصت های استخدام اصفهان، تبریز، مشهد، شیراز و شهرهای دیگر را به طور خاص جستجو و مشاهده کنید. بعد از ارسال رزومه باید منتظر بمانید تا کارفرما با شما تماس بگیرد.",

            "پس از اینکه رزومه خود را برای کارفرما ارسال کردید، با ورود به صفحه‌ی پیگیری فرصت‌های شغلی، می‌توانید وضعیت درخواست خود را پیگیری کنید. درخواست‌های شما در یکی از پنج حالت تعیین وضعیت نشده، در حال بررسی، تأیید اولیه برای مصاحبه، رد شده و بسته شده قرار دارد.",
        ],
    },
    {
        id: uuidGenerator(),
        title: "افزایش شانس استخدام در شرکت‌های معتبر",
        desc: [
            "شما به عنوان کارجو باید کاری بیشتر از ارسال رزومه انجام دهید. بازار کار رقابتی امروز موجب شده تا برای هر آگهی استخدامی تعداد زیادی رزومه ارسال شود، بنابراین، باید به دنبال راه‌هایی برای متمایز کردن خود در میان این تعداد کارجو باشید. به ویژه در کلانشهری مثل تهران باید برای به دست آوردن موقعیت استخدام و جلب توجه کارفرمایان تلاش مضاعفی انجام داده و خود و توانایی‌هایتان را به کارفرما اثبات کنید.",

            "بالا بردن شانس استخدام با استفاده از امکانات Job vision، افزایش مهارت‌‌ها و یادگیری تخصص‌های لازم، یکی از بهترین‌ راه‌حل‌ها برای موفقیت در مسیر استخدام است. بدون شک داشتن سابقه کار مرتبط و کافی شانس استخدام شما در موقعیت شغلی مورد نظرتان را افزایش خواهد داد، اما عدم تجربه را می‌توانید با گذراندن دوره‌های تخصصی و کارآموزی جبران کنید. امروزه برای این کار لازم نیست هزینه‌ و زمان زیادی صرف کنید. دوره‌های آموزشی آنلاین متعددی وجود دارد که با شرکت در آن‌ها می‌توانید مهارت‌های لازم را کسب کنید.",

            "در سایت کاریابی جاب ویژن در قسمت توانمندتر شو، بهترین دوره‌های آموزشی هر حوزه شغلی از موسسه‌های معتبر کشور با قیمتی پایین‌تر، در اختیار شما قرار گرفته است. با گذراندن این دوره ها از طریق سایت job vision علاوه بر افزایش توانمندی‌هایتان، یک مدال در رزومه شما نیز به کارفرما نمایش داده می‌شود تا شما را از سایرین متمایز کند.",

            "علاوه بر افزایش مهارت‌های سخت، باید بتوانید مهارت‌های نرم خود را نیز افزایش دهید. مهارت‌های نرم درواقع ویژگی‌های شخصیتی و رفتارهایی است که باعث می‌شود با دیگران بهتر تعامل و همکاری داشته باشیم. داشتن مهارت‌های نرم به موفقیت در مصاحبه‌های استخدامی  شرکت ها کمک زیادی می‌کند. برای این کار لازم است به شناخت عمیقی از شخصیت خود برسید تا بتوانید نقاط ضعفتان را شناسایی کنید. علاوه بر این سنجش ویژگی‌های شخصیتی شما برای بسیاری ازکارفرمایان حائز اهمیت است.",

            "به همین دلیل، ما در سایت کاریابی جاب ویژن، 5 آزمون شخصیت شناسی معتبر را در اختیارتان قرار دادیم تا با شرکت در آن‌ها به درک عمیق‌تری از توانمندی‌ها و عدم توانمندی‌های خود برسید.",

            "استخدام شدن و کاریابی همیشه سخت نیست، فقط کافیست تا راه و رسم آن را بلد باشید. ما در این راه کنار شما هستیم تا بتوانید به شغل ایده آل خود برسید.",
        ],
    },
];

interface quickAccessSubLinkType {
    id: string;
    title: string;
    link: string;
}

interface quickAccessLinkType {
    id: string;
    title: string;
    link: string;
    sublink: quickAccessSubLinkType[];
}

interface quickAccessItemType {
    id: string;
    title: string;
    links: quickAccessLinkType[];
}

const quickAccessItems: quickAccessItemType[] = [
    {
        id: uuidGenerator(),
        title: "کارجویان",
        links: [
            { id: uuidGenerator(), title: "رزومه ساز دو زبانه", link: "createCv", sublink: [] },
            { id: uuidGenerator(), title: "جستجوی فرصت‌های شغلی", link: "jobs", sublink: [] },
            {
                id: uuidGenerator(),
                title: "آزمون‌های خود شناسی",
                link: "",
                sublink: [
                    {
                        id: uuidGenerator(),
                        title: "آزمون شخصیت شناسی MBTI",
                        link: "test1",
                    },
                    {
                        id: uuidGenerator(),
                        title: "آزمون تیپ سنجی شغلی Holland",
                        link: "test2",
                    },
                    {
                        id: uuidGenerator(),
                        title: "آزمون شخصیت شناسی NEO",
                        link: "test3",
                    },
                    {
                        id: uuidGenerator(),
                        title: "آزمون هوش های چندگانه",
                        link: "test4",
                    },
                    {
                        id: uuidGenerator(),
                        title: "آزمون هوش هیجانی Bar-On",
                        link: "test5",
                    },
                ],
            },
            { id: uuidGenerator(), title: "سوالات متداول", link: "faqQuestion", sublink: [] },
            { id: uuidGenerator(), title: "دوره‌های آموزشی", link: "test6", sublink: [] },
            { id: uuidGenerator(), title: "رده بندی شرکت ها", link: "test7", sublink: [] },
            { id: uuidGenerator(), title: "آشنایی با شرکت ها", link: "test8", sublink: [] },
            { id: uuidGenerator(), title: "داده‌های بازار کار", link: "test9", sublink: [] },
        ],
    },
    {
        id: uuidGenerator(),
        title: "کارفرمایان",
        links: [
            { id: uuidGenerator(), title: "ثبت آگهی جدید", link: "test10", sublink: [] },
            { id: uuidGenerator(), title: "جستجوی بانک رزومه", link: "test11", sublink: [] },
            { id: uuidGenerator(), title: "ارزیابی کارجویان", link: "test12", sublink: [] },
            { id: uuidGenerator(), title: "پوشه‌‌ رزومه‌ها", link: "test13", sublink: [] },
            { id: uuidGenerator(), title: "تعرفه‌ها", link: "test14", sublink: [] },
            { id: uuidGenerator(), title: "نمایشگاه‌کار", link: "test15", sublink: [] },
            { id: uuidGenerator(), title: "بخش کارفرمایان", link: "test16", sublink: [] },
            { id: uuidGenerator(), title: "HR Vision", link: "test17 ", sublink: [] },
        ],
    },
    {
        id: uuidGenerator(),
        title: "درباره جاب ویژن",
        links: [
            { id: uuidGenerator(), title: "درباره ما", link: "createCv", sublink: [] },
            { id: uuidGenerator(), title: "سوالات متداول", link: "createCv", sublink: [] },
            { id: uuidGenerator(), title: "تماس با ما", link: "createCv", sublink: [] },
            { id: uuidGenerator(), title: "قوانین و مقررات", link: "createCv", sublink: [] },
        ],
    },
];

const Footer: React.FC = () => {
    const [isMore, setIsMore] = useState(false);
    return (
        <>
            <footer className="text-jv-light pb-5 bg-jv-gray overflow-hidden">
                {/*//? -------------------------------------- FAQ -------------------------------------- */}
                <section className="py-10 px-3 md:px-10 lg:px-24">
                    <h1 className="text-base mb-3 lg:text-2xl">سوالات متداول درباره سایت استخدام و کاریابی جاب ویژن</h1>
                    <div className="grid">
                        {faqItems.map((item, index) => (
                            <Accordion
                                key={item.id}
                                index={index + 1}
                                isResponsive
                                theme="Dark"
                                title={item.title}
                                content={item.answer}
                                isOpen={index === 0 ? true : false}
                                listStyle="Ol"
                                noSpace
                            ></Accordion>
                        ))}
                    </div>
                </section>
                {/*//! -------------------------------------- FAQ -------------------------------------- */}

                {/*//? -------------------------------------- About Compony -------------------------------------- */}
                <article className="py-5 px-3 md:px-10 lg:px-24">
                    <div>
                        <h1 className="text-base mb-3 lg:text-2xl">
                            استخدام با معتبرترین سایت کاریابی و استخدامی ایران
                        </h1>
                        <p className="text-xs text-justify leading-5 lg:text-sm">
                            پیدا کردن شغل دلخواه و فرصت استخدام جدید در سازمانی معتبر با شرایط مطلوب کاری آسان نیست.
                            فرآیند پیدا کردن شغل و کاریابی، همواره مسیری با ناهمواری‌های زیاد برای کارجویان بوده و هست.
                            وضعیت نه‌چندان مطلوب بازار کار در ایران از یک طرف و عدم کسب مهارت‌های تخصصی توسط کارجویان از
                            طرف دیگر، این موضوع را به یک مسئله بزرگ در جامعه تبدیل کرده است. همه کارجویان در هر حوزه،
                            شهر، شغل و سنی تمایل به کوتاه و آسان‌تر کردن این مسیر ناهموار و تسریع در استخدام خود دارند.
                            برای موفقیت در این راه به یک رزومه حرفه‌ای، دسترسی به آگهی‌های استخدام
                            {isMore
                                ? " جدید، شناخت سازمان‌ها، مهارت تخصصی و در نهایت ارسال رزومه به فرصت‌های شغلی متناسب با خود نیاز دارید."
                                : "..."}
                        </p>
                    </div>
                    <div
                        className={`wrapper overflow-hidden grid transition-all duration-700 ${
                            isMore ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className={`min-h-0`}>
                            <section className="block mb-16">
                                {MoreItems.map((item) => (
                                    <div key={item.id} className="my-5">
                                        <h1 className="text-sm mb-1 lg:text-xl">{item.title}</h1>
                                        {Array.isArray(item.desc) ? (
                                            item.desc.map((des) => (
                                                <p className="text-xs text-justify leading-5 mb-3 lg:text-sm">{des}</p>
                                            ))
                                        ) : (
                                            <p className="text-xs text-justify leading-5 lg:text-sm">{item.desc}</p>
                                        )}
                                    </div>
                                ))}
                            </section>
                            <section className="block mb-16">
                                <h1 className="text-2xl">لینک‌های مرتبط</h1>
                                <ul className="flex my-5">
                                    <li className="ml-5">
                                        <Link
                                            className="text-xs text-inherit hover:text-jv-primary lg:text-sm"
                                            style={{ textDecoration: "underline" }}
                                            to=""
                                        >
                                            استخدام کارگزاری
                                        </Link>
                                    </li>
                                    <li className="ml-5">
                                        <Link
                                            className="text-xs text-inherit hover:text-jv-primary lg:text-sm"
                                            style={{ textDecoration: "underline" }}
                                            to=""
                                        >
                                            استخدام بیمه
                                        </Link>
                                    </li>
                                    <li className="ml-5">
                                        <Link
                                            className="text-xs text-inherit hover:text-jv-primary lg:text-sm"
                                            style={{ textDecoration: "underline" }}
                                            to=""
                                        >
                                            استخدام خودرو
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                            <section className="block mb-16">
                                <h1 className="text-2xl">آخرین مطالب بلاگ</h1>
                                <ul className="my-5 grid grid-cols-3">
                                    <li className="col-span-3 m-2 py-3 rounded-xl bg-jv-lightGray lg:col-span-1">
                                        <Link
                                            className="w-full h-full text-inherit flex items-center justify-center"
                                            to=""
                                        >
                                            راهنمای جامع استخدام
                                        </Link>
                                    </li>
                                    <li className="col-span-3 m-2 py-3 rounded-xl bg-jv-lightGray lg:col-span-1">
                                        <Link
                                            className="w-full h-full text-inherit flex items-center justify-center"
                                            to=""
                                        >
                                            راهنمای جامع رزومه نویسی برای کارجویان
                                        </Link>
                                    </li>
                                    <li className="col-span-3 m-2 py-3 rounded-xl bg-jv-lightGray lg:col-span-1">
                                        <Link
                                            className="w-full h-full text-inherit flex items-center justify-center"
                                            to=""
                                        >
                                            گزارش افزایش حقوق 1402 کارگران
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center my-2">
                        <div
                            onClick={() => setIsMore((prev) => !prev)}
                            className="transition-all duration-300 flex items-center justify-center cursor-pointer"
                        >
                            <span className="text-xs px-3">{isMore ? "مشاهده کمتر" : "مشاهده بیشتر"}</span>
                            <IoIosArrowDown className={`${isMore ? "rotate-180" : ""} text-xs`}></IoIosArrowDown>
                        </div>
                    </div>
                </article>
                {/*//! -------------------------------------- About Compony -------------------------------------- */}

                {/*//? -------------------------------------- Quick Access -------------------------------------- */}
                <section className="py-5 px-3 md:px-10 lg:px-24">
                    <div className="grid grid-cols-12">
                        <div className="col-span-9">
                            <ul className="desktop py-2 hidden lg:flex">
                                {quickAccessItems.map((item) => (
                                    <li className="w-full ml-5" key={item.id}>
                                        <span className="danaBold mb-3 inline-block">{item.title}</span>
                                        {item.links.length ? (
                                            <ul className="!text-sm flex flex-col gap-2">
                                                {item.links.map((link, index) =>
                                                    link.sublink.length ? (
                                                        <Accordion
                                                            index={index + 1}
                                                            isResponsive={false}
                                                            theme="Light"
                                                            title={link.title}
                                                            content={"dddddddd"}
                                                            listStyle="Ul"
                                                        ></Accordion>
                                                    ) : (
                                                        <li>
                                                            <Link className="text-inherit" to={link.link}>
                                                                {link.title}
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-3 flex justify-end items-center">
                            <div className="h-36 p-2 m-1 rounded-xl bg-jv-light flex items-center justify-center">
                                <img className="h-full" src="/images/Enamad.webp" alt="" />
                            </div>
                            <div className="h-36 p-2 m-1 rounded-xl bg-jv-light flex items-center justify-center">
                                <img className="h-full" src="/images/samandehipng.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                {/*//! -------------------------------------- Quick Access -------------------------------------- */}

                {/*//? -------------------------------------- Social Media -------------------------------------- */}
                <section className="py-5 px-3 md:px-10 lg:px-24 border-t-[1px] border-solid border-jv-lightGray">
                    <div className="grid grid-cols-2">
                        <div className="pl-5 flex flex-col justify-between col-span-1">
                            <p className="w-10/12 text-justify">
                                جاب‌ویژن بعنوان اولین ارائه دهنده بسته جامع خدمات کاریابی و استخدام، تجربه برگزاری موفق
                                ادوار مختلف نمایشگاه‌های کار شریف و ایران را در کارنامه کاری خود دارد. سیستم هوشمند
                                انطباق، رزومه ساز دو زبانه، تست‌های خودشناسی، ارتقای توانمندی‌ها به کمک پیشنهاد دوره‌های
                                آموزشی و همکاری با معتبرترین سازمان‌ها برای استخدام از ویژگی‌های متمایز جاب‌ویژن است.
                            </p>
                            <div className="h-20 flex items-end">
                                <img className="w-20" src={LogoWhite} alt="" />
                            </div>
                        </div>
                        <div className="pr-5 flex flex-col justify-between col-span-1">
                            <div>
                                <p className="mb-4">جاب‌ویژن محصولی دانش بنیان شناخته شده است.</p>
                                <p className="mb-4">
                                    دارای مجوز رسمی کاریابی الکترونیکی از وزارت کار، تعاون و رفاه اجتماعی
                                </p>
                            </div>
                            <ul className="text-jv-white text-2xl flex items-center">
                                <li className="ml-5">
                                    <Link title="instagram" className="text-inherit" to={"instagram"}>
                                        <BsInstagram></BsInstagram>
                                    </Link>
                                </li>
                                <li className="ml-5">
                                    <Link title="linkedin" className="text-inherit" to={"linkedin"}>
                                        <BsLinkedin></BsLinkedin>
                                    </Link>
                                </li>
                                <li className="ml-5">
                                    <Link title="telegram" className="text-inherit" to={"telegram"}>
                                        <FaTelegramPlane></FaTelegramPlane>
                                    </Link>
                                </li>
                                <li className="ml-5">
                                    <Link title="twitter" className="text-inherit" to={"x"}>
                                        <FaXTwitter></FaXTwitter>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/*//! -------------------------------------- Social Media -------------------------------------- */}
            </footer>
        </>
    );
};

export default Footer;
