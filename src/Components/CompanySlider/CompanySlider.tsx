import React from "react";

import CompanyBox from "../CompanyBox/CompanyBox";

import { motion } from "framer-motion";
import { ShowItemsDelay_Var } from "../../Animations/Animation";

// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CompanySlider: React.FC = () => {
    return (
        <motion.div
            variants={ShowItemsDelay_Var}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full px-2 md:px-10 lg:px-24"
        >
            <Swiper
                className={`rounded-md relative z-0`}
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
    );
};

export default CompanySlider;
