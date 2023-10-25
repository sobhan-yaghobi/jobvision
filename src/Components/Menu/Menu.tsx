import React, { useState, useEffect } from "react";

// Types
import { MenuItemType, MenuProps, MenuClassNames, mainItemType } from "./Menu.type";

// Functions
import { twMerge } from "tailwind-merge";

// Icons
import { AiFillCaretDown } from "react-icons/ai";

const Menu: React.FC<MenuProps> = ({ defaultItem, className, items, onSelect }) => {
    const getItemAction = (): MenuItemType => {
        let mainItem: MenuItemType | undefined = {} as MenuItemType;

        items.filter((item) => {
            if (Array.isArray(item.children)) {
                mainItem = item.children.find((subItem) => subItem.key === defaultItem);
            } else {
                if (item.key === defaultItem) {
                    console.log("else Bruhhhhhhhhh", "defaultItem", defaultItem, "item", item, item.children);
                    mainItem = { ...item };
                }
            }
        });
        console.log("mainItem", mainItem);

        return mainItem;
    };

    const [mainItem, setMainItem] = useState<MenuItemType>(
        typeof getItemAction() !== "undefined" ? getItemAction() : ({} as MenuItemType)
    );
    const [mainSelectMenuKey, setMainSelectMenuKey] = useState<React.Key>();

    console.log("getItemAction", getItemAction());

    useEffect(() => {
        // console.log("mainItem ", mainItem);
        // console.log("mainSelectMenuKey ", mainSelectMenuKey);

        if (typeof mainItem !== "undefined" && Object.entries(mainItem).length) {
            onSelect(mainItem);
        }
    }, [mainItem]);

    return (
        <div className={MenuClassNames.className.wrapperMenu}>
            <ul className={twMerge(MenuClassNames.className.listMenu, className)}>
                {items.map((item) => (
                    <React.Fragment key={item.key}>
                        {typeof item.children === "undefined" ? (
                            <li
                                onClick={() => {
                                    setMainItem(item);
                                    setMainSelectMenuKey(item.parentKey);
                                }}
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
                                        setMainSelectMenuKey((prev) => (prev === item.key ? undefined : item.key))
                                    }
                                    className={`${MenuClassNames.className.itemMenu} ${
                                        mainSelectMenuKey === item.key ? "!text-jv-primary" : ""
                                    }`}
                                >
                                    <div className="flex">
                                        {item.icon}
                                        <p className={MenuClassNames.className.titleItem}>{item.label}</p>
                                    </div>
                                    <AiFillCaretDown className={MenuClassNames.className.fillCaretDown} />
                                </div>
                                <div
                                    className={twMerge(
                                        MenuClassNames.className.wrapperMenu,
                                        item.key === mainSelectMenuKey
                                            ? MenuClassNames.className.wrapperMenuActive
                                            : MenuClassNames.className.wrapperMenuDisable
                                    )}
                                >
                                    <ul className={MenuClassNames.className.listMenu}>
                                        {item.children.map((subItem) => (
                                            <li
                                                onClick={() => {
                                                    setMainItem(subItem);
                                                    setMainSelectMenuKey(subItem.parentKey);
                                                }}
                                                className={`${MenuClassNames.className.itemMenu} ${
                                                    mainItem.key === subItem.key
                                                        ? MenuClassNames.className.itemMenuActive
                                                        : MenuClassNames.className.itemMenuDisable
                                                }`}
                                            >
                                                {subItem.icon}
                                                <p className={MenuClassNames.className.titleItem}>{subItem.label}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

type ItemGeneratorPorps = {
    mainItem: mainItemType;
    itemData: MenuItemType;
    setMainItem: React.Dispatch<React.SetStateAction<mainItemType>>;
};

const ItemGenerator: React.FC<ItemGeneratorPorps> = ({ mainItem, itemData, setMainItem }) => {
    return (
        <li
            onClick={() =>
                setMainItem({
                    mainItem: itemData,
                    mainItemSelected: typeof itemData.parentKey !== "undefined" ? itemData.parentKey : undefined,
                })
            }
            className={`${MenuClassNames.className.itemMenu} ${
                mainItem.mainItem?.key === itemData.key
                    ? MenuClassNames.className.itemMenuActive
                    : MenuClassNames.className.itemMenuDisable
            }`}
        >
            {itemData.icon}
            <p className={MenuClassNames.className.titleItem}>{itemData.label}</p>
        </li>
    );
};

export default Menu;
