import React, { useState } from "react";
import { BsBoxArrowDown } from "react-icons/bs";

interface AccordionProps {
    index: number;
    isResponsive: boolean;
    theme: "Dark" | "Light";
    title: string;
    content: string;
    isOpen?: boolean | undefined;
    listStyle: "Ol" | "Ul";
    noSpace?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    content,
    isOpen,
    isResponsive,
    theme,
    listStyle,
    index,
    noSpace,
}) => {
    const [isActive, setIsActive] = useState<boolean>(typeof isOpen === "undefined" ? false : isOpen);
    const size = "text-xs md:text-sm lg:text-lg";
    const accordionItemLightClassName = `${isActive ? "border-jv-dark" : "border-transparent"}`;
    const accordionItemDarkClassName = `bg-jv-lightGray ${isActive ? "border-jv-white" : "border-transparent"}`;
    const accordionHeaderLightClassName = `${isActive ? "text-jv-primary border-jv-primary" : "border-jv-dark"}`;
    const accordionHeaderDarkClassName = `opacity-70 ${
        isActive ? "opacity-100 border-jv-white" : "border-transparent"
    }`;

    return (
        <div
            className={`accordion-item transition-all duration-300 w-full border border-solid rounded-xl ${
                theme === "Light" ? accordionItemLightClassName : theme === "Dark" ? accordionItemDarkClassName : ""
            } ${!noSpace ? "" : "my-1 p-1"}`}
        >
            <div
                onClick={() => setIsActive((prev) => !prev)}
                className={`accordion-header cursor-pointer flex items-center justify-between transition-all duration-300 border-b-[1px] border-solid  ${
                    theme === "Light"
                        ? accordionHeaderLightClassName
                        : theme === "Dark"
                        ? accordionHeaderDarkClassName
                        : ""
                } ${!noSpace ? "" : "py-2 px-3"}`}
            >
                <span className={`w-10/12 ${isResponsive ? size : null} flex items-center`}>
                    {listStyle === "Ol" ? (
                        <span
                            className={`h-9 w-10 ml-2 border border-solid rounded-full flex items-center justify-center ${
                                theme === "Light" ? "border-jv-lightGray" : "border-jv-white"
                            }`}
                        >
                            {index}
                        </span>
                    ) : null}
                    <span className="w-full text-inherit">{title}</span>
                </span>
                <BsBoxArrowDown className={`${isActive ? "rotate-180" : ""}`}></BsBoxArrowDown>
            </div>
            <div
                className={`wrapper overflow-hidden grid transition-all duration-700 ${
                    isActive ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"
                }`}
            >
                <div className={`min-h-0 px-4 ${isResponsive ? size : null}`}>{content}</div>
            </div>
        </div>
    );
};

export default Accordion;
