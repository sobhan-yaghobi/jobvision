import React from "react";
import Button from "../../Components/Button/Button";
import MapCircle from "../../Components/MapCircle/MapCircle";
import { motion } from "framer-motion";

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
    hidden: { opacity: 0, x: "-100vw", scale: 0.9 },
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

const Home: React.FC = () => {
    return (
        <>
            <div className="current-mega-height overflow-hidden py-5 px-24 grid grid-cols-2 grid-rows-3 items-center">
                <motion.div
                    variants={titleSideVariantWrapper}
                    initial="hidden"
                    animate="visible"
                    className="right-landing col-span-1 row-span-2"
                >
                    <h1>
                        <span className="text-jv-primary mx-2 danaBold">38,346</span> آگهی شغلی در
                        <span className="text-jv-primary mx-2 danaBold"> 489</span> شهر
                    </h1>
                    <p className="my-5">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                    </p>
                    <Button textColor="light" size="large" isLoading={false} ClickHandler={() => {}}>
                        همین الان روزمه بساز
                    </Button>
                </motion.div>
                <motion.div
                    variants={svgVarinetWrapper}
                    initial="hidden"
                    animate="visible"
                    className="left-landing col-span-1 row-span-2"
                >
                    <MapCircle></MapCircle>
                </motion.div>
                <motion.div
                    variants={titleSideVariantWrapper}
                    initial="hidden"
                    animate="visible"
                    className="col-span-2 row-span-1 h-5/6"
                >
                    <div className="w-full h-full bg-jv-primary text-jv-light flex items-center justify-center">d</div>
                </motion.div>
            </div>
        </>
    );
};

export default Home;
