import React, { useEffect, useState } from "react";
import { Item, SubMenu } from "./menuItem.type";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface MenuItemProps {
    type: "DESKTOP" | "MOBILE";
    menuData: SubMenu;
}

interface MenuGenerator {
    menuData: SubMenu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuData, type }) => {
    if (type === "DESKTOP") {
        return <MenuDesktopItemGenerate menuData={menuData}></MenuDesktopItemGenerate>;
    } else {
        return <MenuMobileItemGenerate menuData={menuData}></MenuMobileItemGenerate>;
    }
};

const MenuDesktopItemGenerate: React.FC<MenuGenerator> = ({ menuData }) => {
    console.log(menuData);
    const [mainItem, setMainItem] = useState<Item>({} as Item);

    const hoverItemAction = (item: Item) => {
        setMainItem(item);
    };

    useEffect(() => {
        setMainItem({ ...menuData.items[0] });
    }, []);
    return (
        <>
            <ul className="relative mega-menu shadow-md shadow-[#05050510] w-full h-10 flex">
                {menuData.items.map((item) => (
                    <li
                        onMouseEnter={() => hoverItemAction(item)}
                        className={`menu__item ${
                            mainItem.id === item.id ? "text-jv-primary border-jv-primary" : "border-transparent"
                        }`}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
            {mainItem.id ? (
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
                                            <li key={subLink.id} className={`w-full flex items-center mt-2 first:mt-0`}>
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
            ) : null}
        </>
    );
};

const MenuMobileItemGenerate: React.FC<MenuGenerator> = ({ menuData }) => {
    return <></>;
};

export default MenuItem;
