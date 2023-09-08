import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  isLoading: boolean;
  size?: "small" | "middle" | "large";
  textColor: "light" | "primary";
  ClassName?: string;
  ClickHandler: Function;
  isDefault?: boolean;
  noBorder?: boolean;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  isLoading,
  size,
  textColor,
  ClassName,
  ClickHandler,
  isDefault,
  noBorder,
}) => {
  const loadingClass = isLoading
    ? "opacity-90 cursor-progress"
    : "cursor-pointer";

  const sizeClass =
    size === "small"
      ? "text-xs"
      : size === "middle"
      ? "text-sm"
      : size === "large"
      ? "text-lg"
      : "";

  const borderColorStyle =
    textColor === "light"
      ? `border-jv-light`
      : textColor === "primary"
      ? `border-jv-primary`
      : "";

  const textColorStyle =
    textColor === "light"
      ? `text-jv-light`
      : textColor === "primary"
      ? `text-jv-primary`
      : "";

  const fillColorStyle =
    textColor === "light"
      ? `fill-jv-light`
      : textColor === "primary"
      ? `fill-jv-primary`
      : "";

  const defaultClass = `
      select-none whitespace-nowrap px-4 py-3 rounded-lg
       ${textColor === "primary" ? "bg-jv-light" : "bg-jv-primary"}
       ${!noBorder ? `border-2 border-solid ${borderColorStyle} ` : ""}`;

  const classList = `
  ${loadingClass}
  ${sizeClass}
  ${textColorStyle}
  ${isDefault ? "" : defaultClass}
  ${ClassName ? ClassName : ""}`;

  return (
    <>
      <motion.button
        whileTap={{ opacity: 0.7 }}
        onClick={() => ClickHandler()}
        disabled={isLoading}
        className={classList}
      >
        {isLoading ? (
          <span role="img">
            <span className="mr-3">
              <motion.svg
                animate={{ rotate: 2500 }}
                transition={{
                  type: "spring",
                  damping: 300,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className={fillColorStyle}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.5781 6.42188C11.3449 6.42188 11.1562 6.2332 11.1562 6C11.1562 5.30391 11.0203 4.62891 10.7508 3.99258C10.4915 3.37999 10.1163 2.82329 9.6457 2.35313C9.17605 1.88193 8.61923 1.5066 8.00625 1.24805C7.37109 0.979688 6.69609 0.84375 6 0.84375C5.7668 0.84375 5.57812 0.655078 5.57812 0.421875C5.57812 0.188672 5.7668 0 6 0C6.80977 0 7.59609 0.158203 8.33555 0.472266C9.05039 0.773438 9.69141 1.20703 10.2422 1.75781C10.793 2.30859 11.2254 2.95078 11.5277 3.66445C11.8406 4.40391 11.9988 5.19023 11.9988 6C12 6.2332 11.8113 6.42188 11.5781 6.42188Z" />
              </motion.svg>
            </span>
          </span>
        ) : null}
        <span>{children}</span>
      </motion.button>
    </>
  );
};

export default Button;
