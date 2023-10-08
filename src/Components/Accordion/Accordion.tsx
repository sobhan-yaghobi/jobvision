import React, { useState } from "react";

// Icons
import { BsBoxArrowDown } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";

interface AccordionMainProps {
    index: number;
    title: string | React.ReactNode;
    isOpen?: boolean | undefined;
    theme: "Dark" | "Light" | "transparent";
    noSpace?: boolean;
    listStyle: "Ol" | "Ul";
    isResponsive: boolean;
    iconType: "Menu" | "Arrow";
    textStyle?: string;
}

type AccordionTypesProps =
    | {
          type?: "Content";
          content: string;
      }
    | {
          type?: "Item";
          childArray: any[];
          propertyChildName: string;
      }
    | {
          type?: "Menu";
          childArray: any[];
          propertyChildName: string;
          iSubItem: boolean;
          propertySubName: string;
      }
    | {
          type?: "Children";
          children: React.ReactNode;
      };

type AccordionProps = AccordionTypesProps & AccordionMainProps;

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(typeof props.isOpen === "undefined" ? false : props.isOpen);

    // !---------------------- Custom ClassLists
    const size = `${props.textStyle ? props.textStyle : "text-xs md:text-sm lg:text-lg"}`;

    // ITEM classNames Type Element

    const ContentDarkModeAccordionItem = `bg-jv-lightGray ${
        isActive ? "border-solid border-jv-white" : "border-transparent"
    }`;
    const ContentLightModeAccordionItem = `!border-trnasparent accordion shadow-[-10px_10px_30px_-9px_#ff979a,10px_10px_30px_-9px_#c96f72]`;
    const ContentTransModeAccordionItem = `!border-transparent`;

    const ItemDarkModeAccordionItem = ``;
    const ItemLightModeAccordionItem = ``;
    const ItemTransModeAccordionItem = ``;

    const MenuDarkModeAccordionItem = `bg-jv-lightGray`;
    const MenuLightModeAccordionItem = ``;
    const MenuTransModeAccordionItem = ``;

    // HEADER classNames Type Element

    const ContentDarkModeAccordionHeader = `${isActive ? "border-solid" : ""}`;
    const ContentLightModeAccordionHeader = `${isActive ? "text-jv-primary border-solid border-jv-primary" : ""}`;
    const ContentTransModeAccordionHeader = ``;

    const ItemDarkModeAccordionHeader = ``;
    const ItemLightModeAccordionHeader = ``;
    const ItemTransModeAccordionHeader = ``;

    const MenuDarkModeAccordionHeader = ``;
    const MenuLightModeAccordionHeader = ``;
    const MenuTransModeAccordionHeader = ``;

    // Item Elem Class List
    const accordionItemClass = `accordion-item transition-all duration-300 w-full border rounded-xl ${
        props.noSpace ? "" : "my-1 p-1"
    } ${
        props.type === "Content" && props.theme === "Dark"
            ? ContentDarkModeAccordionItem
            : props.type === "Content" && props.theme === "Light"
            ? ContentLightModeAccordionItem
            : props.type === "Content" && props.theme === "transparent"
            ? ContentTransModeAccordionItem
            : props.type === "Item" && props.theme === "Dark"
            ? ItemDarkModeAccordionItem
            : props.type === "Item" && props.theme === "Light"
            ? ItemLightModeAccordionItem
            : props.type === "Item" && props.theme === "transparent"
            ? ItemTransModeAccordionItem
            : props.type === "Menu" && props.theme === "Dark"
            ? MenuDarkModeAccordionItem
            : props.type === "Menu" && props.theme === "Light"
            ? MenuLightModeAccordionItem
            : props.type === "Menu" && props.theme === "transparent"
            ? MenuTransModeAccordionItem
            : ""
    }`;

    // Header Elem Class List
    const accordionHeaderClass = `accordion-header cursor-pointer flex items-center justify-between transition-all duration-300 border-b-[1px] ${
        props.noSpace ? "" : "py-2 px-3"
    } ${
        props.type === "Content" && props.theme === "Dark"
            ? ContentDarkModeAccordionHeader
            : props.type === "Content" && props.theme === "Light"
            ? ContentLightModeAccordionHeader
            : props.type === "Content" && props.theme === "transparent"
            ? ContentTransModeAccordionHeader
            : props.type === "Item" && props.theme === "Dark"
            ? ItemDarkModeAccordionHeader
            : props.type === "Item" && props.theme === "Light"
            ? ItemLightModeAccordionHeader
            : props.type === "Item" && props.theme === "transparent"
            ? ItemTransModeAccordionHeader
            : props.type === "Menu" && props.theme === "Dark"
            ? MenuDarkModeAccordionHeader
            : props.type === "Menu" && props.theme === "Light"
            ? MenuLightModeAccordionHeader
            : props.type === "Menu" && props.theme === "transparent"
            ? MenuTransModeAccordionHeader
            : ""
    }`;

    // !---------------------- Generator Components
    const MenuAccordionGenerator: React.FC = () => {
        if (props.type === "Menu") {
            return (
                <>
                    {Array.isArray(props.childArray) &&
                        props.childArray.length &&
                        props.childArray.map((item, index) => (
                            <div key={index + 1} className="my-3">
                                {typeof item === "object" &&
                                props.propertyChildName in item &&
                                Array.isArray(item[props.propertySubName]) &&
                                item[props.propertySubName].length ? (
                                    <Accordion
                                        isResponsive
                                        listStyle="Ul"
                                        index={1}
                                        type="Menu"
                                        childArray={item[props.propertySubName]}
                                        iSubItem={false}
                                        propertyChildName="title"
                                        iconType="Menu"
                                        title={item[props.propertyChildName]}
                                        theme="Dark"
                                        propertySubName=""
                                        noSpace
                                    ></Accordion>
                                ) : (
                                    <span>{item[props.propertyChildName]}</span>
                                )}
                            </div>
                        ))}
                </>
            );
        }
    };

    const ItemAccordionGenaretor: React.FC = () => {
        if (props.type === "Item") {
            return (
                <>
                    {Array.isArray(props.childArray) &&
                        props.childArray.length &&
                        props.childArray.map((item, index) => (
                            <div key={index + 1} className="cursor-pointer text-inherit my-2">
                                {item[props.propertyChildName]}
                            </div>
                        ))}
                </>
            );
        }
    };

    return (
        <div className={accordionItemClass}>
            <div onClick={() => setIsActive((prev) => !prev)} className={accordionHeaderClass}>
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
                {props.iconType === "Arrow" ? (
                    <BsBoxArrowDown className={`${isActive ? "rotate-180" : ""}`}></BsBoxArrowDown>
                ) : (
                    <AiFillCaretDown className={`${isActive ? "rotate-180" : ""}`}></AiFillCaretDown>
                )}
            </div>
            <div
                className={`wrapper overflow-hidden grid transition-all duration-700 ${
                    isActive
                        ? `grid-rows-[1fr] ${
                              props.type === "Content"
                                  ? "py-5"
                                  : props.type === "Menu"
                                  ? ""
                                  : props.type === "Item"
                                  ? "py-1"
                                  : "py-1"
                          }`
                        : "grid-rows-[0fr]"
                } `}
            >
                <div className={`min-h-0 px-4 ${props.isResponsive ? size : null}`}>
                    {props.type === "Content" ? (
                        props.content
                    ) : props.type === "Menu" ? (
                        <MenuAccordionGenerator></MenuAccordionGenerator>
                    ) : props.type === "Item" ? (
                        <ItemAccordionGenaretor></ItemAccordionGenaretor>
                    ) : props.type === "Children" ? (
                        props.children
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
