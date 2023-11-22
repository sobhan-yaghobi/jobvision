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
import { ShowOpacity } from "../../Animations/UtilsAnimation";

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
                        className={[
                            {
                                ParentClassName: "relative mega-menu shadow-md shadow-[#05050510] w-full h-10 flex",
                                ChildClassName: "menu__item border-transparent",
                                ChildClassActivion: "text-jv-primary !border-jv-primary",
                            },
                        ]}
                        ClickHandler={setMainItem}
                        Data={menuData}
                        mainItemData={mainItem}
                    ></ItemGenerator>
                    {mainItem.links.length ? (
                        <LinkGenerator
                            DesktopVarient={ShowOpacity}
                            Type="Desktop"
                            className={[
                                {
                                    ParentClassName:
                                        "text-sm bg-white w-full columns-4 absolute top-12 bottom-0 left-0 right-0 cursor-default p-3 rounded-b-xl overflow-y-auto",
                                    ChildClassName: "overflow-hidden max-w-max h-max max-h-max m-1",
                                    LinksWrapperClassName:
                                        "text-jv-lightGray dana-bold w-full h-full flex flex-col px-3 py-1 hover:text-jv-primary ",
                                    LinksTitleClassName:
                                        "relative mb-1 after:content-[''] after:absolute after:top-0 after:-right-2 after:w-1 after:h-full after:bg-jv-primary after:rounded-sm",
                                    //
                                    SublinkParentClassName: "w-full px-3 cursor-default hiiden",
                                    SublinkChildClassName: "w-full flex items-center mt-2 first:mt-0",
                                    SublinkLinkWrapperClassName:
                                        "text-jv-gray w-full inline-block hover:text-jv-primary",
                                },
                            ]}
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
    className,
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
                className={className[0]?.ParentClassName}
            >
                {Data.map((item) =>
                    item.items.length ? (
                        <li
                            key={item.id}
                            ref={Ref}
                            onClick={(e) => clickAction(item)}
                            className={`${className[0]?.ChildClassName} ${
                                item.id === mainMenuDesktop?.id ? className[0]?.ClassWhenActive : ""
                            }`}
                        >
                            <span>{item.title}</span>
                            {children}
                        </li>
                    ) : (
                        <li
                            key={item.id}
                            className={`${className[0]?.ChildClassName} ${
                                item.id === mainMenuDesktop?.id ? className[0]?.ClassWhenActive : ""
                            }`}
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
    className,
    Data,
    children,
    ClickHandler,
    mainItemData,
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
                className={className[0].ParentClassName}
            >
                {Data.items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => clickAction(item)}
                        className={`${className[0].ChildClassName} ${
                            Type === "Desktop" && mainItemData?.id === item.id ? className[0].ChildClassActivion : ""
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
    className,
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
                className={className[0].ParentClassName}
            >
                {Data.map((link) => (
                    <li key={link.id} className={className[0].ChildClassName}>
                        <div onClick={() => clickAction(link)} className={className[0].LinksWrapperClassName}>
                            <span className={className[0].LinksTitleClassName}>{link.title}</span>
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
                                    className={className[0].SublinkParentClassName}
                                >
                                    {link.sublinks.map((subLink) => (
                                        <li key={subLink.id} className={className[0].SublinkChildClassName}>
                                            <a
                                                className={className[0].SublinkLinkWrapperClassName}
                                                href={`#${subLink.link}`}
                                            >
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
