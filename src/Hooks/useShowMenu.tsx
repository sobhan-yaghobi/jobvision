import React, { useRef, useState, useEffect } from "react";
import { Item, SubMenu, menu } from "../Components/MenuItem/menuItem.type";

interface typer {
    isShow: boolean;
    isMega: boolean;
    id: string;
    x: number | null;
    y: number | null;
    width: number | null;
}

interface UseShowMenuProps {
    filtredMenuItem: (ID: string) => void;
}

const UseShowMenu = (
    menu: SubMenu[]
): [
    React.RefObject<HTMLLIElement>,
    SubMenu,
    boolean,
    typer,
    () => void,
    (ID: string, isMega: boolean) => typer | void
] => {
    console.log("useShowMenu Run");

    const elm = useRef<HTMLLIElement>(null);
    const [mainItem, setMainItem] = useState<SubMenu>({} as SubMenu);
    const [isMenuMobile, setIsMenuMobile] = useState(false);
    const [isMenuDesktop, setIsMenuDesktop] = useState<typer>({
        isShow: false,
        isMega: false,
        id: "",
        x: null,
        y: null,
        width: null,
    });

    const menuMobileFire = () => {
        setIsMenuMobile((prev) => (prev = !prev));
    };

    const menuDesktopFire = (ID: string, isMega: boolean) => {
        const position = elm.current?.getBoundingClientRect();
        setMainItem(menu.filter((item) => item.id === ID)[0]);

        setIsMenuDesktop((prev) => {
            if (ID === prev.id) {
                return {
                    id: "",
                    isShow: false,
                    isMega,
                    x: position?.x ? position.x : null,
                    y: position?.y ? position.y : null,
                    width: position?.width ? position.width : null,
                };
            } else {
                return {
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

    return [elm, mainItem, isMenuMobile, isMenuDesktop, menuMobileFire, menuDesktopFire];
};

export default UseShowMenu;
