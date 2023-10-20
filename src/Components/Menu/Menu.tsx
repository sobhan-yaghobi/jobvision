import React, { useState, useEffect } from "react";

import { LiteralsMainPage } from "../../Page/CmsEmployer/CmsEmployer.type";

import { twMerge } from "tailwind-merge";

import { AiFillCaretDown } from "react-icons/ai";

export type MenuItemType = {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
    mainSubPage?: LiteralsMainPage.TypeMainPageItem["mainsubpage"];
    children?: MenuItemType[];
    parentKey?: MenuItemType["key"];
};

type MenuProps = {
    items: MenuItemType[];
    className?: string;
    isOpen?: boolean;
    onSelect: (MainItem: MenuItemType) => void;
};

type mainItemSubSelectedProps = {
    menuItem: MenuItemType;
    itemParentKey: React.Key;
};

namespace MenuClassNames {
    const itemMenuClassName =
        "w-full text-sm my-1 pl-10 pr-2 py-2 rounded-lg flex items-center transition-none relative cursor-pointer";

    export const className: {
        wrapperMenu: string;
        wrapperMenuActive: string;
        wrapperMenuDisable: string;
        listMenu: string;
        itemMenu: string;
        itemMenuActive: string;
        itemMenuDisable: string;
        titleItem: string;
        fillCaretDown: string;
    } = {
        wrapperMenu: "w-full overflow-hidden duration-700 grid",
        wrapperMenuActive: "grid-rows-[1fr]",
        wrapperMenuDisable: "grid-rows-[0fr]",
        listMenu: "w-full bg-transparent min-h-0 px-1 overflow-hidden",
        itemMenu: twMerge(itemMenuClassName),
        itemMenuActive: "bg-jv-lightPrimary text-jv-primary",
        itemMenuDisable: "hover:text-jv-lightGray hover:bg-jv-light",
        titleItem: "mr-3 truncate transition-none",
        fillCaretDown: "absolute left-2 bg-inherit text-xs transition-none",
    };
}

const Menu: React.FC<MenuProps> = ({ className, items, isOpen, onSelect }) => {
    const [mainItem, setMainItem] = useState<MenuItemType>({} as MenuItemType);
    const [mainItemSubSelected, setMainItemSubSelected] = useState<MenuItemType>({} as MenuItemType);

    const fireOnSelect = (MainItem: MenuItemType) => onSelect(MainItem);
    useEffect(() => {
        console.log("mainItemSubSelected", mainItemSubSelected, Object.entries(mainItemSubSelected).length);
        console.log("mainItem", mainItem, Object.entries(mainItem).length);
        if (typeof mainItem !== "undefined") {
            fireOnSelect(mainItem);
        }
    }, [mainItem]);

    return (
        <div
            className={`${MenuClassNames.className.wrapperMenu} ${
                isOpen ? MenuClassNames.className.wrapperMenuActive : MenuClassNames.className.wrapperMenuDisable
            }`}
        >
            <ul className={twMerge(MenuClassNames.className.listMenu, "")}>
                {items.map((item) => (
                    <>
                        {typeof item.children === "undefined" ? (
                            <li
                                onClick={() => setMainItem(item)}
                                className={`${MenuClassNames.className.itemMenu} ${
                                    mainItem.key === item.key
                                        ? MenuClassNames.className.itemMenuActive
                                        : MenuClassNames.className.itemMenuDisable
                                }`}
                            >
                                {item.icon}
                                <p className={MenuClassNames.className.titleItem}>{item.label}</p>
                            </li>
                        ) : (
                            <>
                                <div
                                    onClick={() =>
                                        setMainItemSubSelected((prev) =>
                                            prev.key === item.key ? ({} as MenuItemType) : item
                                        )
                                    }
                                    className={`${MenuClassNames.className.itemMenu} ${
                                        mainItem.parentKey === item.key ? "!text-jv-primary" : ""
                                    }`}
                                >
                                    <p className={MenuClassNames.className.titleItem}>{item.label}</p>
                                    <AiFillCaretDown className={MenuClassNames.className.fillCaretDown} />
                                </div>
                                <Menu
                                    onSelect={fireOnSelect}
                                    isOpen={mainItemSubSelected.key === item.key ? true : false}
                                    items={item.children}
                                ></Menu>
                            </>
                        )}
                    </>
                ))}
            </ul>
        </div>
    );
};

// {typeof item.children !== "undefined" ? (
//
// ) : null}

export default Menu;
