import React from "react";
import { NavLink } from "react-router-dom";
export type MenuItemCmsType = {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
    link?: string;
    children?: MenuItemCmsType[];
    parentKey?: MenuItemCmsType["key"];
};
type MenuItemCmsProps = {
    item: MenuItemCmsType;
};
const MenuItemCms: React.FC<MenuItemCmsProps> = ({ item }) => {
    return (
        <NavLink
            end={item.link === "" ? true : false}
            to={typeof item.link !== "undefined" ? item.link : item.key.toString()}
            className={`cms_navlink`}
        >
            {item.icon}
            <p className={`mr-3 truncate transition-none`}>{item.label}</p>
        </NavLink>
    );
};

export default MenuItemCms;
