import React, { useEffect, useState } from "react";
// Types
import {
    Item,
    Link,
    SubMenu,
    MenuDesktopItemGenerateProps,
    SubMenuGeneratorProps,
    ItemGeneratorProps,
    LinkGeneratorProps,
} from "./menuItem.type";

// Animations
import { ShowOpacity, ShowSvgPath } from "../../Animations/UtilsAnimation";

// Components
import { motion } from "framer-motion";
import Button from "../Button/Button";
import ErrorBox from "../ErrorBox/ErrorBox";

export const MenuDesktopItemGenerate: React.FC<MenuDesktopItemGenerateProps> = ({ menuData }) => {
    if (menuData.megaMenu) {
        const [mainItem, setMainItem] = useState<Item>({} as Item);

        useEffect(() => {
            const firstMenuItem: Item = { ...menuData.items[0] };

            setMainItem(firstMenuItem);
        }, []);
        if (Object.keys(mainItem).length) {
            return (
                <>
                    <ItemGenerator
                        DesktopVarient={ShowOpacity}
                        Type="Desktop"
                        ParentClassName="relative mega-menu shadow-md shadow-[#05050510] w-full h-10 flex"
                        ChildClassName="menu__item border-transparent"
                        ChildClassActivion="text-jv-primary !border-jv-primary"
                        ClickHandler={setMainItem}
                        Data={menuData}
                        mainItemData={mainItem}
                    ></ItemGenerator>
                    {mainItem.links.length ? (
                        <LinkGenerator
                            DesktopVarient={ShowOpacity}
                            Type="Desktop"
                            ParentClassName="bg-white w-full columns-4 absolute top-16 bottom-0 left-0 right-0 cursor-default p-3 rounded-b-xl overflow-y-auto"
                            ChildClassName="overflow-hidden max-w-max h-max max-h-max m-1"
                            LinksWrapperClassName="text-jv-lightGray dana-bold w-full h-full flex flex-col px-3 py-1 hover:text-jv-primary"
                            //
                            SublinkParentClassName="w-full p-3 cursor-default hiiden"
                            SublinkChildClassName="w-full flex items-center mt-2 first:mt-0"
                            SublinkLinkWrapperClassName="text-jv-gray w-full inline-block hover:text-jv-primary"
                            Data={mainItem.links}
                            ClickHandler={() => {}}
                            isChildrenShow
                        ></LinkGenerator>
                    ) : (
                        <ErrorBox errTitle="منویی یافت نشد" />
                    )}
                </>
            );
        } else {
            return <ErrorBox errTitle="منویی یافت نشد" />;
        }
    } else {
        return (
            <ul className="w-72 absolute top-0 right-0 bg-jv-light py-2 px-4 rounded-b-lg">
                {menuData.items.map((item) => (
                    <li
                        key={item.id}
                        className={`${
                            item.links.length ? "cursor-default group" : "cursor-pointer"
                        }  mt-2 truncate hover:text-jv-primary`}
                    >
                        <span className="">{item.title}</span>
                        {item.links.length ? (
                            <ul className=" w-72 py-2 px-4 rounded-l-lg bg-jv-light -translate-x-1/2 -translate-y-1/2 absolute top-1/2 right-[30%] opacity-0 invisible group-hover:right-1/2 group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                {item.links.map((link) => (
                                    <li
                                        key={link.id}
                                        className="mt-1 text-jv-black hover:text-jv-primary cursor-pointer"
                                    >
                                        {link.title}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </li>
                ))}
            </ul>
        );
    }
};

export const SubMenuGenerator: React.FC<SubMenuGeneratorProps> = ({
    IsAnimation,
    MobileVarient,
    DesktopVarient,
    Type,
    ClassWhenActive,
    ParentClassName,
    ChildClassName,
    Data,
    ClickHandler,
    children,
    mainMenuDesktop,
    Ref,
}) => {
    const clickAction = (item: SubMenu) => {
        if (Type === "Desktop") {
            ClickHandler(item.id, item.megaMenu);
        } else {
            ClickHandler({ SpecialType: "isShowItem", data: item });
        }
    };

    return (
        <>
            <motion.ul
                variants={!IsAnimation ? (Type === "Desktop" ? DesktopVarient : MobileVarient) : undefined}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={ParentClassName}
            >
                {Data.map((item) =>
                    item.items.length ? (
                        <li
                            key={item.id}
                            ref={Ref}
                            onClick={(e) => clickAction(item)}
                            className={`${ChildClassName} ${item.id === mainMenuDesktop?.id ? ClassWhenActive : ""}`}
                        >
                            <span>{item.title}</span>
                            {children}
                        </li>
                    ) : (
                        <li
                            key={item.id}
                            className={`${ChildClassName} ${item.id === mainMenuDesktop?.id ? ClassWhenActive : ""}`}
                        >
                            {item.title}
                        </li>
                    )
                )}
                {Type === "Mobile" ? (
                    <>
                        <li className="flex flex-col items-center justify-center">
                            <div className="w-full h-[1px] bg-jv-light my-5"></div>
                            <Button
                                size="middle"
                                textColor="light"
                                ClassName="w-full !bg-jv-light !text-jv-danger rounded-lg !border-jv-danger mx-2"
                                ClickHandler={() => {}}
                                isLoading={false}
                                noBorder
                            >
                                گزارش کارنامه بازار
                            </Button>
                        </li>
                    </>
                ) : null}
            </motion.ul>
        </>
    );
};

export const ItemGenerator: React.FC<ItemGeneratorProps> = ({
    IsAnimation,
    MobileVarient,
    DesktopVarient,
    Type,
    ParentClassName,
    ChildClassName,
    Data,
    children,
    ClickHandler,
    mainItemData,
    ChildClassActivion,
}) => {
    const clickAction = (item: Item) => {
        if (Type === "Desktop") {
            ClickHandler(item);
        } else {
            ClickHandler({ SpecialType: "isShowLinks", data: item.links });
        }
    };
    return (
        <>
            <motion.ul
                variants={!IsAnimation ? (Type === "Desktop" ? DesktopVarient : MobileVarient) : undefined}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={ParentClassName}
            >
                {Data.items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => clickAction(item)}
                        className={`${ChildClassName} ${
                            Type === "Desktop" && mainItemData?.id === item.id ? ChildClassActivion : ""
                        }`}
                    >
                        <span>{item.title}</span>
                        {item.links.length ? children : null}
                    </li>
                ))}
            </motion.ul>
        </>
    );
};

