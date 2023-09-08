import React, { useRef, useState, useEffect } from "react";
import { SubMenu } from "../Components/MenuItem/menuItem.type";

interface typer {
    isShow: boolean;
    isMega: boolean;
    id: string;
    x: number | null;
    y: number | null;
}

const UseShowMenu = (
    menuData: SubMenu[]
): [React.RefObject<HTMLLIElement>, boolean, typer, () => void, (ID: string, isMega: boolean) => typer | void, SubMenu] => {
    const elm = useRef<HTMLLIElement>(null);
    const [mainMenuItem, setMainMenuItem] = useState<SubMenu>({} as SubMenu);
    const [isMenuMobile, setIsMenuMobile] = useState(false);
    const [isMenuDesktop, setIsMenuDesktop] = useState<typer>({
        isShow: false,
        isMega: false,
        id: "",
        x: null,
        y: null,
    });

    const menuMobileFire = () => {
        setIsMenuMobile((prev) => (prev = !prev));
    };

    const menuDesktopFire = (ID: string, isMega: boolean) => {
        const position = elm.current?.getBoundingClientRect();

        setIsMenuDesktop((prev) => {
            if (ID === prev.id) {
                return {
                    id: "",
                    isShow: false,
                    isMega,
                    x: position?.x ? position?.x : null,
                    y: position?.y ? position?.y : null,
                };
            } else {
                return {
                    id: ID,
                    isShow: true,
                    isMega,
                    x: position?.x ? position?.x : null,
                    y: position?.y ? position?.y : null,
                };
            }
        });
    };

    useEffect(() => {
        const filtredMenu = menuData.filter((item) => item.id === isMenuDesktop.id);
        setMainMenuItem(filtredMenu[0]);
    }, [isMenuDesktop.id]);

    return [elm, isMenuMobile, isMenuDesktop, menuMobileFire, menuDesktopFire, mainMenuItem];
};

export default UseShowMenu;
