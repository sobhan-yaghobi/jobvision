import React from "react";
import PrimaryLogo from "/Svg/Logo/PrimaryColorLogo.svg";
import WhiteLogo from "/Svg/Logo/WhiteColorLogo.svg";
import MenuIcon from "/Svg/Menu.svg";
import CloseIcon from "/Svg/Close.svg";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { menu } from "../MenuItem/menuItem.type";
import UseShowMenu from "../../Hooks/useShowMenu";
import { MenuDesktopItemGenerate, MenuMobileItemGenerate, SubMenuGenerator } from "../MenuItem/MenuItem";

const Header: React.FC = () => {
    const [elm, MenuMobile, MenuDesktop, menuMobileFire, menuDesktopFire] = UseShowMenu(menu);
    const megaBgClickAction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLDivElement;
        if (target.id === "MegaBg") {
            menuDesktopFire("", false);
        }
    };

    //? -------------------- Start Mobile Header DropDown Animation --------------------
    const MobileContainerVariants = {
        hidden: {
            clipPath: "inset(100% 50% 0% 50% round 10px)",
            transition: {
                staggerChildren: 2.5,
            },
        },
        visible: {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            transition: {
                staggerChildren: 1.4,
                when: "beforeChildren",
            },
        },
        exit: {
            clipPath: "inset(100% 50% 0% 50% round 10px)",
        },
    };
    const MobileChildVariants = {
        hidden: {
            opacity: 0,
            ...(MenuMobile.goAnimationTo === "Forward" ? { x: "100%" } : { x: "-100%" }),
        },
        visible: {
            x: 0,
            opacity: 1,
        },
    };
    //? -------------------- Finish Mobile Header DropDown Animation --------------------

    //? -------------------- Start Desktop Header DropDown Animation --------------------
    const DesktopContainerVariants = {
        hidden: {
            opacity: 0,
            transition: {
                staggerChildren: 2.5,
            },
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1.4,
                when: "beforeChildren",
            },
        },
        exit: {
            opacity: 0,
        },
    };
    const DesktopChildVariants = {
        hidden: {
            opacity: 0,
            y: "-100dvh",
        },
        visible: {
            y: 0,
            opacity: 1,
        },
        exit: {
            opacity: 0,
            y: "-100dvh",
        },
    };
    //? -------------------- Finish Desktop Header DropDown Animation --------------------

    return (
        <>
            <div className="w-full h-20 relative">
                <header className="fixed h-20 w-full px-0 bg-jv-primary lg:bg-jv-light z-20">
                    {/*//? -------------------- Start Mobile Header -------------------- */}
                    <div className="header-mobile  w-full h-full p-2 lg:hidden flex items-center justify-between">
                        <div className="w-4/12 sm:px-3 flex items-center justify-start">
                            <Button noBorder ClickHandler={menuMobileFire} textColor="light" isLoading={false}>
                                <img src={MenuMobile.isShow ? CloseIcon : MenuIcon} alt="" />
                            </Button>
                        </div>

                        <div className="w-4/12 sm:px-3 flex items-center justify-center">
                            <img className="w-7/12 md:w-5/12 " src={WhiteLogo} alt="" />
                        </div>

                        <div className="w-5/12 sm:w-4/12 text-center flex items-center justify-center sm:justify-end">
                            <Button
                                noBorder
                                ClickHandler={() => {}}
                                textColor="light"
                                size="small"
                                ClassName="text-xs px-1 sm:text-base sm:px-3"
                                isLoading={false}
                            >
                                ورود/ثبت نام کارجو
                            </Button>
                        </div>
                    </div>
                    {/*//? -------------------- Finish Mobile Header -------------------- */}

                    {/*//? -------------------- Start Desktop Header -------------------- */}
                    <div className="header-desktop w-full h-full lg:px-11 px-24 hidden lg:flex items-center justify-between">
                        <div className="header-desktop-right w-6/12 h-full mx-2 flex items-center">
                            <section className="flex w-full h-full justify-around">
                                <div className="lg:w-full flex items-center">
                                    <ul className="h-full flex">
                                        <SubMenuGenerator
                                            Type="Desktop"
                                            ClassName="menu__item border-transparent"
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
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="header-desktop-left w-6/12 mx-2 flex items-center justify-end">
                            <div className="mx-5 flex">
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
                        variants={DesktopContainerVariants}
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
                            variants={DesktopChildVariants}
                        >
                            <MenuDesktopItemGenerate menuData={MenuDesktop.mainItem}></MenuDesktopItemGenerate>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Desktop Header DropDown -------------------- */}
            {/*//? -------------------- Start Mobile Header DropDown -------------------- */}
            <AnimatePresence>
                {MenuMobile.isShow ? (
                    <motion.div
                        variants={MobileContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`header-dropwodn-mobile w-full h-4/6 rounded-t-3xl fixed lg:hidden bottom-0 right-0 bg-jv-primary  text-right ${
                            MenuMobile.isShow ? "z-20" : "z-10"
                        }`}
                    >
                        <motion.div className="py-6 px-5 h-full" variants={MobileChildVariants}>
                            <MenuMobileItemGenerate type={MenuMobile.type} menus={menu}></MenuMobileItemGenerate>
                        </motion.div>
                        <div
                            onClick={menuMobileFire}
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
