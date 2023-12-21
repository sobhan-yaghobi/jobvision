import React from "react";
import useBoxList from "../../Hooks/useBoxList";
// Types
import { AboutUsItemArray } from "./Home.type";

// Animation
import {
    ShortShowFromBottom,
    ShowAndHideOpacity_Ex,
    ShowAndHideScale_Ex,
    ShowOpacity,
    ShowShortFromBottomHiden_Var,
} from "../../Animations/UtilsAnimation";

// Hooks

// Functions
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import useWindowsSize from "../../Hooks/useWindowsSize";
import { includes } from "lodash";
import { motion } from "framer-motion";

// Components
import Button from "../../Components/Button/Button";
import SearchFrom from "../../Components/SearchFrom/SearchForm";
import MapCircle from "../../Components/MapCircle/MapCircle";
import AdvertisingBox from "../../Components/AdvertisingBox/AdvertisingBox";
import { AdsSkeleton } from "../../Components/Skeleton/Skeleton";
import CompanySlider from "../../Components/CompanySlider/CompanySlider";
import WhyUs from "../../Components/WhyUs/WhyUs";

const Home: React.FC = () => {
    const { boxList, isLoading } = useBoxList();
    const [WindowsSize] = useWindowsSize();

    console.log("boxList ", boxList);

    return (
        <>
            <Header></Header>
            {/*//? -------------------------------------- Landing -------------------------------------- */}
            <div className="relative current-mega-height-svh md:h-auto pt-5 px-2 grid grid-cols-2 grid-rows-2 justify-between md:py-2 md:px-10 md:grid-rows-2 md:items-center lg:grid-rows-3 lg:px-24 z-10">
                <motion.div
                    variants={ShowShortFromBottomHiden_Var}
                    custom={0.3}
                    initial="hidden"
                    animate="visible"
                    className="right-landing py-1 text-center md:text-right flex flex-col justify-evenly col-span-2 row-span-1 md:col-span-1 lg:row-span-2"
                >
                    <h1 className="text-2xl lg:text-3xl danaBold">
                        <span className="text-inherit text-jv-primary lg:mx-2">38,346</span> آگهی شغلی در
                        <span className="text-inherit text-jv-primary lg:mx-2"> 489</span> شهر
                    </h1>
                    <p className="my-3 md:my-5 text-lg lg:text-lg">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                    </p>
                </motion.div>
                <motion.div
                    variants={ShowAndHideOpacity_Ex}
                    transition={{ delay: 0.8 }}
                    initial="hidden"
                    animate="visible"
                    className="left-landing col-span-1 row-span-1 hidden md:block lg:row-span-2"
                >
                    {WindowsSize.innerWidth <= 768 ? null : <MapCircle></MapCircle>}
                </motion.div>
                <motion.div
                    variants={ShowShortFromBottomHiden_Var}
                    custom={0.3}
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

            <div className="py-5"></div>
            {/*//? -------------------------------------- Company Box Slider -------------------------------------- */}
            <CompanySlider />
            {/*//! -------------------------------------- Company Box Slider -------------------------------------- */}
            <div className="py-10"></div>

            {/*//? -------------------------------------- Advertising -------------------------------------- */}
            <div className="min-h-screen px-1 pt-5 flex overflow-hidden justify-center flex-col md:px-10 lg:px-24">
                <h1 className="px-2 mb-5 text-xl lg:h-20 lg:mb-0 lg:text-3xl">تازه‌ترین آگهی‌های شغلی برای شما</h1>
                <motion.div
                    variants={ShortShowFromBottom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 20 }}
                    className="w-full grid grid-cols-12 grid-rows-3"
                >
                    {Array(8)
                        .fill("")
                        .map((item, index) => (
                            <motion.div
                                key={index + 1}
                                variants={ShowOpacity}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className={`${includes([3, 4], index) ? "xl:col-span-6 flex" : "xl:col-span-4"} ${
                                    index === 3 ? "flex justify-end" : ""
                                }  row-span-1 p-2 col-span-12 lg:col-span-6`}
                            >
                                {includes([3, 4], index) ? (
                                    <div className={`w-full xl:w-2/3`}>
                                        <AdsSkeleton loading={boxList[index] !== undefined ? isLoading : true}>
                                            {boxList[index] !== undefined ? (
                                                <AdvertisingBox data={boxList[index]} type="ShowSendCv" />
                                            ) : null}
                                        </AdsSkeleton>
                                    </div>
                                ) : (
                                    <AdsSkeleton loading={boxList[index] !== undefined ? isLoading : true}>
                                        {boxList[index] !== undefined ? (
                                            <AdvertisingBox data={boxList[index]} type="ShowSendCv" />
                                        ) : null}
                                    </AdsSkeleton>
                                )}
                            </motion.div>
                        ))}
                </motion.div>
            </div>
            {/*//! -------------------------------------- Advertising -------------------------------------- */}

            <div className="py-5"></div>

            {/*//? -------------------------------------- Advertising & About Us -------------------------------------- */}
            <div className="p-2 md:px-10 lg:px-24">
                <div className="bg-jv-light rounded-3xl p-5">
                    <motion.div
                        variants={ShowAndHideScale_Ex}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-jv-white py-5 rounded-xl flex flex-col items-center lg:px-4 lg:flex-row-reverse"
                    >
                        <div className="flex items-center justify-center lg:w-1/2">
                            <img className="w-full sm:w-2/3 md:w-1/2 lg:hidden" src="/images/newsMobile.webp" alt="" />
                            <img className="w-full hidden lg:block" src="/images/newsDesktop.webp" alt="" />
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
                    </motion.div>
                    <div className="grid grid-cols-2">
                        <motion.div
                            variants={ShowAndHideScale_Ex}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mt-5 py-5 px-1 rounded-xl bg-jv-white col-span-2 flex flex-col items-center justify-center text-center lg:col-span-1 lg:ml-2 lg:items-start lg:text-right lg:p-5 lg:flex-row"
                        >
                            <div className="flex items-center justify-center lg:h-full lg:w-1/3 ">
                                <img className="w-2/3 md:w-1/3 lg:w-full" src="/images/createCv.webp" alt="" />
                            </div>
                            <div className="my-5 lg:my-0 lg:h-full lg:w-2/3 lg:flex lg:flex-col lg:justify-between items-start">
                                <h2 className="lg:text-base">رزومه ساز جاب ویژن</h2>
                                <p className="my-5">رزومه ای استاندارد به دو زبان فارسی و انگلیسی بسازید.</p>
                                <Button
                                    ClassName="m-auto lg:m-[unset]"
                                    textColor="primary"
                                    size="small"
                                    isLoading={false}
                                    ClickHandler={() => {}}
                                >
                                    ساخت رزومه
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={ShowAndHideScale_Ex}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="mt-5 py-5 px-1 rounded-xl bg-jv-white col-span-2 flex flex-col items-center justify-center text-center lg:col-span-1 lg:mr-2 lg:items-start lg:text-right lg:p-5 lg:flex-row"
                        >
                            <div className="flex items-center justify-center lg:h-full lg:w-1/3 ">
                                <img className="w-2/3 md:w-1/3 lg:w-full" src="/images/salary.webp" alt="" />
                            </div>
                            <div className="my-5 lg:my-0 lg:h-full lg:w-2/3 lg:flex lg:flex-col lg:justify-between items-start">
                                <h2 className="lg:text-base">ماشین حساب حقوق و دستمزد</h2>
                                <p className="my-5">
                                    از حقوق دریافتی افراد در مشاغل مختلف آگاه شوید و تخمین دقیق تری از حقوق منصفانه خود
                                    داشته باشید.
                                </p>
                                <Button
                                    ClassName="m-auto lg:m-[unset]"
                                    textColor="primary"
                                    size="small"
                                    isLoading={false}
                                    ClickHandler={() => {}}
                                >
                                    حقوق خود را محاسبه کنید
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="mt-28 lg:mt-16 flex flex-col items-center justify-start lg:h-56 lg:relative">
                        <motion.h1
                            variants={ShowAndHideScale_Ex}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-jv-primary"
                        >
                            جاب ویژن
                        </motion.h1>
                        <h2>دستیار استخدامی شما</h2>
                        <div className="w-full h-auto grid grid-cols-4 mt-5">
                            {AboutUsItemArray.map((box, index) => (
                                <div key={box.id} className="col-span-4 md:col-span-2 lg:col-span-1 my-5 h-72 px-3">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: index * 0.15 }}
                                        viewport={{ once: true }}
                                        className="AboutUsBox"
                                    >
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            transition={{ ease: "circIn", bounce: 20, delay: index * 0.2 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            className={`AboutUsIconBox ${box.customClass}`}
                                        >
                                            <img className="w-full" src={box.iconSrc} alt="" />
                                        </motion.span>
                                        <h4 className="my-7 danaBold">{box.title}</h4>
                                        <p>{box.desc}</p>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:py-32"></div>
            {/*//! -------------------------------------- Advertising & About Us -------------------------------------- */}
            <div className="py-10 lg:hidden"></div>

            {/*//? -------------------------------------- WHY US ? -------------------------------------- */}
            <WhyUs />
            {/*//! -------------------------------------- WHY US ? -------------------------------------- */}
            <div className="py-10 lg:py-0"></div>
            <Footer></Footer>
        </>
    );
};

export default Home;