export const LinkGenerator: React.FC<React.PropsWithChildren<LinkGeneratorProps>> = ({
    IsAnimation,
    MobileVarient,
    DesktopVarient,
    Type,
    ParentClassName,
    ChildClassName,
    LinksWrapperClassName,
    SublinkParentClassName,
    SublinkChildClassName,
    SublinkLinkWrapperClassName,
    children,
    Data,
    ClickHandler,
    isChildrenShow,
}) => {
    const clickAction = (item: Link) => {
        if (Type === "Desktop") {
            // ClickHandler(item);
        } else {
            console.log("Item Mobile Click");
        }
    };

    return (
        <>
            <motion.ul
                variants={!IsAnimation ? (Type === "Desktop" ? DesktopVarient : MobileVarient) : undefined}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={ParentClassName}
            >
                {Data.map((link) => (
                    <li key={link.id} className={ChildClassName}>
                        <div onClick={() => clickAction(link)} className={LinksWrapperClassName}>
                            <span>{link.title}</span>
                            {/* <span className={`${Type === "Mobile" ? "flex items-center gap-2" : ""}`}>
                                {children}
                            </span> */}

                            {link.sublinks.length && isChildrenShow ? (
                                <motion.ul
                                    variants={
                                        !IsAnimation ? (Type === "Desktop" ? DesktopVarient : MobileVarient) : undefined
                                    }
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={SublinkParentClassName}
                                >
                                    {link.sublinks.map((subLink) => (
                                        <li key={subLink.id} className={SublinkChildClassName}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-3 h-3 ml-1.5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                                />
                                            </svg>
                                            <a className={SublinkLinkWrapperClassName} href={`#${subLink.link}`}>
                                                {subLink.title}
                                            </a>
                                        </li>
                                    ))}
                                </motion.ul>
                            ) : null}
                        </div>
                    </li>
                ))}
            </motion.ul>
        </>
    );
};
