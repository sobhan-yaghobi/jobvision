import React, { useState } from "react";
import { WhyUsDescType, WhyUsType, whyUsArray } from "../../Page/Home/Home.type";
import { chunk } from "lodash";
import { ShowAndHideOpacity_Ex, ShowItemsDelay_Var } from "../../Animations/Animation";
import useAnimationStop from "../../Hooks/useAnimationStop";
import { motion, AnimatePresence } from "framer-motion";
import useWindowsSize from "../../Hooks/useWindowsSize";
import Accordion from "../Accordion/Accordion";

const WhyUs: React.FC = () => {
    const [WindowsSize] = useWindowsSize();
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
    return (
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
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشت.
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
                            title={item.title}
                            content={item.desc}
                            isOpen={index === 0 ? true : false}
                            listStyle="Ul"
                        ></Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
