import React, { useState } from "react";
// Types
import { WhyUsDescType, WhyUsType, AboutUsItemArray, whyUsArray } from "./Home.type";
import { AdvertisingArray } from "../../Components/AdvertisingBox/AdvertisingBox.type";

// Animation
import {
    ShowAndHideOpacity_Ex,
    ShowAndHideScale_Ex,
    ShowFromBottom,
    ShowFromLeft,
    ShowFromRight,
    ShowItemsDelay_Var,
} from "../../Animations/UtilsAnimation";

// Hooks
import useAnimationStop from "../../Hooks/useAnimationStop";

// Functions
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import useWindowsSize from "../../Hooks/useWindowsSize";
import { includes, chunk } from "lodash";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Button from "../../Components/Button/Button";
import SearchFrom from "../../Components/SearchFrom/SearchFrom";
import MapCircle from "../../Components/MapCircle/MapCircle";
import AdvertisingBox from "../../Components/AdvertisingBox/AdvertisingBox";
import CompanyBox from "../../Components/CompanyBox/CompanyBox";
import Accordion from "../../Components/Accordion/Accordion";

// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Home: React.FC = () => {
    const isEven = (num: number): boolean => num === 0 || !!(num && !(num % 2));
    const [WindowsSize] = useWindowsSize();

    //? ---------------------------------- WHY Us
    const [whyUs, setWhyUs] = useState<WhyUsType>({
        mainItems: [] as WhyUsDescType[],
        isShow: false,
        mainNumber: -1,
    });

    const stopAnimate = () => {
        setWhyUs({
            mainItems: [] as WhyUsDescType[],
            isShow: false,
            mainNumber: -1,
        });
    };

    const doAnimate = () => {
        setWhyUs((prev) => {
            const arrays = chunk(whyUsArray, 3);

            const mainNumber = prev.mainNumber === arrays.length - 1 ? 0 : ++prev.mainNumber;

            const mainItems: WhyUsDescType[] = [...arrays[mainNumber]];
            return { isShow: true, mainNumber, mainItems };
        });
        setTimeout(() => {
            setWhyUs((prev) => ({
                mainItems: [] as WhyUsDescType[],
                isShow: false,
                mainNumber: prev.mainNumber,
            }));
        }, 3500);
    };

    useAnimationStop({
        screen: "lg",
        animation: doAnimate,
        diActiveAnimation: stopAnimate,
        intervalTime: 4000,
    });
    //! ---------------------------------- WHY Us

    return (
        <>
            <Header></Header>
            {/*//? -------------------------------------- Landing -------------------------------------- */}
            <div className="current-mega-height-dvh md:h-auto overflow-hidden pt-5 px-2 grid grid-cols-2 grid-rows-2 justify-between md:py-2 md:px-10 md:grid-rows-2 md:items-center lg:grid-rows-3 lg:px-24">
                <motion.div
                    variants={ShowFromRight}
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
                    variants={ShowFromLeft}
                    initial="hidden"
                    animate="visible"
                    className="left-landing col-span-1 row-span-1 hidden md:block lg:row-span-2"
                >
                    {WindowsSize.innerWidth <= 768 ? null : <MapCircle></MapCircle>}
                </motion.div>
                <motion.div
                    variants={ShowFromBottom}
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
            <motion.div
                variants={ShowItemsDelay_Var}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full px-2 md:px-10 lg:px-24"
            >
                <Swiper
                    className={`rounded-md`}
                    slidesPerView={"auto"}
                    spaceBetween={16}
                    breakpoints={{
                        540: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                >
                    {Array(7)
                        .fill("")
                        .map((item, index) => (
                            <SwiperSlide key={index + 1} className="!w-52 !h-64 select-none">
                                <CompanyBox></CompanyBox>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </motion.div>
            {/*//! -------------------------------------- Company Box Slider -------------------------------------- */}
            <div className="py-10"></div>

            {/*//? -------------------------------------- Advertising -------------------------------------- */}
            <div className="min-h-screen px-1 pt-5 flex overflow-hidden justify-center flex-col md:px-10 lg:px-24">
                <h1 className="px-2 mb-5 text-xl lg:h-20 lg:mb-0 lg:text-3xl">تازه‌ترین آگهی‌های شغلی برای شما</h1>
                <div className="w-full grid grid-cols-12 grid-rows-3">
                    {AdvertisingArray.map((item, index) => (
                        <motion.div
                            key={index + 1}
                            variants={
                                includes([1, 6], index) && WindowsSize.innerWidth >= 1280
                                    ? ShowAndHideScale_Ex
                                    : includes([0, 3, 5], index) && WindowsSize.innerWidth >= 1280
                                    ? ShowFromRight
                                    : includes([2, 4, 7], index) && WindowsSize.innerWidth >= 1280
                                    ? ShowFromLeft
                                    : WindowsSize.innerWidth < 1280 && isEven(index)
                                    ? ShowFromRight
                                    : ShowFromLeft
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
                                    <AdvertisingBox data={{ ...item.data }} type="ShowSendCv"></AdvertisingBox>
                                </div>
                            ) : (
                                <AdvertisingBox data={{ ...item.data }} type="ShowSendCv"></AdvertisingBox>
                            )}
                        </motion.div>
                    ))}
                </div>
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
                                <Button textColor="primary" size="small" isLoading={false} ClickHandler={() => {}}>
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
                                <Button textColor="primary" size="small" isLoading={false} ClickHandler={() => {}}>
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
            <div className="w-full min-h-fit px-4 flex items-center flex-col md:px-10 lg:current-mega-height lg:px-24 lg:flex-row">
                <motion.div
                    variants={ShowAndHideOpacity_Ex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="lg:w-4/12 text-center lg:text-right"
                >
                    <h1>
                        <p>چرااا ، </p>
                        <span className="text-jv-primary">جاب ویژن</span> ؟
                    </h1>
                    <p className="py-5 lg:text-justify">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشت.
                    </p>
                </motion.div>
                <div className="w-full h-auto overflow-hidden lg:w-8/12 lg:h-full lg:px-16">
                    {WindowsSize.innerWidth <= 1024 ? null : (
                        <svg
                            className={`hidden lg:block w-full h-full pr-32 relative overflow-visible`}
                            viewBox="0 0 200 200"
                        >
                            <path
                                className="fill-jv-primary opacity-50"
                                d="M39.5,-34.9C48.8,-19.8,52.3,-3.6,50.5,14.4C48.7,32.3,41.5,51.9,26.9,60.9C12.2,70,-10,68.4,-31.9,60.2C-53.8,52,-75.3,37,-82,16.2C-88.8,-4.6,-80.8,-31.3,-64.6,-48C-48.5,-64.6,-24.2,-71.3,-4.6,-67.6C15.1,-64,30.2,-50.1,39.5,-34.9Z"
                                transform="translate(100 100)"
                            />
                            <AnimatePresence mode="wait">
                                {whyUs?.isShow && whyUs.mainItems.length ? (
                                    <motion.foreignObject
                                        variants={ShowAndHideOpacity_Ex}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        x="10%"
                                        y="20%"
                                        className="w-32 h-28 relative overflow-visible cursor-default"
                                    >
                                        {whyUs.mainItems[0] ? (
                                            <motion.div
                                                variants={ShowItemsDelay_Var}
                                                custom={1}
                                                className="whyUsBox w-28 h-14 p-1 rounded-xl bg-jv-light flex flex-col justify-center top-2 absolute -right-16"
                                            >
                                                <div className="w-5 h-5">
                                                    <img className="w-full" src={whyUs.mainItems[0].iconSrc} alt="" />
                                                </div>
                                                <p className="text-[8px] mt-1">{whyUs.mainItems[0].title}</p>
                                            </motion.div>
                                        ) : null}

                                        {whyUs.mainItems[1] ? (
                                            <motion.div
                                                variants={ShowItemsDelay_Var}
                                                custom={2}
                                                className="whyUsBox w-24 h-16 p-1 rounded-xl bg-jv-light flex flex-col justify-center absolute top-0 -left-6"
                                            >
                                                <div className="w-5 h-5">
                                                    <img className="w-full" src={whyUs.mainItems[1].iconSrc} alt="" />
                                                </div>
                                                <p className="text-[8px] mt-1">{whyUs.mainItems[1].title}</p>
                                            </motion.div>
                                        ) : null}

                                        {whyUs.mainItems[2] ? (
                                            <motion.div
                                                variants={ShowItemsDelay_Var}
                                                custom={3}
                                                className="whyUsBox w-24 h-16 p-1 rounded-xl bg-jv-light flex flex-col justify-center absolute -bottom-8 right-4"
                                            >
                                                <div className="w-5 h-5">
                                                    <img className="w-full" src={whyUs.mainItems[2].iconSrc} alt="" />
                                                </div>
                                                <p className="text-[8px] mt-1">{whyUs.mainItems[2].title}</p>
                                            </motion.div>
                                        ) : null}
                                    </motion.foreignObject>
                                ) : null}
                            </AnimatePresence>
                        </svg>
                    )}

                    <div className="w-full h-full flex flex-col lg:hidden">
                        {whyUsArray.map((item, index) => (
                            <Accordion
                                key={item.id}
                                type="Content"
                                index={index + 1}
                                isResponsive
                                theme="Light"
                                iconType="Arrow"
                                title={item.title}
                                content={item.desc}
                                isOpen={index === 0 ? true : false}
                                listStyle="Ul"
                            ></Accordion>
                        ))}
                    </div>
                </div>
            </div>
            {/*//! -------------------------------------- WHY US ? -------------------------------------- */}
            <div className="py-10 lg:py-0"></div>
            <Footer></Footer>
        </>
    );
};

export default Home;
