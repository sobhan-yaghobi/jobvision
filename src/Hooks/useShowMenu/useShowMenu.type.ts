import { itemLinks, link, menuItems } from "../../Components/Menu/menu.type";

export interface DesktopMenuType {
    mainItem: menuItems;
    isShow: boolean;
    isMega: boolean;
    id: string;
    x: number | null;
    y: number | null;
    width: number | null;
}
export interface isForSubMenu {
    SpecialType: "isShowSubMenu";
    data: menuItems[];
}
export interface isForItems {
    SpecialType: "isShowItem";
    data: menuItems;
}
export interface isForLinks {
    SpecialType: "isShowLinks";
    data: link[];
    mainItem: itemLinks;
}
export type menuMobileFireProps = isForSubMenu | isForItems | isForLinks;

export interface MobileMenuType {
    menuData: {
        SubMenus: menuItems[];
        SubMenu: menuItems;
        Item: itemLinks;
        Links: link[];
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
