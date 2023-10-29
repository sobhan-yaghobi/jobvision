import React, { useState, useEffect } from "react";

// Types
import { MenuItemType, MenuProps, MenuClassNames, ItemGeneratorPorps } from "./Menu.type";

// Functions
import { twMerge } from "tailwind-merge";

// Icons
import { AiFillCaretDown } from "react-icons/ai";

const ItemGenerator: React.FC<ItemGeneratorPorps> = ({ mainItem, item, setMainItem, setSelectMenuKey }) => {
    return (
        <li
            onClick={() => {
                setMainItem(item);
                setSelectMenuKey(item.parentKey);
            }}
            className={`${MenuClassNames.className.itemMenu} ${
                item.key === mainItem.key
                    ? MenuClassNames.className.itemMenuActive
                    : MenuClassNames.className.itemMenuDisable
            }`}
        >
            {item.icon}
            <p className={MenuClassNames.className.titleItem}>{item.label}</p>
        </li>
    );
};

const Menu: React.FC<MenuProps> = ({ defaultItem, className, items, onSelect }) => {
    const getItemAction = (): MenuItemType => {
        let mainItem: MenuItemType = {} as MenuItemType;
        items.filter((item) => {
            if (Array.isArray(item.children)) {
                item.children.find((subItem) =>
                    subItem.key === defaultItem ? Object.assign(mainItem, subItem) : undefined
                );
            } else {
                if (item.key === defaultItem) {
                    Object.assign(mainItem, item);
                }
            }
        });
        return mainItem;
    };

    const [mainItem, setMainItem] = useState<MenuItemType>(
        typeof getItemAction() !== "undefined" ? getItemAction() : ({} as MenuItemType)
    );
    const [mainSelectMenuKey, setMainSelectMenuKey] = useState<React.Key>();

    useEffect(
        () => (typeof mainItem !== "undefined" && Object.entries(mainItem).length ? onSelect(mainItem) : undefined),
        [mainItem]
    );

    return (
        <div className={MenuClassNames.className.wrapperMenu}>
            <ul className={twMerge(MenuClassNames.className.listMenu, className)}>
                {items.map((item) => (
                    <React.Fragment key={item.key}>
                        {typeof item.children === "undefined" ? (
                            <ItemGenerator
                                item={item}
                                mainItem={mainItem}
                                setMainItem={setMainItem}
                                setSelectMenuKey={setMainSelectMenuKey}
                            />
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
                                            <ItemGenerator
                                                item={subItem}
                                                mainItem={mainItem}
                                                setMainItem={setMainItem}
                                                setSelectMenuKey={setMainSelectMenuKey}
                                            />
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

export default Menu;
