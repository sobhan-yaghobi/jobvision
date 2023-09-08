import React, { useEffect, useRef, useState } from "react";
import PrimaryLogo from "/Svg/Logo/PrimaryColorLogo.svg";
import WhiteLogo from "/Svg/Logo/WhiteColorLogo.svg";
import MenuIcon from "/Svg/Menu.svg";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { menu } from "../MenuItem/menuItem.type";
import UseShowMenu from "../../Hooks/useShowMenu";
import MenuItem from "../MenuItem/MenuItem";

//? -------------------- Start Mobile Header DropDown Animation --------------------
const MobileContainerVariants = {
    hidden: {
        clipPath: "inset(10% 50% 90% 50% round 10px)",
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
        clipPath: "inset(10% 50% 90% 50% round 10px)",
    },
};

const MobileChildVariants = {
    hidden: {
        opacity: 0,
        x: "100%",
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

const Header: React.FC = () => {
    const [elm, isMenuMobile, isMenuDesktop, menuMobileFire, menuDesktopFire, filtredMenuItem] = UseShowMenu(menu);

    return (
        <>
            <div className="w-full h-20 relative">
                <header className="fixed h-20 w-full px-0 bg-jv-primary lg:bg-jv-light z-20">
                    {/*//? -------------------- Start Mobile Header -------------------- */}
                    <div className="header-mobile  w-full h-full p-2 lg:hidden flex items-center justify-between">
                        <div className="w-4/12 sm:px-3 flex items-center justify-start">
                            <Button noBorder ClickHandler={menuMobileFire} textColor="light" isLoading={false}>
                                <img src={MenuIcon} alt="" />
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
                        <div className="header-desktop-right w-5/12 h-full mx-2  flex items-center">
                            <section className="flex w-full h-full justify-around">
                                <div className="lg:w-full bg-red-50 flex items-center">
                                    <ul className="h-full flex">
                                        {menu.map((item) => {
                                            const classList = `menu__item ${
                                                item.id === isMenuDesktop.id
                                                    ? "border-jv-primary"
                                                    : "border-transparent"
                                            }`;
                                            return item.items.length ? (
                                                <li
                                                    key={item.id}
                                                    ref={elm}
                                                    onClick={(e) => menuDesktopFire(item.id, item.megaMenu)}
                                                    className={`${classList} hover:border-jv-primary`}
                                                >
                                                    {item.title}
                                                </li>
                                            ) : (
                                                <li key={item.id} className={classList}>
                                                    {item.title}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="hidden items-center xl:flex">
                                    <Button
                                        size="middle"
                                        textColor="light"
                                        ClassName="!bg-transparent !text-jv-danger !border-jv-danger mx-2"
                                        ClickHandler={() => {}}
                                        isLoading={false}
                                    >
                                        گزارش کارنامه بازار
                                    </Button>
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
                {isMenuDesktop.isShow ? (
                    <motion.div
                        variants={DesktopContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`current-mega-height fixed w-full z-10 hidden lg:flex ${
                            isMenuDesktop.isMega ? "flex justify-center" : ""
                        }`}
                    >
                        {isMenuDesktop.isMega && filtredMenuItem ? (
                            <motion.div
                                className="w-11/12 h-[95%] absolute bg-jv-light rounded-b-lg p-2"
                                variants={DesktopChildVariants}
                            >
                                <MenuItem menuData={filtredMenuItem} type="DESKTOP"></MenuItem>
                            </motion.div>
                        ) : (
                            <motion.div
                                style={{ left: `${isMenuDesktop.x}px`, top: `${isMenuDesktop.y}px` }}
                                className="absolute w-24"
                                variants={DesktopChildVariants}
                            >
                                <p className={` bg-red-500`}>ddd</p>
                            </motion.div>
                        )}
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Desktop Header DropDown -------------------- */}
            {/*//? -------------------- Start Mobile Header DropDown -------------------- */}
            <AnimatePresence>
                {isMenuMobile ? (
                    <motion.div
                        variants={MobileContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="header-dropwodn-mobile w-full h-full fixed lg:hidden top-0 right-0 bg-jv-primary z-10 text-right"
                    >
                        <div className="p-2 sm:px-5 w-full flex items-center justify-between">
                            <Button noBorder ClickHandler={menuMobileFire} textColor="light" isLoading={false}>
                                <img src={MenuIcon} alt="" />
                            </Button>
                            <div>
                                <img src={WhiteLogo} alt="" />
                            </div>
                        </div>

                        <motion.div className="px-5" variants={MobileChildVariants}>
                            {/* <Menu type="Mobile" menuData={megaMenus}></Menu> */}
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Mobile Header DropDown -------------------- */}
        </>
    );
};

export default Header;
