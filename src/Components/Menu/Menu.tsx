import React, { useState, useEffect } from "react";

// Types
import { MenuItemType, MenuProps, MenuClassNames, mainItemType } from "./Menu.type";

// Functions
import { twMerge } from "tailwind-merge";

// Icons
import { AiFillCaretDown } from "react-icons/ai";

const Menu: React.FC<MenuProps> = ({ defaultItem, className, items, isOpen, onSelect }) => {
    const defaultMainItem: mainItemType["mainItem"] = items.find((item) => item.key === defaultItem);

    const [mainItems, setMainItems] = useState<mainItemType>(
        typeof defaultItem !== "undefined"
            ? { mainItem: defaultMainItem, mainItemSelected: undefined }
            : ({} as mainItemType)
    );

    const fireOnSelect: MenuProps["onSelect"] = ({ mainItem, mainItemSelected }) =>
        setMainItems({ mainItem, mainItemSelected });

    useEffect(() => {
        console.log("mainItems", mainItems);
        if (typeof mainItems.mainItem !== "undefined" && Object.entries(mainItems.mainItem).length) {
            onSelect({ mainItem: mainItems.mainItem, mainItemSelected: mainItems.mainItemSelected });
        }
    }, [mainItems]);

    return (
        <div
            className={`${MenuClassNames.className.wrapperMenu} ${
                isOpen ? MenuClassNames.className.wrapperMenuActive : MenuClassNames.className.wrapperMenuDisable
            }`}
        >
            <ul className={twMerge(MenuClassNames.className.listMenu, className)}>
                {items.map((item) => (
                    <React.Fragment key={item.key}>
                        {typeof item.children === "undefined" ? (
                            <li
                                onClick={() =>
                                    setMainItems({
                                        mainItem: item,
                                        mainItemSelected:
                                            typeof item.parentKey !== "undefined" ? item.parentKey : undefined,
                                    })
                                }
                                className={`${MenuClassNames.className.itemMenu} ${
                                    mainItems.mainItem?.key === item.key
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
                                        setMainItems((prev) => ({
                                            ...prev,
                                            mainItemSelected: prev.mainItemSelected === item.key ? undefined : item.key,
                                        }))
                                    }
                                    className={`${MenuClassNames.className.itemMenu} ${
                                        mainItems.mainItemSelected === item.key ? "!text-jv-primary" : ""
                                    }`}
                                >
                                    <p className={MenuClassNames.className.titleItem}>{item.label}</p>
                                    <AiFillCaretDown className={MenuClassNames.className.fillCaretDown} />
                                </div>
                                <Menu
                                    onSelect={fireOnSelect}
                                    isOpen={mainItems.mainItemSelected === item.key ? true : false}
                                    items={item.children}
                                ></Menu>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
