import React, { useState } from "react";
import { faqItems, MoreItems, quickAccessItems } from "./Footer.type";

// Components
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion";

// Icons
import LogoWhite from "/Svg/Logo/WhiteColorLogo.svg";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const Footer: React.FC = () => {
    const [isMore, setIsMore] = useState(false);
    return (
        <>
            <footer className="text-jv-light bg-jv-gray overflow-hidden">
                {/*//? -------------------------------------- FAQ -------------------------------------- */}
                <section className="py-10 px-3 md:px-10 lg:px-24">
                    <h1 className="text-base mb-3 lg:text-2xl">سوالات متداول درباره سایت استخدام و کاریابی جاب ویژن</h1>
                    <div className="grid">
                        {faqItems.map((item, index) => (
                            <Accordion
                                key={item.id}
                                type="Content"
                                index={index + 1}
                                isResponsive
                                theme="Dark"
                                iconType="Arrow"
                                title={item.title}
                                content={item.answer}
                                isOpen={index === 0 ? true : false}
                                listStyle="Ol"
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
                                            item.desc.map((des, index) => (
                                                <p
                                                    key={index + 1}
                                                    className="text-xs text-justify leading-5 mb-3 lg:text-sm"
                                                >
                                                    {des}
                                                </p>
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
                    <div className="flex flex-col items-start justify-between md:flex-row">
                        <div className="w-full my-5 md:my-0 md:w-7/12">
                            <ul className="desktop hidden lg:flex">
                                {quickAccessItems.map((item) => (
                                    <li key={item.id} className="w-full ml-5">
                                        <span className="danaBold mb-3 inline-block">{item.title}</span>
                                        {item.links.length ? (
                                            <ul className="!text-sm flex flex-col gap-2">
                                                {item.links.map((link, index) =>
                                                    link.sublink.length ? (
                                                        <Accordion
                                                            key={link.id}
                                                            isResponsive
                                                            listStyle="Ul"
                                                            type="Item"
                                                            textStyle="text-sm truncate"
                                                            index={index + 1}
                                                            theme="transparent"
                                                            title={link.title}
                                                            childArray={link.sublink}
                                                            propertyChildName="title"
                                                            noSpace
                                                            iconType="Menu"
                                                        ></Accordion>
                                                    ) : (
                                                        <li key={link.id}>
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
                            <div className="mobile flex flex-col lg:hidden">
                                {quickAccessItems.map((item, index) => (
                                    <div key={item.id} className="w-full ml-5">
                                        <Accordion
                                            isResponsive
                                            listStyle="Ul"
                                            index={index + 1}
                                            title={item.title}
                                            type="Menu"
                                            iconType="Menu"
                                            theme="Dark"
                                            childArray={item.links}
                                            propertyChildName="title"
                                            iSubItem
                                            propertySubName="sublink"
                                        ></Accordion>
                                    </div>
                                ))}
                                <div></div>
                            </div>
                        </div>
                        <div className="w-full my-5 flex items-center justify-center md:my-0 md:w-4/12 md:justify-end">
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
                <section className="pt-5 px-3 md:px-10 lg:px-24 border-t-[1px] border-solid border-jv-lightGray">
                    <div className="">
                        <div className="text-base py-10 lg:text-sm flex flex-col justify-between items-start row-span-1 lg:flex-row">
                            <div className="w-full mb-5 lg:w-1/2 lg:mb-0 lg:ml-5">
                                <p className="lg:w-9/12">
                                    جاب‌ویژن بعنوان اولین ارائه دهنده بسته جامع خدمات کاریابی و استخدام، تجربه برگزاری
                                    موفق ادوار مختلف نمایشگاه‌های کار شریف و ایران را در کارنامه کاری خود دارد. سیستم
                                    هوشمند انطباق، رزومه ساز دو زبانه، تست‌های خودشناسی، ارتقای توانمندی‌ها به کمک
                                    پیشنهاد دوره‌های آموزشی و همکاری با معتبرترین سازمان‌ها برای استخدام از ویژگی‌های
                                    متمایز جاب‌ویژن است.
                                </p>
                            </div>
                            <div className="w-full my-5 lg:w-1/2 lg:my-0 lg:mr-5">
                                <p className="mb-4">جاب‌ویژن محصولی دانش بنیان شناخته شده است.</p>
                                <p className="mb-4">
                                    دارای مجوز رسمی کاریابی الکترونیکی از وزارت کار، تعاون و رفاه اجتماعی
                                </p>
                            </div>
                        </div>
                        <div className="py-5 flex justify-between items-start row-span-1 border-t-[1px] border-solid border-jv-lightGray lg:border-transparent">
                            <div className="w-1/2 ml-5">
                                <img className="w-20" src={LogoWhite} alt="" />
                            </div>
                            <ul className="w-1/2 mr-5 text-jv-white text-2xl flex items-center justify-end lg:justify-start">
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
