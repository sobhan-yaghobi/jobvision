import React, { useState } from "react";
import MenuItemCms, { MenuItemCmsType } from "../MenuItemCms/MenuItemCms";
import { AiFillCaretDown } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
type MenuCmsProps = {
    pageItems: MenuItemCmsType[];
    mainSubItemQuery?: string;
};
const MenuCms: React.FC<MenuCmsProps> = ({ pageItems, mainSubItemQuery }) => {
    const [mainSubItem, setMainSubItem] = useState({} as MenuItemCmsType);
    const className = {
        wrapperMenu: "w-full overflow-hidden duration-700 grid",
        wrapperMenuActive: "grid-rows-[1fr] pr-3",
        wrapperMenuDisable: "grid-rows-[0fr]",
        listMenu: "w-full bg-transparent min-h-0 px-1 overflow-hidden",
        itemMenu: "cms_navlink",
        itemMenuActive: "bg-jv-lightPrimary text-jv-primary",
        itemMenuDisable: "hover:text-jv-lightGray hover:bg-jv-light",
        titleItem: "mr-3 truncate transition-none",
        fillCaretDown: "absolute left-2 bg-transparent text-xs transition-none",
    };
    const isItemInSub = (item: MenuItemCmsType): boolean =>
        typeof item.children !== "undefined"
            ? item.children.some(
                  (item) => item.key.toString().toLocaleLowerCase() === mainSubItemQuery?.toLocaleLowerCase()
              )
            : false;
    return (
        <div className={className.wrapperMenu}>
            <ul className={className.listMenu}>
                {pageItems.map((item) => (
                    <React.Fragment key={item.key}>
                        {typeof item.children === "undefined" ? (
                            <span onClick={() => setMainSubItem({} as MenuItemCmsType)}>
                                <MenuItemCms item={item} />
                            </span>
                        ) : (
                            <>
                                <div
                                    onClick={() =>
                                        item.key === mainSubItem.key
                                            ? setMainSubItem({} as MenuItemCmsType)
                                            : setMainSubItem(item)
                                    }
                                    className={`${className.itemMenu} ${
                                        item.key === mainSubItem.key || isItemInSub(item)
                                            ? className.itemMenuActive
                                            : className.itemMenuDisable
                                    }`}
                                >
                                    <div className="flex">
                                        {item.icon}
                                        <p className={className.titleItem}>{item.label}</p>
                                    </div>
                                    <AiFillCaretDown className={className.fillCaretDown} />
                                </div>
                                <div
                                    className={twMerge(
                                        className.wrapperMenu,
                                        item.key === mainSubItem.key
                                            ? className.wrapperMenuActive
                                            : className.wrapperMenuDisable
                                    )}
                                >
                                    <ul className={className.listMenu}>
                                        {item.children.map((subItem) => (
                                            <MenuItemCms key={`sub_item_${subItem.key}`} item={subItem} />
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
export default MenuCms;
