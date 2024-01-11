import React, { useEffect, useState } from "react";
// Types
import {
    MenuDesktopItemGenerateProps,
    SubMenuGeneratorProps,
    ItemGeneratorProps,
    LinkGeneratorProps,
    menuItems,
    itemLinks,
} from "./menu.type";

// Animations
import { ShowOpacity } from "../../Animations/Animation";

// Components
import { motion } from "framer-motion";
import Button from "../Button/Button";
import ErrorBox from "../ErrorBox/ErrorBox";
import { twMerge } from "tailwind-merge";
import useSearchForm from "../../Hooks/useSearchForm";

export const MenuDesktopItemGenerate: React.FC<MenuDesktopItemGenerateProps> = ({ menuData, onClose }) => {
    if (menuData.megaMenu) {
        const [mainItem, setMainItem] = useState<itemLinks>({} as itemLinks);

        useEffect(() => {
            const firstMenuItem: itemLinks = { ...menuData.items[0] };

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
                            Type="Desktop"
                            DesktopVarient={ShowOpacity}
                            Data={mainItem.links}
                            mainItem={mainItem}
                            isChildrenShow
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
                            onClose={onClose}
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

export const SubMenuGenerator: React.FC<SubMenuGeneratorProps> = (props) => {
    const subMenuClickAction = (item: menuItems) =>
        props.Type === "Desktop"
            ? props.ClickHandler(item.id, item.megaMenu)
            : props.Type === "Mobile"
            ? props.ClickHandler({ SpecialType: "isShowItem", data: item })
            : undefined;

    const itemClassName = (id: string): string =>
        twMerge(
            props.className[0]?.ChildClassName,
            props.Type === "Desktop" && id === props.mainMenuDesktop?.id ? props.className[0]?.ClassWhenActive : ""
        );

    return (
        <>
            <motion.ul
                variants={
                    !props.IsAnimation
                        ? props.Type === "Desktop"
                            ? props.DesktopVarient
                            : props.Type === "Mobile"
                            ? props.MobileVarient
                            : undefined
                        : undefined
                }
                initial="hidden"
                animate="visible"
                exit="exit"
                className={props.className[0]?.ParentClassName}
            >
                {props.Data.map((item) =>
                    item.items.length ? (
                        <li
                            key={item.id}
                            ref={props.Ref}
                            onClick={() => subMenuClickAction(item)}
                            className={itemClassName(item.id)}
                        >
                            <span>{item.title}</span>
                            {props.children}
                        </li>
                    ) : (
                        <li key={item.id} className={itemClassName(item.id)}>
                            {item.title}
                        </li>
                    )
                )}
                {props.Type === "Mobile" ? (
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

export const ItemGenerator: React.FC<ItemGeneratorProps> = (props) => {
    const itemClickAction = (item: itemLinks) =>
        props.Type === "Desktop"
            ? props.ClickHandler(item)
            : props.Type === "Mobile"
            ? props.ClickHandler({ SpecialType: "isShowLinks", data: item.links, mainItem: item })
            : undefined;
    return (
        <>
            <motion.ul
                variants={
                    !props.IsAnimation
                        ? props.Type === "Desktop"
                            ? props.DesktopVarient
                            : props.MobileVarient
                        : undefined
                }
                initial="hidden"
                animate="visible"
                exit="exit"
                className={props.className[0].ParentClassName}
            >
                {props.Data.items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => itemClickAction(item)}
                        className={twMerge(
                            props.className[0].ChildClassName,
                            props.Type === "Desktop" && props.mainItemData?.id === item.id
                                ? props.className[0].ChildClassActivion
                                : ""
                        )}
                    >
                        <span>{item.title}</span>
                        {item.links.length && props.Type === "Mobile" ? props.children : null}
                    </li>
                ))}
            </motion.ul>
        </>
    );
};

export const LinkGenerator: React.FC<React.PropsWithChildren<LinkGeneratorProps>> = (props) => {
    const { navigate_SetValue } = useSearchForm();
    const linkClickAction = (value: string) => {
        props.mainItem.link === "most-jobs"
            ? navigate_SetValue({ to: "/jobs", name: "jobsGroup", value })
            : props.mainItem.link === "cityes"
            ? navigate_SetValue({ to: "/jobs", name: "city", value })
            : navigate_SetValue({ to: "/jobs", name: "title", value: "" });
        props.onClose();
    };

    return (
        <>
            <motion.ul
                variants={
                    !props.IsAnimation
                        ? props.Type === "Desktop"
                            ? props.DesktopVarient
                            : props.MobileVarient
                        : undefined
                }
                initial="hidden"
                animate="visible"
                exit="exit"
                className={props.className[0].ParentClassName}
            >
                {props.Data.map((link) => (
                    <li key={link.id} className={props.className[0].ChildClassName}>
                        <div className={props.className[0].LinksWrapperClassName}>
                            <span
                                onClick={() => linkClickAction(link.title)}
                                className={props.className[0].LinksTitleClassName}
                            >
                                {link.title}
                            </span>

                            {link.sublinks.length && props.isChildrenShow ? (
                                <motion.ul
                                    variants={
                                        !props.IsAnimation
                                            ? props.Type === "Desktop"
                                                ? props.DesktopVarient
                                                : props.MobileVarient
                                            : undefined
                                    }
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={props.className[0].SublinkParentClassName}
                                >
                                    {link.sublinks.map((subLink) => (
                                        <li
                                            onClick={(e) => linkClickAction(subLink.title)}
                                            key={subLink.id}
                                            className={props.className[0].SublinkChildClassName}
                                        >
                                            <span className={props.className[0].SublinkLinkWrapperClassName}>
                                                {subLink.title}
                                            </span>
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
