import { useEffect, useRef, useState } from "react";
// Types
import { Item, Link, SubMenu } from "../../Components/Menu/menu.type";
import { DesktopMenuType, menuMobileFireProps, MobileMenuType } from "./useShowMenu.type";
// Functions
import { mapValues } from "lodash";

const useShowMenu = (menu: SubMenu[]) => {
    const elm = useRef<HTMLLIElement>(null);

    const menuMobileDefaultValue: MobileMenuType = {
        menuData: {
            SubMenus: [] as SubMenu[],
            SubMenu: {} as SubMenu,
            Item: {} as Item,
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
    };
    const [menuMobile, setMenuMobiele] = useState<MobileMenuType>({ ...menuMobileDefaultValue });
    const [menuDesktop, setMenuDesktop] = useState<DesktopMenuType>({
        mainItem: {} as SubMenu,
        isShow: false,
        isMega: false,
        id: "",
        x: null,
        y: null,
        width: null,
    });

    const menuMobileFire = (props: menuMobileFireProps) => {
        if (props.SpecialType === "isShowSubMenu") {
            setMenuMobiele((prev) => ({
                ...prev,
                goAnimationTo: "Back",
                isOpen: true,
                isShow: {
                    SubMenu: !prev.isShow.SubMenu,
                    Item: false,
                    Links: false,
                },
                menuData: {
                    SubMenus: menu,
                    SubMenu: {} as SubMenu,
                    Links: [] as Link[],
                    Item: {} as Item,
                },
            }));
        } else if (props.SpecialType === "isShowItem") {
            setMenuMobiele((prev) => ({
                ...prev,
                goAnimationTo: "Back",
                isOpen: true,
                isShow: {
                    SubMenu: false,
                    Item: !prev.isShow.Item,
                    Links: false,
                },
                menuData: {
                    SubMenus: prev.menuData.SubMenus,
                    SubMenu: props.data,
                    Links: [] as Link[],
                    Item: {} as Item,
                },
            }));
        } else if (props.SpecialType === "isShowLinks") {
            setMenuMobiele((prev) => ({
                ...prev,
                goAnimationTo: "Back",
                isOpen: true,
                isShow: {
                    SubMenu: false,
                    Item: false,
                    Links: !prev.isShow.Links,
                },
                menuData: {
                    SubMenus: menu,
                    SubMenu: prev.menuData.SubMenu,
                    Links: props.data,
                    Item: props.mainItem,
                },
            }));
        }
    };

    const closeMenuMobile = () => setMenuMobiele({ ...menuMobileDefaultValue });

    const backButtonAcion = () => {
        if (menuMobile.isShow.Item) {
            setMenuMobiele((prev) => ({
                ...prev,
                goAnimationTo: "Forward",
                isShow: { Item: false, Links: false, SubMenu: true },
            }));
        } else if (menuMobile.isShow.Links) {
            setMenuMobiele((prev) => ({
                ...prev,
                goAnimationTo: "Forward",
                isShow: { Item: true, Links: false, SubMenu: false },
            }));
        }
    };

    const menuMobileToggle = () => {
        const filter = mapValues(menuMobile.isShow, (value, property) => {
            if (property.toString() === "SubMenu") {
                return true;
            }
            return false;
        });
        setMenuMobiele((prev) => ({
            ...prev,
            isShow: { ...filter },
            goAnimationTo: "Back",
            isOpen: !prev.isOpen,
        }));
    };

    const menuDesktopFire = (ID: string, isMega: boolean) => {
        const position = elm.current?.getBoundingClientRect();
        const mainItem = menu.filter((item) => item.id === ID)[0];

        setMenuDesktop((prev) => {
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

    const closeMenuDesktop = () => menuDesktopFire("", false);

    return {
        elm,
        menuMobile,
        menuDesktop,
        backButtonAcion,
        menuMobileFire,
        closeMenuMobile,
        menuMobileToggle,
        menuDesktopFire,
        closeMenuDesktop,
    };
};

export default useShowMenu;
