import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IconType } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";

type ButtonProps = {
    isLoading: boolean;
    size?: "small" | "middle" | "large";
    textColor: "light" | "primary";
    ClassName?: string;
    ClickHandler: Function;
    isDefault?: boolean;
    noBorder?: boolean;
    Icon?: IconType | undefined;
};

const variant = {
    hidden: (i: number) => ({ y: 100 * i }),
    visible: { y: 0 },
    exit: (i: number) => ({ y: 100 * i }),
};

const transition = { duration: 0.01, ease: "easeOut", type: "tween" };

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    children,
    isLoading,
    size,
    textColor,
    ClassName,
    ClickHandler,
    isDefault,
    noBorder,
    Icon,
}) => {
    const loadingClass = isLoading ? "opacity-90 cursor-progress" : "cursor-pointer";

    const sizeClass =
        size === "small" ? "text-xs" : size === "middle" ? "text-sm" : size === "large" ? "text-lg" : "text-lg";

    const borderColorStyle =
        textColor === "light" ? `border-jv-light` : textColor === "primary" ? `border-jv-primary` : "";

    const textColorStyle = textColor === "light" ? `text-jv-light` : textColor === "primary" ? `text-jv-primary` : "";

    const defaultClass = `
      select-none whitespace-nowrap px-4 py-3
       ${textColor === "primary" ? "bg-jv-light" : "bg-jv-primary"}
       ${!noBorder ? `border-2 border-solid rounded-lg ${borderColorStyle} ` : ""}`;

    const classList = `
  ${loadingClass}
  ${sizeClass}
  ${textColorStyle}
  ${isDefault ? "" : defaultClass}
  ${ClassName ? ClassName : ""} min-w-fit flex items-center justify-center overflow-hidden`;

    return (
        <>
            <motion.button
                whileTap={{ opacity: 0.7 }}
                onClick={() => ClickHandler()}
                disabled={isLoading}
                className={classList}
            >
                <div
                    className={`items-center justify-center relative h-full min-w-[2rem] max-w-fit ${
                        isLoading || Icon ? "flex" : "hidden"
                    }`}
                >
                    <AnimatePresence>
                        {isLoading ? (
                            <motion.div
                                variants={variant}
                                custom={-1}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={transition}
                                className="absolute"
                            >
                                <motion.div
                                    animate={{ rotate: 2500 }}
                                    transition={{
                                        type: "spring",
                                        damping: 300,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                    }}
                                    className="flex items-center justify-center origin-center ml-3"
                                >
                                    <AiOutlineLoading
                                        className={`origin-center ${
                                            size === "large"
                                                ? "text-xl"
                                                : size === "middle"
                                                ? "text-lg"
                                                : size === "small"
                                                ? "text-sm"
                                                : "text-xl"
                                        }`}
                                    ></AiOutlineLoading>
                                </motion.div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        {!isLoading && typeof Icon !== "undefined" ? (
                            <motion.div
                                variants={variant}
                                custom={1}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={transition}
                                className="flex items-center justify-center origin-center ml-3 absolute"
                            >
                                <Icon
                                    className={`origin-center ${
                                        size === "large"
                                            ? "text-2xl"
                                            : size === "middle"
                                            ? "text-xl"
                                            : size === "small"
                                            ? "text-lg"
                                            : "text-md"
                                    }`}
                                ></Icon>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
                {children}
            </motion.button>
        </>
    );
};

export default Button;
