import React from "react";
// Types
import { ItemGenerator, LinkGenerator, MenuDesktopItemGenerate, SubMenuGenerator } from "../MenuItem/MenuItem";
import { menu } from "../MenuItem/menuItem.type";

// Animations
import {
    DelayBeforeChilds,
    LongStripVertical_Ex,
    ShowAndHideOpacity_Ex,
    ShowHideClipFromBottom_Ex,
    ShowOpacity,
} from "../../Animations/UtilsAnimation";
import { ShowHideMenuItemChildToLeftOrRight } from "../../Animations/HeaderAnimation";

// Hooks
import UseShowMenu from "../../Hooks/useShowMenu/useShowMenu";

// Components
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button";

// Icons
import WhiteLogo from "/Svg/Logo/WhiteColorLogo.svg";
import PrimaryLogo from "/Svg/Logo/PrimaryColorLogo.svg";
import LeftIcon from "/Svg/Left.svg";
import ArrowLeftIconWhite from "/Svg/ArrowLeftWhiteColor.svg";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Header: React.FC = () => {
    const [elm, MenuMobile, backButtonAcion, MenuDesktop, menuMobileFire, menuMobileToggle, menuDesktopFire] =
        UseShowMenu(menu);

    const megaBgClickAction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLDivElement;
        if (target.id === "MegaBg") {
            menuDesktopFire("", false);
        }
    };

    return (
        <>
            <div className="w-full h-20 relative">
                <header className="fixed h-20 w-full px-0 border-b-[1px] border-solid border-jv-lightGray3x rounded-b-xl bg-jv-primary shadow-lg lg:bg-jv-white z-20">
                    {/*//? -------------------- Start Mobile Header -------------------- */}
                    <div className="header-mobile  w-full h-full p-2 lg:hidden flex items-center justify-between">
                        <div className="w-4/12 sm:px-3 flex items-center justify-start">
                            <Button noBorder ClickHandler={menuMobileToggle} textColor="light" isLoading={false}>
                                {MenuMobile.isOpen ? <AiOutlineClose /> : <HiOutlineMenuAlt1 className="rotate-180" />}
                            </Button>
                        </div>

                        <div className="w-4/12 sm:px-3 flex items-center justify-center">
                            <img className="w-7/12 md:w-5/12 " src={WhiteLogo} alt="" />
                        </div>

                        <div className="w-5/12 sm:w-4/12 text-center flex items-center justify-end">
                            <Button
                                noBorder
                                ClickHandler={() => {}}
                                textColor="light"
                                size="small"
                                ClassName="text-xs sm:text-base px-3"
                                isLoading={false}
                            >
                                ورود/ثبت نام کارجو
                            </Button>
                        </div>
                    </div>
                    {/*//? -------------------- Finish Mobile Header -------------------- */}

                    {/*//? -------------------- Start Desktop Header -------------------- */}
                    <div className="header-desktop w-full h-full px-24 hidden lg:flex items-center justify-between">
                        <div className="header-desktop-right w-6/12 h-full flex items-center">
                            <section className="flex w-full h-full justify-around">
                                <div className="lg:w-full flex items-center">
                                    <SubMenuGenerator
                                        Type="Desktop"
                                        ParentClassName="h-full flex"
                                        ChildClassName="menu__item border-transparent"
                                        ClassWhenActive="!border-jv-primary"
                                        ClickHandler={menuDesktopFire}
                                        Data={menu}
                                        Ref={elm}
                                        mainMenuDesktop={MenuDesktop.mainItem}
                                    ></SubMenuGenerator>
                                    <li className="hidden items-center xl:flex">
                                        <Button
                                            size="middle"
                                            textColor="light"
                                            ClassName="!bg-transparent !text-jv-danger !border-jv-danger mx-2"
                                            ClickHandler={() => {}}
                                            isLoading={false}
                                        >
                                            گزارش کارنامه بازار
                                        </Button>
                                    </li>
                                </div>
                            </section>
                        </div>
                        <div className="header-desktop-left w-6/12 flex items-center justify-end">
                            <div className="mx-5 flex border-l-[1px] border-jv-primary border-solid">
                                <Button
                                    ClickHandler={() => {
                                        console.log("click");
                                    }}
                                    textColor="light"
                                    size="middle"
                                    isLoading={false}
                                >
                                    ورود/ثبت نام کارجو
                                </Button>
                                <Button
                                    ClickHandler={() => {}}
                                    textColor="primary"
                                    size="middle"
                                    ClassName="!bg-transparent !border-none"
                                    isLoading={false}
                                >
                                    بخش کارفرمایان
                                </Button>
                            </div>
                            <img src={PrimaryLogo} alt="" />
                        </div>
                    </div>
                    {/*//? -------------------- Finish Desktop Header -------------------- */}
                </header>
            </div>
            {/*//? -------------------- Start Desktop Header DropDown -------------------- */}
            <AnimatePresence>
                {MenuDesktop.isShow && MenuDesktop.mainItem ? (
                    <motion.div
                        variants={ShowAndHideOpacity_Ex}
                        transition={DelayBeforeChilds}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        id="MegaBg"
                        onClick={(event) => megaBgClickAction(event)}
                        className={`current-mega-height bg-jv-bgColor fixed w-full z-10 hidden lg:flex ${
                            MenuDesktop.isMega ? "flex justify-center" : ""
                        }`}
                    >
                        <motion.div
                            style={
                                MenuDesktop.isMega
                                    ? {}
                                    : {
                                          width: `${MenuDesktop.width}px`,
                                          left: `${MenuDesktop.x}px`,
                                          top: `${MenuDesktop.y}px`,
                                      }
                            }
                            className={`absolute ${
                                MenuDesktop.isMega ? "w-11/12 h-[95%] bg-jv-light rounded-b-lg p-2" : ""
                            }`}
                            variants={LongStripVertical_Ex}
                        >
                            <MenuDesktopItemGenerate menuData={MenuDesktop.mainItem}></MenuDesktopItemGenerate>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Desktop Header DropDown -------------------- */}
            {/*//? -------------------- Start Mobile Header DropDown -------------------- */}
            <AnimatePresence>
                {MenuMobile.isOpen ? (
                    <motion.div
                        variants={ShowHideClipFromBottom_Ex}
                        transition={DelayBeforeChilds}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`header-dropwodn-mobile w-full h-4/6 rounded-t-3xl fixed lg:hidden bottom-0 right-0 bg-jv-primary  text-right ${
                            MenuMobile.isOpen ? "z-20" : "z-10"
                        }`}
                    >
                        <motion.div
                            variants={ShowHideMenuItemChildToLeftOrRight(
                                Boolean(MenuMobile.goAnimationTo === "Forward")
                            )}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="py-6 px-5 h-full"
                        >
                            {MenuMobile.isShow.SubMenu ? null : (
                                <div className="h-1/6 mb-2 flex route Navigation">
                                    <Button
                                        noBorder
                                        isLoading={false}
                                        textColor="light"
                                        ClickHandler={backButtonAcion}
                                        size="large"
                                        ClassName="w-full flex justify-between items-center border-b-2 border-solid border-jv-light"
                                    >
                                        <span>{MenuMobile.goButtonTitle}</span>
                                        <img className="rotate-180" src={ArrowLeftIconWhite} alt="" />
                                    </Button>
                                </div>
                            )}
                            <div className="h-5/6 overflow-y-auto px-4 no-scrollbar">
                                {MenuMobile.isShow.SubMenu ? (
                                    <SubMenuGenerator
                                        DesktopVarient={ShowOpacity}
                                        MobileVarient={ShowHideMenuItemChildToLeftOrRight(
                                            Boolean(MenuMobile.goAnimationTo === "Forward")
                                        )}
                                        Type="Mobile"
                                        ParentClassName=""
                                        ChildClassName="cursor-pointer text-xl text-jv-light my-5 flex items-center justify-between"
                                        ClickHandler={menuMobileFire}
                                        Data={menu}
                                    >
                                        <img src={ArrowLeftIconWhite} alt="" />
                                    </SubMenuGenerator>
                                ) : MenuMobile.isShow.Item ? (
                                    <ItemGenerator
                                        DesktopVarient={ShowOpacity}
                                        MobileVarient={ShowHideMenuItemChildToLeftOrRight(
                                            Boolean(MenuMobile.goAnimationTo === "Forward")
                                        )}
                                        Type="Mobile"
                                        ParentClassName="h-5/6 overflow-y-auto px-4"
                                        ChildClassName="cursor-pointer text-xl text-jv-light my-5 flex items-center justify-between"
                                        ClickHandler={menuMobileFire}
                                        Data={MenuMobile.menuData.Item}
                                    >
                                        <img src={ArrowLeftIconWhite} alt="" />
                                    </ItemGenerator>
                                ) : MenuMobile.isShow.Links ? (
                                    <LinkGenerator
                                        DesktopVarient={ShowOpacity}
                                        MobileVarient={ShowHideMenuItemChildToLeftOrRight(
                                            Boolean(MenuMobile.goAnimationTo === "Forward")
                                        )}
                                        Type="Mobile"
                                        ParentClassName="w-full h-full"
                                        ChildClassName="cursor-pointer text-xl text-jv-light my-4 flex flex-col"
                                        LinksWrapperClassName="flex items-start flex-col"
                                        SublinkParentClassName="my-3 flex items-start flex-col"
                                        SublinkChildClassName="mr-5 flex text-base flex items-center"
                                        SublinkLinkWrapperClassName="text-jv-light opacity-70"
                                        ClickHandler={menuMobileFire}
                                        Data={MenuMobile.menuData.Links}
                                        isChildrenShow
                                    >
                                        <img src={LeftIcon} alt="" />
                                    </LinkGenerator>
                                ) : null}
                            </div>
                        </motion.div>
                        <div
                            onClick={menuMobileToggle}
                            className="w-10 h-1 bg-jv-light rounded-3xl absolute -translate-x-1/2 -translate-y-1/2 top-3 left-1/2"
                        ></div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Mobile Header DropDown -------------------- */}
        </>
    );
};

export default Header;
