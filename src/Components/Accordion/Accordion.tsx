import React, { useState } from "react";
import { BsBoxArrowDown } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";

interface AccordionMainProps {
    index: number;
    title: string;
    isOpen?: boolean | undefined;
    theme: "Dark" | "Light" | "transparent";
    noSpace?: boolean;
}

type AccordionTypesProps =
    | {
          type?: "Content";
          isResponsive: boolean;
          theme: "Dark" | "Light" | "transparent";
          content: string;
          listStyle: "Ol" | "Ul";
      }
    | {
          type?: "ContentItem";
          childArray: any[];
          propertyChildName: string;
          iconType: "Menu" | "Arrow";
      }
    | {
          type?: "Menu";
          childArray: any[];
          propertyChildName: string;
          iSubItem: boolean;
          propertySubName: string;
      };
type AccordionProps = AccordionTypesProps & AccordionMainProps;

const Accordion: React.FC<AccordionProps> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(typeof props.isOpen === "undefined" ? false : props.isOpen);
    const size = "text-xs md:text-sm lg:text-lg";
    const accordionItemLightClassName = `${isActive ? "border-transparent" : "border-transparent"}`;
    const accordionItemDarkClassName = `bg-jv-lightGray ${isActive ? "border-jv-white" : "border-transparent"}`;
    const accordionHeaderLightClassName = `${
        isActive ? "text-jv-primary border-solid border-jv-primary" : "border-jv-dark"
    }`;
    const accordionHeaderDarkClassName = `opacity-70 ${
        isActive ? "opacity-100 border-solid border-jv-white" : "border-transparent"
    }`;
    const accordionItemTransparentClassName = ``;
    const accordionHeaderTransparentClassName = `border-b-[1px] border-solid border-transparent ${
        isActive ? "!border-jv-light" : ""
    }`;

    if (props.type === "Content") {
        return (
            <div
                className={`accordion-item transition-all duration-300 w-full border rounded-xl ${
                    props.theme === "Light"
                        ? accordionItemLightClassName
                        : props.theme === "Dark"
                        ? accordionItemDarkClassName
                        : props.theme === "transparent"
                        ? accordionItemTransparentClassName
                        : ""
                } ${props.noSpace ? "" : "my-1 p-1"} ${
                    props.theme === "Light"
                        ? "accordion shadow-[-10px_10px_30px_-9px_#ff979a,10px_10px_30px_-9px_#c96f72]"
                        : ""
                } ${props.theme === "transparent" ? "" : "border-solid"}`}
            >
                <div
                    onClick={() => setIsActive((prev) => !prev)}
                    className={`accordion-header cursor-pointer flex items-center justify-between transition-all duration-300 border-b-[1px]  ${
                        props.theme === "Light"
                            ? accordionHeaderLightClassName
                            : props.theme === "Dark"
                            ? accordionHeaderDarkClassName
                            : props.theme === "transparent"
                            ? accordionHeaderTransparentClassName
                            : ""
                    } ${props.noSpace ? "" : "py-2 px-3"}`}
                >
                    <span className={`w-10/12 ${props.isResponsive ? size : null} flex items-center`}>
                        {props.listStyle === "Ol" ? (
                            <span
                                className={`h-9 w-10 ml-2 border border-solid rounded-full flex items-center justify-center ${
                                    props.theme === "Light" ? "border-jv-lightGray" : "border-jv-white"
                                }`}
                            >
                                {props.index}
                            </span>
                        ) : null}
                        <span className="w-full text-inherit">{props.title}</span>
                    </span>
                    <BsBoxArrowDown className={`${isActive ? "rotate-180" : ""}`}></BsBoxArrowDown>
                </div>
                <div
                    className={`wrapper overflow-hidden grid transition-all duration-700 ${
                        isActive ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"
                    }`}
                >
                    <div className={`min-h-0 px-4 ${props.isResponsive ? size : null}`}>{props.content}</div>
                </div>
            </div>
        );
    } else if (props.type === "Menu") {
        return (
            <>
                <div
                    className={`accordion-item transition-all duration-300 w-full rounded-xl ${
                        props.theme === "Light"
                            ? accordionItemLightClassName
                            : props.theme === "Dark"
                            ? accordionItemDarkClassName
                            : ""
                    } ${props.noSpace ? "" : "my-1 p-1"}`}
                >
                    <div
                        onClick={() => setIsActive((prev) => !prev)}
                        className={`accordion-header cursor-pointer flex items-center justify-between transition-all duration-300 border-b-[1px] border-solid ${
                            props.theme === "Light"
                                ? accordionHeaderLightClassName
                                : props.theme === "Dark"
                                ? accordionHeaderDarkClassName
                                : ""
                        } ${props.noSpace ? "" : "py-2 px-3"}`}
                    >
                        <span className={`w-10/12 ${size} flex items-center`}>
                            <span className="w-full text-inherit">{props.title}</span>
                        </span>
                        <AiFillCaretDown className={`${isActive ? "rotate-180" : ""}`}></AiFillCaretDown>
                    </div>
                    <div
                        className={`wrapper overflow-hidden grid transition-all duration-700 ${
                            isActive ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className={`min-h-0 px-4 ${size}`}>
                            {Array.isArray(props.childArray) &&
                                props.childArray.length &&
                                props.childArray.map((item) => (
                                    <li className="my-3">
                                        {typeof item === "object" &&
                                        props.propertyChildName in item &&
                                        Array.isArray(item[props.propertySubName]) &&
                                        item[props.propertySubName].length ? (
                                            <Accordion
                                                index={1}
                                                type="Menu"
                                                childArray={item[props.propertySubName]}
                                                iSubItem={false}
                                                propertyChildName="title"
                                                title={item[props.propertyChildName]}
                                                theme="Dark"
                                                propertySubName=""
                                                noSpace
                                            ></Accordion>
                                        ) : (
                                            <span>{item[props.propertyChildName]}</span>
                                        )}
                                    </li>
                                ))}
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (props.type === "ContentItem") {
        return (
            <div
                className={`accordion-item transition-all duration-300 w-full border rounded-xl ${
                    props.theme === "Light"
                        ? accordionItemLightClassName
                        : props.theme === "Dark"
                        ? accordionItemDarkClassName
                        : props.theme === "transparent"
                        ? accordionItemTransparentClassName
                        : ""
                } ${props.noSpace ? "" : "my-1 p-1"} ${
                    props.theme === "Light"
                        ? "accordion shadow-[-10px_10px_30px_-9px_#ff979a,10px_10px_30px_-9px_#c96f72]"
                        : ""
                } ${props.theme === "transparent" ? "" : "border-solid"}`}
            >
                <div
                    onClick={() => setIsActive((prev) => !prev)}
                    className={`accordion-header cursor-pointer flex items-center justify-between transition-all duration-300 border-b-[1px]  ${
                        props.theme === "Light"
                            ? accordionHeaderLightClassName
                            : props.theme === "Dark"
                            ? accordionHeaderDarkClassName
                            : props.theme === "transparent"
                            ? accordionHeaderTransparentClassName
                            : ""
                    } ${props.noSpace ? "" : "py-2 px-3"}`}
                >
                    <span className={`w-10/12 flex items-center`}>
                        <span className="w-full text-inherit">{props.title}</span>
                    </span>
                    {props.iconType === "Arrow" ? (
                        <BsBoxArrowDown className={`${isActive ? "rotate-180" : ""}`}></BsBoxArrowDown>
                    ) : (
                        <AiFillCaretDown className={`${isActive ? "rotate-180" : ""}`}></AiFillCaretDown>
                    )}
                </div>
                <div
                    className={`wrapper overflow-hidden grid transition-all duration-700 ${
                        isActive ? "grid-rows-[1fr] py-1" : "grid-rows-[0fr]"
                    }`}
                >
                    <div className={`min-h-0 px-4`}>
                        {Array.isArray(props.childArray) &&
                            props.childArray.length &&
                            props.childArray.map((item) => (
                                <li className="text-inherit my-2">{item[props.propertyChildName]}</li>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Accordion;
