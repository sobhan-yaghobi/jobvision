import React, { useRef, useState } from "react";
import { Item, Link, SubMenu, menu } from "../Components/MenuItem/menuItem.type";

interface DesktopMenuType {
    mainItem: SubMenu;
    isShow: boolean;
    isMega: boolean;
    id: string;
    x: number | null;
    y: number | null;
    width: number | null;
}

interface MobileMenuType {
    menuData: SubMenu[] | SubMenu | Item | Link;
    isShow: boolean;
    type: "Submenus" | "Item" | "Link";
    goAnimationTo: "Forward" | "Back";
}

const UseShowMenu = (
    menu: SubMenu[]
): [
    React.RefObject<HTMLLIElement>,
    MobileMenuType,
    DesktopMenuType,
    () => void,
    (ID: string, isMega: boolean) => DesktopMenuType | void
] => {
    const elm = useRef<HTMLLIElement>(null);
    const [isMenuMobile, setIsMenuMobile] = useState<MobileMenuType>({
        menuData: [] as SubMenu[],
        isShow: false,
        type: "Submenus",
        goAnimationTo: "Back",
    });
    const [isMenuDesktop, setIsMenuDesktop] = useState<DesktopMenuType>({
        mainItem: {} as SubMenu,
        isShow: false,
        isMega: false,
        id: "",
        x: null,
        y: null,
        width: null,
    });

    const menuMobileFire = () => {
        setIsMenuMobile((prev) => ({ ...prev, isShow: !prev.isShow }));
    };

    const menuDesktopFire = (ID: string, isMega: boolean) => {
        const position = elm.current?.getBoundingClientRect();
        const mainItem = menu.filter((item) => item.id === ID)[0];

        setIsMenuDesktop((prev) => {
            if (ID === prev.id) {
                return {
                    mainItem: {} as SubMenu,
                    id: "",
                    isShow: false,
                    isMega,
                    x: position?.x ? position.x : null,
                    y: position?.y ? position.y : null,
                    width: position?.width ? position.width : null,
                };
            } else {
                return {
                    mainItem: mainItem,
                    id: ID,
                    isShow: true,
                    isMega,
                    x: position?.x ? position.x : null,
                    y: position?.y ? position.y : null,
                    width: position?.width ? position.width : null,
                };
            }
        });
    };

    return [elm, isMenuMobile, isMenuDesktop, menuMobileFire, menuDesktopFire];
};

export default UseShowMenu;
