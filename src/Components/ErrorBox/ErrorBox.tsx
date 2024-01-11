import React from "react";
import { motion } from "framer-motion";
import { ShowSvgPath } from "../../Animations/Animation";

interface ErrorBoxProps {
    errTitle: string;
    titleSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ errTitle, titleSize }) => {
    return (
        <>
            <motion.div
                variants={ShowSvgPath}
                initial="hidden"
                animate="visible"
                className="w-full h-full flex flex-col items-center justify-center"
            >
                <svg width="248" height="155" viewBox="0 0 248 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_137_10)">
                        <motion.path
                            variants={ShowSvgPath}
                            d="M124 119C175.362 119 217 109.904 217 98.6829C217 87.4621 175.362 78.3658 124 78.3658C72.6375 78.3658 31 87.4621 31 98.6829C31 109.904 72.6375 119 124 119Z"
                            fill="#F5F5F5"
                        />
                        <motion.path
                            variants={ShowSvgPath}
                            d="M190.844 39.9376L161.357 6.5537C159.942 4.27819 157.875 2.90244 155.698 2.90244H92.3015C90.1248 2.90244 88.0584 4.27819 86.6431 6.5508L57.1562 39.9405V66.7561H190.844V39.9376Z"
                            stroke="#AFA5A5"
                            strokeWidth="3"
                        />
                        <motion.path
                            variants={ShowSvgPath}
                            d="M151.938 49.1412C151.938 44.4828 154.827 40.637 158.41 40.6341H190.844V93.2757C190.844 99.4375 187.007 104.488 182.27 104.488H65.7297C60.9925 104.488 57.1562 99.4346 57.1562 93.2757V40.6341H89.59C93.1734 40.6341 96.0622 44.4741 96.0622 49.1325V49.1963C96.0622 53.8547 98.983 57.6163 102.564 57.6163H145.436C149.017 57.6163 151.938 53.8199 151.938 49.1615V49.1412Z"
                            fill="#FAFAFA"
                            stroke="#AFA5A5"
                            strokeWidth="3"
                        />
                    </g>

                    <defs>
                        <clipPath id="clip0_137_10">
                            <rect width="186" height="119" fill="white" transform="translate(31)" />
                        </clipPath>
                    </defs>
                </svg>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 4 } }}
                    className={`
                text-[#AFA5A5] danaBold text-center ${
                    titleSize === "xs"
                        ? "text-xs"
                        : titleSize === "sm"
                        ? "text-sm"
                        : titleSize === "md"
                        ? "text-base"
                        : titleSize === "lg"
                        ? "text-lg"
                        : titleSize === "xl"
                        ? "text-xl"
                        : "text-2xl"
                }`}
                >
                    {errTitle}
                </motion.div>
            </motion.div>
        </>
    );
};

export default ErrorBox;
