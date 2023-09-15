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
    hidden: { opacity: 0, x: "-100vw", scale: 0.5 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            scale: {
                delay: 0.5,
            },
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
            delay: 1,
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
            delay: 1,
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
            delay: 1,
            bounce: 9,
        },
    },
};

const showVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
        },
    },
};

const Home: React.FC = () => {
    return (
        <>
            {/*//? -------------------------------------- Landing -------------------------------------- */}
            <div className="current-mega-height overflow-hidden pt-5 px-5 grid grid-cols-2 grid-rows-2 justify-between md:py-2 md:px-10 md:grid-rows-2 md:items-center lg:grid-rows-3">
                <motion.div
                    variants={titleSideVariantWrapper}
                    initial="hidden"
                    animate="visible"
                    className="right-landing p-1 flex flex-col justify-evenly col-span-2 row-span-1 md:col-span-1 lg:row-span-2"
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
                    className="col-span-2 row-span-1 h-full md:p-5"
                >
                    <div className="w-full h-full flex flex-col items-start justify-center">
                        <h2 className="mb-5 pr-2 text-xl">دنبال چه شغلی می‌گردید؟</h2>
                        <SearchFrom></SearchFrom>
                    </div>
                </motion.div>
            </div>
            {/*//! -------------------------------------- Landing -------------------------------------- */}

            {/*//? -------------------------------------- Advertising -------------------------------------- */}
            <div className="xl:h-d-screen px-5 pt-5 flex overflow-hidden justify-center flex-col md:px-24">
                <h1 className="mb-5 text-xl lg:h-20 lg:mb-0 lg:text-3xl">تازه‌ترین آگهی‌های شغلی برای شما</h1>
                <motion.div
                    variants={showVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full xl:current-mega-height grid grid-cols-12 grid-rows-3"
                >
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
                                custom={index}
                                className={`${includes([3, 4], index) ? "xl:col-span-6 flex" : "xl:col-span-4"} ${
                                    index === 3 ? "flex justify-end" : ""
                                }  row-span-1 p-3 col-span-12 lg:col-span-6`}
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
                </motion.div>
            </div>
            {/*//! -------------------------------------- Advertising -------------------------------------- */}
        </>
    );
};

export default Home;
