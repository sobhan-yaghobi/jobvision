import React from "react";
// Types
import { IconType } from "react-icons";

// Animation
import { ShortStripVerticalAnimation_Ex_Var, TweenEaseOutVeryShortly } from "../../Animations/UtilsAnimation";

// Components
import { AnimatePresence, motion } from "framer-motion";

// Icons
import { AiOutlineLoading } from "react-icons/ai";

type ButtonMainProps = {
    isLoading: boolean;
    size?: "small" | "middle" | "large";
    textColor: "light" | "primary";
    ClassName?: string;
    ClickHandler: Function;
    DoubleClickHandler?: Function;
    isDefault?: boolean;
    noBorder?: boolean;
};

type ButtonIconTypes =
    | {
          IconType?: "REACT_ICON";
          Icon?: IconType;
      }
    | {
          IconType?: "JSX_ICON";
          Icon?: React.ReactNode;
      };

type ButtonProps = ButtonMainProps & ButtonIconTypes;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
    const loadingClass = props.isLoading ? "opacity-90 cursor-progress" : "cursor-pointer";

    const sizeClass =
        props.size === "small"
            ? "text-xs"
            : props.size === "middle"
            ? "text-sm"
            : props.size === "large"
            ? "text-lg"
            : "text-lg";

    const borderColorStyle =
        props.textColor === "light" ? `border-jv-light` : props.textColor === "primary" ? `border-jv-primary` : "";

    const textColorStyle =
        props.textColor === "light" ? `text-jv-light` : props.textColor === "primary" ? `text-jv-primary` : "";

    const defaultClass = `
      select-none whitespace-nowrap px-4 py-3
       ${props.textColor === "primary" ? "bg-jv-light" : "bg-jv-primary"}
       ${!props.noBorder ? `border-2 border-solid rounded-lg ${borderColorStyle} ` : ""}`;

    const classList = `
  ${loadingClass}
  ${sizeClass}
  ${textColorStyle}
  ${props.isDefault ? "" : defaultClass}
  ${props.ClassName ? props.ClassName : ""} min-w-fit flex items-center justify-center overflow-hidden`;

    return (
        <>
            <motion.button
                whileTap={{ opacity: 0.7 }}
                onClick={() => props.ClickHandler()}
                onDoubleClick={() => typeof props.DoubleClickHandler !== "undefined" && props.DoubleClickHandler()}
                disabled={props.isLoading}
                className={classList}
            >
                <div
                    className={`items-center justify-center relative h-full min-w-[2rem] max-w-fit ${
                        props.isLoading || props.Icon ? "flex" : "hidden"
                    }`}
                >
                    <AnimatePresence>
                        {props.isLoading ? (
                            <motion.div
                                variants={ShortStripVerticalAnimation_Ex_Var}
                                custom={-1}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={TweenEaseOutVeryShortly}
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
                                            props.size === "large"
                                                ? "text-xl"
                                                : props.size === "middle"
                                                ? "text-lg"
                                                : props.size === "small"
                                                ? "text-sm"
                                                : "text-xl"
                                        }`}
                                    ></AiOutlineLoading>
                                </motion.div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        {!props.isLoading &&
                        typeof props.Icon !== "undefined" &&
                        typeof props.IconType !== "undefined" ? (
                            <motion.div
                                variants={ShortStripVerticalAnimation_Ex_Var}
                                custom={1}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={TweenEaseOutVeryShortly}
                                className="flex items-center justify-center origin-center ml-3 absolute"
                            >
                                {props.IconType === "REACT_ICON" ? (
                                    <props.Icon
                                        className={`origin-center ${
                                            props.size === "large"
                                                ? "text-2xl"
                                                : props.size === "middle"
                                                ? "text-xl"
                                                : props.size === "small"
                                                ? "text-lg"
                                                : "text-md"
                                        }`}
                                    ></props.Icon>
                                ) : props.IconType === "JSX_ICON" ? (
                                    props.Icon
                                ) : null}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
                {props.children}
            </motion.button>
        </>
    );
};

export default Button;
