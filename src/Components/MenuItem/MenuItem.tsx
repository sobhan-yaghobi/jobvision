import React, { useEffect, useState } from "react";
import { Item, SubMenu } from "./menuItem.type";
import { motion } from "framer-motion";

interface MenuItemProps {
    type: "DESKTOP" | "MOBILE";
    menuData: SubMenu;
}

interface MenuGenerator {
    menuData: SubMenu;
}

const NoMenuItemVarient = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { opacity: 1, pathLength: 1 },
};

const NoMenuItemVarientTransition = {
    opacity: {
        duration: 0.1,
    },
    pathLength: {
        duration: 4,
        yoyo: Infinity,
        ease: "easeInOut",
    },
};

const MenuItem: React.FC<MenuItemProps> = ({ menuData, type }) => {
    console.log("Menu Item run");

    if (type === "DESKTOP") {
        return <MenuDesktopItemGenerate menuData={menuData}></MenuDesktopItemGenerate>;
    } else {
        return <MenuMobileItemGenerate menuData={menuData}></MenuMobileItemGenerate>;
    }
};

const MenuDesktopItemGenerate: React.FC<MenuGenerator> = ({ menuData }) => {
    const [mainItem, setMainItem] = useState<Item>({} as Item);

    const hoverItemAction = (item: Item) => {
        setMainItem(item);
    };

    useEffect(() => {
        const firstMenuItem: Item = { ...menuData.items[0] };

        setMainItem(firstMenuItem);
    }, []);

    useEffect(() => {
        console.log(mainItem);
    }, [mainItem]);

    if (Object.keys(mainItem).length) {
        return (
            <>
                <ul className="relative mega-menu shadow-md shadow-[#05050510] w-full h-10 flex">
                    {menuData.items.map((item) => (
                        <li
                            key={item.id}
                            onMouseEnter={() => hoverItemAction(item)}
                            className={`menu__item ${
                                mainItem.id === item.id ? "text-jv-primary border-jv-primary" : "border-transparent"
                            }`}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
                {mainItem.links.length ? (
                    <ul
                        className={`bg-white columns-5 absolute top-16 bottom-0 left-0 right-0 cursor-default p-3 rounded-b-xl overflow-y-auto duration-0 group-hover:visible group-hover:opacity-100`}
                    >
                        {mainItem.links.map((link) => (
                            <li key={link.id} className={`h-max max-h-max m-1`}>
                                <button
                                    className={`text-jv-dark dana-bold w-full h-full flex flex-col px-3 py-1 cursor-pointer hover:text-jv-primary`}
                                >
                                    {link.title}
                                    {link.sublinks.length ? (
                                        <ul className={`w-full p-3 cursor-default`}>
                                            {link.sublinks.map((subLink) => (
                                                <li
                                                    key={subLink.id}
                                                    className={`w-full flex items-center mt-2 first:mt-0`}
                                                >
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
                                                    <a
                                                        className={`text-jv-dark w-full inline-block text-right hover:text-jv-primary`}
                                                        // path={`#${subLink.link}`}
                                                    >
                                                        {subLink.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ErrorShow></ErrorShow>
                )}
            </>
        );
    } else {
        return <ErrorShow></ErrorShow>;
    }
};

const ErrorShow: React.FC = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <svg width="248" height="155" viewBox="0 0 248 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_137_10)">
                        <motion.path
                            variants={NoMenuItemVarient}
                            transition={NoMenuItemVarientTransition}
                            initial="hidden"
                            animate="visible"
                            d="M124 119C175.362 119 217 109.904 217 98.6829C217 87.4621 175.362 78.3658 124 78.3658C72.6375 78.3658 31 87.4621 31 98.6829C31 109.904 72.6375 119 124 119Z"
                            fill="#F5F5F5"
                        />
                        <motion.path
                            variants={NoMenuItemVarient}
                            transition={NoMenuItemVarientTransition}
                            initial="hidden"
                            animate="visible"
                            d="M190.844 39.9376L161.357 6.5537C159.942 4.27819 157.875 2.90244 155.698 2.90244H92.3015C90.1248 2.90244 88.0584 4.27819 86.6431 6.5508L57.1562 39.9405V66.7561H190.844V39.9376Z"
                            stroke="#AFA5A5"
                            strokeWidth="3"
                        />
                        <motion.path
                            variants={NoMenuItemVarient}
                            transition={NoMenuItemVarientTransition}
                            initial="hidden"
                            animate="visible"
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
            </div>
        </>
    );
};

const MenuMobileItemGenerate: React.FC<MenuGenerator> = ({ menuData }) => {
    return <></>;
};

export default MenuItem;
