import React, { useEffect, useState } from "react";
import { Item, Link, SubMenu } from "./menuItem.type";
import { motion } from "framer-motion";
import { DesktopItemVarinet } from "../Header/Header";
import Button from "../Button/Button";

const NoMenuItemVarient = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            opacity: {
                duration: 0.1,
            },
            pathLength: {
                duration: 4,
                yoyo: Infinity,
                ease: "easeInOut",
            },
        },
    },
};
interface MenuDesktopItemGenerateProps {
    menuData: SubMenu;
}

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
                        DesktopVarient={DesktopItemVarinet}
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
                            DesktopVarient={DesktopItemVarinet}
                            Type="Desktop"
                            ParentClassName="bg-white w-full columns-4 absolute top-16 bottom-0 left-0 right-0 cursor-default p-3 rounded-b-xl overflow-y-auto"
                            ChildClassName="overflow-hidden max-w-max h-max max-h-max m-1"
                            LinksWrapperClassName="text-jv-dark dana-bold w-full h-full flex flex-col px-3 py-1 hover:text-jv-primary"
                            //
                            SublinkParentClassName="w-full p-3 cursor-default hiiden"
                            SublinkChildClassName="w-full flex items-center mt-2 first:mt-0"
                            SublinkLinkWrapperClassName="text-jv-dark w-full inline-block hover:text-jv-primary"
                            Data={mainItem.links}
                            ClickHandler={() => {}}
                            isChildrenShow
                        ></LinkGenerator>
                    ) : (
                        <ErrorShow></ErrorShow>
                    )}
                </>
            );
        } else {
            return <ErrorShow></ErrorShow>;
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

interface SubMenuGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    ClassWhenActive?: String;
    ParentClassName: string;
    ChildClassName: string;
    Data: SubMenu[];
    ClickHandler: Function;
    // Mobile Type
    children?: React.ReactNode;
    // Desktop Type
    mainMenuDesktop?: SubMenu;
    Ref?: React.RefObject<HTMLLIElement>;
}

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

interface ItemGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    ParentClassName: string;
    ChildClassName: string;
    Data: SubMenu;
    ClickHandler: Function;
    children?: React.ReactNode;
    ChildClassActivion?: string;
    mainItemData?: Item;
}

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

interface LinkGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    ParentClassName: string;
    ChildClassName: string;
    LinksWrapperClassName: string;
    SublinkParentClassName: string;
    SublinkChildClassName: string;
    SublinkLinkWrapperClassName: string;
    children?: React.ReactNode;
    Data: Link[];
    ClickHandler: Function;
    isChildrenShow?: boolean;
}

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

const ErrorShow: React.FC = () => {
    return (
        <>
            <motion.div
                variants={NoMenuItemVarient}
                initial="hidden"
                animate="visible"
                className="w-full h-full flex flex-col items-center justify-center"
            >
                <svg width="248" height="155" viewBox="0 0 248 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_137_10)">
                        <motion.path
                            variants={NoMenuItemVarient}
                            d="M124 119C175.362 119 217 109.904 217 98.6829C217 87.4621 175.362 78.3658 124 78.3658C72.6375 78.3658 31 87.4621 31 98.6829C31 109.904 72.6375 119 124 119Z"
                            fill="#F5F5F5"
                        />
                        <motion.path
                            variants={NoMenuItemVarient}
                            d="M190.844 39.9376L161.357 6.5537C159.942 4.27819 157.875 2.90244 155.698 2.90244H92.3015C90.1248 2.90244 88.0584 4.27819 86.6431 6.5508L57.1562 39.9405V66.7561H190.844V39.9376Z"
                            stroke="#AFA5A5"
                            strokeWidth="3"
                        />
                        <motion.path
                            variants={NoMenuItemVarient}
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
                    className="
                text-[#AFA5A5] danaBold text-2xl"
                >
                    منویی یافت نشد
                </motion.div>
            </motion.div>
        </>
    );
};
