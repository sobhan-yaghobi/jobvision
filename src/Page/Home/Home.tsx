import React, { useRef, useEffect } from "react";
import Button from "../../Components/Button/Button";
import MapCircle from "../../Components/MapCircle/MapCircle";
import { motion, useAnimation, useInView } from "framer-motion";
import SearchFrom from "../../Components/SearchFrom/SearchFrom";
import AdvertisingBox from "../../Components/AdvertisingBox/AdvertisingBox";
import { includes } from "lodash";

const titleSideVariantWrapper = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            opacity: {
                delay: 1,
            },
        },
    },
};
const svgVarinetWrapper = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

const showAdvertisingBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

const showAdvertisingBoxVariantsRight = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

const showAdvertisingBoxVariantsLeft = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

const Home: React.FC = () => {
    return (
        <>
            {/*//? -------------------------------------- Landing -------------------------------------- */}
            <div className="current-mega-height overflow-hidden pt-5 px-2 grid grid-cols-2 grid-rows-2 justify-between md:py-2 md:px-10 md:grid-rows-2 md:items-center lg:grid-rows-3 lg:px-24">
                <motion.div
                    variants={titleSideVariantWrapper}
                    initial="hidden"
                    animate="visible"
                    className="right-landing py-1 flex flex-col justify-evenly col-span-2 row-span-1 md:col-span-1 lg:row-span-2"
                >
                    <h1 className="text-xl lg:text-3xl">
                        <span className="text-jv-primary danaBold text-3xl lg:text-3xl lg:mx-2">38,346</span> آگهی شغلی
                        در
                        <span className="text-jv-primary danaBold text-3xl lg:text-3xl lg:mx-2"> 489</span> شهر
                    </h1>
                    <p className="my-3 md:my-5 text-xs lg:text-lg">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                    </p>
                    <div>
                        <Button
                            ClassName="w-full md:w-auto"
                            textColor="light"
                            size="middle"
                            isLoading={false}
                            ClickHandler={() => {}}
                        >
                            همین الان روزمه بساز
                        </Button>
                    </div>
                </motion.div>
                <motion.div
                    variants={svgVarinetWrapper}
                    initial="hidden"
                    animate="visible"
                    className="left-landing col-span-1 row-span-1 hidden md:block lg:row-span-2"
                >
                    <MapCircle></MapCircle>
                </motion.div>
                <motion.div
                    variants={titleSideVariantWrapper}
                    initial="hidden"
                    animate="visible"
                    className="col-span-2 row-span-1 h-full"
                >
                    <div className="w-full h-full flex flex-col items-start justify-center">
                        <h2 className="mb-5 pr-2 text-xl">دنبال چه شغلی می‌گردید؟</h2>
                        <SearchFrom></SearchFrom>
                    </div>
                </motion.div>
            </div>
            {/*//! -------------------------------------- Landing -------------------------------------- */}

            {/*//? -------------------------------------- Advertising -------------------------------------- */}
            <div className="xl:h-d-screen px-1 pt-5 flex overflow-hidden justify-center flex-col md:px-10 lg:px-24">
                <h1 className="px-2 mb-5 text-xl lg:h-20 lg:mb-0 lg:text-3xl">تازه‌ترین آگهی‌های شغلی برای شما</h1>
                <div className="w-full xl:current-mega-height grid grid-cols-12 grid-rows-3">
                    {Array(8)
                        .fill("")
                        .map((value, index) => (
                            <motion.div
                                key={index + 1}
                                variants={
                                    includes([1, 6], index)
                                        ? showAdvertisingBoxVariants
                                        : includes([0, 3, 5], index)
                                        ? showAdvertisingBoxVariantsRight
                                        : includes([2, 4, 7], index)
                                        ? showAdvertisingBoxVariantsLeft
                                        : undefined
                                }
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={index}
                                className={`${includes([3, 4], index) ? "xl:col-span-6 flex" : "xl:col-span-4"} ${
                                    index === 3 ? "flex justify-end" : ""
                                }  row-span-1 p-2 col-span-12 lg:col-span-6`}
                            >
                                {includes([3, 4], index) ? (
                                    <div className={`w-full xl:w-2/3`}>
                                        <AdvertisingBox IsImportant data={[]}></AdvertisingBox>
                                    </div>
                                ) : (
                                    <AdvertisingBox data={[]}></AdvertisingBox>
                                )}
                            </motion.div>
                        ))}
                </div>
            </div>
            {/*//! -------------------------------------- Advertising -------------------------------------- */}

            <div className="py-5"></div>

            {/*//? -------------------------------------- Advertising & About Us -------------------------------------- */}
            <div className="p-2 md:px-24">
                <div className="bg-jv-light rounded-3xl">
                    <div className="py-5 rounded-xl flex flex-col items-center lg:px-4 lg:flex-row-reverse">
                        <div className="flex items-center justify-center lg:w-1/2">
                            <img className="w-full sm:w-2/3 md:w-1/2 lg:hidden" src="/images/newsMobile.png" alt="" />
                            <img className="w-full hidden lg:block" src="/images/newsDesktop.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center items-center text-center lg:w-1/2 lg:text-right lg:items-start lg:pr-5">
                            <h3>استخدام‌های سراسری و دولتی</h3>
                            <p className="my-5 px-2 lg:text-justify">
                                در این قسمت، آخرین فرصت‌های استخدام سراسری و دولتی به‌طور مرتب به‌روزرسانی و منتشر
                                می‌شوند. به صفحه استخدام‌های سراسری سر بزنید و از بررسی روزانه ده‌ها سایت و مرجع خبری
                                دیگر بی‌نیاز شوید.
                            </p>
                            <Button textColor="primary" size="middle" isLoading={false} ClickHandler={() => {}}>
                                مشاهده فرصت های شغلی
                            </Button>
                        </div>
                    </div>
                    <div className="mt-28 lg:mt-16 flex flex-col items-center justify-start lg:h-56 lg:relative">
                        <h1 className="text-jv-primary">جاب ویژن</h1>
                        <h2>دستیار استخدامی شما</h2>
                        <div className="w-full h-auto grid grid-cols-4 mt-5">
                            <div className="col-span-4 md:col-span-2 lg:col-span-1 my-5 h-72 px-3">
                                <div className="AboutUsBox">
                                    <span className="AboutUsIconBox from-[#f8f9fa] to-[#ec8386] shadow-[-10px_10px_30px_-9px_#ff979a,10px_10px_30px_-9px_#c96f72]">
                                        <img className="w-full" src="/images/worker.png" alt="" />
                                    </span>
                                    <h4 className="my-7 danaBold">کارجوی همراه</h4>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک
                                        است.
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-1 my-5 h-72 px-3">
                                <div className="AboutUsBox">
                                    <span className="AboutUsIconBox from-[#f8f9fa] to-[#A5A8F2] shadow-[-10px_10px_30px_-9px_#9396d7,10px_10px_30px_-9px_#b7baff]">
                                        <img className="w-full" src="/images/skyline.png" alt="" />
                                    </span>
                                    <h4 className="my-7 danaBold">سازمان‌ های در حال همکاری</h4>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک
                                        است.
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-1 my-5 h-72 px-3">
                                <div className="AboutUsBox">
                                    <span className="AboutUsIconBox from-[#f8f9fa] to-[#90D1F4] shadow-[-10px_10px_30px_-9px_#80bad9,10px_10px_30px_-9px_#a0e8ff]">
                                        <img className="w-full" src="/images/job-search.png" alt="" />
                                    </span>
                                    <h4 className="my-7 danaBold">موقعیت‌ شغلی فعال</h4>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک
                                        است.
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-1 my-5 h-72 px-3">
                                <div className="AboutUsBox">
                                    <span className="AboutUsIconBox from-[#f8f9fa] to-[#F5CD8D] shadow-[-10px_10px_30px_-9px_#dab67d,10px_10px_30px_-9px_#ffe49d]">
                                        <img className="w-full" src="/images/hiring.png" alt="" />
                                    </span>
                                    <h4 className="my-7 danaBold">استخدام موفق</h4>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک
                                        است.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:py-32"></div>
            {/*//! -------------------------------------- Advertising & About Us -------------------------------------- */}
        </>
    );
};

export default Home;
