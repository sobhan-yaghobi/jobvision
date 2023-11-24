import { Item, Link, SubMenu } from "../../Components/MenuItem/menuItem.type";

export interface DesktopMenuType {
    mainItem: SubMenu;
    isShow: boolean;
    isMega: boolean;
    id: string;
    x: number | null;
    y: number | null;
    width: number | null;
}
export interface isForSubMenu {
    SpecialType: "isShowSubMenu";
    data: SubMenu[];
}
export interface isForItems {
    SpecialType: "isShowItem";
    data: SubMenu;
}
export interface isForLinks {
    SpecialType: "isShowLinks";
    data: Link[];
    mainItem: Item;
}
export type menuMobileFireProps = isForSubMenu | isForItems | isForLinks;

export interface MobileMenuType {
    menuData: {
        SubMenus: SubMenu[];
        SubMenu: SubMenu;
        Item: Item;
        Links: Link[];
    };
    isOpen: boolean;
    isShow: {
        SubMenu: boolean;
        Item: boolean;
        Links: boolean;
    };
    goButtonTitle: string;
    goAnimationTo: "Forward" | "Back";
}
