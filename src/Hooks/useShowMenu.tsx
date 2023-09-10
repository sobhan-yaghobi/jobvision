import React, { useRef, useState } from "react";
import { Link, SubMenu } from "../Components/MenuItem/menuItem.type";
import { mapValues } from "lodash";

interface DesktopMenuType {
    mainItem: SubMenu;
    isShow: boolean;
    isMega: boolean;
    id: string;
    x: number | null;
    y: number | null;
    width: number | null;
}
interface isForSubMenu {
    SpecialType: "isShowSubMenu";
    data: SubMenu[];
}
interface isForItems {
    SpecialType: "isShowItem";
    data: SubMenu;
}
interface isForLinks {
    SpecialType: "isShowLinks";
    data: Link[];
}
type menuMobileFireProps = isForSubMenu | isForItems | isForLinks;

interface MobileMenuType {
    menuData: {
        SubMenu: SubMenu[];
        Item: SubMenu;
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

const UseShowMenu = (
    menu: SubMenu[]
): [
    React.RefObject<HTMLLIElement>,
    MobileMenuType,
    () => void,
    DesktopMenuType,
    ({}: menuMobileFireProps) => void,
    () => void,
    (ID: string, isMega: boolean) => DesktopMenuType | void
] => {
    const elm = useRef<HTMLLIElement>(null);

    const [isMenuMobile, setIsMenuMobile] = useState<MobileMenuType>({
        menuData: {
            SubMenu: [] as SubMenu[],
            Item: {} as SubMenu,
            Links: [] as Link[],
        },
        isOpen: false,
        isShow: {
            SubMenu: false,
            Item: false,
            Links: false,
        },
        goButtonTitle: "بازگشت",
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

    const menuMobileFire = ({ SpecialType, data }: menuMobileFireProps) => {
        if (SpecialType === "isShowSubMenu") {
            setIsMenuMobile((prev) => ({
                ...prev,
                goAnimationTo: "Back",
                isOpen: true,
                isShow: {
                    SubMenu: !prev.isShow.SubMenu,
                    Item: false,
                    Links: false,
                },
                menuData: {
                    SubMenu: menu,
                    Item: {} as SubMenu,
                    Links: [] as Link[],
                },
            }));
        } else if (SpecialType === "isShowItem") {
            setIsMenuMobile((prev) => ({
                ...prev,
                goAnimationTo: "Back",
                isOpen: true,
                isShow: {
                    SubMenu: false,
                    Item: !prev.isShow.Item,
                    Links: false,
                },
                menuData: {
                    SubMenu: prev.menuData.SubMenu,
                    Item: data,
                    Links: [] as Link[],
                },
            }));
        } else if (SpecialType === "isShowLinks") {
            setIsMenuMobile((prev) => ({
                ...prev,
                goAnimationTo: "Back",
                isOpen: true,
                isShow: {
                    SubMenu: false,
                    Item: false,
                    Links: !prev.isShow.Links,
                },
                menuData: {
                    SubMenu: menu,
                    Item: prev.menuData.Item,
                    Links: data,
                },
            }));
        }
    };

    const backButtonAcion = () => {
        if (isMenuMobile.isShow.Item) {
            setIsMenuMobile((prev) => ({
                ...prev,
                goAnimationTo: "Forward",
                isShow: { Item: false, Links: false, SubMenu: true },
            }));
        } else if (isMenuMobile.isShow.Links) {
            setIsMenuMobile((prev) => ({
                ...prev,
                goAnimationTo: "Forward",
                isShow: { Item: true, Links: false, SubMenu: false },
            }));
        }
    };

    const menuMobileClose = () => {
        const filter = mapValues(isMenuMobile.isShow, (value, property) => {
            if (property.toString() === "SubMenu") {
                return true;
            }
            return false;
        });
        setIsMenuMobile((prev) => ({
            ...prev,
            isShow: { ...filter },
            goAnimationTo: "Back",
            isOpen: !prev.isOpen,
        }));
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

    return [elm, isMenuMobile, backButtonAcion, isMenuDesktop, menuMobileFire, menuMobileClose, menuDesktopFire];
};

export default UseShowMenu;
